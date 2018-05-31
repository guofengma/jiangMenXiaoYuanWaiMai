// pages/citywide/index/index.js
import cyurl from "../../../utils/url";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    bbsCates: [

    ],
    currentcate: 0,
    list: [
      // {
      //   seqId: 1,
      //   infoType: 1,
      //   infoTitle: "第四次世界大战蓄势待发",
      //   infoImg: "https://m.360buyimg.com/mobilecms/s900x500_jfs/t3538/153/1596191617/49151/30d4c2cf/582bcc02Nde3c4086.jpg!q65.webp",
      //   infoIntro: "",
      //   infoContent: "",
      //   viewNum: 322,
      //   replyNum: 3,
      //   likeNum: 555,
      //   postTimeFmt: "2017-12-12",
      //   mbImg: "https://m.360buyimg.com/mobilecms/jfs/t3136/97/2404301303/486125/6fdc39f4/57e0fceeNa999f8da.jpg!q65.webp",
      //   mbName: "京东36号",
      //   imgList: []
      // }
    ]
  },
 

  //获取帖子列表
  getBbsList: function (keyword) {
    var that = this;
    let openId = wx.getStorageSync("openId");
    var reqData = {
      busiType: "nhxyTakeout",
      typeId: that.data.seqId
      // openId: openId
    }
    if (keyword) {
      reqData.keyword = keyword
    }
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.bbsList,
      data: reqData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideNavigationBarLoading()        
        console.log("获取帖子列表-->", res)
        if (res.data.code == 0) {
          var list = res.data.list;
          that.setData({
            list: list
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }

      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },

  //点击文章跳转到详情
  todetail: function (e) {
    var seqId = e.currentTarget.dataset.artid;
    wx.navigateTo({
      url: '../articledetail/articledetail?seqId=' + seqId
    })
  },

  //保存搜索框中的输入
  searchNot: function (e) {
    //  console.log(e.detail);
    //  console.log(JSON.stringify(e.detail));    
    this.setData({
      keyword: e.detail.value
    })
  },

  //搜索(点击键盘完成按钮 触发)
  bindSearch: function (event) {
    var that = this;
    var keyword = this.data.keyword;//event.detail.value;
    // console.log("value", value);
    // this.setData({
    //   keyword: value
    // })
    // if (keyword == undefined || keyword == "") {
    //   wx.showToast({
    //     title: '输入关键字不能为空',
    //   })
    // } else {
    //   that.getBbsList(keyword);
    // }
    that.getBbsList(keyword);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let seqId = options.seqId;
    let that = this;
    that.setData({
      seqId: seqId
    });
    //获取帖子列表
    that.getBbsList();
    app.editTabBar("tabbar3");//同城: tabbar3
  },

  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    // this.getBbsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})