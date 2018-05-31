import cyurl from "../../../utils/url";
//获取应用实例
const app = getApp()

Page({
  data: {
    orderList:[
      // {
      //   orderId:"1",
      //   orderSn:"10001",//订单编号
      //   orderPrice:"90",
      //   orderState:"1",
      //   orderFreight:"5",
      //   goodsNum:"3",
      //   ticketId:"",
      //   ticketTxt:"",
      //   orderStateTxt:"待付款",
      //   shopImg:"../../../images/店铺头像@2x.png",
      //   shopName: '肯德基',
      //   goodsList:[
      //     {
      //       goodsId:"101",
      //       goodsName:"超级外卖全家桶",
      //       goodsImg:"../../../images/店铺头像@2x.png../../../images/店铺头像@2x.png",
      //       goodsPrice: 45,
      //       goodsNum:1
      //     },
      //   ]
      // }
    ]
  

  },

  //  获取订单列表
  getOrderList: function (e) {
    var that = this;
    var openId = wx.getStorageSync("openId");
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',
      duration: 5000
    })
    wx.request({
      url: cyurl.orderListUrl,
      data: {
        openId: openId,
        busiType:"xyTakeout"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("订单列表-->",res)
        if (res.data.code == 0) {
          var orderList = res.data.orderList;

          that.setData({
            orderList: orderList
          })
          wx.hideLoading()
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败'
        })
      },
      complete:function(){
       
      }
    })
  },

  //收货
  changeOrderState: function (e) {
    var that = this;
    var openId = wx.getStorageSync("openId");
    var orderId = e.currentTarget.dataset.orderid;
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',
      duration: 5000
    })
    wx.request({
      url: cyurl.changeOrderState,
      data: {
        openId: openId,
        busiType: "xyTakeout",
        orderState:4,
        seqId: orderId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("收货  -->", res)
        if (res.data.code == 0) {
          wx.hideLoading()
          wx.showToast({
            icon:"none",
            title:"操作成功",
          })
          setTimeout(()=>{
            that.getOrderList()
          },2000)
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },

  //取消订单
  orderCencel:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.orderid;
    var openId = wx.getStorageSync("openId")
    wx.showModal({
      title: '提示',
      content: '确认取消订单？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '正在加载',
            icon: 'loading',
            duration: 5000
          })
          wx.request({
            url: cyurl.orderCencelUrl,
            data: {
              orderId: orderId,
              openId: openId,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.hideLoading();
              console.log("取消订单-->", res)
              if (res.data.code == 0) {
                wx.showToast({
                  title: '操作成功',
                })
                setTimeout(()=>{
                  that.getOrderList();
                },2000)
              } else {
                wx.showToast({
                  icon:"none",
                  title: res.data.msg,
                })
              }
            },
            fail: function (res) {
              wx.hideLoading();
              wx.showToast({
                icon:"none",
                title: '加载失败'
              })
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //跳转订单详情
  toMyOrdrerDetail(e){
    let seqId = e.currentTarget.dataset.seqId;
    wx.navigateTo({
      url: '/pages/takeoutOrder/myOrderDetail/myOrderDetail?seqId=' + seqId,
    })
  },

  //支付订单
  payOrder:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.orderid;
    let openId = wx.getStorageSync("openId");
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',
      duration: 5000
    })
    wx.request({
      url: cyurl.payOrder,
      data: {
        orderId: orderId,
        openId: openId
      },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("订单支付-->", res)
        if (res.data.code == 0) {
          
          //调用微信支付
          var paramMap = res.data.paramMap;
          that.weixinPaid(paramMap);

        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },

  //跳转订单评价
  toOrderComment:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../orderComment/orderComment?orderId='+orderId,
    })
  },

  //获取店铺详情
  storeInfo: function (seqId) {
    var that = this;
    var seqId = seqId;
    wx.request({
      url: cyurl.storeinfo,
      data: {
        seqId: seqId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("店铺详情-->", res)
        if (res.data.code == 0) {
          var storeImg = res.data.bean.storeImg;
          var storeName = res.data.bean.storeName;
          
          return {
            storeImg: storeImg,
            storeName: storeName
          }
        } else {

        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  // 微信支付
  weixinPaid: function (paramMap) {
    wx.requestPayment({
      'timeStamp': paramMap.timeStamp,
      'nonceStr': paramMap.nonceStr,
      'package': paramMap.package,
      'signType': 'MD5',
      'paySign': paramMap.paySign,
      success: function (res) {
        wx.showToast({
          title: '支付成功'
        })
      },
      fail: function () {
        wx.showToast({
          icon:"none",
          title: '支付失败'
        })
      },
      complete:function(){
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/takeoutOrder/order/order',
          })
        }, 1500)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     app.editTabBar();
     this.getOrderList(); //获取订单列表
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    that.getOrderList(); 
    wx.stopPullDownRefresh()    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

})
