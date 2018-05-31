// pages/takeoutOrder/deliveryTodayOrder/deliveryTodayOrder.js
import cyurl from "../../../utils/url";
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "今日订单",
    orderList: [
      {
        orderDate: "2017-12-25 12:25:23",
        storeName: "肯德基（棠下店）",
        orderMoney: 90
      },
      {
        orderDate: "2017-12-25 12:25:23",
        storeName: "肯德基（棠下店）",
        orderMoney: 90
      },
      {
        orderDate: "2017-12-25 12:25:23",
        storeName: "肯德基（棠下店）",
        orderMoney: 90
      }
    ]
  },

  //配送员今日订单
  deliveryTodayOrder:function(){
    var that = this;
    var openId = wx.getStorageSync("openId");
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.deliveryTodayOrder,
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("配送员今日订单-->", res)
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          var orderList = res.data.list;
          that.setData({
            title:"今日"+orderList.length+"单",
            orderList: orderList
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.deliveryTodayOrder();
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