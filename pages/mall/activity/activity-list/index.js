import cyurl from "../../../../utils/url";
Page({

  data: {
    
  },

  toDetailTab: function (event) {
    var goodsId = event.currentTarget.dataset.goodsid;
    console.log(goodsId)
    wx.navigateTo({
      url: '../../goodsdetail/goodsdetail?goodsId=' + goodsId,
    })
  },
  ActivityList: function (e) {
    var that = this;
    var  seqId = that.data.seqId;
    console.log(seqId)
    wx.request({
      url: cyurl.activityList,
      data: {
        seqId: seqId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        var discountGoodsList = res.data.discountGoodsList;
        that.setData({
          discountGoodsList: discountGoodsList
        })
       },
      fail: function (res) {
        wx.showToast({
          title: res.data.msg
        })
      }
    })
  },

  onLoad: function (options) {
  console.log(options)
  var index = options.index;
  console.log(index)
  this.setData({
    seqId: options.seqId
  })
  if (index == 0) {
    wx.setNavigationBarTitle({
      title: '新品上样'
    })
  } else if (index == 1) {
    wx.setNavigationBarTitle({
      title: '限时特卖'
    })
  } else if (index == 2) {
    wx.setNavigationBarTitle({
      title: '促销活动'
    })
  } else if (index == 3) {
    wx.setNavigationBarTitle({
      title: '预售活动'
    })
  }
  this.ActivityList()
  },
  onShareAppMessage: function () {
  
  }
})