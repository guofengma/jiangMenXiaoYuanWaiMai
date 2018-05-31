
import cyurl from "../../../utils/url";

Page({

  data: {
    currentTab:0,
    navbar:['好评','中评','差评'],
    userName:'',
    userImg:'',
    disussDigest:'',
    disussImge:[],
    discussTime:'',
    discussData:[],
    showToast:true,
    goodsId:'',
    list:[
      {
        seqId:1,
        evaLevel:2,
        evaContent:"哎哟，不错哦，厉害了，惹不起惹不起。卡的要死 买来一个星期多没怎么用 刚开始是很好使 现在用着用着屏幕死机了 按啥啥不好使 很无助啊",
        mbId:12580,
        mbName:"寒子",
        wxImgL:"https://storage.360buyimg.com/i.imageUpload/6c697975646f6e6736363631353032323630313138383339_sma.jpg",
        createTime:"2017-12-23"
      },
      {
        seqId: 1,
        evaLevel: 3,
        evaContent: "哎哟，不错哦，厉害了，惹不起惹不起。卡的要死 买来一个星期多没怎么用 刚开始是很好使 现在用着用着屏幕死机了 按啥啥不好使 很无助啊",
        mbId: 12580,
        mbName: "寒子",
        wxImgL: "https://storage.360buyimg.com/i.imageUpload/6c697975646f6e6736363631353032323630313138383339_sma.jpg",
        createTime: "2017-12-23"
      },
      {
        seqId: 1,
        evaLevel: 4,
        evaContent: "哎哟，不错哦，厉害了，惹不起惹不起。卡的要死 买来一个星期多没怎么用 刚开始是很好使 现在用着用着屏幕死机了 按啥啥不好使 很无助啊",
        mbId: 12580,
        mbName: "寒子",
        wxImgL: "https://storage.360buyimg.com/i.imageUpload/6c697975646f6e6736363631353032323630313138383339_sma.jpg",
        createTime: "2017-12-23"
      },
      {
        seqId: 1,
        evaLevel: 5,
        evaContent: "哎哟，不错哦，厉害了，惹不起惹不起。卡的要死 买来一个星期多没怎么用 刚开始是很好使 现在用着用着屏幕死机了 按啥啥不好使 很无助啊",
        mbId: 12580,
        mbName: "寒子",
        wxImgL: "https://storage.360buyimg.com/i.imageUpload/6c697975646f6e6736363631353032323630313138383339_sma.jpg",
        createTime: "2017-12-23"
      }
    ]
  },

// 评价列表
getDiscussList:function(){
  var that = this;
  var goodsId=that.data.goodsId;
  var showToast = that.data.showToast;
  if (showToast) {
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
  }
  wx.request({
    url: cyurl.goodsEvaluateUrl,
    data:{
      goodsId: goodsId
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res)
      if (res.data.code == 0) {
       var list=res.data.list;
       for(var i=0;i<list.length;i++){
         list[i].star = parseInt(list[i].evaLevel) ;
       }
       console.log(list)
   
        that.setData({
         list:list
        })
        if (showToast) {
          wx.hideLoading()
        }
      } else {
        wx.showToast({
          title: '请求数据失败',
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


// 导航栏
  navbarTap:function(e){
    var currentTab=e.currentTarget.dataset.idx;
     this.setData({
       currentTab: currentTab
     })
  },

  onLoad: function (options) {
     var goodsId=options.goodsId;
    this.setData({
      goodsId: goodsId,
    })
    // this.getDiscussList()
  }
})