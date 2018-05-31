// pages/myComment/myComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:["外卖","商城","同城"],
    currTab:0,
    stars:[0,1,2,3,4],
    goodStar: "/images/star-gd.png",
    defaultStar: "/images/star-df.png",
    halfStar:"/images/star-hf.png",

    commentScore:4.7,
    commentList: [
      {
        userId: 1,
        mbImg: '../../../images/头像4@2x.png',
        mbName: '爱神',
        commentTimeFmt: '一小时前',
        commentContent: '味道还可以,配送挺快的,快递小哥相当的礼貌,味道还可以,配送挺快的,快递小哥相当的礼貌',
        commentScore:4
      },
      {
        userId: 2,
        mbImg: '../../../images/头像4@2x.png',
        mbName: '友阿',
        commentTimeFmt: '2017-12-20',
        commentContent: '味道还可以,配送挺快的,快递小哥相当的礼貌',
        commentScore:5
      },
      {
        userId: 3,
        mbImg: '../../../images/头像4@2x.png',
        mbName: '发哥',
        commentTimeFmt: '一小时前',
        commentContent: '味道还可以,配送挺快的,快递小哥相当的礼貌,味道还可以,配送挺快的,快递小哥相当的礼貌,配送挺快的,快递小哥相当的礼貌',
        commentScore:3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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