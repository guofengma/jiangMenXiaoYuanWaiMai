// pages/store/store.js
import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seqId:"",
    spLogoImg:"/images/shop/store-logo.png",
    spName:"联想电脑专卖店",
    goodsClaList:[
      {
         seqId:1,
         className:"平板电脑"
      },
      {
        seqId: 2,
        className: "笔记本"
      },
      {
        seqId: 3,
        className: "台式机"
      },
      {
        seqId: 4,
        className: "联想系列"
      },
      {
        seqId: 5,
        className: "手机"
      },
      {
        seqId: 6,
        className: "配件"
      }
    ],
    navbar: ['综合', '销量', '价格'],
    currentcate:0,
    currentTab: 0,
    rank: 0,//价格的排序方式，设置为3时为从低到高，4为从高到底，为0时需要初始化为3
    goodsList:[
      {
         goodsId:1,
         goodsImg:"https://m.360buyimg.com/n12/jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg!q70.jpg",
         goodsName:"【保险套餐版】Apple iPhone X (A1865) 256GB 银色 移动联通电信4G手机",
         saleNums:18,
         goodsPrice:998
      },
      {
        goodsId: 1,
        goodsImg: "https://m.360buyimg.com/n12/jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg!q70.jpg",
        goodsName: "【保险套餐版】Apple iPhone X (A1865) 256GB 银色 移动联通电信4G手机",
        saleNums: 18,
        goodsPrice: 998
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var seqId = options.storeId;
    this.setData({
      seqId: seqId
    });
    this.storeInfo();
  },

  onShow:function(){
    this.getClaGoods()
  },

  //门店信息
  storeInfo:function(){
    var seqId = this.data.seqId;
    wx.request({
      url: cyurl.goodStore,
      data: {
        seqId: seqId
      },
      success: function (res) {
        console.log("门店信息 -->",res)
        if (res.data.code == 0) {
          that.setData({
            spLogoImg: res.data.bean.spLogoImg,
            spName: res.data.bean.spName,
            goodsClaList: res.data.goodsClaList,
          })
        } else {
          console.log("33~~~~~~~~", res.data.msg)
        }
      }
    })
  },

  //点击切换商品分类
  cateTap:function(e){
    var currentcate = e.currentTarget.dataset.idx;
    this.setData({
      currentcate: currentcate
    });
    var claId = e.currentTarget.dataset.seqid;
    var sort = this.data.navbar[this.data.currentTab];
    this.getClaGoods(claId,sort)
  },
  //切换查询条件
  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    });
    var claId = this.data.goodsClaList[this.data.currentcate].seqId;
    if (currentTab == 0) {
      this.setData({ rank: 0 });
      this.getClaGoods(claId, 1)
    } else if (currentTab == 1) {
      this.setData({ rank: 0 });
      this.getClaGoods(claId, 5)
    } else if (currentTab == 2) {
      if (this.data.rank) {
        this.data.rank == 3 ?
          this.setData({
            rank: 4
          }) :
          this.setData({
            rank: 3
          });
      } else {
        this.setData({
          rank: 3
        });
      }
      this.getClaGoods(claId, this.data.rank)
    }
  },
  //请求分类商品数据
  getClaGoods: function (claId, sort) {
    var claId = claId || this.data.goodsClaList[this.data.currentcate].seqId;
    var sort = sort || 1;
    var that = this;
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    wx.request({
      url: cyurl.goodsListUrl,
      data: {
        supplierId: this.data.seqId,
        claId: claId,
        sort: sort
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var goodsList = res.data.goodsList;
          that.setData({
            goodsList: goodsList
          })
          wx.hideLoading()
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
  
  //商品详情
  toDateil: function (e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?goodsId=' + goodsId,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})