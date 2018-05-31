import cyurl from "../../../../utils/url";
var app = getApp();
Page({
  data: {
    goodsImg:'',
    showToast:true,
    orderId:'',
    userAddr:'',
    orderDetail:[],
    goodsList:[],
    goodsId:''
  },

// 获取订单详情
getOrderDetail:function(e){
  var that = this;
  var showToast = that.data.showToast;
  var orderId=that.data.orderId;
  if (showToast) {
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
  }
  wx.request({
    url: cyurl.orderDetailUrl,
    data: {
      orderId: orderId
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res)
      if (res.data.code == 0) {
        var orderDetail = res.data.orderDetail;
        var goodsList = res.data.goodsList;
        var goodsId = res.data.goodsList[0].goodsId;
        that.setData({
          orderDetail: orderDetail,
          goodsList: goodsList,
          goodsId: goodsId
        })
        if (showToast) {
          wx.hideLoading()
        }
      } else {
        wx.showToast({
          title: '请求数据失败',
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

// 收货地址
selAddress: function (e) {
  console.log(e)
  // var that = this;
  // wx.chooseAddress({
  //   success: function (res) {
  //     that.setData({
  //       userName: res.userName,
  //       userAddr: res.provinceName + res.cityName + res.detailInfo + res.detailInfo,
  //       telNumber: res.telNumber
  //     })
  //   }
  // })
},

  //立即支付
  payTab:function(e){
    var orderId = this.data.orderId;
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
        var paramMap = res.data.paramMap;
        that.weixinPaid(paramMap)
        
      },
      fail: function (res) {
        console.log(res)
      }
    })
},

// 微信支付
weixinPaid: function (paramMap) {
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
        wx.redirectTo({
          url: '../order/order',
        })
      }, 1500)

    },
    fail: function () {
      wx.showToast({
        title: '支付失败'
      })
    }
  })
},

  // 确认收货
  takeTab:function(e){
    var that = this;
    var orderId = this.data.orderId;
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
          setTimeout(function () {
            wx.navigateTo({
              url: '../order/order',
            })
          }, 1500)
        } else {
          wx.showToast({
            title: '请求数据失败',
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
  // 评价
  couponTab:function(e){
     wx.navigateTo({
       url: '../order/discuss/index',
     })
  },
  onLoad: function (options) {
    var orderId=options.orderId;
    console.log(orderId)
    this.setData({
      orderId: orderId
    })
    this.getOrderDetail()

  }

})