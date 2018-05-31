
import cyurl from "../../../utils/url";
var userCart = []/*首先定义全局本地存储的购物车数据*/
Page({

  data: {
    img: '/image/avi.png',
    goodsList: [],
    show_up: true,
    array: ['综合', '上架时间', '价格从低到高', '价格从高到低'],
    value: '',
    showToast: true,
    id: '',
    goodsName: '',
    claId: '',
    index:0,
    show:true,
   
  },
  onAvtite:function(){

    this.setData({
      show: true,
    
    })
   
  },

  //获取商品销量
  toSalesTab: function () {

      this.setData({
        show: false,
       
      })
    
    var goodsName = this.data.goodsName;
    var claId = this.data.claId;
    var sort = 5;
    var id = this.data.id;
    if (id == 0) {
      var goodsProperty = 2;
      this.getGoodsList(goodsProperty, sort)
    } else if (id == 1) {
      var goodsProperty = 1;
      this.getGoodsList(goodsProperty, sort)
    } else if (id == 3) {
      var goodsProperty = 0;
      this.getGoodsList(goodsProperty, sort)
    } else if (claId != undefined) {
      this.getClaGoods(claId, sort)
    }
    else {
      this.getSeachList(goodsName, sort)
    }
  },

  //分类获取商品列表
  getClaGoods: function (claId, sort) {
    var that = this;
    var showToast = that.data.showToast;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: cyurl.goodsListUrl,
      data: {
        claId: claId,
        sort: sort
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var goodsList = res.data.goodsList;
          that.setData({
            goodsList: goodsList
          })
          if (showToast) {
            wx.hideLoading()
          }
        } else {
          wx.showToast({
            title:res.data.msg
          })
        }

      },
      fail: function (res) {
        wx.showToast({
          title: res.data.msg
        })
      }
    })
  },

  // 获取商品列表
  getGoodsList: function (goodsProperty, sort) {
    var that = this;
    var showToast = that.data.showToast;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: cyurl.goodsListUrl,
      data: {
        goodsProperty: goodsProperty,
        sort: sort
      },
      
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var goodsList = res.data.goodsList;
          that.setData({
            goodsList: goodsList
          })
          if (showToast) {
            wx.hideLoading()
          }
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }

      },
      fail: function (res) {
        wx.showToast({
          title: res.data.msg
        })
      }
    })
  },

  // 获取搜索商品名称列表

  getSeachList: function (goodsName, sort) {
    var that = this;
    var showToast = that.data.showToast;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: cyurl.goodsListUrl,
      data: {
        goodsName: goodsName,
        sort: sort

      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var goodsList = res.data.goodsList;
          that.setData({
            goodsList: goodsList
          })
          if (showToast) {
            wx.hideLoading()
          }
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }

      },
      fail: function (res) {
        wx.showToast({
          title: res.data.msg
        })
      }
    })
  },


  // 点击综合
  toComposite: function (e) {
    var index = e.detail.value;
    var id = this.data.id;
    var claId = this.data.claId;
    var goodsName = this.data.goodsName;
    console.log(claId)
     
     this.setData({
       index:index
     })

    // 综合
    if (index == 0) {
      var sort = 1;
      if (id == 0) {
        var goodsProperty = 2;
        this.getGoodsList(goodsProperty, sort)
      } else if (id == 1) {
        var goodsProperty = 1;
        this.getGoodsList(goodsProperty, sort)
      } else if (id == 3) {
        var goodsProperty = 0;
        this.getGoodsList(goodsProperty, sort)
      } else if (claId != undefined) {
        this.getClaGoods(claId, sort)
      }
      else {
        this.getSeachList(goodsName, sort)
      }
    }
    // 上架时间
    if (index == 1) {
      var sort = 2;
      if (id == 0) {
        var goodsProperty = 2;
        this.getGoodsList(goodsProperty, sort)
      } else if (id == 1) {
        var goodsProperty = 1;
        this.getGoodsList(goodsProperty, sort)
      } else if (id == 3) {
        var goodsProperty = 0;
        this.getGoodsList(goodsProperty, sort)
      } else if (claId != undefined) {
        this.getClaGoods(claId, sort)
      }
      else {
        this.getSeachList(goodsName, sort)
      }
    }
    // 价格从低到高
    if (index == 2) {
      var sort = 3;
      if (id == 0) {
        var goodsProperty = 2;
        this.getGoodsList(goodsProperty, sort)
      } else if (id == 1) {
        var goodsProperty = 1;
        this.getGoodsList(goodsProperty, sort)
      } else if (id == 3) {
        var goodsProperty = 0;
        this.getGoodsList(goodsProperty, sort)
      } else if (claId != undefined) {
        this.getClaGoods(claId, sort)
      }
      else {
        this.getSeachList(goodsName, sort)
      }
    }
    // 价格从高到低
    if (index == 3) {
      var sort = 4;
      if (id == 0) {
        var goodsProperty = 2;
        this.getGoodsList(goodsProperty, sort)
      } else if (id == 1) {
        var goodsProperty = 1;
        this.getGoodsList(goodsProperty, sort)
      } else if (id == 3) {
        var goodsProperty = 0;
        this.getGoodsList(goodsProperty, sort)
      }
      else if (claId != undefined) {
        this.getClaGoods(claId, sort)
      } else {
        this.getSeachList(goodsName, sort)
      }
    }

  },

  //商品详情
  toDateil: function (e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?goodsId=' + goodsId,
    })
  },
  // 加入购物车
  addCart: function (e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log(goodsId);
    var addUserCart = this.data.goodsList;

    console.log(this.data.goodsList)
    for (var i = 0; i < userCart.length; i++) {
      if (userCart[i].goodsId == goodsId) {
        wx.showToast({
          title: '已添加',
          icon: 'warn',
          duration: 2000
        })
        return
      }
    }

    for (var j = 0; j < addUserCart.length; j++) {

      if (goodsId == addUserCart[j].goodsId) {
        addUserCart[j].goodsDetail = '';
        addUserCart[j].num = 1;
        userCart.push(addUserCart[j])/*添加新的商品进去本地购物车数据*/
      }
    }
    console.log(userCart)
  

    wx.setStorage({
      key: "cart_key",
      data: userCart,
      success: function (e) {
        wx.showToast({
          title: '加入成功',
        })
      }
    })


  },


  onLoad: function (options) {
    var id = options.id;
    var goodsName = options.value;
    var claId = options.claId;
    console.log(claId)

    this.setData({
      id: id,
      goodsName: goodsName,
      claId: claId
    })
    var sort = 1;
    // 搜索商品
    if (goodsName != undefined) {
      this.getSeachList(goodsName, sort)
    }


    // 分类商品
    if (claId != undefined) {
      this.getClaGoods(claId, sort);
    }


    //  id-0 热销-2   id-1 新品-1    id-3 全部-0
    if (id == 0) {
      var goodsProperty = 2;
      this.getGoodsList(goodsProperty, sort)
    } else if (id == 1) {
      var goodsProperty = 1;
      this.getGoodsList(goodsProperty, sort)
    } else if (id == 3) {
      var goodsProperty = 0;
      this.getGoodsList(goodsProperty, sort)
    }



  },
  onShow: function (e) {
    var that = this;
    wx.getStorage({
      key: 'cart_key',
      success: function (res) {
        userCart = res.data
      },
    })
  },

  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})