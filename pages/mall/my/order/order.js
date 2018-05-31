
import cyurl from "../../../../utils/url";
var app = getApp();
Page({
  data: {
    navbar: [
      {
        orderState: 0,
        orderStateTxt: "全部",
        num: '',
      },
      {
        orderState: 1,
        orderStateTxt: "待付款",
        num: '',
      },
      {
        orderState: 3,
        orderStateTxt: "待收货",
        num: '',
      },
      {
        orderState: 4,
        orderStateTxt: "待评价",
        num: '',
      }
    ],
    currentTab: 0,
    orderData: [],
    showToast: true,
    showModal: 0,
    orderId: '',
    orderList: [
      // {
      //   orderId: 333,
      //   orderSn: 333,
      //   orderPrice: 998,
      //   orderState: 1,
      //   orderFreight: 32,
      //   goodsNum: 2,
      //   ticketId: 3,
      //   ticketTxt: "满三减二",
      //   orderStateTxt: "未支付",
      //   goodsList: [
      //     {
      //       goodsId: 32,
      //       goodsName: "360书籍",
      //       goodsImg: "https://img10.360buyimg.com/n2/jfs/t10489/67/2518607957/117596/3f77f42a/59f831e1n4f46778c.jpg",
      //       goodsPrice: 9
      //     },
      //     {
      //       goodsId: 33,
      //       goodsName: "360书籍",
      //       goodsImg: "https://img10.360buyimg.com/n2/jfs/t14788/281/155828382/126330/4cdcddc9/5a252d7en73fa8a89.jpg",
      //       goodsPrice: 9
      //     }
      //   ]
      // },
      // {
      //   orderId: 333,
      //   orderSn: 333,
      //   orderPrice: 998,
      //   orderState: 1,
      //   orderFreight: 32,
      //   goodsNum: 2,
      //   ticketId: 3,
      //   ticketTxt: "满三减二",
      //   orderStateTxt: "未支付",
      //   goodsList: [
      //     {
      //       goodsId: 32,
      //       goodsName: "360书籍",
      //       goodsImg: "https://img10.360buyimg.com/n2/jfs/t10489/67/2518607957/117596/3f77f42a/59f831e1n4f46778c.jpg",
      //       goodsPrice: 9
      //     },
      //     {
      //       goodsId: 33,
      //       goodsName: "360书籍",
      //       goodsImg: "https://img10.360buyimg.com/n2/jfs/t14788/281/155828382/126330/4cdcddc9/5a252d7en73fa8a89.jpg",
      //       goodsPrice: 9
      //     }
      //   ]
      // }
    ]
  },

  //导航栏
  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    });
    this.getOrderList();
  },

  //  获取订单列表
  getOrderList: function (e) {
    var that = this;
    var navbar = this.data.navbar;
    var index = this.data.currentTab
    var orderState = this.data.navbar[this.data.currentTab].orderState;
    var that = this;
    var openId = wx.getStorageSync("openId");
    var reqNoState = {
      openId: openId
    };
    var reqState = {
      openId: openId,
      orderState: orderState
    };
    var reqData = orderState == 0 ? reqNoState : reqState;
    var showToast = that.data.showToast;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 5000
      })
    }
    wx.request({
      url: cyurl.orderListUrl,
      data: reqData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var orderList = res.data.orderList;
          navbar[index].num = res.data.orderNum
          that.setData({
            orderList: orderList,
            navbar: navbar
          })
          if (index == 0){
            that.setCateNum()
          }
          if (showToast) {
            wx.hideLoading()
          }
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },

  //设置分类数字
  setCateNum(e){
    let that = this;
    let orderList = that.data.orderList;
    let navbar = that.data.navbar;
    let qb = orderList.length;
    let dfk = 0;
    let dsh = 0;
    let dpj = 0;
    for(var i in orderList){
      if (orderList[i].orderState == 1){
        dfk += 1;
      } else if (orderList[i].orderState == 3){
        dsh += 1;
      } else if (orderList[i].orderState == 4) {
        dpj += 1;
      }
    }
    navbar[0].num = qb;
    navbar[1].num = dfk;
    navbar[2].num = dsh;
    navbar[3].num = dpj;
    that.setData({
      navbar: navbar
    })
  },

  // 发起取消订单请求
  cancelOrder: function (orderId) {
    var that = this;
    var orderId = that.data.orderId;
    var openId = wx.getStorageSync("openId");
    var showToast = that.data.showToast;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: cyurl.orderCencelUrl,
      data: {
        orderId: orderId,
        openId: openId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (showToast) {
          wx.hideLoading()
        }
        if (res.data.code == 0) {
          wx.showToast({
            title: '取消成功',
          })
          setTimeout(function () {
            that.getOrderList();
          }, 1500)

        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },

  // 取消订单按钮
  clearOrder: function (e) {
    var orderId = e.currentTarget.dataset.orderid;
    console.log(orderId);
    this.setData({
      orderId: orderId,
      showModal: 1
    })
  },
  //提示框的取消
  delIndent_operation: function (e) {
    var that = this;
    var orderId = that.data.orderId
    this.cancelOrder(orderId)
    this.setData({
      showModal: 0
    })



  },

  // 提示框再考虑一下
  hiddenModal: function (e) {
    this.setData({
      showModal: 0
    })
  },


  // 立即支付
  payOrder: function (e) {
    var orderId = e.currentTarget.dataset.orderid;
    var that = this;
    var openId = wx.getStorageSync("openId");
    console.log("orderId", orderId)
    console.log("openId", openId)
    wx.request({
      url: cyurl.payOrder,
      data: {
        orderId: orderId,
        openId: openId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var paramMap = res.data.paramMap;
          that.weixinPaid(paramMap)
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }


      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  // 微信支付
  weixinPaid: function (paramMap) {
    var that = this;
    wx.requestPayment({
      'timeStamp': paramMap.timeStamp,
      'nonceStr': paramMap.nonceStr,
      'package': paramMap.package,
      'signType': 'MD5',
      'paySign': paramMap.paySign,
      success: function (res) {
        wx.showToast({
          title: '支付成功'
        })
        setTimeout(function () {
          that.getOrderList()
        }, 1500)

      },
      fail: function () {
        wx.showToast({
          title: '支付失败'
        })
      }
    })
  },

  // 查看物流
  logisticsOrder: function (e) {
    var orderId = e.currentTarget.dataset.orderid;
  },


  //  确认收货
  affirmOrder: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.orderid;
    var showToast = that.data.showToast;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: cyurl.orderFinishUrl,
      data: {
        orderId: orderId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (showToast) {
          wx.hideLoading()
        }
        if (res.data.code == 0) {
          wx.showToast({
            title: '确认成功',
          })
        } else {
          wx.showToast({
            title: '请求数据失败',
          })
        }
        that.getOrderList()
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },
  // 评价
  discussOrder: function (e) {
    var orderId = e.currentTarget.dataset.orderid;
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log(goodsId)
    wx.navigateTo({
      url: 'discuss/index?orderId=' + orderId + '&goodsId=' + goodsId,
    })
  },

  // 订单详情链接
  toOrderTab: function (e) {
    var orderId = e.currentTarget.dataset.orderid;
    console.log(orderId);
    wx.navigateTo({
      url: '../order-detail/order-detail?orderId=' + orderId,
    })
  },

  onLoad: function (options) {
    this.getOrderList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    // that.setData({
    //   orderList:[]
    // })
    that.getOrderList();
    wx.stopPullDownRefresh()
  },
  
})