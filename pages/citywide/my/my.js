import cyurl from "../../../utils/url";
var app = getApp()
Page({
  data: {
  },

  yhqzx(e) {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  wdyhq(e) {
    wx.navigateTo({
      url: '/pages/couponTew/couponTew',
    })
  },

  toAbout(e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  
  //优惠券
  Coupon: function (e) {
    wx.navigateTo({
      url: '../coupon/coupon/index',
    })
  },

  //跳转商城订单
  toMallOrder: function () {
    wx.navigateTo({
      url: '/pages/mall/my/order/order',
    })
  },

  //跳转 我的发布
  toMyIssue: function () {
    wx.navigateTo({
      url: '/pages/citywide/myIssue/myIssue',
    })
  },

  //跳转到 我的店铺
  toMyStore: function () {
    // var MembWithdrawType = this.data.MembWithdrawType;
    // var storeId = this.data.storeId;
    var storeIsLogin = wx.getStorageSync("storeIsLogin");
    if (storeIsLogin == 1) {
      wx.navigateTo({
        url: '/pages/takeoutOrder/myStore/myStore',
      })
    } else {
      wx.navigateTo({
        url: '/pages/takeoutOrder/loginToStore/loginToStore',
      })
    }
  },

  //跳转 配送员
  toDeliveryman: function () {
    var MembWithdrawType = this.data.MembWithdrawType;
    if (MembWithdrawType == "storeDelivery") {
      wx.navigateTo({
        url: '/pages/takeoutOrder/deliveryman/deliveryman',
      })
    } else {
      wx.navigateTo({
        url: '/pages/takeoutOrder/loginToDelivery/loginToDelivery',
      })
    }
  },

  //跳转 申请入驻
  toApplyEntry: function () {
    wx.navigateTo({
      url: '/pages/takeoutOrder/applyEntry/applyEntry',
    })
  },

  // 选择地址
  selAddress: function (e) {
    console.log(e)
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        console.log("选择地址 selAddress-->", res)
        that.setData({
          userName: res.userName,
          userAddr: res.provinceName + res.cityName + res.detailInfo,
          telNumber: res.telNumber
        })
      }
    })
  },

  //身份判定 校园配送员
  deliveryIdentity: function () {
    var openId = wx.getStorageSync("openId");
    wx.request({
      url: cyurl.deliveryIdentity,
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("身份判定 校园配送员-->", res)
        if (res.data.code == 0) {
          var MembWithdrawType = "storeDelivery";
          that.setData({
            MembWithdrawType: MembWithdrawType
          });
          wx.setStorage({
            key: "MembWithdrawType",
            data: MembWithdrawType
          })
        } else {

        }
      },
      fail: function (res) {
        console.log("身份判定 校园配送员 失败 ", res)
      }
    })
  },

  //身份判定 校园门店管理
  storeIdentity: function () {
    let that = this;
    var openId = wx.getStorageSync("openId");
    wx.request({
      url: cyurl.storeIdentity,
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("身份判定 校园门店管理-->", res)
        if (res.data.code == 0) {
          var storeId = res.data.storeId;
          var MembWithdrawType = "storeMng";
          that.setData({
            storeId: storeId,
            MembWithdrawType: MembWithdrawType
          });
          wx.setStorage({
            key: "MembWithdrawType",
            data: MembWithdrawType
          })
        } else {

        }
      },
      fail: function (res) {
        console.log("身份判定 校园门店管理 失败 ", res)
      }
    })
  },

  // 选择地址
  selAddress: function (e) {
    console.log(e)
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        console.log("选择地址 selAddress-->", res)
        that.setData({
          userName: res.userName,
          userAddr: res.provinceName + res.cityName + res.detailInfo,
          telNumber: res.telNumber
        })
      }
    })
  },


  onLoad: function (options) {
    app.editTabBar("tabbar3");
    var that = this;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    });
    this.deliveryIdentity(); //身份判定 校园配送员
    // this.storeIdentity(); //身份判定 校园门店管理
  },
  onShow: function () {

  }

})