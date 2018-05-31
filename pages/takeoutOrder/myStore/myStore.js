// pages/takeoutOrder/myStore/myStore.js
import cyurl from "../../../utils/url";
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    storeId: "",
    storeName: "肯德基（东圃店）",
    storeImg: "/images/外卖(6)@2x.png",
    saleDay: "0",
    saleMonth: "0"
  },

  //销售商品明细统计
  toStoreGoodsMinXi(){
    wx.navigateTo({
      url: '/pages/takeoutOrder/myStoreGoodsMinXi/myStoreGoodsMinXi',
    })
  },

  //获取店铺详情
  storeinfo: function () {
    var that = this;
    var seqId = this.data.storeId;
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.storeinfo,
      data: {
        seqId: seqId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("店铺详情-->", res)
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {

          //评价
          var commentsaleDayz = res.data.commentsaleDayz;
          //商家评分
          var commentScore = res.data.commentScore;

          //对象(编号
          // 名称
          // 会所地址
          // 营业时间
          // 会所经度
          // 会所纬度
          // 轮播图片
          // 详情
          // 起送
          // 配送
          // 人均)
          var bean = res.data.bean;
          that.setData({
            groupsaleDayz: groupsaleDayz,
            commentsaleDayz: commentsaleDayz,
            commentScore: commentScore,
            bean: bean
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

  //门店销售额
  saleDayzTakeoutByMonth: function () {
    var that = this;
    var openId = wx.getStorageSync("openId");
    var storeId = this.data.storeId;
    wx.request({
      url: cyurl.getByIdDetail,
      data: {
        openId: openId,
        seqId: storeId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("店铺销售额", res)
        if (res.data.code == 0) {
          var bean = res.data.bean;
          var saleDay = res.data.saleDay;
          var saleMonth = res.data.saleMonth;
          var deliveryNum = res.data.deliveryNum;
          that.setData({
            bean: bean,
            saleDay: saleDay,
            saleMonth: saleMonth,
            deliveryNum: deliveryNum,
          })
          wx.hideLoading()
        } else {
          wx.showToast({
            icon:"none",
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          icon:"none",
          title: "获取失败"
        })
      }
    })
  },

  //跳转店铺订单
  toStoreOrder: function () {
    var storeId = this.data.storeId;
    wx.navigateTo({
      url: '../myStoreOrder/myStoreOrder?storeId=' + storeId,
    })
  },

  //跳转店铺销售额
  toStoreSales: function () {
    var storeId = this.data.storeId;
    wx.navigateTo({
      url: '../myStoreSales/myStoreSales?storeId=' + storeId,
    })
  },

  //跳转店铺评价
  toStoreComment: function () {
    var commentScore = this.data.commentScore;
    var storeId = this.data.storeId;
    wx.navigateTo({
      url: '../myStoreComment/myStoreComment?commentScore=' + commentScore + '&storeId=' + storeId,
    })
  },

  logout(){
    wx.removeStorageSync('storeId')
    wx.removeStorageSync('MembWithdrawType')
    wx.setStorageSync("storeIsLogin", 0)
    wx.redirectTo({
      url:"/pages/takeoutOrder/my/my"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var storeId = wx.getStorageSync("storeId");
    // var storeName = options.storeName;
    // var storeImg = options.storeImg;
    // var saleDay = options.saleDay;
    // var saleMonth = options.saleMonth;
    this.setData({
      storeId: storeId,
      // storeName: storeName,
      // storeImg: storeImg,
      // saleDay: saleDay,
      // saleMonth: saleMonth
    })
    this.saleDayzTakeoutByMonth()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.saleDayzTakeoutByMonth()
    wx.stopPullDownRefresh()    
 },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

})