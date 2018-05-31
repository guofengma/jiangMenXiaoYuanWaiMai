import cyurl from "../../../utils/url";
var app = getApp();
var WxParse = require('../wxParse/wxParse.js');
var cart=[];
var userCart = []/*首先定义全局本地存储的购物车数据*/
Page({
  data: {
    selType: 0,
    nums: 1,
    add_pres: 10,
    goodsId: '',
    goodsEvaluate:[],
    goodsDetail:[],
    goodsStock:'',
    selected:true,
    goodsNums:0,
		visitLog: [],
		membList: [{ noticeDetail: "晚上好" }, { noticeDetail: "晚上好" }, { noticeDetail: "晚上好" }, ],
    goodsSwiperImgs: [],//商品轮播图
    goodsParamList: [],
    evaList:[
      {
        mbName:"小白白又白",
        wxImg:"https://storage.360buyimg.com/i.imageUpload/6c697975646f6e6736363631353032323630313138383339_sma.jpg",
        evaLevel:4,
        evaContent:"哎哟，不错哦，厉害了，惹不起惹不起。卡的要死 买来一个星期多没怎么用    刚开始是很好使    现在用着用着屏幕死机了 按啥啥不好使  很无助啊",
        createTime:"2017-10-25"
      }
    ],
    commentunm:996,
    storeId:3,//商品所属店铺id
    spName:"联想电脑旗舰店",
    storeGoodsNum:50,
    spImg:"/images/shop/lenovo.png"

  },

  // 商品详情
  getGoodsDetail: function (e) {
    var that = this;
    var goodsId = that.data.goodsId;
    wx.showNavigationBarLoading();
    wx.request({
      url: cyurl.goodsDetailUrl,
      data: {
        goodsId: goodsId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('商品详情 ---->',res)
        if (res.data.code == 0) {
          var goodsDetail = res.data.goodsDetail;

          var evaList = res.data.evaList;//商品评价列表
          var goodsEvaluate = res.data.goodsEvaluate;
          //商品参数列表 sku
          var goodsParamList = res.data.goodsParamList;
          //轮播图
          var goodsSwiperImgs = [];
          for (var i = 0; i < res.data.goodsSwiperImgs.length;i++){
            goodsSwiperImgs.push(res.data.goodsSwiperImgs[i].imgPath);
          }
          for (var i = 0; i < res.data.goodsSwiperImgs.length; i++) {
            goodsSwiperImgs.push(res.data.goodsSwiperImgs[i].imgPath);
          }
          var allEvaluate = parseInt(goodsEvaluate.goodNum)  + 
            parseInt(goodsEvaluate.middleNum) + 
            parseInt(goodsEvaluate.badNum);
          var insertData = res.data.goodsDetail.goodsDetail;
          WxParse.wxParse('insertData', 'html', insertData, that)
          that.setData({
            evaList: evaList,
            goodsStock: goodsDetail.goodsStock,
            goodsDetail: goodsDetail,
            goodsEvaluate: goodsEvaluate,
            allEvaluate: allEvaluate,
            goodsParamList: goodsParamList,
            goodsSwiperImgs: goodsSwiperImgs
          })
          wx.hideNavigationBarLoading();
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

  //选择颜色弹出框
  selColorTab: function (e) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          selColorStatus: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            selColorStatus: false
          }
        );
      }
    }.bind(this), 200)
  },
  // 商品参数弹出框
  argumentTab: function (e) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 2) {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  },

  //  查看全部评论
  allDiscuss: function (e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../discuss/discuss?goodsId='+goodsId,
    })
  },

  // 增加商品数量
  addTab: function (e) {
    var nums = this.data.nums;
    var goodsStock = this.data.goodsStock;
    if (nums == goodsStock)
      return
    this.setData({
      nums: nums + 1
    })
  },

  //减少商品数量
  subTab: function (e) {
    var nums = this.data.nums;
    if (nums == 1)
      return
    this.setData({
      nums: nums - 1
    })
  },

  // 客服
  toCallTab: function (e) {
    wx.makePhoneCall({
      phoneNumber: '0760-87838066',
    })
  },

  // 购物车
  toCartTab: function (e) {
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  // 加入购物车
  addCartTab: function (e) {
    console.log("userCart", userCart);
    var that=this;
    var nums = that.data.nums;
    var goodsId = e.currentTarget.dataset.goodsid;
    var addUserCart =this.data.goodsDetail;
    addUserCart.goodsDetail = '';
    if (addUserCart.freight == 'null' || addUserCart.freight == '' || addUserCart.freight ==undefined){
      addUserCart.freight='0.00'
    }
    // addUserCart.selected=true;
    addUserCart.num = nums;
    for (let i = 0; i < userCart.length; i++) {
      console.log(userCart[i].goodsId, addUserCart.goodsId)
      if (userCart[i].goodsId == addUserCart.goodsId) {
        wx.showToast({
          title: '已添加',
          icon: 'warn',
          duration: 2000
        })
        return
      }
    } 
    userCart.push(addUserCart)/*添加新的商品进去本地购物车数据*/


    wx.setStorage({
      key: "cart_key",
      data: userCart,
      success: function (e) {
        wx.showToast({
          title: '加入成功',
        })
        console.log('加入购物车', userCart)
          that.setData({
            goodsNums: userCart.length
          })
      }
    })
  },

// 立即购买
  toSaveOrder:function(e){
   var goodsId=e.currentTarget.dataset.goodsid;
   var nums = this.data.nums;
   var goodsDetail=this.data.goodsDetail;
   var freight=goodsDetail.freight;
   var  orderDaetail=
     [
       {
       goodsId:goodsDetail.goodsId,
       goodsImg:goodsDetail.goodsImg,
       goodsName:goodsDetail.goodsName,
       goodsPrice:goodsDetail.goodsPrice,
       nums: nums,
       num: nums,
     }]
    

   orderDaetail = JSON.stringify(orderDaetail)

   wx.navigateTo({
     url: '../save-order/index?orderDaetail=' + orderDaetail + '&freight=' + freight,
   })
  },

	// 保存进入会员
	// saveEnterGoodsDetail: function () {
	// 	var that = this
	// 	var wxOpenId = app.wxOpenId,
	// 		goodsId = this.data.goodsId
	// 	wx.request({
	// 		url: cyurl.saveEnterGoodsDetail,
	// 		data: {
	// 			openId: wxOpenId,
	// 			goodsId: goodsId
	// 		},
	// 		success: function (res) {
	// 			if (res.data.code == 0) {
	// 				console.log("11~~~~~~~~", res.data)
	// 				that.listInGoodsDetail()
	// 			} else {
	// 				console.log("11~~~~~~~~", res.data.msg)
	// 			}
	// 		}
	// 	})
	// },

	// // 删除进入会员
	// delExitGoodsDetail: function () {
	// 	var that = this
	// 	var wxOpenId = app.wxOpenId,
	// 		goodsId = this.data.goodsId
	// 	wx.request({
	// 		url: cyurl.delExitGoodsDetail,
	// 		data: {
	// 			openId: wxOpenId,
	// 			goodsId: goodsId
	// 		},
	// 		success: function (res) {
	// 			if (res.data.code == 0) {
	// 				console.log("22~~~~~~~~", res.data)
	// 			} else {
	// 				console.log("22~~~~~~~~", res.data.msg)
	// 			}
	// 		}
	// 	})
	// },

	// 获取商品详情内的会员列表
	listInGoodsDetail: function () {
		var that = this
		var wxOpenId = app.wxOpenId,
			goodsId = this.data.goodsId
		wx.request({
			url: cyurl.listInGoodsDetail,
			data: {
				goodsId: goodsId
			},
			success: function (res) {
				if (res.data.code == 0) {
					console.log(res.data)
					that.setData({
						visitLog: res.data.list
					})
				} else {
					console.log("33~~~~~~~~", res.data.msg)
				}
			}
		})
	},
  
	// 获取本商品下单的会员列表
	listMembHadOrder: function () {
		var that = this
		var wxOpenId = app.wxOpenId,
			goodsId = this.data.goodsId
		wx.request({
			url: cyurl.listMembHadOrder,
			data: {
				goodsId: goodsId
			},
			success: function (res) {
				if (res.data.code == 0) {
					console.log("44~~~~~~~~", res.data)
					that.setData({
						membList: res.data.list
					})
				} else {
					console.log("44~~~~~~~~", res.data.msg)
				}
			}
		})
	},

  //获取商品的店铺信息
  getStore:function(){
    var storeId = storeId;
    wx.request({
      url: cyurl.goodStore,
      data: {
        seqId: storeId
      },
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            spLogoImg: res.data.bean.spLogoImg,
            spName: res.data.bean.spName,
          })
        } else {
          console.log("33~~~~~~~~", res.data.msg)
        }
      }
    })
  },
  //点击进入商品所在店铺
  gotoStore:function(e){
    var storeId = e.currentTarget.dataset.storeid;
    // console.log(storeId);
    wx.navigateTo({
      url: '../store/store?seqId='+storeId,
    })
  },
  //获取商品评论  ? 如果商品详情接口没有返回 字段 ，则使用此方法
  getGoodComment:function(){
    var goodsId = this.data.goodsId;
  },

  onLoad: function (options) {
    var goodsId = options.seqId;
    this.setData({
      goodsId: goodsId
    })
		this.getGoodsDetail()
  },
  onShow:function(e){
    // var that=this;
    // wx.getStorage({
    //   key: 'cart_key',
    //   success: function(res) {
    //     userCart = res.data
    //     console.log('购物车',userCart)
    //     that.setData({
    //       goodsNums: userCart.length
    //     })
    //   },
    // })
		// this.saveEnterGoodsDetail()
		// this.listMembHadOrder()
  },

  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})