
var orderData = require("../../../data/data-order")
Page({


  data: {
    navbar:["退款","退货"],
    currentTab:0
  },
  
// 导航栏
  navbarTap:function(e){
    var currentTab=e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    })
  },

  //退款详情
  toDtailTab:function(e){
   var orderId=e.currentTarget.dataset.orderid;
   console.log(orderId);
    wx.navigateTo({
      url: 'sales-detail/index?orderId=' + orderId 
    })
  },
  // 退货详情
  toOrderTab:function(e){
    var orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: 'sales-detail/index?orderId=' + orderId 
    })
  },


  onLoad: function (options) {
   this.setData({
     orderSales: orderData.orderSales

   })
  }
})