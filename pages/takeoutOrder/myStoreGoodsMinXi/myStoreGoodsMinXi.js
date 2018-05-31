import cyurl from "../../../utils/url";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        goods_id: "",
        goods_name: "",
        goodsNum:"",
      }
    ]
  },

  //销售商品明细统计
  getStoreGoodsMinXi: function (e) {
    var that = this;
    let storeId = wx.getStorageSync("storeId")
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.storeGoodsMinXi,
      data: {
        storeId: storeId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("销售商品明细统计 -->", res)
        wx.hideLoading()
        if (res.data.code == 0) {
          var list = res.data.list;
          that.setData({
            list: list
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          icon:"none",
          title: '获取失败',
        })
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
    this.getStoreGoodsMinXi()
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


})