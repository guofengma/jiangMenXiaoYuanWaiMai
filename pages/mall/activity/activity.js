import cyurl from "../../../utils/url";
Page({
  data: {
    
  },

 getActivity:function(e){
   var that=this;
   wx.request({
     url: cyurl.activityUrl,
     data: {
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded'
     },
     success: function (res) {
       console.log(res)
       var discountActivityList = res.data.discountActivityList;
       that.setData({
         discountActivityList: discountActivityList
       })
     },
     fail: function (res) {
       wx.showToast({
         title: res.data.msg
       })
     }
   })
 },


  onActivityTab:function(event){
    var index = event.currentTarget.dataset.index;
    var seqId = event.currentTarget.dataset.seqid;
    console.log(index)
    switch(index){
      case 0:
      wx.navigateTo({
        url: 'activity-list/index?index=' + index + '&seqId=' + seqId,
      })
      break;
      case 1:
        wx.navigateTo({
          url: 'activity-list/index?index=' + index + '&seqId=' + seqId,
        })
      break;
      case 2:
        wx.navigateTo({
          url: 'activity-list/index?index=' + index + '&seqId=' + seqId,
        })
      break;
      case 3:
        wx.navigateTo({
          url: 'activity-list/index?index=' + index + '&seqId=' + seqId,
        })
      break;
    }
  },
  onLoad: function (options) {
    this.getActivity()
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})