// pages/citywide/myIssue/myIssue.js
import cyurl from "../../../utils/url";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
data: {
    bbsCates: [
      {
        seqId: 1,
        typeName: "平板电脑"
      },
      {
        seqId: 2,
        typeName: "笔记本"
      },
      {
        seqId: 3,
        typeName: "台式机"
      },
      {
        seqId: 4,
        typeName: "联想系列"
      },
      {
        seqId: 5,
        typeName: "手机"
      },
      {
        seqId: 6,
        typeName: "配件"
      }
    ],
    currentcate:0,
    list:[
      // {
      //   seqId:1,
      //   infoType:1,
      //   infoTitle:"第四次世界大战蓄势待发",
      //   infoImg:"https://m.360buyimg.com/mobilecms/s900x500_jfs/t3538/153/1596191617/49151/30d4c2cf/582bcc02Nde3c4086.jpg!q65.webp",
      //   infoIntro: "",//文章简要
      //   infoContent: "",//文章内容
      //   viewNum:322,
      //   replyNum:3,
      //   likeNum:555,
      //   postTimeFmt:"2017-12-12",
      //   mbImg:"https://m.360buyimg.com/mobilecms/jfs/t3136/97/2404301303/486125/6fdc39f4/57e0fceeNa999f8da.jpg!q65.webp",
      //   mbName:"京东36号",
      //   imgList:[]
      // }
    ]
  },

//我的发布 
getBbsList: function () {
  var that = this;
  var openId = wx.getStorageSync("openId");
  wx.showNavigationBarLoading()
  wx.request({
    url: cyurl.bbsList,
    data: {
      busiType: "nhxyTakeout",
      openId: openId
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log("我的发布---->",res)
      if (res.data.code == 0) {
        var list = res.data.list;
        that.setData({
          list: list
        })
        wx.hideNavigationBarLoading()
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBbsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    that.getBbsList();
    wx.stopPullDownRefresh() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})