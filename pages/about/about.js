import cyurl from "../../utils/url";
import cyutil from "../../utils/util";

var WxParse = require('../mall/wxParse/wxParse.js');

// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutContent:"",
  },

  // html标签解析
  parse: function () {
    let that = this;
    let infoContent = that.data.aboutContent;
    WxParse.wxParse('infoContent', 'html', infoContent, that, 5);
  },

  //关于我们
  getAbout: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: cyurl.about,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log("关于我们 res -->", res)
        if (res.data.code == 0) {
          var aboutContent = res.data.bean.aboutContent;
          that.setData({
            aboutContent: aboutContent
          })
          that.parse();
        } else {
          wx.showToast({
            image: "/images/hint.png",
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          image: "/images/hint.png",
          title: "获取失败",
        })
        console.log("关于我们 Err-->", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //关于我们
    this.getAbout()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})