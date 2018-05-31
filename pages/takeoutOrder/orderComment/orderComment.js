// pages/takeoutOrder/orderComment/orderComment.js
import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    key:5,
    goodStar:"/images/star-gd.png",
    defaultStar:"/images/star-df.png",
    halfStar:"/images/star-hf.png",
    commentContent:"",
  },

  //保存评论内容
  saveComment:function(e){
    var commentContent = e.detail.value;
    this.setData({
      commentContent: commentContent
    })
  },

  //评分
  selectStar:function(e){
    var dataKey = e.currentTarget.dataset.key;
    console.log("dataKey",dataKey);
    this.setData({
      key: dataKey
    })
  },

  //发布评价
  ordercomment:function(){
    var that = this;
    var orderId = that.data.orderId;
    var commentContent = that.data.commentContent;
    var commentScore = that.data.key;
    let openId = wx.getStorageSync("openId");
 if (commentContent == '' || commentContent == undefined){
      wx.showToast({
        title: '内容为空',
      })
    }
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.orderComment,
      data:{
        orderId: orderId,
        commentContent: commentContent,
        commentScore: commentScore,
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.hideLoading()
          wx.showToast({
            title: "评论成功",
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../order/order',
            })
          }, 1500)
        } else {
          wx.showToast({
            icon:"none",
            title: res.data.msg,
          })
        }

      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading()
        wx.showToast({
          icon:"none",
          title: '加载失败'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId;
    this.setData({
      orderId: orderId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

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

})