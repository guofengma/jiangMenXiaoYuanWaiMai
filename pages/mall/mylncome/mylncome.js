import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yf:"",
    sf: '',   // "pt"   "stu"
    manName: '王维权',
    sumOrderNum:50,
    orderMoney:1000,
    list:[
      // { 
      //   orderMonth: 5, 
      //   orderNum: 200, 
      //   orderMoney:500
      //   },
      // {
      //   orderMonth: 5,
      //   orderNum: 200,
      //   orderMoney: 500
      // },
      // { 
      //   orderMonth: 5, 
      //   orderNum: 200, 
      //   orderMoney:500
      //   },
    ],
    yfArr: [1,2,3,4,5,6,7,8,9,10,11,12],
  },

  bindyf: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      yf: e.detail.value
    })
    this.getxssy();
  },

  //学生配送员的收益
  getxssy:function(e){
    let that = this;
    let openId = wx.getStorageSync("openId")
    let manId = wx.getStorageSync("stuId")
    let yf = that.data.yf;
    let orderYear = yf.split('-')[0];
    let orderMonth = yf.split('-')[1];
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.getxssr,
      data: {
        openId: openId,
        manId: manId,
        orderYear: orderYear,
        orderMonth: orderMonth
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("平台配送员我的收益 -->", res)
        wx.hideLoading()
        if (res.data.code == 0) {
          var list = res.data.list;
          var nowOrderNum = res.data.nowOrderNum;
          var nowOrderMoney = res.data.nowOrderMoney;
          that.setData({
            list: list,
            nowOrderNum: nowOrderNum,
            nowOrderMoney: nowOrderMoney,
          })
        } else {

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

  //7.2.7平台配送员我的收益
  getWdsy: function (e) {
    var that = this;
    let openId = wx.getStorageSync("openId")
    let manId = wx.getStorageSync("manId")
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.wdsy,
      data: {
        openId: openId,
        manId: manId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("平台配送员我的收益 -->", res)
        wx.hideLoading()
        if (res.data.code == 0) {
          var list = res.data.list;
          var orderNum = res.data.orderNum;
          var sumOrderNum = res.data.sumOrderNum;
          var orderMoney = res.data.orderMoney;
          that.setData({
            list: list,
            orderNum: orderNum,
            sumOrderNum: sumOrderNum,
            orderMoney: orderMoney,
          })
        } else {

        }
      },
      fail: function (res) {
        wx.hideLoading()
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
    let manName = options.manName;
    let wxImg = wx.getStorageSync("userInfo").avatarUrl
    this.setData({
      manName: manName,
      wxImg: wxImg
    })
    let that = this;
    //身份
    let manId = wx.getStorageSync("manId");
    let stuId = wx.getStorageSync("stuId");
    if (manId) {
      that.setData({
        sf: "pt"
      })
      this.getWdsy()      
    } else {
      that.setData({
        sf: "stu"
      })
    }

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