// page/mine/moneyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:6,
    mlist:{list:[]},
    showtext: '正在加载...'


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的保证金',
    })
    this.getbzj();
    // wx.setTopBarText({
    //   text: '我的保证金',
    // })

  },
  getbzj:function(){
    getApp().get('user/transLog?page='+this.data.page+'&size='+this.data.size).then(res=>{
      if (res.list && res.list.length>0){
        var temp = this.data.mlist.list;
        if(temp.length>0){
          for (var i in res.list) {
            temp.push(res.list[i])
          }
          this.setData({
            'mlist.list': temp
          })
        }else{
          if(this.data.page == 1 && res.length<this.data.size){
             
              this.setData({
                showtext: ''
              })
             
          }
          this.setData({
            mlist: res
          })

        }
        
      }else{

        this.setData({
          showtext:'没有了'
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
    var t = this.data.page+1;
    this.setData({
      page:t
    })
    this.getbzj();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})