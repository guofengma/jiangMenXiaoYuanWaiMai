import cyurl from "../../../utils/url";
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },

  yhqzx(e) {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  wdyhq(e) {
    wx.navigateTo({
      url: '/pages/couponTew/couponTew',
    })
  },

  toAbout(e){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  //跳转商城订单
  toMallOrder: function () {
    wx.navigateTo({
      url: '/pages/mall/my/order/order',
    })
  },

  //跳转 我的发布
  toMyIssue:function(){
    wx.navigateTo({
      url: '/pages/citywide/myIssue/myIssue',
    })
  },

  //跳转到 我的店铺
  toMyStore:function(){
    // var MembWithdrawType = this.data.MembWithdrawType;
    // var storeId = this.data.storeId;
    var storeIsLogin = wx.getStorageSync("storeIsLogin");
    if (storeIsLogin == 1) {
      wx.navigateTo({
        url: '/pages/takeoutOrder/myStore/myStore',
      })
    } else {
      wx.navigateTo({
        url: '/pages/takeoutOrder/loginToStore/loginToStore',
      })
    }
  },

  //跳转 申请入驻
  toApplyEntry:function(){
     wx.navigateTo({
      url: '/pages/takeoutOrder/applyEntry/applyEntry',
    })
  },

  // 选择地址
  selAddressa: function (e) {
    console.log(e)
    var that = this;
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  selAddressb(e) {
    wx.navigateTo({
      url: '/pages/couponTew/couponTew',
    })
  },

  selAddressa:function(){
  wx.navigateTo({
    url: '/pages/deliveryAddress/deliveryAddress',
  })
},

  // selAddress: function (e) {
  //   console.log(e)
  //   var that = this;
  //   wx.chooseAddress({
  //     success: function (res) {
  //       console.log("选择地址 selAddress-->", res)
  //       that.setData({
  //         userName: res.userName,
  //         userAddr: res.provinceName + res.cityName + res.detailInfo,
  //         telNumber: res.telNumber
  //       })
  //     }
  //   })
  // },

  //跳转 配送员
  toDeliveryman:function(){
    let manId = wx.getStorageSync("manId")
    let stuId = wx.getStorageSync("stuId")
    if (manId || stuId){
      wx.navigateTo({
        url: '/pages/takeoutOrder/deliveryman/deliveryman',
      })
    }else{
      wx.navigateTo({
        url: '/pages/takeoutOrder/loginToDelivery/loginToDelivery',
      })
    }

    // if (MembWithdrawType == "storeDelivery") {
    //   wx.navigateTo({
    //     url: '/pages/takeoutOrder/deliveryman/deliveryman',
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/takeoutOrder/loginToDelivery/loginToDelivery',
    //   })
    // }

  },


  //推荐商家 切换
  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    })
  },

  //身份判定 校园配送员
  deliveryIdentity:function(){
    let that = this;
    var openId = wx.getStorageSync("openId");
    wx.request({
      url: cyurl.deliveryIdentity,
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("身份判定 校园配送员-->", res)
        if (res.data.code == 0) {
          var MembWithdrawType = "storeDelivery";
          that.setData({
            MembWithdrawType: MembWithdrawType
          });
          wx.setStorage({
            key: "MembWithdrawType",
            data: MembWithdrawType
          })
        } else {

        }
      },
      fail: function (res) {
        console.log("身份判定 校园配送员 失败 ",res)
      }
    })
  },

  //身份判定 校园门店管理
  storeIdentity: function () {
    var that = this;
    var openId = wx.getStorageSync("openId");
    wx.request({
      url: cyurl.storeIdentity,
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("身份判定 校园门店管理-->", res)
        if (res.data.code == 0) {
          var storeId = res.data.storeId;
          var MembWithdrawType = "storeMng";
          that.setData({
            storeId: storeId,
            MembWithdrawType: MembWithdrawType
          });
          wx.setStorage({
            key: "MembWithdrawType",
            data: MembWithdrawType
          })
          wx.setStorageSync("storeId", storeId)
        } else {

        }
      },
      fail: function (res) {
        console.log("身份判定 校园门店管理 失败 ", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    var that = this;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    });
    this.deliveryIdentity();
    // this.storeIdentity();
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
  onUnload: function () { },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
