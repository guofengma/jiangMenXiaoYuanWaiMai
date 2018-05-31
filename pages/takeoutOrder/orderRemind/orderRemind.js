Page({

  /**
   * 页面的初始数据
   */
  data: {
    seqId:"",
    storeId:'',
    // 订单对象
    orderDetail:{
      orderSn:"",
      storeName:'',
      storePhone1:'',
      storeAddr:'',
      orderBuildName:'',
      orderBuildManName:'',
      orderBuildManPhone:"",
      createTime:"",
      deliveryManName:"",
      deliveryManPhone:'',
      orderState:""

    },
    // 食物类表
    goodsList :[{
      goodsName:"",
      goodsImg:'',
      goodsPrice:"",
      goodsNum:""
    }],
    // 收货人信息
    addrBean:{
      linker:'', 
      linkerPhone:'',
      schoolName: '', 
      buildingName:'',
      addDetail:''
    }
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  onShareAppMessage: function () {
    
  },
  getGoods:function(){
  console.log("dianji")
  }

})