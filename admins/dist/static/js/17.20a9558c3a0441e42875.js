webpackJsonp([17],{Syvm:function(t,s){},XUAg:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=a("qI5z"),i=a("giHb"),e={name:"welcome",data:()=>({affrisType:1,dzpi:"",userinfo:{}}),mounted(){this.dzpi=n.a},methods:{getuser(){this.$http.post("financial/userService/getCurUser").then(t=>{this.userinfo=t.data,this.userinfo.password})},showtips(){let t=this;this.$mymsg(i.a,{data:{message:"您还没有设置密码，点击确定去设置"},methods:{onOk(){t.$router.push({name:"editPas"})}}})},gopage(t){this.$router.push({name:t})}}},o={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",[a("br"),t._v(" "),a("center",[a("ButtonGroup",[a("i-button",{staticClass:"ivu-btn ",class:1==t.affrisType?"ivu-btn-primary":"",on:{click:function(s){t.changetabs(1)}}},[t._v("\n\n                    今天\n                ")]),t._v(" "),a("i-button",{staticClass:"ivu-btn",class:2==t.affrisType?"ivu-btn-primary":"",on:{click:function(s){t.changetabs(2)}}},[t._v("\n\n                    昨天\n                ")]),t._v(" "),a("i-button",{staticClass:"ivu-btn",class:3==t.affrisType?"ivu-btn-primary":"",on:{click:function(s){t.changetabs(3)}}},[t._v("\n\n                    近7天\n                ")]),t._v(" "),a("i-button",{staticClass:"ivu-btn",class:3==t.affrisType?"ivu-btn-primary":"",on:{click:function(s){t.changetabs(3)}}},[t._v("\n\n                    近30天\n                ")]),t._v(" "),a("i-button",{staticClass:"ivu-btn",class:3==t.affrisType?"ivu-btn-primary":"",on:{click:function(s){t.changetabs(3)}}},[t._v("\n\n                    全部\n                ")])],1)],1),t._v(" "),a("br"),t._v(" "),a("br")],1),t._v(" "),a("Row",{staticStyle:{"border-radius":"5px",overflow:"hidden"}},[a("Col",{attrs:{span:"6"}},[a("div",{staticClass:"moneytotal",staticStyle:{background:"#0080df"}},[a("h3",[t._v("32939次")]),a("p",[t._v("会议")]),a("Icon",{attrs:{type:"logo-buffer"}})],1)]),t._v(" "),a("Col",{attrs:{span:"6"}},[a("div",{staticClass:"moneytotal",staticStyle:{background:"#6610f2"}},[a("h3",[t._v("100033人")]),a("p",[t._v("用户")]),a("Icon",{attrs:{type:"md-person-add"}})],1)]),t._v(" "),a("Col",{attrs:{span:"6"}},[a("div",{staticClass:"moneytotal",staticStyle:{background:"#17A2BF"}},[a("h3",[t._v("1000.00")]),a("p",[t._v("营业收入(元)")]),a("Icon",{attrs:{type:"logo-usd"}})],1)]),t._v(" "),a("Col",{attrs:{span:"6"}},[a("div",{staticClass:"moneytotal",staticStyle:{background:"#f86c6b"}},[a("h3",[t._v("1000.00")]),a("p",[t._v("发红包(元)")]),a("Icon",{attrs:{type:"logo-usd"}})],1)])],1)],1)},staticRenderFns:[]};var r=a("VU/8")(e,o,!1,function(t){a("Syvm")},"data-v-580e48ae",null);s.default=r.exports}});