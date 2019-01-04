// page/home/addmeeting.js
var util = require('../../util/util.js')
var formatLocation = util.formatLocation
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgNumb:[],
    imgList:[],
    xieyi:true,
    submitbtn:false,
    modifyId:'',
    persons:'',
    meetinginfo:{},
    mineshow:false,
    mineinfo:{},
    mineName:'',
    minePhone:'',
    date1:'',
    date2: '',
    startInfo: { address:''},//出发地信息
    startLngLat:'',
    carSeatSelect:{},
    seatidx: 0,
    title:'',
    promise_money:'',
    adr_name:'',
    content:'',
    showactiveTime:'',
    meeting:{
      imgs:[],
      address_Lng: '',//地点经度
      address_Lat: '',//地点纬度
      address: '',
      adr_name:'',
      quota: '',//人数
      must_name: '',//报名人姓名
      must_phone: '',//报名人手机
      notice: '10',//提醒
      active_time: '',//活动时间
      close_datetime:'',
      close_time: '',//结束时间
      status: ''//活动状态 0进行中 1报名结束  4活动失败
    },
    seatList: [
      { name: '10分钟前', value: 10 },
      { name: '30分钟前', value: 30 },
      { name: '1个小时前', value: 60 },
      { name: '2小时前', value: 120 },
      { name: '1天前', value: 60 * 24 },
      { name: '不提醒', value: 0 }
      
    ],
    serverm:false,
    pmoneyList: [
      { name: '1分(新用户专享)', value: 0.01 },
      { name: '10元', value: 10 },
      { name: '50元', value: 50 },
      { name: '100元', value: 100 },
      { name: '200元', value: 200 },
      { name: '500元', value: 500 },
      { name: '1000元', value: 1000 }
    ],
    pmoneyIdx:0,
    startLocationAddress:'',
    multiArray: [
      [
        // { name: '12月16日', value: '2017-12-16' },
        // { name: '12月17日', value: '2017-12-17' },
        // { name: '12月18日', value: '2017-12-18' },
        // { name: '12月18日', value: '2017-12-19' },

      ],
      [
        // { name: '0时', value: '00' },
        // { name: '1时', value: '01' },
      ],
      [
        // { name: '0分', value: '00' },
        // { name: '10时', value: '10' },
      ]
    ],
    multiIndex: 0,

  },
  delimg:function(e){
    console.log(e)
    var idx = e.currentTarget.dataset.imgidx;
    var temps = this.data.imgList
    temps.splice(idx, 1);
    this.setData({
      imgList:temps
    })
  },
  xieyiact:function(){
    if(this.data.xieyi){
      this.setData({
        xieyi:false,
      })
    }else{
      this.setData({
        xieyi: true,
      })
    }
  },
  showPromiseMoney:function(){
    wx.showModal({
      title: '提示',
      content: '保证金是为了保证参会人员按时到场，到场签到后保证金原路返回',
      showCancel:false
    })
  },
  showNotice: function () {
    wx.showModal({
      title: '提示',
      content: '提醒说明',
      showCancel: false
    })
  },
  compeleMine:function(e){
    getApp().post('index/fomrids', { formId: e.detail.formId });
     
    if (!e.detail.value.mineName || !e.detail.value.minePhone){
      wx.showToast({
        title: '请完善用户信息',
        image: '/image/tips.png',
      })
      return false;
    }else{
      var update = {
        name: e.detail.value.mineName,
        mobile: e.detail.value.minePhone
      }
      getApp().post('user/upUser', update).then(res => {
        wx.showToast({
          title: '保存成功',
        })
        this.getmineInfo();


      })
      
    }

  },
  addmeetings:function(e){
    var that = this;
    if (!that.data.xieyi){
      wx.showModal({
        title: '提示',
        content: '请先同意软件使用协议',
        showCancel:false,
        success:function(res){
          if(res.confirm){
            that.setData({
              xieyi:true
            })
          }
        }
      })
      return false;
    }
    // wx.showModal({
    //   title: 'formId',
    //   content: e.detail.formId+'',
    // })
    var pdata={
      formId: e.detail.formId,
      title:e.detail.value.title,
      content:e.detail.value.content,
      imgs: JSON.stringify(this.data.meeting.imgs),
      promise_money: this.data.meeting.promise_money,
      address_Lng: this.data.meeting.address_Lng,//地点经度
      address_Lat: this.data.meeting.address_Lat,//地点纬度
      address: this.data.meeting.address,
      adr_name: e.detail.value.adr_name,
      quota: e.detail.value.persons,//人数
      must_name: this.data.mineinfo.name,//报名人姓名
      must_phone: this.data.mineinfo.mobile,//报名人手机
      notice: this.data.meeting.notice,//提醒
      active_time: this.data.meeting.active_time,//活动时间
      close_time: getApp().globalData.meetinginfo.close_datetime,//结束时间
      status:'0' //活动状态 0进行中 1报名结束  4活动失败
    }
    if(!pdata.title){
      wx.showToast({
        title: '请输入聚会标题',
        image: '/image/tips.png',
      })
      return false;
    }
    if(!pdata.promise_money){
      wx.showToast({
        title: '请输入金额',
        image: '/image/tips.png',
      })
      return false;
    }
    if (pdata.promise_money < 0 || pdata.promise_money > 2000) {
      wx.showToast({
        title: '金额20~1000',
        image: '/image/tips.png',
      })
      return false;
    }
    if (!pdata.active_time) {
      wx.showToast({
        title: '请选择活动时间',
        image: '/image/tips.png',
      })
      return false;
    }
    if (!pdata.address) {
      wx.showToast({
        title: '请选择活动地点',
        image: '/image/tips.png',
      })
      return false;
    }
    // if (!pdata.quota){
    //   wx.showToast({
    //     title: '请输入参与人数',
    //     image: '/image/tips.png',
    //   })
    //   return false;
    // }
    // if (pdata.quota<=1) {
    //   wx.showToast({
    //     title: '参与不用能少于1人',
    //     image: '/image/tips.png',
    //   })
    //   return false;
    // }
    console.log(pdata);
    if(this.data.submitbtn){
      return false;
    }
    wx.showLoading({
      title: '请稍后...',
    })
    this.setData({
      submitbtn:true
    })

    function addm(){
       
      return new Promise((resolve,reject)=>{
        getApp().post('affair/add', pdata).then(res => {
          getApp().globalData.meetId = ''
          resolve(res)
        })

      })
    }

    function savem(){
       
      return new Promise((resolve, reject) => {
        pdata.id = getApp().globalData.meetId
        getApp().post('affair/upInfo?id=' + getApp().globalData.meetId, pdata).then(res => {
          getApp().globalData.meetId=''
          resolve(res)
        })
      })
    }
    if(getApp().globalData.meetId){
      savem().then(saveinfo=>{

        wx.hideLoading();
        that.setData({
          submitbtn: false
        })

         
        that.setData({
          meeting: {}
        })
          wx.redirectTo({
            url: '../home/detail?mid=' + saveinfo.id,
          })
        
      })

    }else{
      addm().then(adinfo => {
        
        getApp().post('member/add', { id: adinfo.id}).then(res => {
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
              that.setData({
                meeting: {}
              })

              wx.hideLoading();
              that.setData({
                submitbtn: false
              })

              
              getApp().get('member/changeStatus?id=' + adinfo.id).then(gres=>{

                wx.showLoading({
                  title: '请稍候...',
                })
                setTimeout(() => {
                  wx.hideLoading();
                  getApp().globalData.zfsign = true;

                  wx.redirectTo({
                    url: '../home/detail?mid=' + adinfo.id + '&yzf=1',
                  })
                }, 2000)

              })
             
             
                
            },
            fail(res) {
              wx.redirectTo({
                url: '../home/detail?mid=' + adinfo.id,
              })

            }
          })


        }, (error) => {
          console.log(error)
        })

       
        // wx.requestPayment({
        //   timeStamp: '',
        //   nonceStr: '',
        //   package: '',
        //   signType: 'MD5',
        //   paySign: '',
        //   success(res) { },
        //   fail(res) { }
        // })

      })

    }

    
    
    
    
    

    // console.log(pdata);

  },
  bindSeatChange: function (e) {//剩余座位
    var idx = e.detail.value;
    var tempSeat = this.data.seatList[idx];
    this.setData({
      seatidx: e.detail.value,
      carSeatSelect: tempSeat,
      'meeting.notice':tempSeat.value
    })
    
   // console.log(this.data.meeting)
  },
  bindSeatChangeMoney: function (e) {//剩余座位
    var idx = e.detail.value;
    var tempSeat = this.data.pmoneyList[idx];
    if(tempSeat.value>=50){
      this.setData({
        serverm:true
      })
    }else{
      this.setData({
        serverm: false
      })
    }
    this.setData({
      pmoneyIdx: e.detail.value,
      'meeting.promise_money': tempSeat.value
    })

    // console.log(this.data.meeting)
  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getmeetInfo:function(){
    getApp().get('affair/find?id=' + this.data.modifyId).then(res => {
      var idx = this.data.seatList.findIndex(function(item){
        return res.notice == item.value
      })
      
      // console.log(this.data.seatList)
      console.log(idx);
      this.setData({
        title:res.title,
        promise_money: res.promise_money,
        content:res.content,
        'meeting.active_time': res.active_time,
        'meeting.address': res.address,
        'seatidx':idx,
        'adr_name': res.adr_name,
        'meeting.adr_name':res.adr_name,
        'meeting.quota':res.quota,
        'meeting.close_datetime': res.close_time,
        'meeting.address_Lng': res.address_Lng,
        'meeting.address_Lat': res.address_Lat,
        'meeting.notice':res.notice,
        'showactiveTime': getApp().datetostring(res.active_time, 'MM-dd ww hh:mm')
      })
      getApp().globalData.meetinginfo = {
        close_datetime: res.close_time,
          quota: res.quota
      }
      console.log(getApp().globalData.meetinginfo)

      // getApp().globalData.meetinginfo.close_time = res.close_time
      // getApp().globalData.meetinginfo.close_datetime = res.close_datetime
      // getApp().globalData.meetinginfo.quota = res.quota


    })
  },
  onLoad: function (options) {
    console.log(options);
    if(options.mid){
      // this.setData({
      //   modifyId:options.mid
      // })
      
      // this.getmeetInfo();
      // this.onLoad()
    }
    var idx = this.data.pmoneyIdx;
    this.setData({
      'meeting.promise_money': this.data.pmoneyList[idx].value
    })

    // this.setData({
    //   'meeting.close_time': getApp().globalData.meetinginfo.close_time,
    //   'meeting.quota': getApp().globalData.meetinginfo.quota
    // })

    let afterday = 5;
    let curDate = new Date();
    let _this = this.data;
    // 补充0处理
    String.prototype.addzero = function () {
      var numb = this + '';
      if (numb < 10) {
        numb = '0' + numb;
      }
      return numb;
    }
    // 补充0处理
    var tempDateArray = [];
    for (var i = 0; i < afterday; i++) {
      if (i > 0) {
        curDate.setDate(curDate.getDate() + 1);
      }
      var month = (curDate.getMonth() + 1).toString();
      var year = curDate.getFullYear();
      var day = curDate.getDate().toString() ;//+ "  周" + "日一二三四五六".charAt(curDate.getDay());
      var week = "  周" + "日一二三四五六".charAt(curDate.getDay());
      //console.log(year + "-" + month.addzero() + '-'+day.addzero());
      tempDateArray.push({ name: month.addzero() + '月' + day.addzero() + week, value: year + "-" + month.addzero() + '-' + day.addzero() });
    }



    var tempHourArray = [];
    var tempMinArray = [];
    for (var i = 0; i < 60; i++) {
      var tempv = i.toString()
      tempMinArray.push({ name: tempv.addzero() + '分', value: tempv.addzero() });

    }
    for (var i = curDate.getHours() + 1; i < 24; i++) {
      var tempv = i.toString()
      tempHourArray.push({ name: tempv.addzero() + '时', value: tempv.addzero() });
    }

    this.setData({//设置下拉选择
      'multiArray[0]': tempDateArray,
      'multiArray[1]': tempHourArray,
      'multiArray[2]': tempMinArray
    })


  },
  gosetting:function(){
    wx.navigateTo({
      url: './setting?mid=' + getApp().globalData.meetId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindMultiPickerChange: function (e) {//总体取值
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var idx = e.detail.value;
    // console.log(idx);
    var tempDate = { mdate:'', mhour:'', mmin:''};
    tempDate.mdate = (this.data.multiArray[0])[idx[0] ? idx[0] : 0];
    tempDate.mhour = this.data.multiArray[1][idx[1] ? idx[1] : 0];
    tempDate.mmin = this.data.multiArray[2][idx[2] ? idx[2] : 0];
    console.log(tempDate)
    

    // return false; 

    var selectTime = tempDate.mdate.value +' '+tempDate.mhour.value +':'+ tempDate.mmin.value + ':00';
    selectTime = selectTime.substring(0, 19);
    selectTime = selectTime.replace(/-/g, '/'); 
    console.log(selectTime);
    var selecttimeamp = new Date(selectTime).getTime()
    console.log(selecttimeamp);

    this.setData({
      multiIndex: e.detail.value,
      selectTime: tempDate,
      showactiveTime:getApp().datetostring(selectTime, 'MM-dd ww hh:mm'),
      'meeting.active_time':selectTime
    })
    console.log(this.data.selectTime);
  },
  
  chooseStartLocation: function () {//选择出发
    var that = this
    wx.chooseLocation({
      success: function (res) {
        var pdata ={
          'address_Lng': res.longitude,//地点经度
          'address_Lat': res.latitude,//地点纬度
          'adr_name': res.name,
          'address': res.address,
          id: getApp().globalData.meetId
          

        }
        if (getApp().globalData.meetId){
          getApp().post('affair/upInfo?id=' + getApp().globalData.meetId, pdata).then(resp => {

            that.setData({
              hasLocation: true,
              'meeting.address_Lng': res.longitude,//地点经度
              'meeting.address_Lat': res.latitude,//地点纬度
              'meeting.adr_name': res.name,
              'meeting.address': res.address,
              startLngLat: formatLocation(res.longitude, res.latitude),
              startLocationAddress: res.address,
              startInfo: res
            })


          })
        }else{
          that.setData({
            hasLocation: true,
            'meeting.address_Lng': res.longitude,//地点经度
            'meeting.address_Lat': res.latitude,//地点纬度
            'meeting.adr_name': res.name,
            'meeting.address': res.address,
            startLngLat: formatLocation(res.longitude, res.latitude),
            startLocationAddress: res.address,
            startInfo: res
          })

        }

       



         


      }

    })
  },
  bindMultiPickerColumnChange: function (e) {//单项变化
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var tempHourArray = [];
    if (e.detail.column == 0) {
      if (e.detail.value == 0) {
        let curDate = new Date();
        for (var i = curDate.getHours() + 1; i < 24; i++) {
          var tempv = i.toString()
          tempHourArray.push({ name: tempv.addzero() + '时', value: tempv.addzero() });
        }
        this.setData({//设置下拉选择
          'multiArray[1]': tempHourArray
        })


      } else {

        for (var i = 0; i < 24; i++) {
          var tempv = i.toString()
          tempHourArray.push({ name: tempv.addzero() + '时', value: tempv.addzero() });
        }
        this.setData({//设置下拉选择
          'multiArray[1]': tempHourArray
        })

      }



    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    wx.setNavigationBarTitle({
      title: '创建',
    })
    // console.log(e);
    this.setData({
      'meeting.close_time': getApp().globalData.meetinginfo.close_time,
      'meeting.close_datetime': getApp().globalData.meetinginfo.close_datetime
      // 'meeting.quota': getApp().globalData.meetinginfo.quota
    })
    // this.onLoad();
    // console.log(getApp().globalData.meetinginfo);
    this.getmineInfo()

    if (getApp().globalData.meetId){
      this.setData({
        modifyId: getApp().globalData.meetId

      })
      // console.log(this.data.modifyId)
      this.getmeetInfo();
    }
    // if (getApp().globalData.meetingadd){
    //   this.setData({
    //     meeting:{}
    //   })
    // }
    

  },
  uploadpic:function(e){
    var that = this;

    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.startupload(tempFilePaths);
        wx.showLoading({
          title: '上传中...',
        })
  

      }
    })


  },
  startupload:function(objs){
    var that = this;
    var i = 0;
    var showtemp=this.data.imgList;
    up();
    function up(){
      wx.uploadFile({
        url: 'https://ddf.my12399.com/index.php/affair/addAttachment', // 仅为示例，非真实的接口地址
        filePath: objs[i],
        name: 'file',
        formData: {
          user: 'test'
        },
        fail: (res) => {
         
        },
        complete: function (complete) {
          console.log(complete.data);
          var orgimg = JSON.parse(complete.data);
          console.log(orgimg.data);
          showtemp.push({img: orgimg.data });
          i++;
          if (i <objs.length) {
            up(); 
          } else {
            that.setData({
              imgList:showtemp,
              "meeting.imgs":showtemp
            })
            wx.hideLoading()
            return false;

          }

        }
      })

    }
    
  },
  getmineInfo:function(){
    getApp().get('user/findUserInfo').then(res => {

      var temps = this.data.pmoneyList;
      if (res.free_count<=0){
        temps.splice(0,1);
        this.setData({
          pmoneyList: temps
        })
      }
      this.setData({
        mineinfo: res
      })
      if(!this.data.mineinfo.mobile){
        
        this.setData({
          mineshow:true
          
        })
      }else{
        this.setData({
          mineshow: false

        })

      }

    })


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
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '【' + that.data.mine.nickname + '】邀请您使用大象聚会',
      path: '/page/home/start?popenid=' + wx.getStorageSync('ppid') ? wx.getStorageSync('ppid') : '',
      imageUrl: '../../image/share.jpg',
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