import cyurl from "../../../utils/url";
Page({
  data: {
    navbar: ['综合', '销量', '价格'],
    currentTab: 0,
    showToast:true,
    rank:0//价格的排序方式，设置为3时为从低到高，4为从高到底，为0时需要初始化为3
  },

  //分类获取商品列表
  getClaGoods: function (claId, sort) {
    var that = this;
    var showToast = that.data.showToast;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    var reqData = {
      sort: sort
    };
    if (claId){
      reqData.claId = claId
    }
    wx.request({
      url: cyurl.goodsListUrl,
      data: reqData,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("分类获取商品列表 -->",res)
        if (res.data.code == 0) {
          var goodsList = res.data.goodsList;
          that.setData({
            goodsList: goodsList
          })
          if (showToast) {
            wx.hideLoading()
          }
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

  // 获取搜索商品名称列表
  getSeachList: function (goodsName, sort) {
    var that = this;
    var showToast = that.data.showToast;
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: cyurl.goodsListUrl,
      data: {
        goodsName: goodsName,
        sort: sort

      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("获取搜索商品名称列表 -->",res)
        if (res.data.code == 0) {
          var goodsList = res.data.goodsList;
          that.setData({
            goodsList: goodsList
          })
          if (showToast) {
            wx.hideLoading()
          }
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
  //导航栏
  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    })
    var goodsName = this.data.goodsName;
    var claId = this.data.claId;
    if (goodsName!=undefined){
      if (currentTab == 0) {
        this.setData({ rank: 0 });
        console.log(0)
        this.getSeachList(goodsName, 1)
      } else if (currentTab == 1) {
        this.setData({ rank: 0 });
        this.getSeachList(goodsName, 5)
      } else if (currentTab == 2) {
        if(this.data.rank){
          this.data.rank == 3 ?
            this.setData({
              rank: 4
            }) :
            this.setData({
              rank: 3
            });
        }else{
          this.setData({
            rank: 3
          });
        }
        this.getSeachList(goodsName, this.data.rank)
      }
    }else{
      if (currentTab == 0) {
        this.setData({rank: 0});
        console.log(0)
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
    }
    
  },
  //商品详情
  toDateil: function (e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?seqId=' + goodsId,
    })
  },
  onLoad: function (options) {
    console.log('options',options)
   var claId = options.claId;
   var goodsName = options.value;
   this.setData({
     claId: claId,
     goodsName: goodsName
   })
   if(claId!=undefined){

     this.getClaGoods(claId,5)
   }else{
     this.getSeachList(goodsName, 5)
   }

  },
  onShareAppMessage: function () {
  
  }
})