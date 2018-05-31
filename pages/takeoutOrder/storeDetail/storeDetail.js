import cyurl from "../../../utils/url";
//获取应用实例
const app = getApp()

Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    goodStar: "/images/star-gd.png",
    defaultStar: "/images/star-df.png",
    halfStar: "/images/star-hf.png",
    navbar: ['点菜', '评价', '商家'],
    currentTab: 0,
    showToast: true,
    curIndex: 0,
    isScroll: true,
    toView: 0,

    commentList:[
    ],
    
    //套餐和菜品
    groupList:[
      {
        groupName: '全家桶',
        foodList: [
        ]
      }
    ],
    commentScore:4.7,
    bean:{
      storeAddr:"",
      storeDesc:"",
      storeImgs: [
        // { imgPath: "/images/takeout/store-img.jpg" }
      ],
      seqId:"",
      storeImg:"",
      storeName:"",
      storeScore:4.7,
      saleNum:99,//月销量
      distance:"",//距离
      typeName:"",//所属分类
      storeDistr:"",//所属区域
      startFee:30,//起送
      deliveryFee:5,//配送
      everyFee:16,//人均
      storeLg:"",
      storeLa:"",
      likeNum:88//喜欢人数
    },

    cartData:{
      // "pid": {
      //   num: 0
      // }
    },
    orderInfo:{
      storeImg:"",
      storeName:"",
      totPrice:0,
      totNmu:0,
      deliveryFee:0
    },
    foodDetail:{
      foodImg:"",
      foodName:"",
      foodSaleNum:"",
      foodPrice:"",
    },
    showFoodDetail:false
  },

  //转换当前时间 开始营业时间 结束营业时间 为 分为 单位  
  dateFormate(){
    let that = this;
    let storeStartTime = that.data.bean.storeStartTime
    let storeEndTime = that.data.bean.storeEndTime
    let stratMin = 0;
    let endMin = 0;
    let nowMin = 0;
    if (storeStartTime){
      stratMin += storeStartTime.split(':').map((e,i)=>{
        console.log(e)
        if(i == 0){
          console.log("e * 60",parseInt(e * 60))
          return parseInt(e*60)
        }else{
          console.log('e',parseInt(e))
          return parseInt(e)
        }
      })
    }
    console.log("stratMin", parseInt(stratMin))

    if (storeEndTime) {
      endMin += storeEndTime.split(':').map((e, i) => {
        console.log(e)
        if (i == 0) {
          console.log("e * 60", parseInt(e * 60))
          return parseInt(e * 60)
        } else {
          console.log('e', parseInt(e))
          return parseInt(e)
        }
      })
    }
    console.log("endMin", parseInt(endMin))

    nowMin = new Date().getHours() * 60 + new Date().getMinutes()

    console.log("nowMin", parseInt(nowMin))
    

    that.setData({
      stratMin: parseInt(stratMin),
      endMin: parseInt(endMin),
      nowMin: parseInt(nowMin)
    })

  },

  //联系店家
  callStore: function (e) {
    var infoPhone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: infoPhone //仅为示例，并非真实的电话号码
    })
  },

  imgLoad:function(e){
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewHeight = 650 / ratio;    //计算的高度值
    this.setData({
      height: viewHeight
    })
    console.log("图片加载了啊");
  },

  //点击显示商品大图和详情
  showFood:function(e){
    var that = this;
    var foodImg = e.currentTarget.dataset.foodimg;
    var foodName = e.currentTarget.dataset.foodname;
    var foodSaleNum = e.currentTarget.dataset.foodsalenum;
    var foodPrice = e.currentTarget.dataset.price;
    var foodDetail = {
      foodImg: foodImg,
      foodName: foodName,
      foodSaleNum: foodSaleNum,
      foodPrice: foodPrice
    };
    that.setData({
      foodDetail: foodDetail,
      showFoodDetail:true
    });
  },

  //点击遮罩关闭详情
  closeShow:function(){
    var that = this;
    that.setData({
      showFoodDetail: false
    });
  },

  //增加商品数量
  addProNum:function(e){
    var pid = e.currentTarget.dataset.proid;
    var index = e.currentTarget.dataset.index;
    // console.log("pid", pid);
    var cartData = this.data.cartData;
    if (cartData[pid]){
      cartData[pid].num++;
    }else{
     cartData[pid] = {
       num:1,
       productDetail: this.data.groupList[this.data.curIndex].foodList[index]
       };
    }
    this.setData({
      cartData: cartData
    });
    this.getTotlePrice(); //计算总价
  },
  //减少商品数量
  subProNum:function(e){
    var pid = e.currentTarget.dataset.proid;
    // console.log("pid", pid);
    var cartData = this.data.cartData;
    if (cartData[pid].num >1) {
      cartData[pid].num -=1;
    } else {
      delete cartData[pid];
    }
    this.setData({
      cartData: cartData
    });
    this.getTotlePrice(); //计算总价
  },

  //计算总价  总数量
  getTotlePrice:function(){
    var cartData = this.data.cartData;
    var totPrice = 0;
    var totNmu = 0;
    var orderInfo = this.data.orderInfo;
    for(var i in cartData){
      totPrice += cartData[i].num * parseFloat(cartData[i].productDetail.foodPrice);
      totNmu += cartData[i].num;
    }
    totPrice = totPrice.toFixed(2)
    orderInfo.totPrice = totPrice;
    this.setData({
      orderInfo: orderInfo,
      totNmu: totNmu
    })
  },

  //点菜评价商家 切换
  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: currentTab
    })
  },

  //轮播切换时切换菜单的显示
  setCurrentTab:function(e){
    var index = e.detail.current;
    this.setData({
      currentTab: index
    })
  },

  // 商品分类切换
  switchTab(e) {
    this.setData({
      toView: e.target.dataset.id,
      curIndex: e.target.dataset.index,
    })
  },

  //获取店铺详情
  storeInfo:function(){
    var that = this;
    var seqId = this.data.storeId;
    wx.showNavigationBarLoading()
    wx.request({
      url: cyurl.storeinfo,
      data: {
        seqId: seqId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("店铺详情-->", res)
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          //套餐和菜品
          var groupList = res.data.groupList;
          //评价
          var commentList = res.data.commentList;
          //商家评分
          var commentScore = res.data.commentScore;
          //对象(编号
          // 名称
          // 会所地址
          // 营业时间
          // 会所经度
          // 会所纬度
          // 轮播图片
          // 详情
          // 起送
          // 配送
          // 人均)
          var bean = res.data.bean;
          that.setData({
            groupList: groupList,
            commentList: commentList,
            commentScore: commentScore,
            bean: bean
          })
          that.dateFormate()
        } else {
          wx.showToast({
            icon:'none',
            title: '获取失败',
          })
        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        console.log(res)

      }
    })
  },
  //结算
  commitOrder:function(){
    var orderInfo = this.data.orderInfo;
    orderInfo.storeImg = this.data.bean.storeImg;
    orderInfo.storeName = this.data.bean.storeName;
    orderInfo.storeId = this.data.bean.seqId;
    orderInfo.deliveryFee = this.data.bean.deliveryFee; //配送
    orderInfo.totNmu = this.data.totNmu; //选择的商品数量

    if (orderInfo.totPrice == 0) {
      wx.showToast({
        title: "请选择商品",
      })
      return;
    }

    // orderInfo = JSON.stringify(orderInfo);

    var psrseData = [];

    var cartData = this.data.cartData;
    for(var i in cartData){
      psrseData.push(cartData[i]);
    }

    // psrseData = JSON.stringify(psrseData);
    wx.setStorageSync("cartData", psrseData)
    wx.setStorageSync("wmOrderInfo", orderInfo)

    console.log(orderInfo)
    wx.navigateTo({
      url: '../saveOrder/saveOrder?orderInfo=' + orderInfo,
    })
  },

  //预览图片
  previewImage:function(e){
    var that = this;
    var imgList = that.data.bean.storeImgs;
    var urls = [];
    for(let i in imgList){
      urls.push(imgList[i].imgPath);
    }
    var current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var storeId = options.seqId;
    this.setData({
      storeId: storeId
    })
    // app.editTabBar()
    this.storeInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})