import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sf:"",  // stu  pt
    storeId: '',
    // 订单对象
    orderDetail: {
      orderSn: "",
      storeName: '',
      storePhone1: '',
      storeAddr: '',
      orderBuildName: '',
      orderBuildManName: '',
      orderBuildManPhone: "",
      createTime: "",
      deliveryManName: "",
      deliveryManPhone: '',
      orderState: ""

    },
    // 食物类表
    goodsList: [{
      goodsName: "",
      goodsImg: '',
      goodsPrice: "",
      goodsNum: ""
    }],
    // 收货人信息
    addrBean: {
      linker: '',
      linkerPhone: '',
      schoolName: '',
      buildingName: '',
      addDetail: ''
    }
  },

  //订单详情
  getOrderList: function (e) {
    let that = this;
    let openId = wx.getStorageSync("openId");
    let orderId = that.data.seqId;
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.orderDetailUrl,
      data: {
        openId: openId,
        orderId: orderId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("订单详情 -->", res)
        wx.hideLoading()
        if (res.data.code == 0) {
          var orderDetail = res.data.orderDetail;
          var goodsList = res.data.goodsList;
          var addrBean = res.data.addrBean;
          that.setData({
            orderDetail: orderDetail,
            goodsList: goodsList,
            addrBean: addrBean,
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
        wx.showToast({
          icon: "none",
          title: '获取失败',
        })
      }
    })
  },

  //更改订单状态
  changeOrderState: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    let that = this;
    var openId = wx.getStorageSync("openId");
    var manId = wx.getStorageSync("manId") || wx.getStorageSync("stuId");
    var seqId = that.data.seqId;
    var orderState = e.currentTarget.dataset.orderState;
    wx.request({
      url: cyurl.ggddzt,
      data: {
        openId: openId,
        seqId: seqId,
        orderState: orderState,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("更改订单状态 res-->", res)
        if (res.data.code == 0) {
          wx.showToast({
            icon: "none",
            title: '操作成功',
          })
          setTimeout(function () {
            //订单详情
            that.getOrderList()
          }, 1500)
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        console.log("更改订单状态 fail -->", res)
        wx.showToast({
          icon: "none",
          title: "获取失败"
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("orderDetail options -->",options)
    let seqId = options.seqId;
    let sf = options.sf;
    this.setData({
      seqId: seqId,
      sf: sf,
    })
    this.getOrderList()
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

  },
  getGoods: function () {
    console.log("dianji")
  }

})