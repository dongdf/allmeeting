//index.js
//获取应用实例
const app = getApp()



Page({
  data: {
    parentopenid:'',
    tipsucess:false,
    hidepopShow:true,
    mymeeting:{my:0,other:0},
    mine:{},
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    lists: { ing:[]},
    isTodayWeek: false,
    todayIndex: 0
  },
  bindPhone:function(){
    var that = this;
    if (this.data.mine.mobile){
      wx.showModal({
        title: '',
        content: '手机号为' + this.data.mine.mobile+'点击确定进入修改',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../mine/minePhone?citem='+that.data.mine.mobile,
            })
          }
        }
        
      })
      return false;
    }else{
      wx.showModal({
        title: '提示',
        content: '您还未绑定手机,完善手机号方便其它队员联系您',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../mine/minePhone',
            })
          }
        }
      })

    }
    
  },
  hidepop:function(){
    wx.setStorageSync('showt', 1)
    this.setData({
      tipsucess:false
    })
  },
  getmineinfo() {
    getApp().get('user/findUserInfo').then(res => {
      console.log(res);
      if (res.free_count>0 && !wx.getStorageSync('showt')){
        this.setData({
          tipsucess: true
        })

      }
      this.setData({
        mine: res
      })

    }, error => {
      wx.showModal({
        title: '',
        content: error.info,
      })
    })
  },
  gogame:function(e){
    getApp().post('index/fomrids', { formId: e.detail.formId })
    wx.navigateTo({
      url: '../home/game',
    })
  },
  gopro:function(e){
    getApp().post('index/fomrids', { formId: e.detail.formId })
    wx.navigateTo({
      url: '../home/pro',
    })
  },
  gopro2: function (e) {
    getApp().post('index/fomrids', { formId: e.detail.formId })
    wx.navigateTo({
      url: '../home/pro',
    })
  },

  goadd: function(){
    getApp().globalData.meetingadd = true;
    getApp().globalData.meetId ='';
    wx.navigateTo({
      url: '../home/addmeeting?type=add',
    })
  },
  gomine: function(e){
    getApp().post('index/fomrids', {formId: e.detail.formId})
    wx.navigateTo({
        url: '../mine/index',
    })

    
    
  },
  goaddmeeting(e){
    console.log(e);
    getApp().post('index/fomrids',{formId: e.detail.formId});
      getApp().globalData.meetingadd = true;
      getApp().globalData.meetId = '';
      wx.navigateTo({
        url: '../home/addmeeting?type=add',
      })

   
  },
  getcomming:function(){
    getApp().post('affair/hangAffairs?page=1&size=100').then(res=>{
      for(var i in res){
        res[i].active_time = getApp().datetostring(res[i].active_time,'MM-dd ww hh:mm')
      }
      this.setData({
        'lists.ing':res
      })
    })
  },
  getmineCount:function(){
    getApp().post('affair/lists?page=1&size=1', {
      isme: true
    }).then(res => {
      this.setData({
        'mymeeting.my':res.total
      })

    })
    getApp().post('affair/lists?page=1&size=1', {
      isme: false
    }).then(res => {
      this.setData({
        'mymeeting.other': res.total
      })
     })

  },
  onLoad: function (option) {
    if(option.popenid){
      this.setData({
        parentopenid:option.popenid
      })

    }
    // this.getalllist(2)
    this.getmineCount()
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })

  },
  onUnload: function () {

  },
  onShow:function(){
    if (!wx.getStorageSync('ppid')) {
      wx.redirectTo({
        url: '../home/start?popenid=' + this.data.parentopenid,
      })

    } else {
      this.getmineCount()
      this.getcomming();
      this.getmineinfo();
      
    }
    
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();							//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  getalllist: function (state) {//0：进行中，1：待关闭，2：活动结束
    getApp().post('affair/lists?page=1&size=1000',{
    status: state
    }).then(res=>{
      if (state ==0){
        for (var i in res) {
          res[i].active_time = getApp().datetostring(res[i].active_time, 'MM-dd ww hh:mm')
        }
        this.setData({
          'lists.close':res
        })
      } else  {
        for (var i in res) {
          res[i].active_time = getApp().datetostring(res[i].active_time, 'MM-dd ww hh:mm')
        }
        this.setData({
          'lists.end': res
        })
      } 

    })

  },
  checkkDay:function(e){
    console.log(e);

  },
  gomyMeeting:function(e){
    console.log(e)
    getApp().globalData.mymeeting = e.currentTarget.dataset.tabidx;
    wx.navigateTo({
      url: '../mine/active',
    })
  },
  onShareAppMessage: function (res) {

    var that = this;
    var shareMan = wx.getStorageSync('ppid') ? wx.getStorageSync('ppid') : ''
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //  console.log(res.target)
      getApp().post('share/add');
      that.getmineinfo();
    }
    return {
      title: '【'+that.data.mine.nickname+'】赠送您￥1***聚会保证金！',
      path: '/page/home/index?popenid=' + shareMan,
       imageUrl: '../../image/share.jpg',
      complete: function (res) {
        wx.showModal({
          title: 's',
          content:JSON.stringify(res),
        })
        console.log(res)
        // if (res.errMsg == 'shareAppMessage:ok') {
        //   // getApp().post('share/add');
        //   console.log('分享回调')
        // }
        
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
})