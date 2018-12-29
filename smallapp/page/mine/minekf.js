// page/mine/minekf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户服务',
    })

  },
  addMessage:function(e){
    // console.log(e);//e.detail.value.title
    // return false;
    var pdata={
      formId: e.detail.formId,
      title: e.detail.value.title,
      content: e.detail.value.content,
      openid:wx.getStorageSync('ppid')
    }
    getApp().post('msg/addmsg',pdata).then(res=>{
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(()=>{
        wx.navigateBack({
          
        })
      },1000)

    },error=>{
      wx.showModal({
        title: 'tips',
        content:JSON.stringify(error),
      })
    })
  },
  hisback:function(){
    wx.navigateBack({
      
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