// pages/citywide/issue/issue.js
import cyurl from "../../../utils/url";
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'MUYBZ-O63RP-GKFD3-LCYIK-R263H-OQB43'
});

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:"佛山市",//地理位置
    bbsCates: [
      {
        seqId: 1,
        typeName: "平板电脑"
      },
      {
        seqId: 2,
        typeName: "笔记本"
      }
    ],
    index:0,
    infoContent:"",
    tempFilePaths:[],
    postAddr: "华南理工大学"
  },

  //自动获取经纬度
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

        //根据经纬度获取地址名称
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

  //根据经纬度获取地址名称
  getAddrName: function () {
    var that = this;
    var longitude = this.data.userLg;//经度
    var latitude = this.data.userLa;//纬度
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log("根据经纬度获取地址名称 -->", res);
        var address = res.result.address;
        var recommend = res.result.formatted_addresses ? res.result.formatted_addresses.recommend : '';
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


  //打开地图选择地理位置 具体地点
  getAddr: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log("选择地理位置", res)
        var addrName = res.name;
        var address = res.address;
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("addrName", addrName);
        console.log("address", address);

        that.setData({
          userLa: latitude,
          userLg: longitude,
          location: addrName
        });

      }
    })
  },

  //获取分类信息
  getbbsCates: function () {
    var that = this;
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.bbsCates,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("获取分类信息-->",res)
        if (res.data.code == 0) {
          var bbsCates = res.data.list;
          that.setData({
            bbsCates: bbsCates
          })
          wx.hideNavigationBarLoading()
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }

      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '加载失败'
        })
      }
    })
  },
  //选择分类(业务类型)
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //键盘事件触发保存 textarea中文字
  saveMsg:function(e){
    var msg = e.detail.value;
    this.data.infoContent = msg;
  },
  //选择图片
  chooseImage:function(){
    var that = this;
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var newTempFilePaths = that.data.tempFilePaths.concat(tempFilePaths);
        that.setData({
          tempFilePaths: newTempFilePaths
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

  //删除图片
  deleteImg:function(e){
    var idx = e.currentTarget.dataset.idx;
    var newTempFilePaths = this.data.tempFilePaths;
    newTempFilePaths.splice(idx, 1);
    this.setData({
      tempFilePaths: newTempFilePaths
    })
  },
  //保存手机号 键盘事件触发
  savePhone:function(e){
    var phone = e.detail.value;
    this.setData({
      infoPhone:phone
    })
  },
  //发布
  issue:function(){
    var that = this;
    var infoImg = that.data.tempFilePaths;
    var phone = that.data.infoPhone;
    var infoContent = that.data.infoContent;
    if (infoContent.trim().length == 0){
      wx.showToast({
        icon: "none",
        title: "请输入正文"
      });
      return false;
    }
    if (!that.isPhone(phone)){
      wx.showToast({
        icon:"none",
        title: "请输入正确的电话号码"
      });
      return false;
    }
    if (infoImg.length){
      that.upload();
    }else{
      that.uploadNoImg();
    }

  },
  //发布:有图片时
  upload: function (i, seqId){
    var i = i || 0;
    var that = this;
    var infoImg = that.data.tempFilePaths;
    let openId = wx.getStorageSync("openId");

    var formData = {
      openId: openId,
      busiType: "nhxyTakeout",
      infoContentStr: that.data.infoContent,
      infoPhone: that.data.infoPhone,
      postAddr: that.data.location,
      typeId: that.data.bbsCates[that.data.index].seqId
    };

    if (seqId) {
      formData.seqId = seqId
    };
    console.log("formData -->", formData);

    wx.uploadFile({
      url: cyurl.issue,
      header: {
        'content-type': 'multipart/form-data'
      },
      filePath: infoImg[i],
      name: 'imgFile',
      formData: formData,
      success: function (res) {
        console.log("上传图片>res", res);
        var seqId = seqId || JSON.parse(res.data).seqId
        i++;
        console.log(i)
        if (i < that.data.tempFilePaths.length) {
          that.upload(i, seqId);
        } else {
          console.log("iiiiiiiii", i);
          wx.showToast({
            title: '发布成功'
          });
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/citywide/index/index',
            })
          },2000)
        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '加载失败' + res
        })
      }
    })
  },

  //发布 无图片时
  uploadNoImg:function(){
    var that = this;
    wx.showLoading();
    let openId = wx.getStorageSync("openId");
    wx.request({
      url: cyurl.issueNoImg,
      data:{
        openId: openId,
        busiType:"nhxyTakeout",
        infoContent: that.data.infoContent,
        infoPhone: that.data.infoPhone,
        postAddr: that.data.location,
        typeId: that.data.bbsCates[that.data.index].seqId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: "发布成功",
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/citywide/index/index',
            })
          },2000)
        } else {
          wx.showToast({
            title: res.data.msg,
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
  //手机号或座机号验证
  isPhone:function(val){
    var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if (pattern.test(val)){
      return true;
    } else {
      return false;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar("tabbar3");//同城: tabbar3
    this.getbbsCates();//信息分类
    this.getLocation();//获取地理位置
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}

})