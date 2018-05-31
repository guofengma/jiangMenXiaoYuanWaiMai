import cyurl from "../../../utils/url";
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      { imgUrl:"/images/轮播2@2x.png"},
      { imgUrl: "/images/轮播2@2x.png" },
      { imgUrl: "/images/轮播2@2x.png" }
    ],
    list:[
      // {
      //   typeName: "校园头条", 
      //   typeSort: "null", 
      //   busiType: "", 
      //   typeAuth: "null", 
      //   typeImg: "https://smarthome.yancloud.cn/cymall/upload/171215…infoType/49ada91c-a565-4b24-a29b-fc8e6e24bda2.png",
      //   typeSort:""
      // }
    ],
  },

  //跳转轮播图对应的url
  toSwiperUrl:function(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  //跳转分类对应的帖子列表
  toList:function(e){
    let that = this;
    let seqId = e.currentTarget.dataset.cateid;
    wx.navigateTo({
      url: '/pages/citywide/list/list?seqId=' + seqId,
    })
  },

  //获取轮播图
  getSlideImgs: function (e) {
    var that = this;
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.imgUrl,
      data: {
        busiType: "info"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("轮播图-->", res)
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          var slideImgs = res.data.slideImgs;
          that.setData({
            imgUrls: slideImgs
          })
        } else {

        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        console.log(res)

      }
    })
  },

  //获取分类信息
  getbbsCates: function () {
    var that = this;
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.bbsCates,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("帖子分类信息", res)
        if (res.data.code == 0) {
          var list = res.data.list;
          that.setData({
            list: list
          })
          wx.hideNavigationBarLoading();
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        console.log(res);
        wx.hideNavigationBarLoading()
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
  let that = this;
  //获取轮播图
  that.getSlideImgs();
  //获取分类信息
  that.getbbsCates();

  app.editTabBar("tabbar3");//同城: tabbar3
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