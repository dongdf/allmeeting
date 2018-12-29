// page/home/joins.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetid: '',
    selectNumb:[],
    memberlist: [],
    isrepeat:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '确认签到',
    })
    if (options.id) {
      this.setData({
        meetid: options.id
      })
      this.getmeber();
    }
  },
  confirmLate:function(e){
    getApp().globalData.allperson = this.data.selectNumb;
    wx.redirectTo({
      url: './confirms_order?id=' + this.data.meetid,
    })
    return false;
    let that =this;
    getApp().post('index/fomrids', { formId: e.detail.formId });
    wx.showModal({
      title: '提示',
      content: '勾选的人确认签到了吗？',
      success:function(res){
        if (res.confirm) {
          if (that.data.isrepeat){
            return false;
          }
          that.setData({
            isrepeat:true
          })
          wx.showLoading({
            title: '请稍后',
          })
          getApp().post('affair/orgerCloseAffair',{
            users:JSON.stringify(that.data.selectNumb),
            id: that.data.meetid
          }).then(ret=>{
            wx.hideLoading()
            that.setData({
              isrepeat: false
            })
            wx.showToast({
              title: '操作成功',
            })
            setTimeout(() => {
              wx.redirectTo({
                url: './detail?mid=' + that.data.meetid,
              })
            }, 1500)

          },error=>{
            wx.hideLoading()
            that.setData({
              isrepeat: false
            })
            wx.showToast({
              title: error.info,
              image: '/image/tips.png',
            })
            setTimeout(()=>{
              wx.redirectTo({
                url: './detail?mid=' + that.data.meetid,
              })
            },1500)
            
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  checkboxChange(e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var s = e.detail.value;
    var amember = this.data.memberlist;
    for (var i in amember){
      amember[i].type = 2;
    }
    // console.log(amember);
    // return false;
    
    for(var i in s){
      var idx = amember.findIndex(function(item){
        return s[i] == item.open_id
      })
      console.log(idx)
      // console.log(idx);
      if(idx>=0){
        amember[idx].type =1
      }

    }
    this.setData({
      selectNumb:amember
    })
    console.log(amember);
   
  },
  getmeber() {
    getApp().get('member/lists?id=' + this.data.meetid + 'page=1&size=99999').then(res => {
      if (res) {
        this.setData({
          memberlist: res
        })
        var temp = res
        var tempArray = []
        for (var i in temp){
          temp[i].type = 1
          tempArray.push(temp[i])
        }
        this.setData({
          selectNumb: tempArray
        })
        console.log(tempArray)
      }

    })
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