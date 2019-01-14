<template>
  <div class="loginbg">
    <!--<div class="loginAd">-->
      <!--<div class="adcontent"><img src="./assets/imgs/books.png"/></div>-->
    <!--</div>-->

    <div class="logincontent">
      <div class="login_banner">
        <!--<div class="login_logo fl"><img src="./assets/imgs/logo.png"></div>-->
        <div class="login_text ">
          <h3>用户登录</h3>
          <!--<p>欢迎使用企业税收健康检查系统</p>-->

        </div>
        <div class="cl"></div>

      </div>
      <!--<div class="logintitle">-->


        <!--<ButtonGroup >-->
          <!--<i-button @click="changeLogin(1)" class="ivu-btn" :class="actives == 1?'ivu-btn-primary':''">短信验证码登录</i-button>-->
         <!---->
          <!--<i-button @click="changeLogin(2)" :class="actives == 2?'ivu-btn-primary':''">用户名密码登录</i-button>-->
        <!--</ButtonGroup>-->

      <!--</div>-->
      <div class="loginbox">
        <div v-show="actives == 1">
          <Form ref="codeLogin" :model="codeForm"  :rules="codeLoginRule">
            <FormItem prop="phone">
              <Input type="text" v-model="codeForm.phone" placeholder="请输入手机号">
              <Icon type="md-phone-portrait" slot="prepend" />
              </Input>
            </FormItem>
            <FormItem prop="phoneCode">
              <Input type="text" v-model="codeForm.phoneCode" v-on:keyup.enter.native="handleSubmit('codeLogin')" placeholder="请输入验证码">
              <!--<Icon type="ios-add-circle" slot="prepend"></Icon>-->
              <Icon type="ios-mail"  slot="prepend" />
              <Button v-show="!isSend" @click="sendSMS" slot="append">获取验证码</Button>
              <span v-show="isSend"  slot="append">{{sendText}}</span>
              </Input>

            </FormItem>
            <FormItem>
              <Button type="primary" size="large" long @click="handleSubmit('codeLogin')">登录</Button>
            </FormItem>
          </Form>
        </div>



        <div v-show="actives == 2">
          <Form ref="passLogin" :model="passForm" :rules="passLoginRule">
            <FormItem prop="phone">
              <Input type="text" v-model="passForm.phone"  placeholder="请输入用户名">
              <Icon type="md-phone-portrait" slot="prepend" />
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="passForm.password"  v-on:keyup.enter.native="handleSubmit('passLogin')"    placeholder="密码">
              <Icon type="md-key" slot="prepend" />
              </Input>
            </FormItem>

            <FormItem>
              <Button type="primary" size="large" @click="handleSubmit('passLogin')" long >登录</Button>
            </FormItem>
          </Form>
        </div>




      </div>
    </div>

  </div>

</template>
<style lang="scss" scoped>
  .loginbox{ width:70%; margin:0 auto; margin-top:30px; overflow: hidden;}
  .loginbg {
    position:absolute;
    width:100%;
    height:100%;
    background:url("./assets/imgs/login_bg.jpg") no-repeat center;
    background-size: cover;

  }
  .loginAd{
    width:100%;
    position: absolute;
    top:20%;
    left:0;

    .adcontent{

      padding:5%;
      padding-top:2%;
      padding-left:10%;
      /*background: rgba(255,0,0,0.5);*/
    }
  }
  .logincontent {
    position: relative;
    overflow: hidden;
    width:330px; top:35%;
    background:#FFF;
    margin:0 auto;
    float:right;
    margin-right:10%;
    border-radius:.5rem;
    padding-bottom:20px;
    box-shadow: 0 0 5px #CCC;
    .login_banner{
      padding-top:15px;
      height:50px;
      background: #fFF;
      border-bottom:1px solid #EEE;
      color:#333;
      .login_logo{
        width:50px;
        margin-left:60px;
        img{
          width:100%;
        }
      }
      .login_text{
        margin-left:20px;
        h3{
          font-size:14px;


        }

        p{
          opacity: .6;
        }
      }

    }
  }

  .logintitle{
    text-align:center;
    padding-top:30px;

    span{
      cursor: pointer;
      font-size:16px;
      font-weight: normal;
      margin:0 5px;
    }
    .cur{
      color:#08F;
      font-weight: bold;
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        actives:2,
        timer:120,
        isSend:false,
        sendText:'',
        codeForm: {
          phone: '',
          phoneCode: ''
        },
        codeLoginRule: {
          phone: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          phoneCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        },
        passForm: {
          phone: '',
          password: ''
        },
        passLoginRule: {
          phone: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }



      }
    },
    mounted(){
      //console.log(JSON.stringify(this.$store.state)+'123');
    },
    methods: {
      sendSMS(){
        if(!this.$options.filters.isphone(this.codeForm.phone)){
          this.$Message.info('手机号格式错误')
          return false;
        }
        if(this.isSend){
          return false;
        }
        this.isSend = true;
        this.sendText=this.timer+"S后重新发送"
        this.$http.post('financial/userService/login/sendSMS',
          {
            subData:{
              mobile:this.codeForm.phone
            }
          }).then(res=>{

            if(res.data.code !=1){
              this.isSend = false;
              this.$Message.info(res.data.msg)
            }else{
              var  t = setInterval(()=>{
                this.timer--;
                this.sendText=this.timer+"S后重新发送"
                if(this.timer == 1){
                  this.isSend = false;
                  clearInterval(t);
                }

              },1000)

            }
        })
      },
      changeLogin(idx){
        this.actives = idx;
      },
      handleSubmit(name) {
        if(name == 'codeLogin'){

          this.$refs[name].validate((valid) => {//验证码登录
            if (valid) {
              this.$http.post('financial/userService/login/loginUser',{
                subData:{
                  mobile:this.codeForm.phone,
                  code:this.codeForm.phoneCode
                }
              }).then(res=>{
                if(res.data.code!=1){
                  this.$Message.error(res.data.msg);
                }else {
                  localStorage.setItem('user',this.codeForm.phone);
                  localStorage.setItem('sid',res.data.data);
                  if(res.data.data == 1){
                    this.$router.push({name:'main'});
                  }else{
                    this.$router.push({name:'reportMgrAdmin'});
                  }

                }
              })


            } else {
              this.$Message.error('登录失败!');
            }
          })

        }else{//账户密码登录

          this.$refs[name].validate((valid) => {
            if (valid) {
              // localStorage.setItem('user','admins');
              // localStorage.setItem('sid','didi');
              // this.$router.push({name:'main'});
              // return false;
              // alert(this.passForm.phone+''+this.passForm.password)
              var plogin ={
                username:this.passForm.phone,
                password:this.passForm.password
              }
              this.$http.post('login',plogin).then(res=>{
                if(res.data.status ==200){
                  // alert(res.data.data.group_id);
                  // if(res.data.data == 1){
                  localStorage.setItem('user',res.data.data.nickname);
                  // localStorage.setItem('sid','didi');
                    this.$router.push({name:'main'});
                  // }else{
                  //   this.$router.push({name:'reportMgrAdmin'});
                  // }

                }else {
                  this.$Message.error(res.data.msg);




                }
              })


            } else {
              this.$Message.error('登录失败!');
            }
          })

        }

      }
    }
  }
</script>
