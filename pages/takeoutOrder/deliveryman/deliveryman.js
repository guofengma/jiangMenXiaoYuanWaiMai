// pages/takeoutOrder/deliveryman/deliveryman.js
import cyurl from "../../../utils/url";
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sf:"",  // stu  pt
    wxImg:"",
    storeId: "",
    isWork: "",
    groupList: {},
    //下拉
    open: false,
    //订单切换
    orderState: ['新订单', '待送达', '已送达'],
    currentTab: 0,

    //配送员基本信息
    manName: '王维权',
    SumorderNum: 50, //单数
    buildNames: "11栋、12栋",
    listOrderList: [
      {
        orderSn: 8534,
        createTime: 11,
        storeName: '好莱得餐厅',
        storeAddr: '江门冯江区迎宾大道4巷158号', orderBuildManName: '曾四季',
        orderBuildName: '五邑大学11栋'
      },
    ],
    //已送达列表信息
    orderDate: "今日",
    ordersNum: "40",
    xddlist: [],
    dsdlist:[],
    ysdOrderList:[],
    list: [
      {
        serialNumber: 46587612921,
        orderTime: "07:10"
      },
      {
        serialNumber: 46587612921,
        orderTime: "07:10"
      }
    ],
    userLa: "",
    userLg:"",
  },

  logout:function(e){
    wx.removeStorageSync("manId")
    wx.removeStorageSync("stuId")
    wx.redirectTo({
      url: '/pages/takeoutOrder/my/my',
    })
  },

  //更改订单状态
  changeOrderState:function(e){
    console.log("test")
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    let that = this;
    var openId = wx.getStorageSync("openId");
    var manId = wx.getStorageSync("manId") || wx.getStorageSync("stuId");
    var seqId = e.currentTarget.dataset.seqId;
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
            icon:"none",
            title: '操作成功',
          })
          setTimeout(function(){
            //我的新订单
            that.getOrderList(2, 'xdd')
            //我的待送达订单
            that.getOrderList(3, 'dsd')
            //已送达订单
            that.getYsdOrderList();
          },1500)
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

  //获取配送员基本信息
  storedeliveryman: function () {
    var that = this;
    var openId = wx.getStorageSync("openId");
    var manId = wx.getStorageSync("manId") || wx.getStorageSync("stuId");
    wx.request({
      url: cyurl.storedeliveryman,
      data: {
        openId: openId,
        seqId: manId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("获取配送员基本信息 res-->", res)
        if (res.data.code == 0) {
          var bean = res.data.bean;
          var schoolName = res.data.schoolName;
          var sumorderNum = res.data.sumorderNum;
          var isWork = res.data.isWork;
          var isToShop = res.data.isToShop;
          var orderNum = res.data.orderNum;
          var buildNames = res.data.buildNames;
          var orderMoney = res.data.orderMoney;
          var manName = res.data.manName;
          var sumMoney = res.data.sumMoney;
          that.setData({
            bean: bean,
            schoolName: schoolName,
            sumorderNum: sumorderNum,
            isWork: isWork,
            orderNum: orderNum,
            buildNames: buildNames,
            orderMoney: orderMoney,
            manName: manName,
            sumMoney: sumMoney,
            isToShop: isToShop,
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        console.log("获取配送员基本信息 fail -->", res)
        wx.showToast({
          icon: "none",
          title: "获取配送员信息失败"
        })
      } 
    })
  },

  //获取配送员订单列表
  getOrderList: function (orderState,name) {
    var that = this;
    var openId = wx.getStorageSync("openId");
    var manId = wx.getStorageSync("manId") || wx.getStorageSync("stuId");
    var userLa = that.data.userLa;
    var userLg = that.data.userLg;
    wx.request({
      url: cyurl.myPsOrderList,
      data: {
        openId: openId,
        manId: manId,
        orderState: orderState,
        userLa: userLa,
        userLg: userLg,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("获取配送员订单列表 res-->", res)
        if (res.data.code == 0) {
          var list = res.data.orderList;
          that.setData({
            [name + 'list']: list,
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        console.log("获取配送员订单列表 fail -->", res)
        wx.showToast({
          icon: "none",
          title: "获取失败"
        })
      }
    })
  },

  //获取配送员已送达订单列表
  getYsdOrderList: function () {
    var that = this;
    var openId = wx.getStorageSync("openId");
    var manId = wx.getStorageSync("manId") || wx.getStorageSync("stuId");
    wx.request({
      url: cyurl.ysdOrderList,
      data: {
        openId: openId,
        manId: manId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("获取配送员已送达订单列表 res-->", res)
        if (res.data.code == 0) {
          var list = res.data.list;
          that.setData({
            ysdOrderList: list,
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        console.log("获取配送员已送达订单列表 fail -->", res)
        wx.showToast({
          icon: "none",
          title: "获取失败"
        })
      }
    })
  },

  //跳转我的收益
  toIncome: function () {
    let manName = this.data.manName;
    wx.navigateTo({
      url: '/pages/mall/mylncome/mylncome?manName=' + manName,
    })
  },

  //送达提醒
  toRemind: function () {
    wx.navigateTo({
      url: '/pages/takeoutOrder/orderRemind/orderRemind',
    })
  },
  //订单详情
  toOrderDetail: function (e) {
    let that = this;
    let sf = that.data.sf
    let seqId = e.currentTarget.dataset.seqId
    wx.navigateTo({
      url: '/pages/takeoutOrder/orderDetail/orderDetail?seqId=' + seqId + '&sf=' + sf,
    })
  },


  //订单切换
  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    })
  },

  //已送达下拉列表
  showitem: function () {
    this.setData({
      open: !this.data.open
    })
  },

  call(e){
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  //接单开关  接单设置
  setWork: function (e) {
    console.log(e.detail.value)
    let isWork = e.detail.value?1:0;
    let openId = wx.getStorageSync("openId")
    let manId = wx.getStorageSync("manId") || wx.getStorageSync("stuId");

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: cyurl.jdSet,
      data: {
        openId: openId,
        seqId: manId,
        isWork: isWork,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        console.log("接单设置 -->", res)
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          
        } else {
          // that.setData({
          //   isWork:
          // })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          icon:"none",
          title: '设置失败',
        })
      }
    })

  },

  //获取当前位置经纬度
  getLocation(e){
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log("获取当前位置经纬度 res-->",res);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        that.setData({
          userLa: latitude,
          userLg: longitude,
        })
        //我的新订单
        that.getOrderList(2, 'xdd')
        //我的待送达订单
        that.getOrderList(3, 'dsd')
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.storedeliveryman()
    let wxImg = wx.getStorageSync("userInfo").avatarUrl
    this.setData({
      wxImg: wxImg
    })

    //身份
    let manId = wx.getStorageSync("manId");
    let stuId = wx.getStorageSync("stuId");
    if (manId){
      that.setData({
        sf:"pt"
      }) 
    }else{
      that.setData({
        sf: "stu"
      })
    }

    
    //我的已送达订单
    this.getYsdOrderList()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { 
    let that = this;
    this.storedeliveryman()
    //我的新订单
    that.getOrderList(2, 'xdd')
    //我的待送达订单
    that.getOrderList(3, 'dsd')
    //已送达订单
    that.getYsdOrderList();
    wx.stopPullDownRefresh()   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

})