import { getData } from '../../utils/getData.js'
import cyurl from "../../utils/url";
Page({
  data: {
    imgUrls: [
      '../../images/swiper.png',
      '../../images/swiper.png',
      '../../images/swiper.png'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSlideImgs()
  },
  
  //跳转轮播图对应链接
  toLink: function (e) {
    let that = this;
    let url = e.currentTarget.dataset.link;
    if (url) {
      wx.navigateTo({
        url: url,
      })
    }
  },

  //获取轮播图
  getSlideImgs: function (e) {
    var that = this;
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: cyurl.imgUrl,
      data: {
        busiType: "home"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        console.log("轮播图-->", res)
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          var slideImgs = res.data.slideImgs;
          that.setData({
            slideImgs: slideImgs
          })
        } else {
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        console.log(res)
        wx.showToast({
          icon:"none",
          title: '获取失败',
        })
      }
    })
  },

  // //跳转轮播图对应的url
  // toSwiperUrl: function (e) {
  //   let url = e.currentTarget.dataset.url;
  //   wx.navigateTo({
  //     url: url,
  //   })
  // },

  // //获取轮播图
  // getSlideImgs: function (e) {
  //   var that = this;
  //   getData('imgUrl',{
  //       busiType: "home"
  //   },(data)=>{
  //         var slideImgs = res.data.slideImgs;
  //         that.setData({
  //           imgUrls: slideImgs
  //         })
  //   })
    // wx.showNavigationBarLoading()
    // wx.request({
    //   url: cyurl.imgUrl,
    //   data: {
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log("轮播图-->", res)
    //     wx.hideNavigationBarLoading()
    //     if (res.data.code == 0) {
    //       var slideImgs = res.data.slideImgs;
    //       that.setData({
    //         imgUrls: slideImgs
    //       })
    //     } else {

    //     }
    //   },
    //   fail: function (res) {
    //     wx.hideNavigationBarLoading()
    //     console.log(res)

    //   }
    // })
  // },

  //跳转 外卖首页
  toTakeoutOrder: function () {
    wx.navigateTo({
      url: '../takeoutOrder/index/index'
    })
  },

  //跳转 商城首页
  toMallIndex: function () {
    wx.navigateTo({
      url: '../mall/index/index'
    })
  },

  //跳转 同城首页
  toCitywide: function () {
    wx.navigateTo({
      url: '../citywide/index/index'
    })
  },

  //跳转 校园公告首页
  toCampusBulletin: function () {
    wx.navigateTo({
      url: '../campusBulletin/index/index'
    })
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
    
  }, 
  toDelyicacy:function(){
    console.log(1)
  },
  toShopping: function () {
    console.log(1)
  },
  toCommunity: function () {
    console.log(1)
  },
  toInformation: function () {
    console.log(1)
  }
})