// page/mine/active.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    lists:[],
    page:1,
    state:true,
    showtext:'正在加载...',
    size:10

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.tab ==2){
      
      this.setData({
        active:2,
        state:false,
      })
      this.getalllist(true);
    }else{
      
      this.setData({
        active: 1,
        state: false,
      })
      this.getalllist(false);
    }
    
    wx.setNavigationBarTitle({
      title: '我的活动',
    })

  },
  getalllist: function () {//0：进行中，1：待关闭，2：活动结束
    getApp().post('affair/lists?page='+this.data.page+'&size='+this.data.size, {
      isme: this.data.state
    }).then(res => {
      if ((!res || res.list.length == 0 )){
        // wx.showToast({
        //   title: '没有了',
        // })
        this.setData({
          showtext:'没有了'

        })
      }else{
        if(this.data.page == 1 && res.list.length<this.data.size){
          this.setData({
            showtext: ''
          })
        }
        var temp = this.data.lists;
        for(var i in res.list){
           
          res.list[i].active_time = getApp().datetostring(res.list[i].active_time, 'MM-dd ww hh:mm')
          
          temp.push(res.list[i]);
        }
        this.setData({
          'lists': temp
        })
        
      }
      

    },error=>{
      wx.showToast({
        title: error.info,
      })
    })

  },
  changetab:function(e){
    this.setData({
      lists:[],
      showtext: '正在加载...',
      page:1,
      size:10,
      active:e.target.dataset.tabidx
    })
    if (e.target.dataset.tabidx == 1){
      this.setData({
        state:true
      })
       
    }else{
      this.setData({
        state: false
      })
      
    }
    this.getalllist();
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
    var x = this.data.page+1;
    this.setData({
      page:x
    })
    this.getalllist();


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})