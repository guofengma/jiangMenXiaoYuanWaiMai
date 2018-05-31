import cyurl from "../../../utils/url";
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeImg:"",
    storeBusiImg:"",
    openId:"",
    storeName:"",
    userPwd:"",
    storePhone:"",
    storeLinker:"",
    storeAddr:"",
    storeDistr:"",
    storeLg:"",
    storeLa:""
  },

  //选择营业执照图片
  chooseStoreBusiImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          storeBusiImg: tempFilePaths
        })
        console.log("tempFilePaths",tempFilePaths);
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },

  //选择门店logo图片
  chooseStoreImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("门店logo--res-->",res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          storeImg: tempFilePaths
        })
        console.log("门店logo --tempFilePaths",tempFilePaths);
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },

  //保存用户输入的信息,通过参数来识别
  saveInput:function(e){
    var value = e.detail.value;
    var str = e.currentTarget.dataset.str;
    console.log("value", value)
    console.log("str", str)
    this.setData({
      [str]:value
    })
  },

  //手机号或座机号验证
  isPhone:function(val){
    var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if (pattern.test(val)){
      return true;
    } else {
      return false;
    }
  },

  //门店申请
  applyStore:function(){
    var that = this;
    var openId = wx.getStorageSync("openId");
    var storeName = this.data.storeName;
    var storeLinker = this.data.storeLinker;//联系人
    var storePhone = this.data.storePhone;//手机号
    var userPwd = this.data.userPwd;//密码
    var storeAddr = this.data.storeAddr;//详细地址
    var storeDistr = this.data.storeDistr;//所属区
    var storeLg = this.data.storeLg;//地址经度
    var storeLa = this.data.storeLa;//地址纬度

    var storeImg = this.data.storeImg;//店铺logo
    var storeBusiImg = this.data.storeBusiImg;//营业执照

    var publicData = {
      openId:openId,
      storeName:storeName,
      userPwd: userPwd,
      storePhone1:storePhone,
      storeLinker:storeLinker,
      storeAddr:storeAddr,
      storeDistr: storeDistr,
    }
    console.log("publicData",publicData);
    console.log("storeImg",storeImg);
    console.log("storeBusiImg",storeBusiImg);
    for(var i in publicData){
      if(publicData[i].trim() == ''){
        wx.showToast({
          title: '请输入完整信息'
        })
        return false;
      }
    }
    if(storeImg == "" || storeBusiImg== ""){
      wx.showToast({
        title: '请上传图片'
      })
      return false;
    }
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.uploadFile({
      url: cyurl.applyStore,
      header: {
        'content-type': 'multipart/form-data'
      },
      filePath: storeImg,
      name: 'storeImgFile',

      formData:publicData,
      success: function (res) {
        console.log("res", res);
        //
        wx.uploadFile({
          url: cyurl.applyStore,
          header: {
            'content-type': 'multipart/form-data'
          },
          filePath: storeBusiImg,
          name: 'storeBusiImgFile',
          formData:publicData,
          success: function (res) {
            wx.hideLoading()
            console.log("res", res);
            wx.showToast({
              title: '成功,等待审核'
            })
            setTimeout(function(){
              wx.redirectTo({
                url: '/pages/takeoutOrder/my/my',
              })
            },2000)

          },
          fail: function (res) {
            wx.hideLoading()
            wx.showToast({
              title: '操作失败' + res
            })
          }
        })
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '申请失败' + res
        })
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})