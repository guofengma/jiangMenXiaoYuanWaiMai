
import cyurl from "../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showcolor: "",
    current: '0',
    fromPage: '',
    bean: [
      // {
      //   linker: '曾思奇',
      //   linkerPhone: '13067237422',
      //   schoolId: '五邑大学',
      //   buildingId: "11栋305室",
      //   addrDetail: "广东省广州市黄埔区xxx一号",
      //   isDeft: "1"
      // }, {
      //   linker: '曾思奇',
      //   linkerPhone: '13027760892',
      //   schoolId: '五邑大学',
      //   buildingId: "11栋608室",
      //   addrDetail: "广东省广州市黄埔区xxx二号",
      //   isDeft: "0",
      //   seqId: ''
      // }
    ],
  },

  //编辑地址
  redact(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    let bean = that.data.bean;
    let addr = bean[index];
    addr = JSON.stringify(addr)
    wx.navigateTo({
      url: "/pages/deliveryAddress/bianJi/bianJi?addr="+addr
    })

  },

  //弹出删除确认窗口
  confirmDelete: function (e) {
    let seqId = e.currentTarget.dataset.seqId;
    console.log(seqId)
    var that = this;
    var openId = wx.getStorageSync("openId")

    wx.showModal({
      title: '提示',
      content: '确定要删除该地址？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: cyurl.dellAdress,
            data: {
              openId: openId,
              seqId: seqId
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                bean: res.data.list
              })

              that.getAdress()

            }
          })
        }
      }

    })
  },

  //设置默认地址
  checkboxChange: function (e) {
    let that = this;
    let seqId = e.currentTarget.dataset.seqId
    let isDeft = e.currentTarget.dataset.isDeft
    let openId = wx.getStorageSync("openId")

    if (isDeft == 1){
      return
    }

    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.editAdress,
      data: {
        openId: openId,
        seqId: seqId,
        isDeft: 1,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        console.log("设置默认地址 res -->",res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '操作成功',
          })
          //获取地址列表
          that.getAdress()
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          icon: "none",
          title: '设置失败',
        })
      },

    })
    
  },


  addSite: function () {
    console.log("新增地址")
    wx.navigateTo({
      url: '/pages/deliveryAddress/edit/edit',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.showcolor),
      console.log("fromPage:", options.fromPage);
   

      this.setData({
        fromPage: options.fromPage
      })
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
    //获取地址列表
    this.getAdress()
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
  onShareAppMessage: function () {

  },

  //获取地址列表
  getAdress: function () {
    var that = this;
    var openId = wx.getStorageSync("openId")
    wx.request({
      url: cyurl.listAdress,
      data: {
        openId: openId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          bean: res.data.list
        })
      }
    })

  },

  
  getAddressData: function (e) {

    let that = this;
    let schoolName = that.data.bean[e.currentTarget.dataset.currid].schoolName
    let buildingName = that.data.bean[e.currentTarget.dataset.currid].buildingName
    let addrDetail = that.data.bean[e.currentTarget.dataset.currid].addrDetail
    let linker = that.data.bean[e.currentTarget.dataset.currid].linker
    let linkerPhone = that.data.bean[e.currentTarget.dataset.currid].linkerPhone
    let schoolId = that.data.bean[e.currentTarget.dataset.currid].schoolId
    let seqId = e.currentTarget.dataset.seqId;
    console.log(buildingName)
    wx.setStorageSync('schoolName', schoolName)
    wx.setStorageSync('buildingName', buildingName)
    wx.setStorageSync('addrDetail', addrDetail)
    wx.setStorageSync('linker', linker)
    wx.setStorageSync('linkerPhone', linkerPhone)
    wx.setStorageSync('schoolId', schoolId)
    wx.setStorageSync('addrSeqId', seqId)

    //如果是来自订单页面
    if (this.data.fromPage == 'order') {
      wx.navigateBack({
        delta: 1,
      })
    }
  }

})