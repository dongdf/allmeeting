 
function formatNumber(n) {  
  n = n.toString()  
  return n[1] ? n : '0' + n  
}  
function formatTime(dates, fmt) {
  
  dates = dates.substring(0, 19);
  dates = dates.replace(/-/g, '/'); 

  var curr = new Date(dates);
  var o = {
    "M+": curr.getMonth() + 1, //月份 
    "d+": curr.getDate(), //日 
    "w+": "周" +"日一二三四五六".charAt(curr.getDay()), //周
    "h+": curr.getHours(), //小时 
    "m+": curr.getMinutes(), //分 
    "s+": curr.getSeconds(), //秒 
    "q+": Math.floor((curr.getMonth() + 3) / 3), //季度 
    "S": curr.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (curr.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function formatLocation(longitude, latitude) {
   
  return {
    longitude: longitude,
    latitude: latitude
  }
}



module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation
}
