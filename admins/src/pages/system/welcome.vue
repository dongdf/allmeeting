<template>
    <div>

        <div><br>
            <center>
                <ButtonGroup>
                    <i-button  @click="changetabs(1)"  class="ivu-btn " :class="affrisType==1?'ivu-btn-primary':''"  >

                        今天
                    </i-button>
                    <i-button  @click="changetabs(2)"  class="ivu-btn" :class="affrisType==2?'ivu-btn-primary':''"  >

                        昨天
                    </i-button>
                    <i-button  @click="changetabs(3)"  class="ivu-btn" :class="affrisType==3?'ivu-btn-primary':''"  >

                        近7天
                    </i-button>
                    <i-button  @click="changetabs(3)"  class="ivu-btn" :class="affrisType==3?'ivu-btn-primary':''"  >

                        近30天
                    </i-button>
                    <i-button  @click="changetabs(3)"  class="ivu-btn" :class="affrisType==3?'ivu-btn-primary':''"  >

                        全部
                    </i-button>

                </ButtonGroup>
            </center>
            <br>
            <br>
        </div>
        <Row style="border-radius: 5px; overflow: hidden">

            <Col span="6"><div style="background: #0080df" class="moneytotal"><h3>32939次</h3><p>会议</p><Icon type="logo-buffer" /></div></Col>
            <Col span="6"><div style="background: #6610f2" class="moneytotal"><h3>100033人</h3><p>用户</p><Icon type="md-person-add" /></div></Col>
            <Col span="6"><div style="background: #17A2BF" class="moneytotal"><h3>1000.00</h3><p>营业收入(元)</p><Icon type="logo-usd" /></div></Col>
            <Col span="6"><div style="background: #f86c6b" class="moneytotal"><h3>1000.00</h3><p>发红包(元)</p><Icon type="logo-usd" /></div></Col>
            <!--<Col span="6"><div class="moneytotal"><h3>1000.00</h3><p>净利润</p></div></Col>-->
        </Row>








    </div>
</template>

<script>
  import {DOWNZIP} from '../../constants'
  import md from '@/components/modals'
  export default {
    name: "welcome",
    data(){
      return{
        affrisType:1,
        dzpi:'',
        userinfo:{}
      }
    },
    mounted(){
      this.dzpi = DOWNZIP;
      // this.getuser();
    },
    methods:{
      getuser(){
        this.$http.post('financial/userService/getCurUser').then(res=>{
          this.userinfo = res.data;
          if(!this.userinfo.password){
            // this.showtips();
          }


        })
      },
      showtips(){
        let that = this;
        this.$mymsg(md,{
          data: {
            message: '您还没有设置密码，点击确定去设置'
          },
          methods:{
            onOk(){
              that.$router.push({name:'editPas'});
            }
          }
        });
      },
      gopage(name){
          this.$router.push({name:name});
      }
    }
  }
</script>

<style lang="scss" scoped>
    .jyitem{
        border-bottom: 1px solid #EEE;
        padding:15px 10px;
        font-weight: normal;
    }
    .jyitem:hover{
        background: #F8F8F8;
    }
    .moneytotal{
        position: relative;
        margin:0 15px;
        border-radius: 8px;
        padding:10px 0 60px 20px;
        text-align: left;
        background: #2b85e4;
        h3{font-size:25px; color:#FFF;}
        p{
            font-size:16px; color:#FFF;
            font-weight: normal;
        }
        i{
            position:absolute;
            bottom:10px;
            right:10px;
            font-size:60px;
            color:#fff;
            opacity: .1;
        }


    }
    .filedtitle{
        padding:0 10px;
    }

    .formdata{
        padding-top:80px;
        width:600px;

    }

    .wel_c{
        text-align: center;
        h3{
            font-size:16px;
            padding:10px 0;
        }
    }
</style>
