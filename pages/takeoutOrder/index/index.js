import cyurl from "../../../utils/url";
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'MUYBZ-O63RP-GKFD3-LCYIK-R263H-OQB43'
});

//获取应用实例
const app = getApp()

Page({
  data: {
    pageNumber:0,
    pageSize:0,
    stars:[0,1,2,3,4],
    goodStar: "/images/star-gd.png",
    defaultStar: "/images/star-df.png",
    halfStar:"/images/star-hf.png",
    seqId:"",
    typeImg:"",
    location: "",
    goodsName:"",  //搜索关键词
    slideImgs: [
      // '/images/takeout/swiper.png',
      // '/images/takeout/swiper.png',
      // '/images/takeout/swiper.png'
    ],
    recCla: [
      {
        seqId: ' ',
        typeImg: '',
        typeNamee: ' '
      }
      
    ],
    storeList: [
      // {
      //   claId: 1,
      //   seqIdW: "111",
      //   storeName: '',
      //   storeSale: '222',
      //   storeType: '333',
      //   storeAddr: '444',
      //   originSendFate: 20,
      //   sendFate: 5,
      //   averFate: 34,
      //   distance: 289
      // }
    ],
    navbar: ['综合排序', '销量最高', '距离最近'],
    currentTab: 0,
    showToast: true,
  },

  //跳转轮播图对应链接
  toLink:function(e){
    let that = this;
    let url = e.currentTarget.dataset.link;
    console.log("url", url)
    if(url){
      wx.navigateTo({
        url: url,
      })
    }
  },

  //获取轮播图
  getSlideImgs: function (e) {
    var that = this;
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.imgUrl,
      data: {
        busiType: "xyTakeout"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("轮播图-->",res)
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          var slideImgs = res.data.slideImgs;
          that.setData({
            slideImgs: slideImgs
          })
        } else {

        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        console.log(res)

      }
    })
  },
  
  //保存搜索框中的输入
  searchNot: function (e) {
    //  console.log(e.detail);
    //  console.log(JSON.stringify(e.detail));    
    this.setData({
      storeName: e.detail.value
    })
  },

  //搜索(点击键盘完成按钮 触发)
  bindSearch: function (event) {
    let that = this;
    var value = this.data.storeName;//event.detail.value;
    var userLg = that.data.userLg;
    var userLa = that.data.userLa;
    if (value == undefined || value == "") {
      wx.showToast({
        title: '输入关键字不能为空',
      })
    } else {
      wx.navigateTo({
        url: '../foodList/foodList?storeName=' + value + '&userLa=' + userLa + '&userLg=' + userLg,
      })
    }

  },


  //推荐分类（门店）
  getRecClaList: function (e) {
    var that = this
    wx.request({
      url: cyurl.recCateList,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('分类-->',res);
        if (res.data.code == '0') {
          var recCla = res.data.list;
          var newrecCla;
          if (recCla.length > 7) {
            newrecCla = recCla.slice(0, 6);
          } else {
            newrecCla = recCla;
          }
          // console.log(newrecCla)
          that.setData({
            recCla: newrecCla
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
    })
  },

  //推荐商家列表
  getRecStoreList: function (pageNumber){
    var that = this;
    var userLg = that.data.userLg;
    var userLa = that.data.userLa;
    var sortRule = parseInt(that.data.currentTab)+1;
    var storeList = that.data.storeList;
    var reqData = {
      userLg: userLg,
      userLa: userLa,
      sortRule: sortRule
    };
    if (pageNumber){
      reqData.pageNumber = pageNumber
    }
    wx.request({
      url: cyurl.recStoreList,
      data: reqData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("推荐商家列表-->",res);
        if (res.data.code == '0') {
          storeList = storeList.concat(res.data.list);
          var pageNumber = res.data.pager.pageNumber
          var pageSize = res.data.pager.pageSize
          var pageCount = res.data.pager.pageCount
          that.setData({
            storeList: storeList,
            pageNumber: pageNumber,
            pageCount: pageCount
          })
          that.formatDis()
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        console.log(res)
      },
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
        //推荐商家列表
        that.getRecStoreList();

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
  getAddr:function(){
    var that = this;
    wx.chooseLocation({
      success:function(res){
        console.log("选择地理位置",res)
        var addrName = res.name;
        var address = res.address;
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("addrName", addrName);
        console.log("address", address);

         that.setData({
          userLa: latitude,
          userLg: longitude,
          location:addrName
        });

      }
    })
  },

  //根据经纬度获取地址名称
  getAddrName:function(){
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
        var recommend = res.result.formatted_addresses ? res.result.formatted_addresses.recommend:'';
        var addr = recommend || address;
        that.setData({
              location: addr
        })

      },
      fail: function (res) {
        wx.showToast({
          title: "定位失败",
        })
      },

    });
  },

  //格式化距离数字
  formatDis:function(e){
    let that = this;
    let storeList = that.data.storeList;
    let newStoreList = storeList.map(function(e){
      let distance = e.distance;
      console.log("distance -- > ",distance);
      distance = distance.replace(/,/g, "");
      distance = distance >1000? (distance/1000).toFixed(2)+'km':distance+'m';
      e.distance = distance;
      return e;
    })
    console.log("newStoreList",newStoreList)
    that.setData({
      newStoreList:newStoreList
    })
  },

  //点击分类 跳转到分类门店列表
  toFoodListTab: function (e){
    let that = this;
    var typeId = e.currentTarget.dataset.claid;
    var userLg = that.data.userLg;
    var userLa = that.data.userLa;
    wx.navigateTo({
      url: '../../takeoutOrder/foodList/foodList?typeId=' + typeId + '&userLa=' + userLa + '&userLg=' + userLg
    })
  },

  //跳转到商家详情页面
  toStoreDetail: function (e) {
    var storeId = e.currentTarget.dataset.storeid;
    wx.navigateTo({
      url: '../../takeoutOrder/storeDetail/storeDetail?seqId=' + storeId
    })
  },

  //推荐商家 切换
  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    });
    this.getRecStoreList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    app.editTabBar();

    this.getLocation();

    this.getRecClaList();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getSlideImgs();
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
  onPullDownRefresh: function () {  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let pageNumber = that.data.pageNumber;
    let pageSize = that.data.pageSize;
    let pageCount = that.data.pageCount;
    if (pageNumber < pageCount){
      pageNumber += 1;
      this.getRecStoreList(pageNumber)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})
