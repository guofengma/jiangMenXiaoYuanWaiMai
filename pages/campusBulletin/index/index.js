import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNumber:1,
    noticeList:[
      {
        seqId:1,
        infoTitle:"",
        infoContent:"",
        postDate:"2017-12-24",
        //简要介绍 
        infoIntro:""
      }
    ]
  },

  //
  lower:function(e){
    // let that = this;
    // let pageNumber = that.data.pageNumber;
    // pageNumber += 1;
    // that.setData({
    //   pageNumber: pageNumber
    // })
    // that.getNotices();
    console.log("到底了啊 兄dei")
  },
  // scroll: function (e) {
  //   console.log(e)
  // },

  //获取校园通告列表
  getNotices:function(){
    var that = this;
    let pageNumber = that.data.pageNumber;
    let openId = wx.getStorageSync("openId");
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.bbsList,
      data:{
        busiType: "nhxyNotice",
        pageNumber: pageNumber,
        pageSize: 200
        // openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("校园通告列表",res)
        if (res.data.code == 0) {
          var noticeList = res.data.list;
          that.setData({
            noticeList: noticeList
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
  //跳转公告详情
  toDetail:function(e){
    var noticeId = e.currentTarget.dataset.noticeid;
                   
    wx.navigateTo({
      url: '../bulletinDetail/bulletinDetail?noticeId='+noticeId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotices();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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