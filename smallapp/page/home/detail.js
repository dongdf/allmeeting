// page/home/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    meetingpic:[],
    showdetailInfo:false,
    xieyi:true,
    jointShow:false,
    isboxed:false,
    seatList: [
      { name: '10分钟前', value: 10 },
      { name: '30分钟前', value: 30 },
      { name: '1个小时前', value: 60 },
      { name: '2小时前', value: 120 },
      { name: '1天前', value: 60 * 24 },
      { name: '不提醒', value: 0 }
    ],
    seatidx:0,
    isauth:false,
    isconfirm:false,
    isstaring:false,
    meetinginfo:{},
    zfsign:true,
    mineinfo:{},
    meetid:'',
    myopenid:'',
    memberlist:[],
    mineName:'',
    minePhone:'',
    mininshow:false,
    optBtns: { optBtns:false}

  },
  isshowInfo: function () {
    if (this.data.showdetailInfo) {
      this.setData({
        showdetailInfo: false
      })
    } else {
      this.setData({
        showdetailInfo: true
      })
    }
  },
  xieyiact: function () {
    if (this.data.xieyi) {
      this.setData({
        xieyi: false,
      })
    } else {
      this.setData({
        xieyi: true,
      })
    }
  },
  closejoin:function(){
    this.setData({
      jointShow:false
    })
  },
  bindSeatChange: function (e) {//剩余座位
    var idx = e.detail.value;
    var that = this;
    console.log(idx);
    var tempSeat = this.data.seatList[idx];
    var pdata={
      id: that.data.meetinginfo.id,
      notice: tempSeat.value
     
    }
    getApp().post('affair/upInfo?id=' + that.data.meetinginfo.id, pdata).then(res => {
      that.setData({
        seatidx: e.detail.value,
        'meetinginfo.notice': tempSeat.value
      })
      wx.showToast({
        title: '设置成功',
      })
    }, (err) => {
      wx.showModal({
        title: '提示',
        content: err.info
      })
    })



     
  },
  showNoticeMoney:function(){
    wx.showModal({
      title: '提示',
      content: '保证金是为了保证参会人员按时到场，到场签到后保证金原路返回',
      showCancel: false
    })
  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      showsetting: e.detail.value
    })
    var that = this;
    if(e.detail.value){
      
      wx.showModal({
        title: '提示',
        content: '确定打开活动吗，打开后其它人可以参与活动？',
        success: function (res) {
          if (res.confirm) {
            
            var pdata = {
              id: that.data.meetinginfo.id,
              open_status:1

            }
            getApp().post('affair/upInfo?id=' + that.data.meetinginfo.id, pdata).then(res => {
              wx.showToast({
                title: '设置成功',
              })
            }, (err) => {
              wx.showModal({
                title: '提示',
                content: err.info
              })
            })


          } else {
            that.setData({
              isboxed:false
            })

          }
        }
      })
    }else{

      wx.showModal({
        title: '提示',
        content: '确定关闭报名吗？关闭后其它人将无法参与',
        success: function (resc) {
          if (resc.confirm) {

            var pdata = {
              id: that.data.meetinginfo.id,
              open_status:0

            }
            getApp().post('affair/upInfo?id=' + that.data.meetinginfo.id, pdata).then(res => {
              wx.showToast({
                title: '设置成功',
              })
            }, (err) => {
              wx.showModal({
                title: '提示',
                content: err.info
              })
            })
             


          } else {
            that.setData({
              isboxed: true
            })

          }
        }
      })

    }

    
  },
   
  confirmSign:function(e){
    getApp().post('index/fomrids', { formId: e.detail.formId });
    wx.navigateTo({
      url: '../home/confirms?id='+this.data.meetinginfo.id,
    })
  },
  gomoreperson:function(e){
    getApp().post('index/fomrids', { formId: e.detail.formId });
    wx.navigateTo({
      url: '../home/joins?id='+this.data.meetinginfo.id
    })
  },
  viewredbgs:function(e){
    getApp().post('index/fomrids', { formId: e.detail.formId });
    wx.navigateTo({
      url: '../home/hblist?mid='+this.data.meetinginfo.id,
    })
  },
  getoptbtns(){
    getApp().post('affair/getOptBtn',{
      id: this.data.meetid
    }).then(res=>{

      this.setData({
        optBtns:res
      })
      if(res.join){
        this.setData({
          'optBtns.join': true
        })
      }else{
        this.setData({
          zfsign: false
        })
      }

    })
  },
  showNotice: function () {
    wx.showModal({
      title: '提示',
      content: '设置提醒，可以微信通知您及时参加会议和签到',
      showCancel: false
    })
  },
  getmineInfo: function () {
    getApp().get('user/findUserInfo').then(res => {
      this.setData({
        mineinfo: res,
        mineName:res.name,
        minePhone:res.mobile
      })
    })

  },
  checkSign:function(e){//签到
    var that = this;
    wx.showLoading({
      title: '签到中',
    })
    
    getApp().post('index/fomrids', { formId: e.detail.formId });
    wx.getLocation({
      type: 'gcj02',
      success: function (local) {
        // wx.showModal({
        //   title: '凉皮提示',
        //   content: JSON.stringify(local),
        // })
         

         
        var latitude = local.latitude
        var longitude = local.longitude
        getApp().post('member/sign', {
          id: that.data.meetinginfo.id,// 活动id, lng: 当前经度, lat: 当前纬度
          lng: longitude,
          lat: latitude
        }).then(res=>{
          wx.hideLoading()
          that.getoptbtns();
          wx.showToast({
            title: '签到成功',
          })
        },error=>{
          wx.showModal({
            title: '提示',
            showCancel:false,
            content:error.info,
          })
        })
        
      },
      fail:function(err){
        wx.showModal({
          title: '获取位置失败',
          showCancel: false,
          content:'点击确定打开设置',
          success:function(){
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)
                // res.authSetting = {
                //   "scope.userInfo": true,
                //   "scope.userLocation": true
                // }
              }
            })
          }
        })
      }
    })
    
  },
  gohome:function(e){
    getApp().post('index/fomrids', { formId: e.detail.formId });
    wx.navigateTo({
      url: '/page/home/index'
    })
  },
  goredbag:function(){//领取红包

    getApp().post('user/receiveCash',{
      id: this.data.meetid,
    }).then(res=>{
      this.getoptbtns();
      wx.showModal({
        title: '提示',
        content: res.info,
      })

    },error=>{
      wx.showModal({
        title: '提示',
        content: error.info,
      })
      this.getoptbtns()
    })

  },
  comJoin:function(){
    getApp().post('member/add', { id: this.data.meetid }).then(res => {
      var obj = JSON.parse(res);
      var that = this;
      console.log(obj);

      wx.requestPayment({
        timeStamp: obj.timeStamp,
        nonceStr: obj.nonceStr,
        package: obj.package,
        signType: obj.signType,
        paySign: obj.paySign,
        success(res) {
          getApp().get('member/changeStatus?id=' + that.data.meetinginfo.id).then(gres => {
            wx.showModal({
              title: '参加成功，请记得按时到场哦',
              content: '您可以设置备忘提醒',
              showCancel: false
            })

            that.getoptbtns();
            that.getmeeting();
            that.setData({
              jointShow: false
            })

          })

          getApp().globalData.meetId = that.data.meetinginfo.id
          // if (that.data.meetinginfo.open_id == wx.getStorageSync('ppid')){

          //   wx.navigateTo({
          //     url: './othersetting?isqunzhu=1',
          //   })
          // }else{
          //   wx.navigateTo({
          //     url: './othersetting?isqunzhu=1',
          //   })
          // }
        },
        fail(res) {
          console.log(res)

        }
      })


    }, (error) => {
      that.setData({
        jointShow: false
      })
      wx.showModal({
        title: '',
        content: error.info,
      })
    })
  },
  joinmeeting:function(e){
    getApp().post('index/fomrids', { formId: e.detail.formId });
    this.setData({
      jointShow: true
    })
    
  },
  modifyMeeting:function(e){
    getApp().post('index/fomrids', { formId: e.detail.formId });
    var  that = this;
    getApp().globalData.meetId = this.data.meetid
    if (this.data.meetinginfo.open_id  == wx.getStorageSync('ppid')){
      wx.showActionSheet({
        itemList: ['取消活动'],
        success(res) {
          if(res.tapIndex == 0){
            
            // wx.redirectTo({
            //   url: '../home/addmeeting',
            // })
            wx.showModal({
              title: '确定取消活动吗？',
              content: '取消活动，活动保证金会在三个工作日内进行原路返回',
              success: function (res) {
                if (res.confirm) {
                  getApp().post('affair/cancelAffair', {
                    id: that.data.meetinginfo.id
                  }).then(res => {
                    wx.showModal({
                      title: '提示',
                      content: '取消成功',
                    })
                    that.getoptbtns();



                  }, error => {
                    wx.showModal({
                      title: '提示',
                      content: error.info,
                    })

                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }

            })
          } else if (res.tapIndex == 1){
            wx.showModal({
              title: '确定关闭红包？',
              content: '关闭红包即取消约会，红包内参与金额，会在三个工作日内进行原路返回',
              success:function(res){
                if (res.confirm) {
                  getApp().post('affair/cancelAffair',{
                    id:that.data.meetinginfo.id
                  }).then(res=>{
                    wx.showModal({
                      title: '提示',
                      content: '取消成功',
                    })
                    that.getoptbtns();

                    

                  },error=>{
                    wx.showModal({
                      title: '提示',
                      content:error.info,
                    })

                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
               
            })
            // console.log('关闭');
          }
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })

    }else{

      wx.showActionSheet({
        itemList: ['修改信息'],
        success(res) {
          wx.navigateTo({
            url: './othersetting?isqunzhu=1',
          })
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })

    }
  },
  compeleMine: function (e) {
    getApp().post('index/fomrids', { formId: e.detail.formId });
    
    var that = this;
    if (!that.data.xieyi) {
      wx.showModal({
        title: '提示',
        content: '请先同意软件使用协议',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.setData({
              xieyi: true
            })
          }
        }
      })
      return false;
    }

    if (!e.detail.value.mineName || !e.detail.value.minePhone) {
      wx.showToast({
        title: '请完善用户信息',
        image: '/image/tips.png',
      })
      return false;
    } else {
      var update = {
        name: e.detail.value.mineName,
        mobile: e.detail.value.minePhone
      }
      getApp().post('user/upUser', update).then(res => {
        
        this.comJoin();


      })

    }

  },
  bindGetUserInfo: function (e) {
    
    
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
              wx.setStorageSync('ppid', opres.openid);

              // getApp().post('index/fomrids', { formId: e.detail.formId });


              getApp().post('login/login', JSON.parse(e.detail.rawData)).then(info => {
                wx.hideLoading();
                that.setData({
                  isauth:false
                })
                that.getmeeting();
                that.getmeber();
                that.getoptbtns();
                that.getmineInfo();
              })

            }, error => {
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
  getmeber(){
    getApp().get('member/lists?id=' + this.data.meetid+'page=1&size=800').then(res=>{
      if (res){
        this.setData({
          memberlist: res
        })
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    if (options.mid) {
      console.log(options.mid)
      this.setData({
        meetid: options.mid
      })
    }
    if(options.yzf){
      this.getoptbtns();
      console.log('yzf')
      this.setData({
        zfsign:false
      })
    }else{
      this.setData({
        zfsign: true
      })
    }
    this.getmineInfo();
    this.setData({
      myopenid:wx.getStorageSync('ppid')
    })


    if(!wx.getStorageSync('ppid')){
      this.getmeeting();
      this.setData({
        isauth:true
      })

    }else{
        this.getmeeting();
        this.getmeber();
      }

    setTimeout(()=>{
      this.getoptbtns()
    },1000);
    
    // this.getOpenid();

  },
  openmap:function(e){
    // console.log(parseFloat(this.data.meetinginfo.address_Lng));
    // return false;
    wx.openLocation({//打开地图
      longitude:parseFloat(this.data.meetinginfo.address_Lng),
      latitude: parseFloat(this.data.meetinginfo.address_Lat),
      name: this.data.meetinginfo.adr_name,
      address: this.data.meetinginfo.address
    })

  },
  getmeeting:function(){
    var that = this;
    getApp().get('affair/find?id='+this.data.meetid).then(res=>{


      // that.setData({
      //   meetingpic: JSON.parse(res.img_list)
      // })

      var temp = new Date(res.active_time).getTime()
      var stemp = res.active_time;
      res.active_time = getApp().datetostring(res.active_time, 'yyyy-MM-dd ww hh:mm')
      this.setData({
        meetinginfo:res
      })
      if (res.status == 1){
        wx.redirectTo({
          url: '../home/latedetail?mid='+res.id,
        })
      }
      if (res.open_status == 0){
        this.setData({
          isboxed:false
        })
      }else{
        this.setData({
          isboxed: true
        })
      }

      var curtime = new Date().getTime() - 3600000;
       
      var actTime = stemp;
      actTime = actTime.substring(0,19);
      actTime = actTime.replace(/-/g, '/');
      var actTimestamp = new Date(actTime).getTime();
      console.log(curtime)
      console.log(actTimestamp)
      if (actTimestamp < curtime){
        wx.redirectTo({
          url: './latedetail?mid=' + res.id,
        })
        this.setData({
          isstaring:true
        })
      }else{
        this.setData({
          isstaring: false
        })
      }

      if (wx.getStorageSync('ppid') == res.open_id){
        this.setData({
          isconfirm:true
        })
      }else{
        this.setData({
          isconfirm: false
        })
      }

      //提醒设置
      var st = that.data.seatList;
      var szIdx = st.findIndex(function(item){
        return item.value == res.notice
      })
      // wx.showModal({
      //   title: '',
      //   content: szIdx+'',
      // })
      if(szIdx<0){
        szIdx = st.length-1
      }
      that.setData({
        seatidx: szIdx
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
    getApp().globalData.allperson = []
    this.getmeber();
    this.getoptbtns();

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
  onShareAppMessage: function (res) {

    var  that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title:that.data.meetinginfo.title,
      path: '/page/home/detail?mid=' + that.data.meetinginfo.id,
      imageUrl:'',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
})