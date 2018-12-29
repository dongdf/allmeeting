// page/mine/mineInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mine:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人信息',
    })
    
  },
  getmineinfo() {
    getApp().get('user/findUserInfo').then(res => {
      console.log(res);
      this.setData({
        mine: res
      })

    },error=>{
      wx.showModal({
        title: '',
        content: error.info,
      })
    })
  },
  uploadHead:function(){
    var that = this;

    wx.chooseImage({
      count: 1,
      sourceType:['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        var filePath = res.tempFilePaths[0];
        // wx.showModal({
        //   title: '开始上传',
        //   content: filePath,
        // })
        getApp().uploadmedia('user/savePhoto', filePath).then(res =>{
          console.log(res);
          that.setData({
            'mine.avatarurl':res
          })
        })
        
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {

      }
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
    this.getmineinfo();

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