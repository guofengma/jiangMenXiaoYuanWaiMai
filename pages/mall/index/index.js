import cyurl from "../../../utils/url";
//获取应用实例
const app = getApp();

var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'MUYBZ-O63RP-GKFD3-LCYIK-R263H-OQB43'
}); 

Page({

  data: {
     goodsName:'',
     location:"华南理工大学",
     userLa: "",
     userLg: ""
  },

  //跳转轮播图对应链接
  toLink: function (e) {
    let that = this;
    let url = e.currentTarget.dataset.link;
    if (url) {
      wx.navigateTo({
        url: url,
      })
    }
  },

  //优惠券
  Coupon:function(e){
      wx.navigateTo({
        url: '../coupon/coupon/index',
      })
  },
  
  //推荐分类
  getRecClaList:function(e){
    var that=this
     wx.request({
       url: cyurl.getHomeRecClaList,
       header: {
         'content-type': 'application/json'
       },
       success: function(res) {
         console.log("推荐分类-->",res);
         if(res.data.code=='0'){
           var recCla = res.data.claList;
           var newrecCla ;
           if(recCla.length > 7){
             newrecCla = recCla.slice(0, 6);
           }else{
             newrecCla = recCla;
           }
           that.setData({
             recCla: newrecCla
           })
         }else{
           wx.showToast({
             image: "/images/hit.png",
            title: res.data.msg,
          })
         }
         
       },
       fail: function(res) {
         console.log(res)
       },
     
     })
  },
  // 轮播图
  getSlideImgs: function (e) {
    var that=this;
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.imgUrl,
      data:{
        busiType:"mall"
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        console.log("轮播图-->",res)
       wx.hideNavigationBarLoading()
       if (res.data.code == 0) {
         var slideImgs = res.data.slideImgs;
         that.setData({
           slideImgs: slideImgs
         })
       } else {
         wx.showToast({
           image: "/images/hit.png",
           title: res.data.msg,
         })
       }
      },
     fail:function(res){
       wx.hideNavigationBarLoading()
       console.log(res)
      
     }
   })
  },

//广告图
  // getMallAdvs: function (e) {
  //   var that = this;
  //   wx.request({
  //     url: cyurl.AdvsUrl,
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log("商品广告图", res)
  //       var advImg = res.data.mallAdvs[0].advImg;
  //       if (res.data.code == 0) {
  //         that.setData({
  //           advImg: advImg
  //         })
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


  // 商城公告
  getNotices:function(event){
    var that = this;
    wx.request({
      url: cyurl.getNoticesUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("商城公告", res)
        var list=res.data.list;
        if (res.data.code == 0) {
          that.setData({
            list: list
          })
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

  //推荐商品
  getRecGoods: function (e) {
    var that = this;
    wx.request({
      url: cyurl.recGoodsUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("推荐商品", res)
        var recGoodsList = res.data.recGoodsList;
         for(var i=0;i<recGoodsList.lenght;i++){
           recGoodsList[i].goodsName = recGoodsList[i].goodsName.substring(0,10);
         }
        if (res.data.code == 0) {
          that.setData({
            recGoodsList: recGoodsList
          })
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: res.data.msg
        })
      }
    })
  },

  //保存搜索框中的输入
  searchNot:function(e){
    //  console.log(e.detail);
    //  console.log(JSON.stringify(e.detail));    
    this.setData({
      goodsName: e.detail.value
    })
  },

  //搜索(点击键盘完成按钮 触发)
  bindSearch: function (event) {
    var value = this.data.goodsName;//event.detail.value;
    // console.log("value", value);
    // this.setData({
    //   goodsName: value
    // })
    if (value == undefined || value == "") {
      wx.showToast({
        title: '输入关键字不能为空',
      })
    } else {
      wx.navigateTo({
        url: '../list/list?value=' + value,
      })
    }

  },

// 推荐分类  点击分类 跳转分类商品列表
  recGoodsTab:function(event){
    console.log(event)
    var claId = event.currentTarget.dataset.claid;
    console.log(claId)
    wx.navigateTo({
      url: '../list/list?claId=' + claId,
    })
    
  },
  // 商品详情链接
  toDetailTab:function(event){
    var seqId = event.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?seqId=' + seqId,
    })
  },
  //拨打电话
  toCall: function (e) {
    // wx.makePhoneCall({
    //   phoneNumber: '18819207988' //仅为示例，并非真实的电话号码
    // })
    console.log("to Call");
    wx.makePhoneCall({
      phoneNumber: '13925831375' //仅为示例，并非真实的电话号码
    })
  },

  //获取地理位置(返回当前经纬度{userLg:'',userLa:''}),userLg:经度，userLa：纬度
  getLocation: function () {
    var longitude;//经度
    var latitude;//纬度
    var that = this;
    wx.getLocation({
      success: function (res) {
        latitude = res.latitude;
        longitude = res.longitude;
        that.setData({
          userLa: latitude,
          userLg: longitude
        });

        //根据经纬度解析 地理位置名称
        that.getAddrName();

      },
      fail: function (res) {
        wx.showToast({
          title: "定位失败",
        })
      }
    });
    return {
      userLg: longitude,//经度
      userLa: latitude//纬度
    }
  },

  //打开地图选择地理位置 具体地点
  getAddr: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log("选择地理位置", res)
        var addrName = res.name;
        var address = res.address;
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("addrName", addrName);
        console.log("address", address);

        that.setData({
          userLa: latitude,
          userLg: longitude,
          location: addrName
        });

      }
    })
  },

  //根据经纬度获取地址名称
  getAddrName: function () {
    var that = this;
    var longitude = this.data.userLg;//经度
    var latitude = this.data.userLa;//纬度
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log("根据经纬度获取地址名称 -->",res);
        var address = res.result.address;
        var recommend = res.result.formatted_addresses ? res.result.formatted_addresses.recommend : '';
        var addr = recommend || address;
        that.setData({
          location: addr
        })

      },
      fail: function (res) {
        wx.showToast({
          image: "/images/hit.png",
          title: "定位失败",
        })
      },

    });
  },

  onLoad: function (options) {
    this.getRecClaList();//推荐分类
    this.getLocation();// 地理位置 经纬度
    app.editTabBar("tabbar2");//底部导航
  },

  onShow: function () {
    this.getSlideImgs()//轮播图
    // this.getMallAdvs()
    // this.getNotices()  //商城公告
    this.getRecGoods()//推荐商品
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})