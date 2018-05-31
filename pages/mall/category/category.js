import cyurl from "../../../utils/url";
Page({
  data: {
    goodsData: [],
    curIndex: 0,
    isScroll: true,
    toView:0
  },
  // 商品导航
  switchTab(e) {
    this.setData({
      toView: e.target.dataset.id,
      curIndex: e.target.dataset.index,
    })
  },
  // 分类
  getClaList: function (e) {
    var that = this;
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.claListUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var claList = res.data.claList;
          that.setData({
            claList: claList
          })
       wx.hideNavigationBarLoading()
        }else{
          wx.showToast({
            title:res.data.msg,
          })
        }

      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '加载失败'
        })
      }
    })

  },

  // 商品列表链接
  toDatailTab: function (e) {
    var claId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../list/list?claId=' + claId,
    })
  },
  onShow: function (options) {
    this.getClaList()
  },
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})