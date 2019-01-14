<style scoped lang="scss">
  .layout {

    background: #f5f7f9;
    position: relative;

    overflow: hidden;
    height: 100%;
    font-weight: bold;
  }

  .layout-logo {
    color: #FFF;
    height: 30px;
    float: left;
    position: relative;
    font-size: 1rem;
  }

  .layout-nav {
    float: right;
    margin: 0 auto;
    margin-right: 20px;
    color: #FFF;
    font-weight: normal;
  }
  .userinfos{
    padding: 25px 25px;
    position: relative;
    width: 200px;
  a{
    position: absolute;
    top:25px;
    right:10px;
  }


  border-bottom:1px dashed #dcdee2;
  background:#FFF;

  }
  .ivu-menu-vertical.ivu-menu-light:after{
    background: none;
  }
  .leftbar{
    background:#FFF;
  }
  .leftbar:after{
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background: #dcdee2;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -1px;
    z-index: 1;

  }

</style>
<template>
  <div class="layout">

      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">

            <Icon type="ios-apps" size="25" />
            大象聚会后台管理系统
             |  <Icon @click="gohome()" size="25" type="md-home" />
          </div>
          <div class="layout-nav">

            <span> <Icon size="18" type="person"></Icon>您好， {{uname}}</span> <span> </span>
            | <span style="cursor:pointer;" @click="loginOut()"><Icon type="log-out"></Icon>退出</span>

          </div>
        </Menu>
      </Header>
      <Layout :style="{height:'100%'}">
        <Sider    class="leftbar" :style="{width: '200px'}"  >
          <!--<div class="userinfos">您好,{{userinfo.mobile}}<a @click="loginOut()">[退出]</a></div>-->
          <!--<Menu theme="light" width="auto"  >-->
            <!--<Submenu name="551">-->
              <!--<template slot="title">-->
                <!--<Icon type="ios-navigate"></Icon>-->
                <!--测试模块-->
              <!--</template>-->
              <!--<MenuItem @click.native="jump('main')" name="551-1">欢迎页</MenuItem>-->
              <!--<MenuItem @click.native="jump('test')" name="551-1">弹层及回调</MenuItem>-->
            <!--</Submenu>-->
          <!--</Menu>-->
          <!--<Menu theme="light"  width="auto" >-->
            <!--<Submenu :name="key" :key="key" v-for="(menu,key) in menus">-->
              <!--<template slot="title">-->
                <!--<Icon :type="menu.icon"></Icon>-->
                <!--{{menu.itemName}}-->
              <!--</template>-->
              <!--<MenuItem @click.native="jump(m.namesrc)" v-for="(m,sonkey) in menu.subSonItem" :key="sonkey" :name="key+'_'+sonkey">{{m.name}}</MenuItem>-->
            <!--</Submenu>-->
          <!--</Menu>-->

          <!--<i-Menu ref="side_menu" theme="light"  width="200px" >-->
            <!--<MenuGroup :title="menu.itemName" :name="key" :key="key" v-for="(menu,key) in menus">-->
              <!--<MenuItem  @click.native="jump(m.namesrc)" v-for="(m,sonkey) in menu.subSonItem" :class="m.cked?'1':'22'"  :key="sonkey" :name="m.nameIdx">-->
                <!--<Icon :type="m.icon" />-->
                <!--{{m.name}}{{m.cked}}-->
              <!--</MenuItem>-->

            <!--</MenuGroup>-->

          <!--</i-Menu>-->
          <ul data-v-3ffae6b2="" class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: 200px;">

            <li data-v-3ffae6b2="" class="ivu-menu-item-group"   :name="key" :key="key" v-for="(menu,key) in menus">
              <div class="ivu-menu-item-group-title">{{menu.itemName}}</div>
              <ul>

                <!--:class="m.cked?'ivu-menu-item-active ivu-menu-item-selected':''"-->
                <li  @click="jump(m.namesrc)" v-for="(m,sonkey) in menu.subSonItem"  data-v-3ffae6b2="" class="ivu-menu-item" :class="m.cked?'ivu-menu-item-active ivu-menu-item-selected':''"  >
                  <Icon :type="m.icon" />
                  {{m.name}}
                </li>
              </ul>
            </li>

          </ul>

        </Sider>
        <Layout :style="{padding: '0 14px 14px',margin:'10px 0 0 0'}">
          <!--<Breadcrumb :style="{margin: '24px 0'}">-->
          <!--<BreadcrumbItem>Home</BreadcrumbItem>-->
          <!--<BreadcrumbItem>Components</BreadcrumbItem>-->
          <!--<BreadcrumbItem>Layout</BreadcrumbItem>-->
          <!--</Breadcrumb>-->
          <Content :style="{padding: '24px',background: '#fff'}">
            <router-view v-if="isRouterAlive" />
          </Content>
        </Layout>
      </Layout>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        isRouterAlive: true,
        uname:'',
        userinfo:{},
        activemenu:8,
        username: localStorage.getItem('user') ? localStorage.getItem('user') : '',
        menus: [
        ],
        menusUser: [
          {
            itemName: '快捷方式',
            icon:'ios-navigate',
            subSonItem: [
              {
                cked:false,
                name: '首页',
                nameIdx:1,
                namesrc: 'mains',
                icon:'md-home'
              }
              // {
              //   cked:false,
              //   name: '数据抽取',
              //   namesrc: '',
              //   icon:'ios-construct-outline'
              // }


            ]
          },
          {
            itemName: '用户/会议',
            icon:'ios-navigate',
            subSonItem: [
              {
                cked:false,
                name: '用户统计',
                nameIdx:2,
                namesrc: 'userMgr',
                icon:'md-people'
              },
              {
                cked:false,
                name: '会议统计',
                nameIdx:3,
                namesrc: 'caijiMgr',
                icon:'md-flower'
              },
              {
                cked:false,
                name: '关闭申请',
                nameIdx:4,
                namesrc: 'closeMeeting',
                icon:'ios-document'
              }

            ]
          },
          {
            itemName: '保证金',
            icon:'logo-buffer',
            subSonItem: [
              {
                cked:false,
                name: '保证金统计',
                nameIdx:5,
                namesrc: 'addCompany',
                icon:'logo-usd'
              },
              {
                cked:false,
                name: '红包发放预估',
                nameIdx:6,
                namesrc: 'teacherhome',
                icon:'md-analytics'
              }

            ]
          },

          {
            itemName: '系统',
            icon:'ios-settings',
            subSonItem: [
              {
                name: '故障排查',
                namesrc: 'searchBug',
                nameIdx:7,
                icon:'ios-bug',
                cked:false,
              },
              {
                name: '反馈列表',
                namesrc: 'miyaoMgr',
                nameIdx:7,
                icon:'ios-chatbubbles',
                cked:false,
              },
              {
                cked:false,
                name: '系统设置',
                nameIdx:8,
                namesrc: 'editmoney',
                icon:'md-settings'
              },
              {
                cked:false,
                name: '设置密码 ',
                nameIdx:8,
                namesrc: 'editPas',
                icon:'md-lock'
              }


            ]
          }
        ],
        menusAdmin: [
          {
            itemName: '报告',
            icon:'ios-settings',
            subSonItem: [
              {
                name: '报告查看',
                namesrc: 'reportMgrAdmin',
                nameIdx:7,
                icon:'ios-document',
                cked:false,
              }


            ]
          },
          {
            itemName: '设置',
            icon:'ios-settings',
            subSonItem: [
              {
                cked:false,
                name: '设置密码 ',
                nameIdx:8,
                namesrc: 'editPas',
                icon:'md-lock'
              }


            ]
          }
        ]

      }
    },
    watch:{
      '$route' (to, from) {
        this.isRouterAlive = false;
        this.$nextTick(()=>{
          this.isRouterAlive = true;

          console.log(to.name+'1111')
          this.getuser();
          for(var i in this.menus){
            for(var j in this.menus[i].subSonItem){
              if(this.menus[i].subSonItem[j].namesrc == to.name){
                this.menus[i].subSonItem[j].cked=true
              }else{
                this.menus[i].subSonItem[j].cked=false
              }
            }
          }
          // console.log(JSON.stringify(this.menus))
          // this.shareAppPage({});
          // this.shareTimePage({});
          // this.getisguanzhu();
        })

        this.updateMenu();


      }
    },
    mounted() {
      this.getuser();
      var x = this.$route.name;
      console.log(x);
      this.uname = localStorage.getItem('user');




      this.updateMenu();
      // console.log(JSON.stringify(this.menus))
    },
    methods: {
      chaneSeleced(){
        var x = this.$route.name;
        for(var i in this.menus){
          for(var j in this.menus[i].subSonItem){
            if(this.menus[i].subSonItem[j].namesrc == x){
              this.menus[i].subSonItem[j].cked=true

            }else{
              this.menus[i].subSonItem[j].cked=false
            }
          }
        }

      },
      updateMenu(){
        this.$nextTick(() => {
          // this.$refs.side_menu.updateOpened()
          //
          //
          //
          // this.$refs.side_menu.updateActiveName();
        })
      },
      getuser(){
        this.$http.get('user/find').then(res=>{
          this.userinfo = res.data;
           this.menus = this.menusUser;
          // if(res.data.is_manager == 1){
          //   this.menus = this.menusUser;
          // }else{
          //   this.menus = this.menusAdmin;
          // }

          this.chaneSeleced();
        })
      },
      gohome(){
        this.$router.push({name:'main'});
      },
      jump(str) {
        this.$router.push({name: str});
      },
      loginOut() {
        this.$http.get('user/logout').then(res=>{
          localStorage.clear();
          this.$router.push({name: 'login'});
        })

      }
    }

  }
</script>


