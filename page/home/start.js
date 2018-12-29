// page/home/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '',
    })

  },
  bindGetUserInfo: function (e) {
    console.log(e);
    var that = this;

    if (e.detail.rawData) {
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log(res);
            wx.showLoading({
              title: '登录中..',
            })
            //发起网络请求
            getApp().get('login/getOpenIdByCode?code=' + res.code).then(opres => {
              // wx.showModal({
              //   title: '44',
              //   content: '44',
              // })
              wx.setStorageSync('ppid', opres.openid);
              getApp().post('login/login',JSON.parse(e.detail.rawData)).then(info=>{
                // wx.showModal({
                //   title: '12',
                //   content: '12',
                // })
                wx.hideLoading();
                wx.redirectTo({
                  url: '../home/index',
                })

              })

            },error=>{
              wx.showModal({
                title: '提示',
                content: JSON.stringify(error),
              })
            })
          } else {
            wx.showToast({
              title: 'wxlogin获取code失败',
            })
          }
        },

      });


    } else {
      wx.showModal({
        title: '提示',
        content: '请允许否则无法正常使用',
      })
      // wx.showToast({
      //   title: '请点击允许',
      //   image: '/image/tips.png',
      // })
    }


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