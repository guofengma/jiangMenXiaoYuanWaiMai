
import cyurl from "../../../../utils/url";
var app=getApp();
Page({

  data: {
    couponImg: [],
    showToast:true,
    showCoupon:true
  },
// 点击领取按钮
  getCouponTab:function(e){
    var seqId=e.currentTarget.dataset.coupon;
    var openId = app.wxOpenId;
    this.getCoupon(openId, seqId)
  },

  // 领取优惠劵
  getCoupon:function(openId,seqId){
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
      url: cyurl.getCouponUrl,
      data:{
        openId:openId,
        seqId:seqId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var couponImg = res.data.list
          that.setData({
            couponImg: couponImg,
          })
          if (showToast) {
            wx.hideLoading()
          }
          wx.showToast({
            title: '领取成功',
          })

        } else if (res.data.code==999) {
          if (showToast) {
            wx.hideLoading()
          }
          wx.showToast({
            title:'已领取',
          })
        }
        else {
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

  // 优惠劵列表
  couponList: function (e) {
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
      url: cyurl.couponListUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var couponImg=res.data.list
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
    this.couponList()
  },


  onShareAppMessage: function () {
  
  }
})