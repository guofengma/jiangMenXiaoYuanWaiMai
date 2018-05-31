// pages/campusBulletin/bulletinDetail/bulletinDetail.js
import cyurl from "../../../utils/url";
var WxParse = require('../../mall/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeId:0,
    infoTitle:"",
    infoContent:"",
    infoImg:"",
    postDate:""
  },
  //获取公告详情
  noticeDetail: function () {
    var that = this;
    var noticeId = this.data.noticeId;
    wx.showNavigationBarLoading();
    wx.request({
      url: cyurl.noticeDetail,
      data: {
        seqId: that.data.noticeId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('公告详情 ---->', res);
        var insertData = res.data.bean.infoContentStr;
        WxParse.wxParse('insertData', 'html', insertData, that)
        if (res.data.code == 0) {
          that.setData({
            infoTitle: res.data.bean.infoTitle,
            infoContent: res.data.bean.infoContent,
            infoImg: res.data.bean.infoImg,
            postDate: res.data.bean.postDate,
            imgList: res.data.bean.imgList
          })
          wx.hideNavigationBarLoading();
        } else {
          wx.showToast({
            title: res.data.msg
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var noticeId = options.noticeId;
    this.setData({
      noticeId: noticeId
    });
    this.noticeDetail();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})