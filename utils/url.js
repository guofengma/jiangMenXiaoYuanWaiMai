var zsLedUrl = "https://smarthome.yancloud.cn/cymall/m";//生产环境
var zsLedUrl = "http://wechatmp.bingosale.net:4902/cymall/m";//测试路径
//var zsLedUrl = "http://wechatmp.bingosale.net:4908/cymall/m";//测试路径


// var zsLedUrl = "https://mp.goumisong.com/cymall/m";//测试路径




// var zsLedUrl = "http://192.168.10.110:8080/cymall/m";
// var zsLedUrl = "http://192.168.10.110:8080/cymall/m";
// var zsLedUrl = "http://192.168.10.124:8080/cymall/m";
//客户的身份标识
var oid = '1805050001';//1805050001


export default {
  //获取openId
  getOpenId: zsLedUrl+"/member/getOpenId.do?oid=" + oid,
  //保存会员
  saveMember: zsLedUrl + "/member/updateWxInfo.do?oid=" + oid,

  //获取会员mbId
  getMbId:zsLedUrl+"/member/getByOpenId.do?oid=" + oid,


  // 获取轮播图
  imgUrl: zsLedUrl + "/mall/getSlideImgs.do?oid=" + oid,

  // 获取广告图
  AdvsUrl: zsLedUrl + "/mall/getMallAdvs.do?oid=" + oid,
  // 优惠券中心
  mallticketList: zsLedUrl + "/mallticket/list.do?oid=" + oid,
  // 我的优惠券
  mallticketGetMyList: zsLedUrl + "/mallticket/getMyList.do?oid=" + oid,
  // 我的优惠券
  getByOpenId: zsLedUrl + "/mallticket/getByOpenId.do?oid=" + oid,
  
  // 获取商城公告
  getNoticesUrl: zsLedUrl + "/mall/getNotices.do?oid=" + oid,
  // 推荐商品
  recGoodsUrl: zsLedUrl + '/goods/getRecGoods.do?oid=' + oid,
  //首页推荐分类
  getHomeRecClaList: zsLedUrl + '/cla/getHomeRecClaList.do?oid=' + oid,
  //推荐分类
  getRecClaList: zsLedUrl + '/cla/getClaListLevelTwo.do?oid=' + oid,
  // 分类列表

  claListUrl: zsLedUrl + '/cla/getClaListLevelTwo.do?oid=' + oid,

  // 商品列表
  goodsListUrl: zsLedUrl + '/goods/getGoodsList.do?oid=' + oid,
  // 商品详情
  goodsDetailUrl: zsLedUrl + '/goods/getGoodsDetail.do?oid=' + oid,

  //商品所属门店
  goodStore: zsLedUrl + '/cymall/m/supplier/getById.do?oid=' + oid,

  // 优惠劵列表
  couponListUrl: zsLedUrl + '/mallticket/list.do?oid=' + oid,
  // 领取优惠劵
  getCouponUrl: zsLedUrl + '/mallticket/getByOpenId.do?oid=' + oid,
  // // 我的优惠劵
  myCoupon: zsLedUrl + '/mallticket/getMyList.do?oid=' + oid,


  // // 绑定手机-发短信
  // bindPhoneUrl: ' http://192.168.10.254:8080/smarthome/smsApi/sendVerifyCode.do',
  // // 绑定手机-验证短信
  // bindPhoneMailUrl: smarthomeUrl + '/member/validateSms.do?oid=' + oid,

  //营销活动
  activityUrl: zsLedUrl + '/discountActivity/list.do?oid=' + oid,

  // 营销产品
  activityList: zsLedUrl + '/discountGoods/list.do?oid=' + oid,


  //  评价列表
  goodsEvaluateUrl: zsLedUrl + '/goodsevaluate/list.do?oid=' + oid,

  // 保存评价
  saveEvaluateUrl: zsLedUrl + '/goodsevaluate/save.do?oid=' + oid,

  // 保存订单
  saveGoodsUrl: zsLedUrl + '/order/saveWithGoodsIds.do?oid=' + oid,

  // 订单列表
  orderListUrl: zsLedUrl + '/order/getOrderList.do?oid=' + oid,

  // 确认收货
  orderFinishUrl: zsLedUrl + '/order/confirmFinish.do?oid=' + oid,
  // 取消订单
  orderCencelUrl: zsLedUrl + '/order/cancel.do?oid=' + oid,
  payOrder: zsLedUrl + '/order/payOrder.do?oid=' + oid,

  // 订单详情
  orderDetailUrl: zsLedUrl + '/order/getOrderDetail.do?oid=' + oid,

  // 保存进入会员
  saveEnterGoodsDetail: zsLedUrl + '/member/saveEnterGoodsDetail.do?oid=' + oid,
  // 删除进入会员
  delExitGoodsDetail: zsLedUrl + '/member/delExitGoodsDetail.do?oid=' + oid,
  // 获取商品详情内的会员列表
  listInGoodsDetail: zsLedUrl + '/member/listInGoodsDetail.do?oid=' + oid,
  // 获取本商品下单的会员列表
  listMembHadOrder: zsLedUrl + '/order/listMembHadOrder.do?oid=' + oid,

  //校园公告 -- 获取公告列表
  noticeList: zsLedUrl + '/info/listSimple.do?oid='+oid,

  //校园公告 -- 公告详情
  noticeDetail: zsLedUrl + '/info/getByIdSimple.do?oid='+oid,

  //信息发布 -- 帖子分类
  bbsCates: zsLedUrl + '/info/typeList.do?oid='+oid,

  //信息发布 -- 帖子列表
  bbsList: zsLedUrl + '/info/listSimple.do?oid='+oid,

  //信息发布 -- 获取帖子详情
  getByIdSimple: zsLedUrl+"/info/getByIdSimple.do?oid="+oid,

  //信息发布 -- 保存评论
  saveReplySimple:zsLedUrl+"/inforeply/saveReplySimple.do?oid="+oid,

  //信息发布 -- 点赞功能
  saveLike:zsLedUrl+"/info/saveLikeNum.do?oid="+oid,

  //发布
  issue: zsLedUrl+'/infodetail/save.do?oid='+oid,

  //发布 无图片
  issueNoImg: zsLedUrl+'/infodetail/saveNoImg.do?oid='+oid,

  //外卖 -- 获取推荐的分类列表（门店）
  recCateList:zsLedUrl+"/storetype/listRec.do?oid="+oid,

  //外卖 -- 获取推荐的店铺列表
  recStoreList:zsLedUrl+"/storeinfo/listRec.do?oid="+oid,

  //外卖 -- 获取店铺列表（根据分类） /  根据搜索词
  cateStoreList:zsLedUrl+"/storeinfo/list.do?oid="+oid,

  //店铺详情     storeinfo/getById.do
  storeinfo: zsLedUrl + "/storeinfo/getById.do?oid=" + oid,
  getByIdDetail: zsLedUrl +"/storeinfo/getByIdDetail.do?oid="+oid,

  //店铺评价
  storecomment:zsLedUrl+"/storecomment/list.do?oid="+oid,

  //外卖 -- 生成外卖订单
  createTakeoutOrder: zsLedUrl +"/order/saveTakeout.do?oid="+oid,

  //门店申请（外卖门店）
  applyStore:zsLedUrl+"/storeinfo/saveNhxy.do?oid="+oid,

  //配送员今日订单
  deliveryTodayOrder:zsLedUrl+"/storedeliveryorder/listToday.do?oid="+oid,

  //配送员所有订单
  storedeliveryorder:zsLedUrl+"/storedeliveryorder/list.do?oid="+oid,

  //评价外卖订单
  orderComment:zsLedUrl+"/ordercomment/save.do?oid="+oid,

  //身份判定 -- 校园配送员
  deliveryIdentity:zsLedUrl+"/member/judgeNhxyDelivery.do?oid="+oid,

  //身份判定 -- 校园门店管理
  storeIdentity:zsLedUrl+"/member/judgeNhxyMng.do?oid="+oid,

  //登录到店铺
  loginStore:zsLedUrl+"/member/loginStore.do?oid="+oid,

  //申请提现
  withdrawal:zsLedUrl+"/memberwithdraw/save.do?oid="+oid,

  //配送员登录
  deliveryLogin:zsLedUrl+"/storedeliveryman/loginJm.do?oid="+oid,

  //门店所有订单
  storeAllOrder: zsLedUrl +"/order/listTakeout.do?oid="+oid,

  //门店销售结算
  ordersettledetail: zsLedUrl + "/ordersettledetail/list.do?oid="+oid,

  //店铺销售明细
  listTakeoutByDate: zsLedUrl +"/order/listTakeoutByDate.do?oid="+oid,
  
  // 获取地址列表
  listAdress:zsLedUrl+"/membaddr/list.do?oid="+oid,

  // 添加地址列表
  addlistAdress: zsLedUrl + "/membaddr/save.do?oid=" + oid,

  // 获取学校楼栋列表
  getShchoolList:zsLedUrl+"/schoolinfo/listbuilding.do?oid="+oid,

  // 删除地址
  dellAdress: zsLedUrl + "/membaddr/delete.do?oid=" + oid,

  // 7.3.4编辑收货地址/设置默认
  editAdress: zsLedUrl + "/membaddr/update.do?oid=" + oid,

 //配送员信息
  storedeliveryman: zsLedUrl + "/storedeliveryman/getById.do?oid=" + oid,

  // 7.2.9接单设置
  jdSet:zsLedUrl+"/storedeliveryman/updateIsWork.do?oid="+oid,

  // 7.2.3我的配送订单列表
  myPsOrderList:zsLedUrl+"/orders/listByDevice.do?oid="+oid,

  //7.2.4已送达订单列表
  ysdOrderList:zsLedUrl+"/order/listSendByManId.do?oid="+oid,

  // 7.2.5订单详情
  psyOrderDetail:zsLedUrl+"/order/getOrderDetail.do?oid="+oid,

  // 7.2.7平台配送员我的收益
  wdsy:zsLedUrl+"/order/listCompEarnings.do?oid="+oid,

  // 7.2.6更改订单状态
  ggddzt:zsLedUrl+"/orders/updateState.do?oid="+oid,

  // 7.2.8学生配送员我的收入
  getxssr:zsLedUrl+"/order/listStuEarnings.do?oid="+oid,

  // 2.52关于我们
  about: zsLedUrl + "/aboutus/get.do?oid=" + oid,

  //外卖下单
  saveWmOrder: zsLedUrl + "/order/saveTakeoutJiangMen.do?oid=" + oid,

  //门店登录
  mddl:zsLedUrl+"/storeinfo/loginJMXY.do?oid="+oid,

  //收货
  changeOrderState:zsLedUrl+"/orders/updateState.do?oid="+oid,

  //门店最新十条销售记录
  storeTenLog: zsLedUrl + "/order/TakeoutByTenRecords.do?oid=" + oid,

  //销售商品明细统计
  storeGoodsMinXi:zsLedUrl+"/storeinfo/listGoodsNumByStoreId.do?oid="+oid,

}
