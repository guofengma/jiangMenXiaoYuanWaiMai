// pages/takeoutOrder/myStoreComment/myStoreComment.js
import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars:[0,1,2,3,4],
    goodStar: "/images/star-gd.png",
    defaultStar: "/images/star-df.png",
    halfStar:"/images/star-hf.png",
    commentScore:4.7,
    commentList: [
      // {
      //   userId: 1,
      //   mbImg: '/images/takeout/头像@2x.png',
      //   mbName: '爱神',
      //   commentTimeFmt: '一小时前',
      //   commentContent: '味道还可以,配送挺快的,快递小哥相当的礼貌,味道还可以,配送挺快的,快递小哥相当的礼貌',
      //   commentScore: 4
      // }
    ],
    //评论
    pink:"pink",
    list_evaluate:"list_evaluate",
    arr:[1,2,3,4],
    tabe:[
      { comment: "全部", quantity:20,style:true},      
      { comment: "好评", quantity: 10, style: false },
      { comment: "中评", quantity: 5, style: false },
      { comment: "差评", quantity: 5, style: false },
    ],

    clickId:0,
    clickItem:"全部"
  },

//评论
  mkdir(e) {
    var that = this
    console.log(e)
    console.log(e.target.id)
    let arr = [];

    for (var i = 0; i < that.data.tabe.length; i++) {
      console.log(i)
      if (e.target.id == i) {
        arr[i] = { comment: that.data.tabe[i].comment, quantity: that.data.tabe[i].quantity, style: true }
        console.log("true")
      } else {
        arr[i] = { comment: that.data.tabe[i].comment, quantity: that.data.tabe[i].quantity, style: false }
        console.log("false")
      }
    }
    this.setData({
      tabe: arr
    })
  },

  //获取店铺评价
  getStoreComment:function(){
    var that = this;
    var storeId = wx.getStorageSync("storeId")
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.storecomment,
      data: {
        storeId: storeId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("获取店铺评价-->", res)
        wx.hideLoading()
        if (res.data.code == 0) {
          var commentList = res.data.list;
          var commentScore = res.data.commentScore;
          that.setData({
            commentScore: commentScore,
            commentList: commentList
          })
        } else {

        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log(res)

      }
    })

  },

//评论点击切换

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var commentScore = options.commentScore;
    var storeId = options.storeId;
    this.setData({
      storeId: storeId
    });
    this.getStoreComment();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

})