// pages/citywide/articledetail/articledetail.js
import cyurl from "../../../utils/url";
var WxParse = require('../../mall/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like:false,
    likeNum:0,
    focus:false,//评论框聚焦
    showModal:false,
    seqId:"",//文章编号
    mbId:"",//会员编号
    mbImg:"",//会员头像
    mbName:"",//会员名称
    infoImg:"",//文章图片
    infoTitle:"",//文章标题
    infoContentStr:"",//文章内容
    imgList:[
    // {
    //   seqId:12,
    //   imgPath:""
    // }
    ],//文章图片列表
    postTime:"",//发布时间
    postTimeFmt:"7月30日 18:00",//发布时间
    viewNum:"",//浏览数
    replyNum:"",//评论数
    likeNum:"",//点赞数
    isAttention:"",//是否关注
    //评价列表
    replyList:[
      // {
      //   seqId:"",//编号
      //   mbId:"",//会员编号
      //   mbImg:"",//会员头像
      //   mbName:"",//会员名称
      //   postTimeFmt:"2017-11-33",//发布时间
      //   replyContent:"",//评价内容
      //   replyDate:"",//评价日期
      //   likeNum:4,//点赞数
      //   isAttention:0,//是否关注
      // }
    ],
    postAddr:""
  },

  //点赞功能
  saveLike:function(){
    var that = this;
    var seqId = that.data.seqId;
    var likeNum = that.data.likeNum;
    let openId = wx.getStorageSync("openId")
    wx.request({
      url: cyurl.saveLike,
      data: {
        seqId: seqId,
        openId: openId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("点赞-->", res)
        if (res.data.code == 0) {
          likeNum = parseInt(likeNum)+1;
          that.setData({
            like: true,
            likeNum: likeNum
          })
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
  },

  //获取帖子详情
  getByIdSimple:function(){
    var that = this;
    var seqId = this.data.seqId;
    var openId = wx.getStorageSync("openId");
    wx.showLoading({
      msak:true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.getByIdSimple,
      data: {
        openId: openId,
        seqId: seqId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        console.log("获取帖子详情-->", res)
        if (res.data.code == 0) {
          var seqId = res.data.bean.seqId;
          var mbId = res.data.bean.mbId;
          var mbImg = res.data.bean.mbImg;
          var mbName = res.data.bean.mbName;
          var infoImg = res.data.bean.infoImg;
          var infoTitle = res.data.bean.infoTitle;
          var infoContentStr = res.data.bean.infoContentStr;
          console.log(infoContentStr)
          WxParse.wxParse('infoContentStr', 'html', infoContentStr, that)
          var imgList = res.data.bean.imgList;
          var infoPhone = res.data.bean.infoPhone;
          var postTime = res.data.bean.postTime;
          var postTimeFmt = res.data.bean.postTimeFmt;
          var viewNum = res.data.bean.viewNum;
          var replyNum = res.data.bean.replyNum;
          var likeNum = res.data.bean.likeNum;
          var isAttention = res.data.bean.isAttention;
          var replyList = res.data.bean.replyList;
          var postAddr = res.data.bean.postAddr;
          that.setData({
            seqId:seqId,
            mbId:mbId,
            mbImg:mbImg,
            mbName:mbName,
            infoImg:infoImg,
            infoTitle:infoTitle,
            infoPhone: infoPhone,
            // infoContentStr: infoContentStr,
            imgList:imgList,
            postTime:postTime,
            postTimeFmt:postTimeFmt,
            viewNum:viewNum,
            replyNum:replyNum,
            likeNum:likeNum,
            isAttention:isAttention,
            replyList:replyList,
            postAddr: postAddr
          })
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },

  //保存评论内容
  saveInput:function(e){
    var value = e.detail.value;
    this.setData({
      replyContent:value
    })
  },

  //发布评论
  saveReplySimple:function(){
    var that = this;
    var openId = wx.getStorageSync("openId");
    var mbId = wx.getStorageSync("mbId");
    var infoId = this.data.seqId;
    var replyContent = this.data.replyContent;
    if (replyContent.trim() == "" || replyContent == undefined){
      wx.showToast({
        title: "评论不能为空"
      })
      return
    }
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.saveReplySimple,
      data: {
        openId: openId,
        infoId: infoId,
        replyContentStr: replyContent,
        mbId: mbId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        console.log("发布评论", res)
        if (res.data.code == 0) {
          wx.showToast({
            title:"评论成功"
          })
          setTimeout(()=>{
            that.getByIdSimple();            
          },2000)
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败'
        })
      },
      complete:function(){
        that.setData({
          showModal: false,
          focus: false
        })
      }
    })
  },

  //预览图片
  previewImage: function (e) {
    var that = this;
    var imgList = that.data.imgList;
    var urls = [];
    for (let i in imgList) {
      urls.push(imgList[i].imgPath);
    }
    var current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  //显示弹框、评论框
  showModal:function(){
    this.setData({
      showModal: true,
      focus:true
    })
  },

  //隐藏弹框
  hideModal:function(){
    this.setData({
      showModal:false,
      focus:false
    })
  },

  //联系ta
  callAuthor:function(e){
    var infoPhone = e.currentTarget.dataset.infophone;
    wx.makePhoneCall({
      phoneNumber: infoPhone //仅为示例，并非真实的电话号码
    })
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var seqId = options.seqId;
    this.setData({
      seqId: seqId
    })
     this.getByIdSimple();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})