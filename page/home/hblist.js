// page/home/hblist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdetailInfo:false,
    mid:'',
    lateList:{},
    hbList: {},
    hbTotal:'',
    signList: {},
    hbInfo:{},
    signTotal:'',
    lateTotal:'',
    memberlist:[],
    meetinginfo:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.mid){
      this.setData({
        mid:options.mid
      })
      // this.getlateList()
      // this.getsignList()
      this.getmeber();
      this.getmeeting();
    }

  },
  isshowInfo:function(){
    if (this.data.showdetailInfo){
      this.setData({
        showdetailInfo:false
      })
    }else{
      this.setData({
        showdetailInfo: true
      })
    }
  },
  getmeber() {
    getApp().get('member/lists?id=' + this.data.mid + 'page=1&size=800').then(res => {
      if (res) {
        this.setData({
          memberlist: res
        })
      }

    })
  },
  getmeeting: function () {
    var that = this;
    getApp().get('affair/find?id=' + this.data.mid).then(res => {
      var temp = new Date(res.active_time).getTime()
      var stemp = res.active_time;
      res.active_time = getApp().datetostring(res.active_time, 'yyyy-MM-dd ww hh:mm')
      this.setData({
        meetinginfo: res
      })
      

    })
  },
  gethbList:function(){

    getApp().get('member/hongbao?page=1&size=1000&late=1&id=' + this.data.mid).then(res => {
      var t = 0;
      // for (var i in res.list) {
      //   t += parseFloat(res[i].list.promise_money)

      // }
      console.log(res);
      this.setData({
        hbInfo: res
      })
      console.log(this.data.hbInfo)
    })

  },
 
  getsignList: function () {//未迟到

    getApp().get('member/hongbao?page=1&size=1000&id=' + this.data.mid).then(res => {
      var t = 0;
      // for (var i in res.list) {
      //   t += parseFloat(res.list[i].promise_money)

      // }
      this.setData({
        signList: res,
        signTotal: t.toFixed(2)
      })
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

  }
})