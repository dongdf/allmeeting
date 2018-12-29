//app.js
const baseUrl = "https://ddf.my12399.com/index.php/"

const util = require('./util/util.js')
const formatTime = util.formatTime 
App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    //wx.clearStorageSync();
    var that = this;









    
    
     
  },
  
   
  route:function(){
    
  },
  onShow:function(){
    
  },
  datetostring:function(date,fmt){

    return formatTime(date,fmt)

  },
  uploadmedia:function(url,data){
    //http://192.168.1.133:8080/
    var promise = new Promise((resolve, reject) => {
      wx.uploadFile({
        url: baseUrl+url+'?openid=' + wx.getStorageSync('ppid'),
        header: {
          'x-wx-openid': wx.getStorageSync('ppid'),
          'content-type': 'multipart/form-data'
        },
        filePath: data,
        name: 'file',
        success: function (res) {//服务器返回数据
          // console.log(res);
          var resdata = JSON.parse(res.data);
          if (resdata.status == 200) {
            wx.hideLoading();
            resolve(resdata.data);
          } else {
            wx.hideLoading();
            reject(res.data)
          }
        },
        error: function (e) {
          wx.hideLoading();
          reject('网络出错');
        }
      })
      
    })
    return promise;
    
  },
  post:function (url, data){
    var promise = new Promise((resolve, reject) => {
      //init
      var that = this;
      var postData = data;
      /*
      //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
      postData.signature = that.makeSign(postData);
      */
      //网络请求
      var ppid = wx.getStorageSync('ppid') ? wx.getStorageSync('ppid') : '';
      if(url.indexOf('openid')<0){

        if (url.indexOf('?') < 0) {
          url += "?openid=" + ppid

        } else {
          url += "&openid=" + ppid
        }

      }
      
      wx.request({
        url: baseUrl+url,
        data: postData,
        method: 'POST',
        header: { 
          'content-type': 'application/x-www-form-urlencoded',
          'x-wx-openid': wx.getStorageSync('ppid')
           },
        success: function (res) {//服务器返回数据
          if (res.data.status == 200) {
            resolve(res.data.data);
          } else {
            wx.hideLoading();
            reject(res.data)
          }
        },
        error: function (e) {
          wx.hideLoading();
          reject('网络出错');
        }
      })
    });
    return promise;
  },
  
  get: function (url) {
    var thats =this;
    var promise = new Promise((resolve, reject) => {
      //init
      var that = this;
      // var postData = data;
      /*
      //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
      postData.signature = that.makeSign(postData);
      */
      //网络请求
      var ppid = wx.getStorageSync('ppid') ? wx.getStorageSync('ppid') : '';

      if (url.indexOf('openid') < 0) {

        if (url.indexOf('?') < 0) {
          url += "?openid=" + ppid

        } else {
          url += "&openid=" + ppid
        }

      }
      wx.request({
        url: baseUrl+url,
        method: 'GET',
        header: { 
          'content-type': 'application/x-www-form-urlencoded',
          'x-wx-openid': wx.getStorageSync('ppid')
           },
        success: function (res) {//服务器返回数据
          if (res.data.status == 200){
            resolve(res.data.data);
          }else{
            wx.hideLoading();
            reject(res.data)
          }
        },
        error: function (e) {
          console.log('1233')
          wx.hideLoading();
          reject('网络出错');
        }
      })
    });
    return promise;
  },
  fmoney:function outputdollars(number) {
    if (number.length <= 3)
      return (number == '' ? '0' : number);
    else {
      var mod = number.length % 3;
      var output = (mod == 0 ? '' : (number.substring(0, mod)));
      for (i = 0; i < Math.floor(number.length / 3); i++) {
        if ((mod == 0) && (i == 0))
          output += number.substring(mod + 3 * i, mod + 3 * i + 3);
        else
          output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
      }
      return (output);
    }
  },
  globalData: {
    zfsign:false,
    share: false,  // 分享默认为false
    height: 0,
    meetingadd:false,
    userInfo: {name:'',phone:''},
    meetId:'',
    authStates:null,
    meetinginfo: { close_time: '', quota: '', close_datetime:''},
    uOpenid:null,
    realUserInfo:null
     
  }
})