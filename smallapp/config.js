/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

//var host = "14592619.qcloud.la"
var host = "https://pc.quankuaile.com/Project/pinche/index.php/"
var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 登录地址，用于建立会话
    loginUrl: 'https://${host}/login',

    // 测试的请求地址，用于测试会话
    requestUrl: `https://${host}/testRequest`,

    // 用code换取openId
    openIdUrl: `${host}wx/getOpenInfo`,

    // 根据openid 回传用户信息
    userAdd: `${host}user/add`,
    // 根据openid 查询用户信息
    findUser: `${host}user/findUserInfo`,

    // 添加车辆
    addCar: `${host}resource/add`,
    // 查询车辆/人员
    search: `${host}resource/search`,
    //车/人详情信息
    findResource: `${host}resource/findResource`,

    //创建圈子
    quanziAdd: `${host}circle/add`,

    //查询圈子
    quanziSearch: `${host}circle/search`,
    //查询圈子里的信息
    searchQuanziResource: `${host}resource/searchCircleResouce`,

    //加入圈子
    joinQuanzi: `${host}circle/joinCircle`,
    //查询人是否在圈子
    checkCircle: `${host}circle/checkCircle`,
    //查询圈子成员
    findCircleMember: `${host}circle/findCircleMember`,

    //个人发布的信息
    findMyResource: `${host}resource/findMyResource   `,
    //生成图片

    makepic:'https://pc.quankuaile.com/makepic/milfun.php',


    //读取公告
    notice: 'https://pc.quankuaile.com/notice.json',

    // 测试的信道服务接口
    tunnelUrl: `https://${host}/tunnel`,

    // 生成支付订单的接口
    paymentUrl: `https://${host}/payment`,

    // 发送模板消息接口
    templateMessageUrl: `https://${host}/templateMessage`,

    // 上传文件接口
    uploadFileUrl: `https://${host}/upload`,

    // 下载示例图片接口
    downloadExampleUrl: `https://${host}/static/weapp.jpg`
};

module.exports = config
