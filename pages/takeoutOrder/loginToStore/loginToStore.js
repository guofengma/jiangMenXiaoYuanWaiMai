// pages/takeoutOrder/myStore/myStore.js
// import cyurl from "../../../utils/url";
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     storeId: "",
//     storeName: "肯德基（东圃店）",
//     storeImg: "/images/外卖(6)@2x.png",
//     daySale:"400",
//     monthSale:"6200"
//   },

//   //获取店铺详情
//   storeInfo: function () {
//     var that = this;
//     var seqId = this.data.storeId;
//     wx.showNavigationBarLoading()
//     wx.request({
//       url: cyurl.storeinfo,
//       data: {
//         seqId: seqId
//       },
//       header: {
//         'content-type': 'application/json'
//       },
//       success: function (res) {
//         console.log("店铺详情-->", res)
//         wx.hideNavigationBarLoading()
//         if (res.data.code == 0) {

//           //评价
//           var commentList = res.data.commentList;
//           //商家评分
//           var commentScore = res.data.commentScore;
//           //对象(编号
//           // 名称
//           // 会所地址
//           // 营业时间
//           // 会所经度
//           // 会所纬度
//           // 轮播图片
//           // 详情
//           // 起送
//           // 配送
//           // 人均)
//           var bean = res.data.bean;
//           that.setData({
//             groupList: groupList,
//             commentList: commentList,
//             commentScore: commentScore,
//             bean: bean
//           })
//         } else {

//         }
//       },
//       fail: function (res) {
//         wx.hideNavigationBarLoading()
//         console.log(res)

//       }
//     })
//   },

//   //跳转店铺订单
//   toStoreOrder: function () {
//     var storeId = this.data.storeId;
//     wx.navigateTo({
//       url: '../myStoreOrder/myStoreOrder?storeId=' + storeId,
//     })
//   },

//   //跳转店铺销售额
//   toStoreSales: function () {
//     var storeId = this.data.storeId;
//     wx.navigateTo({
//       url: '../myStoreSales/myStoreSales?storeId=' + storeId,
//     })
//   },

//   //跳转店铺评价
//   toStoreComment: function () {
//     var commentScore = this.data.commentScore;
//     var storeId = this.data.storeId;
//     wx.navigateTo({
//       url: '../myStoreComment/myStoreComment?commentScore=' + commentScore + '&storeId=' + storeId,
//     })
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var storeId = options.storeId;
//     var storeName = options.storeName;
//     var storeImg = options.storeImg;
//     this.setData({
//       storeId: storeId,
//       storeName: storeName,
//       storeImg: storeImg
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () { },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () { },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () { },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () { },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () { },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () { },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () { }
// })



// pages/takeoutOrder/loginToStore/loginToStore.js
import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mbPhone:"",
    mbPwd:"",
  },

  //保存用户输入的信息,通过参数来识别
  saveInput: function (e) {
    var value = e.detail.value;
    var str = e.currentTarget.dataset.str;
    this.setData({
      [str]: value
    })
  },

  //跳转到申请页面
  toApplyEntry:function(){
    wx.navigateTo({
      url: '/pages/takeoutOrder/applyEntry/applyEntry',
    })
  },

  //登录到店铺
  loginToStore:function(){
    var mbPhone = this.data.mbPhone;
    var mbPwd = this.data.mbPwd;
    // var mbPhone = "testStore";
    // var mbPwd = "123456";
    if (mbPhone.trim() == '' || mbPwd.trim() == ''){
      wx.showToast({
        title: '请输入完整信息'
      })
      return false;
    } 
    var openId = wx.getStorageSync("openId");

    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.mddl,
      data: {
        storePhone1: mbPhone,
        storePwd: mbPwd,
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("登录到店铺-->", res)
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          var storeId = res.data.storeId;
          var storeName = res.data.storeName;
          var storeImg = res.data.storeImg;
          wx.setStorageSync("storeId", storeId)
          wx.setStorageSync("MembWithdrawType", "storeMng")
          wx.setStorageSync("storeIsLogin", 1)
          // var MembWithdrawType = "storeMng";
          wx.redirectTo({
            url: "/pages/takeoutOrder/myStore/myStore?storeId=" + storeId + "&storeName=" + storeName + "&storeImg=" + storeImg,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })

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