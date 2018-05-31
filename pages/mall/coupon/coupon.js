import cyurl from "../../../utils/url";
var app=getApp();
Page({
  data: {
    navbar:['未使用','已使用'],
    currentTab:0,
    showToast:true
  },

// 导航栏
  navbarTap:function(e){
    var currentTab=e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    })
  },
 
//  我的优惠劵
  getCoupon: function (e) {
    var that = this;
    var openId = app.wxOpenId;
    var showToast = that.data.showToast;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: cyurl.couponListUrl,
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var couponImg = res.data.list
          that.setData({
            couponImg: couponImg
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


  onLoad: function (options) {
    this.getCoupon()
  }

})