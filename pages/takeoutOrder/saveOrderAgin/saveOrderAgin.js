import cyurl from "../../../utils/url";
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showToast:true,
    buyerRemark: "",//买家留言
    usePersonNum: 0,//用餐人数
    orderInfo:{
      "storeImg": "../../../images/1@2x.png", "storeName": "广东肯德基东圃餐厅 ", "totPrice": 94, "totNmu": 2, deliveryFee:5,"storeId":""
    },
    cartData:[
      // { "num": 1, "productDetail": { "claId": "1", "foodImg": "../../../images/组3@2x.png", "foodName": "超级外卖全家桶", "foodPrice": 45, "claNum": 1, "claSale": 568, "foodSaleNum": 0, "seqId": 1 } }
      ],
    addrId:0,
    storeId:0,
    aginAddrSeqId:"",
  },

  //获取地址列表
  getAddrList: function () {
    var that = this;
    var openId = wx.getStorageSync("openId");
    var aginAddrSeqId = that.data.aginAddrSeqId
    wx.request({
      url: cyurl.listAdress,
      data: {
        openId: openId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("获取地址列表 -->",res)
        let addrList = res.data.list
        that.setData({
          addrList: addrList
        })
        //设置第0个地址为收货地址
        wx.setStorageSync('schoolName', addrList[0].schoolName)
        wx.setStorageSync('buildingName', addrList[0].buildingName)
        wx.setStorageSync('addrDetail', addrList[0].addrDetail)
        wx.setStorageSync('linker', addrList[0].linker)
        wx.setStorageSync('linkerPhone', addrList[0].linkerPhone)
        wx.setStorageSync('schoolId', addrList[0].schoolId)
        wx.setStorageSync('addrSeqId', addrList[0].seqId)
        for(var i in addrList){
          if (addrList[i].seqId == aginAddrSeqId){
            wx.setStorageSync('schoolName', addrList[i].schoolName)
            wx.setStorageSync('buildingName', addrList[i].buildingName)
            wx.setStorageSync('addrDetail', addrList[i].addrDetail)
            wx.setStorageSync('linker', addrList[i].linker)
            wx.setStorageSync('linkerPhone', addrList[i].linkerPhone)
            wx.setStorageSync('schoolId', addrList[i].schoolId)
            wx.setStorageSync('addrSeqId', addrList[i].seqId)
          }
        }
        this.getAddressData();
      }
    })
  },

  // 选择地址
  selAddress: function (e) {
    console.log(e)
    var that = this;

    wx.navigateTo({
      url: '../../deliveryAddress/deliveryAddress?fromPage=order',
    })
    // wx.chooseAddress({
    //   success: function (res) {
    //     console.log("选择地址 selAddress-->",res)
    //     that.setData({
    //       userName: res.userName,
    //       userAddr: res.provinceName + res.cityName + res.detailInfo,
    //       telNumber: res.telNumber
    //     })
    //   }
    // })
  },

  // getAddrList:function(e){
  //   let that = this;
  //   let openId = wx.getStorageSync("openId")
  //   wx.showLoading({
  //     mask:true,
  //     title: '加载中',
  //   })
  //   wx.request({
  //     url: cyurl.createTakeoutOrder,
  //     data: {
  //       openId: openId,
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success: function (res) {
  //       console.log("提交订单", res)
  //       wx.hideLoading()
  //       if (res.data.code == 0) {
  //         let list = res.data.list;
  //         that.setData({
  //           list: list
  //         })
  //       } else {
  //         wx.showToast({
  //           icon: "none",
  //           title: res.data.msg
  //         })
  //       }
  //     },
  //     fail: function (res) {
  //       wx.hideLoading()
  //       wx.showToast({
  //         icon:"none",
  //         title: '加载失败'
  //       })
  //     }
  //   })
  // },

  //买家留言
  leaveMsg:function(e){
    this.setData({
      buyerRemark: e.detail.value
    })
  },

  //用餐人数
  usePersonNum:function(e){
    this.setData({
      usePersonNum: e.detail.value
    })
  },

  //提交订单
  // saveOrder: function (e) {
  //   var that = this;
  //   var showToast = that.data.showToast;
  //   var openId = wx.getStorageSync("openId");
  //   var cartData = that.data.cartData;
  //   var orderInfo = that.data.orderInfo;
  //   //商品编号组合,用逗号隔开
  //   var goodsIds = "";
  //   for(var i in cartData){
  //     goodsIds += cartData[i].productDetail.seqId+',';
  //   }
  //   goodsIds = goodsIds.substring(0, goodsIds.length - 1)
  //   var busiType = "xyTakeout";
  //   var takeoutType = 1;  //用餐方式	takeoutType	1-外卖 2-到店
  //   var orderMoney = orderInfo.totPrice //订单金额	orderMoney
  //   var receiveName = that.data.userName  //收货人	receiveName
  //   var receivePhone = that.data.telNumber //收货人电话	receivePhone
  //   var receiveAddr = that.data.userAddr//收货地址	receiveAddr
  //   var orderFreight = orderInfo.deliveryFee //配送费	orderFreight
  //   var goodsNum = orderInfo.totNmu;
  //   var usePersonNum = that.data.usePersonNum;
  //   var buyerRemark = that.data.buyerRemark; //买家留言
  //   var storeId = orderInfo.storeId;

  //   if (!receiveAddr || receiveAddr == '') {
  //     wx.showModal({
  //       title: '提示',
  //       content: '收货地址不能为空',
  //       showCancel: false
  //     })
  //     return
  //   }
  //   if (showToast) {
  //     wx.showLoading({
  //       title: '正在加载',
  //       icon: 'loading',
  //       duration: 10000
  //     })
  //   }
  //   wx.request({
  //     url: cyurl.saveWmOrder,
  //     data: {
  //       goodsIds: goodsIds,
  //       openId: openId,
  //       busiType:busiType,
  //       takeoutType:takeoutType,
  //       orderMoney:orderMoney,
  //       receiveName:receiveName,
  //       receivePhone:receivePhone,
  //       receiveAddr:receiveAddr,
  //       orderFreight:orderFreight,
  //       goodsNum:goodsNum,
  //       usePersonNum:usePersonNum,
  //       buyerRemark:buyerRemark,
  //       storeId:storeId,
  //       addrId: wx.getStorageSync("addrSeqId")
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success: function (res) {
  //       console.log("提交订单",res)
  //       if (res.data.code == 0) {

  //         //调用微信支付
  //         var paramMap = res.data.paramMap;
  //         that.weixinPaid(paramMap);

  //         // wx.navigateTo({
  //         //   url: '../order/order',
  //         // })

  //       } else {
  //         wx.showToast({
  //           title: res.data.msg
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

  //提交订单
  saveOrder: function (e) {
    var that = this;
    var showToast = that.data.showToast;
    var openId = wx.getStorageSync("openId");
    var cartData = that.data.cartData;
    var orderInfo = that.data.orderInfo;
    //商品编号组合,用逗号隔开
    var goodsIds = "";
    for(var i in cartData){
      goodsIds += cartData[i].productDetail.seqId + '=' + cartData[i].num+',';
    }
    goodsIds = goodsIds.substring(0, goodsIds.length - 1)
    var busiType = "xyTakeout";
    var takeoutType = 1;  //用餐方式  takeoutType 1-外卖 2-到店
    var orderMoney = orderInfo.totPrice //订单金额  orderMoney
    var receiveName = that.data.userName  //收货人 receiveName
    var receivePhone = that.data.telNumber //收货人电话  receivePhone
    var receiveAddr = that.data.userAddr//收货地址  receiveAddr
    var orderFreight = orderInfo.deliveryFee //配送费  orderFreight
    var goodsNum = orderInfo.totNmu;
    var usePersonNum = that.data.usePersonNum;
    var buyerRemark = that.data.buyerRemark || ""; //买家留言
    var storeId = orderInfo.storeId;
    var addrId=wx.getStorageSync("addrSeqId")

    if (!receiveAddr || receiveAddr == '') {
      wx.showModal({
        title: '提示',
        content: '收货地址不能为空',
        showCancel: false
      })
      return
    }
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: cyurl.saveWmOrder,
      data: {
        goodsIds: goodsIds,
        openId: openId,
        busiType:busiType,
        takeoutType:takeoutType,
        orderMoney:orderMoney,
        receiveName:receiveName,
        receivePhone:receivePhone,
        receiveAddr:receiveAddr,
        orderFreight:orderFreight,
        goodsNum:goodsNum,
        // usePersonNum:usePersonNum,
        buyerRemark:buyerRemark,
        storeId:storeId,
        addrId: addrId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("提交订单",res)
        if (showToast) {
          wx.hideLoading()
        }
        if (res.data.code == 0) {

          //调用微信支付
          var paramMap = res.data.paramMap;
          that.weixinPaid(paramMap);

          // wx.navigateTo({
          //   url: '../order/order',
          // })

        } else {
          wx.showToast({
            title: res.data.msg
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
        setTimeout(function () {
          wx.navigateTo({
            url: '../order/order',
          })
        }, 1500)
      },
      fail: function (res) {
        console.log("支付失败 -->",res)
        wx.showToast({
          title: '支付失败'
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../order/order',
          })
        }, 1500)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // var orderInfo = JSON.parse(options.orderInfo);
    // var cartData = JSON.parse(options.cartData);
    var cartData = wx.getStorageSync("aginCartData");
    var orderInfo = wx.getStorageSync("aginOrderInfo");
      
      console.log("orderInfo-->",orderInfo);
      console.log("cartData-->",cartData);
      this.setData({
        orderInfo: orderInfo,
        cartData: cartData
      })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    //取到缓存的数据
    //let schoolName = wx.getStorageSync("schoolName");
    //console.log("storage:",schoolName);
    let aginAddrSeqId = wx.getStorageSync("aginAddrSeqId")
    this.setData({
      aginAddrSeqId: aginAddrSeqId
    })
    this.getAddrList();
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

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


  getAddressData:function(){
    var schoolName= wx.getStorageSync('schoolName')
    var buildingName = wx.getStorageSync('buildingName')
    var addrDetail = wx.getStorageSync('addrDetail')
    var linker = wx.getStorageSync('linker',)
    var linkerPhone = wx.getStorageSync('linkerPhone')
    var schoolId = wx.getStorageSync('schoolId')
    var seqId = wx.getStorageSync('seqId')

    this.setData({
      addrId:seqId,
      userName:linker,
      telNumber:linkerPhone,
      userAddr: schoolName + buildingName + addrDetail
    })

    console.log("userName:",linker,", phone:",linkerPhone,", userAddr:", addrDetail)
  }
})