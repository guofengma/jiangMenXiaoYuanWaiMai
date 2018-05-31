import cyurl from "../../../utils/url";
var app = getApp();
var listTxt=[];
Page({
  data: {
    orderDaetail:{},
    goodsTotle: '',
    goodsTotles: '',
    select:false,
    userName:'',
    userAddr:'',
    telNumber:'',
    showToast:true,
    goodsId:'',
    freight:0,
    nums:0,
    array: [],
    couponTxt:'',
    couponList:[],
    ticketLimit:'',
    seqId:'',
    buyerRemark:''

  },

//获取优惠劵
  getCoupon: function (e) {
    var that = this;
    var openId = wx.getStorageSync("openId");
    var showToast = that.data.showToast;
    var goodsTotle = that.data.goodsTotle;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: cyurl.couponListUrl,
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          // 优惠劵的ticketTxt
          var couponList = res.data.list
          console.log(goodsTotle)
          listTxt=[]
          for (var i = 0; i < couponList.length; i++) {
            if (goodsTotle >= parseInt(couponList[i].ticketLimit)  ){
              listTxt.push(couponList[i].ticketTxt)
            }
            
          }
          
          console.log(listTxt)
          that.setData({
            couponList: couponList,
            array: listTxt,
        
          })
          if (showToast) {
            wx.hideLoading()
          }
        } else {
          wx.showToast({
            title:res.data.msg
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
 
// 不符合优惠劵的情况
  onCouponTab:function(e){
     wx.showModal({
       title: '提示',
       content: '暂无可用优惠劵',
       showCancel:false
     })
  },
  // 选择地址
  selAddress:function(e){
    console.log(e)
    var that=this;
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          userName: res.userName,
          userAddr: res.provinceName + res.cityName + res.detailInfo,
          telNumber: res.telNumber
        })
      }
    })
  },


  // 优惠劵
  toComposite:function(e){
    var that=this;
     var index=e.detail.value;
     console.log(index);
      var array=this.data.array;
      this.setData({
        couponTxt: array[index]
      })
      var goodsTotle = this.data.goodsTotles;
      var couponTxt = that.data.couponTxt;
      console.log(couponTxt)
      var seqId = '';
      var ticketMoney = '';
      var couponList = that.data.couponList;
      for (var i = 0; i < couponList.length; i++) {
        if (couponTxt == couponList[i].ticketTxt) {
          seqId = couponList[i].seqId;
          ticketMoney = couponList[i].ticketMoney;
        }
      }
      goodsTotle = goodsTotle - ticketMoney;
      goodsTotle = goodsTotle.toFixed(2);
      that.setData({
        seqId: seqId,
        goodsTotle: goodsTotle
      })
},
//卖家留言
  buyerRemarkTab:function(e){
    var buyerRemark=e.detail.value;
    console.log(buyerRemark);
    this.setData({
      buyerRemark: buyerRemark
    })
},


  //提交订单
  saveOrder:function(e){
    var that = this;
    var openId = wx.getStorageSync("openId");
    var goodsTotle = that.data.goodsTotle;
    var goodsId=that.data.goodsId;
    var showToast = that.data.showToast;
    var userAddr = that.data.userAddr;
    var receiveName = that.data.userName;
    var receivePhone = that.data.telNumber;
    var nums = that.data.nums;
    var freight = that.data.freight;
    var seqId = that.data.seqId;
    var buyerRemark = that.data.buyerRemark;

    console.log(goodsId)
    if (userAddr==''){
       wx.showModal({
         title: '提示',
         content: '收货地址不能为空',
         showCancel:false
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
      url: cyurl.saveGoodsUrl,
      data: {
        openId: openId,
        payWay:1,
        orderMoney: goodsTotle,
        goodsIds:goodsId,
        receiveName: receiveName,
        receivePhone: receivePhone,
        receiveAddr: userAddr,
        ticketId: seqId,
        orderFreight: freight,
        goodsNum: nums,
        buyerRemark: buyerRemark
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        console.log(res)
        if (showToast) {
          wx.hideLoading()
        }
        if (res.data.code == 0) {
          var paramMap = res.data.paramMap;
          that.weixinPaid(paramMap)
     
         
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
  } ,
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
          title: '支付失败'
        })
      },
      complete:function(){
        setTimeout(function () {
          wx.redirectTo({
            url: '../my/order/order',
          })
        }, 1500)
      }
    })
  },

  onLoad: function (options) {
    console.log("options -- >", options);
    var orderDaetail;
    if(options.orderDaetail){
      orderDaetail = JSON.parse(options.orderDaetail);
      console.log("orderDaetail -->", orderDaetail)
    }else{
      orderDaetail = wx.getStorageSync("orderDaetail");
      console.log("orderDaetail -->",orderDaetail)
    }
    
    if (options.freight=='null')
    {
      var freight=0.0
    }else{
      var freight = parseFloat(options.freight)  
    }

    
    if (options.totalPrice==undefined){
      var goodsTotle = 0;
    }else{
      var goodsTotle = parseFloat(options.totalPrice)   + freight;
    }
    console.log(goodsTotle)


   
    var goodsId=[];
    if(options.nums==undefined){
      var nums = 0;
    }else{
      var nums = options.nums;
    }

    for( var i=0;i<orderDaetail.length;i++){
      if (goodsTotle == 0){
        goodsTotle += orderDaetail[i].goodsPrice * orderDaetail[i].nums + freight;
      }
          console.log(goodsTotle)
     if(nums==0){
       nums += orderDaetail[i].nums;
     }  
      goodsId.push(orderDaetail[i].goodsId + '=' + orderDaetail[i].num);
        
    }
    

   goodsId=goodsId.join(",")
  
    
    goodsTotle=goodsTotle.toFixed(2);
    console.log('总价', goodsTotle)
    freight=freight.toFixed(2);
    console.log('运费', freight)
    this.setData({
      nums: nums,
      freight: freight,
      orderDaetail: orderDaetail,
      goodsTotle: goodsTotle,
      goodsTotles: goodsTotle,
      goodsId: goodsId
    })
    this.getCoupon()
  }

})