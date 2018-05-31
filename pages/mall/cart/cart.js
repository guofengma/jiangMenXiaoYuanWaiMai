// page/component/new-pages/cart/cart.js
//获取应用实例
const app = getApp()
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllButton: true,    // 全选状态，默认全选
    nums: 0
  },
  toIndexTab:function(e){
    wx.navigateTo({
      url: '../index/index'
    })
  },

  onShow: function (e) {
    var that = this;
    wx.getStorage({
      key: 'cart_key',
      success: function (res) {
        if (res.data.length == 0) {
          that.setData({
            hasList: false
          })
        } else {
          that.setData({
            selectAllButton: true,
            hasList: true,
            carts: res.data
          })
          // 选择删除后，没删除的商品会出现和全选框不同步的bug，下面这段代码可以解决，不过质量很差
          for (let i = 0; i < that.data.carts.length; i++) {
            console.log(that.data.carts[i])
            that.data.carts[i].selected = true
          }
          that.setData({
            carts: that.data.carts,
          })
        }
        that.getTotalPrice();
      },
    })

  },

  // 结算
  toSaveTab: function (e) {
     var carts=this.data.carts;
     var freight=carts[0].freight;

     for(var j=0;j<carts.length;j++){
        if(freight<carts[j].freight){
          freight=carts[j].freight
        }
     }
     console.log(freight)
  
    var totalPrice = this.data.totalPrice;
   
    var nums = this.data.nums;
    var orderDaetail = []
 
    /*遍历购物车，当购物车商品的selected属性为true时，即选中时，push进orderDaetail*/
    for (let i = 0; i < carts.length; i++) {
      if (this.data.carts[i].selected == true) {
        orderDaetail.push(this.data.carts[i])
      }
    }
    console.log(orderDaetail)

    /*如果为空，即没有选择商品，弹出提示框，结束函数*/
    if (orderDaetail.length == 0) {
      wx.showToast({
        title: '没有选择商品',
        duration: 2000
      })
      return
    }

    /*用JSON的方式转化数据，这里这个orderEatail是一个数组来的*/
    // var orderDaetail = JSON.stringify(orderDaetail)
    wx.setStorageSync("orderDaetail", orderDaetail)

      wx.navigateTo({
      url: '../save-order/index?nums=' + nums + '&freight=' +
      freight + '&totalPrice=' + totalPrice,
    })

  },

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let selectAllstasu = true;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    /*for循环用于判断单个选择按钮的状态决定全选按钮的状态*/
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected == true) {
        selectAllstasu = true
      } else {
        selectAllstasu = false
        break
      }
    }
    this.setData({
      selectAllButton: selectAllstasu,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    let carts = this.data.carts.filter(function (item) {
      return item.selected == false
    })
    this.setData({
      carts: carts
    })
    if (this.data.carts.length == 0) {
      this.setData({
        hasList: false
      })
    }


    wx.setStorage({/*本地存储用户购物车数据*/
      key: "cart_key",
      data: carts,
      success: function (res) {
        console.log('本地储存成功', res)
      }
    })
    this.getTotalPrice()
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {

    let statu = e.currentTarget.dataset.statu
    let carts = this.data.carts
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = statu
    }
    this.setData({
      carts: carts,
      selectAllButton: statu
    })
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    console.log(carts)
    let total = 0;
    let nums = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].goodsPrice;   // 所有价格加起来
        nums += carts[i].num
      }
    }
    this.setData({
      nums: nums,                           // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },

  onLoad:function(options){
    app.editTabBar("tabbar2");
  }

})