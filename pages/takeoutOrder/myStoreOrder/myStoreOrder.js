// pages/takeoutOrder/myStoreOrder/myStoreOrder.js
import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    showten:true,
    storeId:'',
    title: "日期",
    beginDate:"4月25日",//开始日期
    endDate:"5月25日",//结束日期
    orderNum: 0,//总单数
    orderMoney: 0, //总金额
    orderList: [
      // {
      //   headImg:"/images/头像4@2x.png",
      //   name:"无所畏惧",
      //   time: "2017-12-25 12:25:23",
      //   orderNumber: 123256765438565,
      //   orderMoney: 16
      // },
      // {
      //   headImg: "/images/头像4@2x.png",
      //   name: "无所畏惧",
      //   time: "2017-12-25 12:25:23",
      //   price: 90,
      //   orderNumber: 123256765438565,
      //   orderMoney: 16
      // }
    ]
  },

  // realnameConfirm: function (e) {
  //   var that = this;
  //   that.setData({
  //     realname: e.detail.value
  //   })
  // },

//获取开始、结束日期
  bindBeginDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beginDate: e.detail.value
    })

     // 查询数据
    this.searchOrder();
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })

    //查询数据
    this.searchOrder();

  },

  //查询销售明细
  searchOrder : function(){
    let that = this;
    var openId = wx.getStorageSync("openId");
    console.log("listTaketouByDate, openId:", openId)
    console.log("storeId:", this.data.storeId);
    console.log("beginDate:", this.data.beginDate);
    console.log("endDate:", this.data.endDate);
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.listTakeoutByDate,
      data: {
        openId: openId,
        storeId: wx.getStorageSync("storeId"),
        beginDate: this.data.beginDate,
        endDate: this.data.endDate
      },
      header: {
        'content-type': 'application/json'
      },
      // method:"POST",
      success: function (res) {
        wx.hideLoading()
        console.log("销售明细列表-->", res)
        if (res.data.code == '0') {
          // var orderNum = ser.data.orderNum,
          // var orderMoney = ser.data.orderMoney
          that.setData({
            orderList: res.data.orderList,
            orderNum: res.data.orderNum,
            orderMoney: res.data.orderMoney,
            showten:false
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          icon:'none',
          title: "获取失败",
        })
      },
      complete: function (res) {

      }
    })
  },


  //门店所有订单
  // listTakeoutByMonth:function(){
  //   var that = this;
  //   var openId = wx.getStorageSync("openId");
  //   var storeId = that.data.storeId;
  //   wx.showLoading({
  //     title: '正在加载',
  //     icon: 'loading',
  //     duration: 5000
  //   })
  //   wx.request({
  //     url: cyurl.storeAllOrder,
  //     data: {
  //       openId: openId,
  //      storeId:storeId
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log("门店所有订单-->",res)
  //       if (res.data.code == 0) {
  //         var orderList = res.data.list;

  //         that.setData({
  //           orderList: orderList
  //         })
  //         wx.hideLoading()
  //       } else {
  //         wx.showToast({
  //           title: res.data.msg,
  //         })
  //       }
  //     },
  //     fail: function (res) {
  //       wx.showToast({
  //         title: '加载失败'
  //       })
  //     }
  //   })
  // },

  //获取最新十条销售记录
  getTenLog(){
    let that = this;
    //发送请求数据
    wx.request({
      url: cyurl.storeTenLog,
      data: {
        storeId: wx.getStorageSync("storeId"),
      },
      header: {
        'content-type': 'application/json'
      },
      // method:"POST",
      success: function (res) {
        console.log("获取最新十条销售记录 -->", res)
        if (res.data.code == '0') {
          // var orderNum = ser.data.orderNum,
          // var orderMoney = ser.data.orderMoney
          that.setData({
            orderList: res.data.list,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;

    //获取当前时间
    let nowDate = currentdate;
    var storeId = wx.getStorageSync("storeId");
    // var orderNum = options.orderNum;
    // var orderMoney = options.orderMoney;
    this.setData({
      storeId:storeId,
      beginDate:nowDate,
      endDate:nowDate,
      // orderNum: orderNum,
      // orderMoney: orderMoney
    });
    // this.getTenLog();
    //查询数据
    this.searchOrder();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //查询数据
    this.searchOrder();
    wx.stopPullDownRefresh()  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},


})