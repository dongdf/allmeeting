// page/home/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mashow:false,
    curMa:'',
    gamelist:[]

  },
  showmas:function(e){
    console.log(e.currentTarget.dataset.idx);
    var idx = e.currentTarget.dataset.idx;
    var objpic = this.data.gamelist[idx].maImg;
    var imgarray =[];
    imgarray.push(objpic)
    wx.previewImage({
      current: objpic, // 当前显示图片的http链接
      urls: imgarray // 需要预览的图片http链接列表
    })
  },
  closeshowmas: function () {
    this.setData({
      mashow: false

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '精品小游戏',
    })
    this.getGame();
  },
  getGame:function(){
    var that =this;
    wx.request({
      url: 'https://ddf.my12399.com/games/game.json',
      success:function(res){
        console.log(res.data)
        that.setData({
          gamelist:res.data
        })
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