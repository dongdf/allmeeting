// page/home/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modifyId:'',
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
    meeting:{
       
      close_time:'',
      close_datetime:''
    },
    showsetting:true,

  },
  
  closeingMeeting:function(e){
     
    if(getApp().globalData.meetId){
      var pdata;
      if (this.data.showsetting){
        pdata={
          formId: e.detail.formId,
          id: getApp().globalData.meetId ? getApp().globalData.meetId:'',
          // quota: e.detail.value.quota,
          close_time: this.data.meeting.close_datetime
        }

      }else{
        pdata = {
          formId: e.detail.formId,
          id: getApp().globalData.meetId,
          // quota: '',
          close_time:''
        }

      }
      getApp().post('affair/upInfo?id=' + getApp().globalData.meetId, pdata).then(res=>{
        wx.navigateBack({

        })

      },(err)=>{
        wx.showModal({
          title: '提示',
          content: err.info
        })
      })

    }else{

      this.setData({
        // 'meeting.quota': e.detail.value.quota
      })
      if (this.data.showsetting && !this.data.meeting.close_time) {
        // wx.showToast({
        //   title: '请选择结束时间',
        // })
        wx.showToast({
          title: '请选择结束时间',
          image: '/image/tips.png',
        })
        return false;
      } else {
        getApp().globalData.meetinginfo = {
          close_time: this.data.meeting.close_time,
          close_datetime: this.data.meeting.close_datetime
          // quota: e.detail.value.quota
        }
        wx.navigateBack({

        })
      }

    }
    
  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      showsetting: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let afterday = 60;
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
      var day = curDate.getDate().toString();
      //console.log(year + "-" + month.addzero() + '-'+day.addzero());
      tempDateArray.push({ name: month.addzero() + '月' + day.addzero() + '日', value: year + "-" + month.addzero() + '-' + day.addzero() });
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

    // if (options.mid){
    //   this.setData({
    //     modifyId:options.mid
    //   })
    //   this.getmeetInfo();

    // }

  },
  getmeetInfo: function () {
    if (getApp().globalData.meetId){
      getApp().get('affair/find?id=' + getApp().globalData.meetId).then(res => {

        // console.log(this.data.seatList)

        this.setData({
          // 'meeting.quota':res.quota,
          'meeting.close_datetime': res.close_time

        })


      })
    }
    
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
    var tempDate = {};
    tempDate.mdate = (this.data.multiArray[0])[idx[0] ? idx[0] : 0];
    tempDate.mhour = this.data.multiArray[1][idx[1] ? idx[1] : 0];
    tempDate.mmin = this.data.multiArray[2][idx[2] ? idx[2] : 0];

    var selectTime = tempDate.mdate.value + ' ' + tempDate.mhour.value + ':' + tempDate.mmin.value + ':00';
    selectTime = selectTime.substring(0, 19);
    selectTime = selectTime.replace(/-/g, '/');
    console.log(selectTime);
    var selecttimeamp = new Date(selectTime).getTime()

    this.setData({
      multiIndex: e.detail.value,
      selectTime: tempDate,
      'meeting.close_datetime':selectTime,
      'meeting.close_time': selecttimeamp
    })
    console.log(this.data.meeting);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmeetInfo();

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