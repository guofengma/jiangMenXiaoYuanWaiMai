// pages/takeoutOrder/myStoreSales/myStoreSales.js
import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settleList:[
      // { settleId: "180425-27期", orderNum: "620", orderMoney: 1956, settleStateTxt:"已到账"},
      // { settleId: "180425-27期", orderNum: "620", orderMoney: 1956, settleStateTxt: "已到账" },
      // { settleId: "180425-27期", orderNum: "620", orderMoney: 1956, settleStateTxt: "已到账" }
    ],
  },

  //销售结算列表
  listSaleSettle: function () {
    var that = this;
    var openId = wx.getStorageSync("openId");
    var storeId = this.data.storeId;
    wx.request({
      url: cyurl.ordersettledetail,
      data: {
        openId: openId,
        seqId: storeId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("门店销售结算-->", res)
        if (res.data.code == 0) {
          var list = res.data.orderSettleList;
          that.setData({
            settleList: list,
          })
          wx.hideLoading()
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: res.data.msg
        })
      }
    })
  },
  
  //申请提现
  // withdrawal:function(){
  //   var openId = wx.getStorageSync("openId");
  //   var busiType = "storeMng";
  //   var wdApplyMoney = "";//申请金额
  //   //var isPub = 1;//是否来自公众号

  //   var that = this;
  //   wx.showNavigationBarLoading()
  //   wx.request({
  //     url: cyurl.withdrawal,
  //     data: {
  //       openId: openId,
  //       busiType: busiType,
  //       wdApplyMoney: wdApplyMoney,
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log("申请提现-->", res)
  //       wx.hideNavigationBarLoading()
  //       if (res.data.code == 0) {
  //         wx.showToast({
  //           title: '成功',
  //           icon: 'success',
  //           duration: 2000
  //         })
  //       } else {

  //       }
  //     },
  //     fail: function (res) {
  //       wx.hideNavigationBarLoading()
  //       console.log(res)

  //     }
  //   })
    
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var storeId = options.storeId;
    var settleId = options.settleId
    this.setData({
      storeId: storeId,
      settleId: settleId
    })
    this.listSaleSettle();
    
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