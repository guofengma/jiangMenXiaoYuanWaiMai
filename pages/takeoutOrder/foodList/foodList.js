import cyurl from "../../../utils/url";
//获取应用实例
const app = getApp()

Page({
  data: {
    userLg: "",//经度
    userLa: "",//纬度
    typeId:"",//分类id
    storeName:"",//搜索词
    navbar: ['综合排序', '销量最高', '距离最近'],
    currentTab: 0,
    showToast: true,
    storeList: [
      // {
      //   claId: 1,
      //   storeImg: "../../../images/首页-店铺@2x.png",
      //   storeName: '广东肯德基东圃餐厅',
      //   storeSale: '114',
      //   storeType: '快餐',
      //   storeAddr: '天河区',//起送 ¥ 20 | 配送 ¥ 5 | 人均 ¥ 34
      //   originSendFate: 20,
      //   sendFate: 5,
      //   averFate: 34,
      //   distance: 289
      // }
    ],

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
        })
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

  //获取店铺列表（根据分类 或 搜索关键词）
  getCateStoreList: function () {
    var that = this;
    var userLg = that.data.userLg;
    var userLa = that.data.userLa;
    var typeId = that.data.typeId;
    var storeName = that.data.storeName;
    var sortRule = parseInt(that.data.currentTab) + 1;
    var parseData={
      userLg: userLg,
      userLa: userLa,
      sortRule: sortRule,
    };
    if (typeId){//有分类id  按分类id查询
      parseData.typeId = typeId;
    }
    if (storeName) {//有分类id  按分类id查询
      parseData.storeName = storeName;
    }
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.cateStoreList,
      data: parseData,
      header: {
        'content-type': 'application/json'
      },
      // method:"POST",
      success: function (res) {
        wx.hideLoading()
        console.log("门店列表-->",res)
        if (res.data.code == '0') {
          var storeList = res.data.list;
          that.setData({
            storeList: storeList
          })
          that.formatDis()
        } else {
          wx.showToast({
            icon:"none",
            title: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          icon:none,
          title: '获取失败',
        })
      },
      complete:function(res){
        
      }
    })
  },

  //格式化距离数字
  formatDis: function (e) {
    let that = this;
    let storeList = that.data.storeList;
    let newStoreList = storeList.map(function (e) {
      let distance = e.distance;
      console.log("distance -- > ", distance);
      distance = distance.replace(/,/g, "");
      distance = distance > 1000 ? (distance / 1000).toFixed(2) + 'km' : distance + 'm';
      e.distance = distance;
      return e;
    })
    console.log("newStoreList", newStoreList)
    that.setData({
      storeList: newStoreList
    })
  },
  
  //推荐商家 切换
  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    })
     this.getCateStoreList();   //获取店铺列表（根据分类 或 搜索关键词）
  },

  //跳转到商家详情页面
  toStoreDetail: function (e) {
    var seqId = e.currentTarget.dataset.seqid;
    wx.navigateTo({
      url: '../../takeoutOrder/storeDetail/storeDetail?seqId=' + seqId
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getLocation();
    console.log("门店列表 options -->", options);
    var typeId = options.typeId;
    var storeName = options.storeName;
    let userLa = options.userLa;
    let userLg = options.userLg;
    this.setData({
      typeId: typeId,
      storeName: storeName,
      userLg: userLg,
      userLa: userLa
    });
    // 
    this.getCateStoreList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 

    
   },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getCateStoreList();
    wx.stopPullDownRefresh()    
},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
