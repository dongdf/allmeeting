webpackJsonp([12],{BMzc:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={data:()=>({isRouterAlive:!0,uname:"",userinfo:{},activemenu:8,username:localStorage.getItem("user")?localStorage.getItem("user"):"",menus:[],menusUser:[{itemName:"快捷方式",icon:"ios-navigate",subSonItem:[{cked:!1,name:"首页",nameIdx:1,namesrc:"mains",icon:"md-home"}]},{itemName:"用户/会议",icon:"ios-navigate",subSonItem:[{cked:!1,name:"用户统计",nameIdx:2,namesrc:"userMgr",icon:"md-people"},{cked:!1,name:"会议统计",nameIdx:3,namesrc:"caijiMgr",icon:"md-flower"},{cked:!1,name:"关闭申请",nameIdx:4,namesrc:"closeMeeting",icon:"ios-document"}]},{itemName:"保证金",icon:"logo-buffer",subSonItem:[{cked:!1,name:"保证金统计",nameIdx:5,namesrc:"addCompany",icon:"logo-usd"},{cked:!1,name:"红包发放预估",nameIdx:6,namesrc:"teacherhome",icon:"md-analytics"}]},{itemName:"系统",icon:"ios-settings",subSonItem:[{name:"故障排查",namesrc:"searchBug",nameIdx:7,icon:"ios-bug",cked:!1},{name:"反馈列表",namesrc:"miyaoMgr",nameIdx:7,icon:"ios-chatbubbles",cked:!1},{cked:!1,name:"系统设置",nameIdx:8,namesrc:"editmoney",icon:"md-settings"},{cked:!1,name:"设置密码 ",nameIdx:8,namesrc:"editPas",icon:"md-lock"}]}],menusAdmin:[{itemName:"报告",icon:"ios-settings",subSonItem:[{name:"报告查看",namesrc:"reportMgrAdmin",nameIdx:7,icon:"ios-document",cked:!1}]},{itemName:"设置",icon:"ios-settings",subSonItem:[{cked:!1,name:"设置密码 ",nameIdx:8,namesrc:"editPas",icon:"md-lock"}]}]}),watch:{$route(e,t){this.isRouterAlive=!1,this.$nextTick(()=>{for(var t in this.isRouterAlive=!0,console.log(e.name+"1111"),this.getuser(),this.menus)for(var n in this.menus[t].subSonItem)this.menus[t].subSonItem[n].namesrc==e.name?this.menus[t].subSonItem[n].cked=!0:this.menus[t].subSonItem[n].cked=!1}),this.updateMenu()}},mounted(){this.getuser();var e=this.$route.name;console.log(e),this.uname=localStorage.getItem("user"),this.updateMenu()},methods:{chaneSeleced(){var e=this.$route.name;for(var t in this.menus)for(var n in this.menus[t].subSonItem)this.menus[t].subSonItem[n].namesrc==e?this.menus[t].subSonItem[n].cked=!0:this.menus[t].subSonItem[n].cked=!1},updateMenu(){this.$nextTick(()=>{})},getuser(){this.$http.get("user/find").then(e=>{this.userinfo=e.data,this.menus=this.menusUser,this.chaneSeleced()})},gohome(){this.$router.push({name:"main"})},jump(e){this.$router.push({name:e})},loginOut(){this.$http.get("user/logout").then(e=>{localStorage.clear(),this.$router.push({name:"login"})})}}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"layout"},[n("Header",[n("Menu",{attrs:{mode:"horizontal",theme:"dark","active-name":"1"}},[n("div",{staticClass:"layout-logo"},[n("Icon",{attrs:{type:"ios-apps",size:"25"}}),e._v("\n          大象聚会后台管理系统\n           |  "),n("Icon",{attrs:{size:"25",type:"md-home"},on:{click:function(t){e.gohome()}}})],1),e._v(" "),n("div",{staticClass:"layout-nav"},[n("span",[n("Icon",{attrs:{size:"18",type:"person"}}),e._v("您好， "+e._s(e.uname))],1),e._v(" "),n("span"),e._v("\n          | "),n("span",{staticStyle:{cursor:"pointer"},on:{click:function(t){e.loginOut()}}},[n("Icon",{attrs:{type:"log-out"}}),e._v("退出")],1)])])],1),e._v(" "),n("Layout",{style:{height:"100%"}},[n("Sider",{staticClass:"leftbar",style:{width:"200px"}},[n("ul",{staticClass:"ivu-menu ivu-menu-light ivu-menu-vertical",staticStyle:{width:"200px"},attrs:{"data-v-3ffae6b2":""}},e._l(e.menus,function(t,s){return n("li",{key:s,staticClass:"ivu-menu-item-group",attrs:{"data-v-3ffae6b2":"",name:s}},[n("div",{staticClass:"ivu-menu-item-group-title"},[e._v(e._s(t.itemName))]),e._v(" "),n("ul",e._l(t.subSonItem,function(t,s){return n("li",{staticClass:"ivu-menu-item",class:t.cked?"ivu-menu-item-active ivu-menu-item-selected":"",attrs:{"data-v-3ffae6b2":""},on:{click:function(n){e.jump(t.namesrc)}}},[n("Icon",{attrs:{type:t.icon}}),e._v("\n                "+e._s(t.name)+"\n              ")],1)}))])}))]),e._v(" "),n("Layout",{style:{padding:"0 14px 14px",margin:"10px 0 0 0"}},[n("Content",{style:{padding:"24px",background:"#fff"}},[e.isRouterAlive?n("router-view"):e._e()],1)],1)],1)],1)},staticRenderFns:[]};var i=n("VU/8")(s,a,!1,function(e){n("GnXn")},"data-v-bace217e",null);t.default=i.exports},GnXn:function(e,t){}});