// pages/line-made/index.js
Page({

  data: {
  
  },
  onCallTab:function(){
    wx.makePhoneCall({
      phoneNumber: '0760-87838068',
    })
  },
  onPhoneTab:function(){
     wx.makePhoneCall({
       phoneNumber: '18988574080',
     })
  },
  onLoad: function (options) {
  
  },

})