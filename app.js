//app.js
import cyurl from "utils/url";
import cyutil from 'utils/util.js'
App({
  onLaunch: function () {

    // //获取openId
    cyutil.getOpenId();


  },
  editTabBar: function (num) {
    var num = num || "tabbar";
    var tabbar = this.globalData[num],
      //getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
      currentPages = getCurrentPages(),
      _this = currentPages[currentPages.length - 1],
      pagePath = _this.__route__;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },

  globalData: {
    userInfo: null,
    wxOpenId: '',
    //外卖导航
    tabbar: {
      color: "#666",
      selectedColor: "red",
      backgroundColor: "#FFFFFF",
      borderStyle: "#DCDCDC",
      list: [
        {
          pagePath: "/pages/takeoutOrder/index/index",
          text: "首页",
          iconPath: "/images/public/home.png",
          selectedIconPath: "/images/public/home_act.png",
          selected: true
        },
        {
          pagePath: "/pages/takeoutOrder/order/order",
          text: "外卖订单",
          iconPath: "/images/public/order.png",
          selectedIconPath: "/images/public/order_act.png",
          selected: false
        },
        {
          pagePath: "/pages/takeoutOrder/my/my",
          text: "我的",
          iconPath: "/images/public/user.png",
          selectedIconPath: "/images/public/user_act.png",
          selected: false
        },
      ],
      position: "bottom"
    },
    //商城导航
    tabbar2: {
      color: "#666",
      selectedColor: "red",
      backgroundColor: "#FFFFFF",
      borderStyle: "#DCDCDC",
      list: [
        {
          pagePath: "/pages/mall/index/index",
          text: "首页",
          iconPath: "/images/public/home.png",
          selectedIconPath: "/images/public/home_act.png",
          selected: true
        },
        {
          pagePath: "/pages/mall/cart/cart",
          text: "购物车",
          iconPath: "/images/shop/cart.png",
          selectedIconPath: "/images/shop/cart_act.png",
          selected: false
        },
        {
          pagePath: "/pages/mall/my/my",
          text: "我的",
          iconPath: "/images/public/user.png",
          selectedIconPath: "/images/public/user_act.png",
          selected: false
        },
      ],
      position: "bottom"
    },
    //同城 信息发布 导航
    tabbar3: {
      color: "#666",
      selectedColor: "red",
      backgroundColor: "#FFFFFF",
      borderStyle: "#DCDCDC",
      list: [
        {
          pagePath: "/pages/citywide/index/index",
          text: "首页",
          iconPath: "/images/public/home.png",
          selectedIconPath: "/images/public/home_act.png",
          selected: true
        },
        {
          pagePath: "/pages/citywide/issue/issue",
          text: "发布",
          iconPath: "/images/public/issue.png",
          selectedIconPath: "/images/public/issue.png",
          selected: false
        },
        {
          pagePath: "/pages/citywide/my/my",
          text: "我的",
          iconPath: "/images/public/user.png",
          selectedIconPath: "/images/public/user_act.png",
          selected: false
        },
      ],
      position: "bottom"
    },
  },
  //提交用户信息
  getMember: function (e) {
    var that = this;
    console.log(that.wxOpenId);
    console.log(that.globalData.userInfo.avatarUrl);
    console.log(that.globalData.userInfo.nickName);
    console.log(that.globalData.userInfo.gender);
    wx.request({
      url: cyurl.saveMember,
      method: 'POST',
      data: {
        openId: wx.getStorageSync("openId"),
        wxImg: that.globalData.userInfo.avatarUrl,
        mbName: that.globalData.userInfo.nickName,
        mbSex: that.globalData.userInfo.gender
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('openId', res)
      },
      fail: function (rej) {
        console.log('openId', rej)
      },
      complete: function (com) {
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData && this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
          that.getMember()
        }
      })
    }
  },

})