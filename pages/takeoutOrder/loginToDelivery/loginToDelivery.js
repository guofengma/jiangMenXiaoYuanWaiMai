// pages/takeoutOrder/loginToDelivery/loginToDelivery.js
import cyurl from "../../../utils/url";

var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      is_show: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      is_show:false,
      last_time:countdown
    })

    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }, 1000)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    manPhone:"",
    manPwd:"",
    countdown:60,
    last_time:'',
    is_show:true
  },

  getCode:function(){
    var that = this;
 // 将获取验证码按钮隐藏60s，60s后再次显示
      that.setData({
        is_show: (!that.data.is_show)   //false
      })
      settime(that);
  },

  //保存用户输入的信息,通过参数来识别
  saveInput: function (e) {
    var value = e.detail.value;
    var str = e.currentTarget.dataset.str;
    var obj = {
      [str]: value
    }
    this.setData(obj);
  },

  //配送员登录
  deliveryLogin:function(){
    var openId = wx.getStorageSync("openId");
    var manPhone = this.data.manPhone;
    var manPwd = this.data.manPwd;
    if (manPhone.trim() == '' || manPwd.trim() == '') {
      wx.showToast({
        title: '请输入完整信息'
      })
      return false;
    }

    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.deliveryLogin,
      data: {
        manPhone: manPhone,
        manPwd: manPwd,
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("配送员登录-->", res)
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          let manId = res.data.manId;
          let stuId = res.data.stuId;
          if (manId){
            wx.setStorageSync("manId", manId)            
          }
          if (stuId){
            wx.setStorageSync("stuId", stuId)
          }
          wx.redirectTo({
            url: '/pages/takeoutOrder/deliveryman/deliveryman',
          })
        } else {
          // wx.showToast({
          //   title: res.data.msg,
          // })
          wx.showModal({
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              // if (res.confirm) {
              //   console.log('用户点击确定')
              // } else if (res.cancel) {
              //   console.log('用户点击取消')
              // }
            }
          })

        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.saveInput);
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})