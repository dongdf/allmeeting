// page/mine/mineName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '姓名',
    })
    if (options.citem) {
      this.setData({
        nickname: options.citem
      })
    }

  },
  updateMine: function (e) {
    console.log(e);
    var update = {
      formId: e.detail.formId,
      name: e.detail.value.nickname

    }
    getApp().post('user/upUser', update).then(res => {
      wx.showToast({
        title: '修改成功',
      })
      setTimeout(() => {
        wx.navigateBack({
        })
      }, 1500)


    })
  },
  resetf: function () {
    this.setData({
      nickname: ''
    })
  },
  hisback: function () {
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