import cyurl from "../../../utils/url";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    loudong: true,
    linker: "",
    linkerPhone: '',
    schoolName: "",
    buildingName: "",
    addrDetail: '',
    actionlou: true,
    selects: "选择学校",
    List: [],
    schoolList: [],
    shchoolBuildList: [],
    index: 0,
    schoolId: '',
    buildingId: '',
    buildIndex: 0,
    seqId: '',
    show: "请选择学校",
    showBuild: "请选择楼栋"
  },

  //保存详细地址
  saveAddrDetail: function (e) {
    let that = this;
    let value = e.detail.value;
    that.setData({
      addrDetail: value
    })
  },


  //位置选择弹出框
  listenerActionSheet: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  
  // 去选择楼
  toTower: function () {
    console.log("123")
    this.setData({
      actionSheetHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取地址列表
    this.getAdress()
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


  // 添加新地址
  addAdress: function () {
    var that = this;
    var openId = wx.getStorageSync("openId")
    let linker = that.data.linker;
    let linkerPhone = that.data.linkerPhone;
    let addrDetail = that.data.addrDetail;

    //手机号验证
    let pattern = /(^1[3456789][0-9]{9}$)/;
    if (!pattern.test(linkerPhone)) {
      wx.showToast({
        icon: "none",
        title: "手机号错误"
      })
      return
    }
    if (linker == '' || linker == undefined){
      wx.showToast({
        icon: "none",
        title: "联系人为空"
      })
      return
    }

    if (addrDetail == '' || addrDetail == undefined) {
      wx.showToast({
        icon: "none",
        title: "请输入详细地址"
      })
      return
    }

    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.request({
      url: cyurl.addlistAdress,
      data: {
        openId: openId,
        linker: linker,
        linkerPhone: linkerPhone,
        schoolId: that.data.schoolId,
        buildingId: that.data.buildingId,
        addrDetail: addrDetail
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        wx.showLoading({
          title: '操作成功',
          mask: true,
          success: function (res) {
            wx.navigateBack({
              delta: 1,
            })
          },
        })
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          icon: "none",
          title: '增加失败',
        })
      },

    })

  },

  // 获取联系人
  bindNameInput: function (e) {
    this.setData({
      linker: e.detail.value
    })
  },

  // 获取电话
  bindNumInput: function (e) {
    this.setData({
      linkerPhone: e.detail.value
    })
  },

  // 获取地址列表
  getAdress: function () {
    var that = this;
    var openId = wx.getStorageSync("openId")
    wx.request({
      url: cyurl.getShchoolList,
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          schoolList: res.data.list,
          show: ''
        })
        console.log(res.data.list)
        //给楼栋赋值
        if (res.data.list.length > 0) {
          let school = res.data.list[0];
          if (school != undefined && school.buildList.length > 0) {
            that.setData({
              shchoolBuildList: school.buildList,
              showBuild: '',
              schoolId: school.seqId,
              buildingId: school.buildList[0].seqId,
              addrDetail: school.schoolName + school.buildList[0].buildName
            })
          }
        }

      }
    })
  },

  // 改变
  bindPickerChange: function (e) {
    let index = e.detail.value
    console.log('picker发送选择改变，携带值为', index)

    if (this.data.schoolList != undefined && this.data.schoolList.length >= index) {
      //获取到学校信息
      let school = this.data.schoolList[index];
      let schoolId = school.seqId;
      console.log("schoolId:", schoolId);
      //楼栋信息
      let buildList = school.buildList
      console.log("buildList: ", buildList)
      //设置默认选择了第一个楼栋
      if (buildList != undefined && buildList.length > 0) {
        this.setData({
          buildingId: buildList[0].seqId,
          // addrDetail: school.schoolName,
          showBuild: ''
        })
      }

      this.setData({
        index: e.detail.value,
        shchoolBuildList: buildList,
        schoolId: schoolId,
        show: "",

      })
    }

  },

  // 楼  
  bindPickerBuildChange: function (e) {
    let index = e.detail.value
    console.log("buildIndex:", index)

    if (this.data.shchoolBuildList != undefined && this.data.shchoolBuildList.length >= index) {
      let build = this.data.shchoolBuildList[index];

      console.log("build:", this.data.shchoolBuildList[index].buildName)
      this.setData({
        buildingId: build.seqId,
        showBuild: "",
        buildIndex:index
        // addrDetail: this.data.addrDetail + this.data.shchoolBuildList[index].buildName
      })
    }

  }

})