var app=getApp();
import cyurl from "../../../../../utils/url";
Page({
  data: {
    checked:false,
    normalSrc:'/image/star-df.png',
    selectedSrc: '/image/star-gd.png',
    showToast:true,
    evaContent:'',
    evaLevel:'',
    orderId:'',
    goodsId:'',
    zongfen: 0,
    imgUrl: [
      {
        normalSrc: '/image/normal.png',
        selectedSrc: '/image/selected.png',
        isActive: false,
        fens: '1'
      },
      {
        normalSrc: '/image/normal.png',
        selectedSrc: '/image/selected.png',
        isActive: false,
        fens: '1'
      },
      {
        normalSrc: '/image/normal.png',
        selectedSrc: '/image/selected.png',
        isActive: false,
        fens: '1'
      },
      {
        normalSrc: '/image/normal.png',
        selectedSrc: '/image/selected.png',
        isActive: false,
        fens: '1'
      },
      {
        normalSrc: '/image/normal.png',
        selectedSrc: '/image/selected.png',
        isActive: false,
        fens: '1'
      }
    ]


  },
  
  //提交评论
  saveComment:function(){
    var commentContent = this.data.evaContent;
    var orderId = this.data.orderId;
    if(commentContent.trim() == ''){
      wx.showToast({
        title: '提交的内容不能为空',
      })
      return
    }
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.orderComment,
      data: {
        orderId: orderId,
        commentContent: commentContent,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("提交商城订单评论",res)
        if (res.data.code == 0) {
          wx.hideNavigationBarLoading()
          wx.showToast({
            title: "评论成功",
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../../order/order',
            })
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }

      },
      fail: function (res) {
        console.log(res);
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },
// 提交评分
saveEvaluate:function(e){
  var that = this;
  var openId = app.wxOpenId;
  var showToast = that.data.showToast;
  var evaContent = this.data.evaContent;
  var orderId = this.data.orderId;
  var goodsId=this.data.goodsId;

  var tempFilePaths = this.data.tempFilePaths;
  var evaLevel = this.data.zongfen;

  if (evaContent==''){
    wx.showToast({
      title: '提交的内容不能为空',
    })
    return
  }
  
  console.log(tempFilePaths)


  if (tempFilePaths!=undefined){
    if (showToast) {
      wx.showLoading({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.uploadFile({
      url: cyurl.saveEvaluateUrl,
      filePath: tempFilePaths[0],
      name: 'imgFile',
      formData: {
        openId: openId,
        orderId: orderId,
        evaContent: evaContent,
        goodsId: goodsId,
        evaLevel: evaLevel
      },
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        if (showToast) {
          wx.hideLoading()
        }
        var data = JSON.parse(res.data)
        console.log(data.code)

        if (data.code == 0) {
          wx.showToast({
            title: '提交成功',
          })

          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }
            , 2000
          )
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '提交失败',
        })
      }
    })
  }else{
    console.log(12)
    wx.showToast({
      title: '请选择图片',
    })
    // if (showToast) {
    //   wx.showLoading({
    //     title: '正在加载',
    //     icon: 'loading',
    //     duration: 10000
    //   })
    // }
    // wx.request({
    //   url: cyurl.saveEvaluateUrl,
    //   header: {
    //     'content-type': 'multipart/form-data'
    //   },
    //   data:{
    //     openId: openId,
    //     orderId: orderId,
    //     evaContent: evaContent,
    //     goodsId: goodsId,
    //     evaLevel: evaLevel
    //   },
    //   success: function (res) {
    //     if (showToast) {
    //       wx.hideLoading()
    //     }
    //     var data = JSON.parse(res.data)
    //     console.log(data.code)

    //     if (data.code == 0) {
    //       wx.showToast({
    //         title: '提交成功',
    //       })

    //       setTimeout(function () {
    //         wx.navigateBack({
    //           delta: 1
    //         })
    //       }
    //         , 2000
    //       )
    //     }
    //   },
    //   fail: function (res) {
    //     wx.showToast({
    //       title: '提交失败',
    //     })
    //   }
    // })
  }
   

},
// 评价内容
bindTextAreaBlur:function(e){
  var  evaContent=e.detail.value;
  console.log(evaContent);
  this.setData({
    evaContent: evaContent
  })
},



  // 星级评分
  chooseicon: function (e) {
    console.log(e.target)
    var strnumber = e.target.dataset.index;
    console.log(strnumber);
    this.data.zongfen = 0
    //判断其他星星的状态
    for (var i = 0; i < this.data.imgUrl.length; i++) {
      if (i < strnumber) {
        this.data.imgUrl[i].isActive = true;
        this.data.zongfen = this.data.zongfen + Number(this.data.imgUrl[i].fens)
      }
      else if (i == strnumber) {
        this.data.imgUrl[strnumber].isActive = !this.data.imgUrl[strnumber].isActive;
        if (this.data.imgUrl[strnumber].isActive == true) {
          this.data.zongfen = this.data.zongfen + Number(this.data.imgUrl[i].fens)
        }
      } else {
        this.data.imgUrl[i].isActive = false;
      }
    }
    //判断自己的状态
    this.setData({
      imgUrl: this.data.imgUrl,
      zongfen: this.data.zongfen
    })
  },

  
  // 添加图片
  addImgTab: function (e) {
    var that=this;
    wx.chooseImage({
      count: 3,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: tempFilePaths
        })
        
      }
    })
  },

  onLoad: function (options) {
     var orderId=options.orderId;
     var goodsId=options.goodsId;
     console.log(orderId);
     this.setData({
       orderId:orderId,
       goodsId:goodsId
     })
  },
})