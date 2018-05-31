
var orderData = require("../../../../data/data-order")
Page({

  data: {
    goodsImg:'/image/avi.png',
    goodsName:'DP728密码锁家用防盗门锁',
    goodsColor:'古铜色',
    orderPrice:"3000.0",
    goodsNums:1,
    orderStateTxt:"处理中",
    express:'圆通',
    erpessNum:'',
    salesTxt:'',
    salesDetail:''
  },

// 订单号
  getExpressNum:function(e){
   var erpessNum=e.detail.value;
   console.log(erpessNum);
   this.setData({
     erpessNum:erpessNum
   })
  },
  //  提交
  sumbitTab:function(e){
    var erpessNum = this.data.erpessNum;
    // wx.request({
    //   url: '',
    // })
      
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId;
    this.setData({
      orderId: orderId,
      salesDetail: orderData.salesDetail
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
  
  }
})