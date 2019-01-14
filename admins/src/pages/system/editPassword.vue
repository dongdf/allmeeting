<template>
  <div>
    <Row style="border-bottom:2px solid #EEE; padding-bottom: 10px;">
      <Col span="18">
      <div class="cpageTitle"><Icon size="20" type="md-lock" /><span>修改密码</span></div>
      <!--<Button type="primary" icon="plus-round" @click="add">新增教师</Button>-->
      </Col>
      <Col span="6" style="text-align: right">
      <!--<Input placeholder="请输入公司名称" >-->
      <!--<span slot="prepend"><Icon type="ios-search"></Icon></span>-->
      <!--<span slot="append">-->
                <!--<Button type="primary">搜索</Button>-->
            <!--</span>-->
      <!--</Input>-->
      </Col>
    </Row>
    <div class="epsd">
      <Form ref="passVal" :model="passform" :rules="passRule" :label-width="80">
        <FormItem  label="登录名">

          <div style="text-align: left">{{userinfo.username}}</div>
        </FormItem>
        <!--<FormItem prop="oldpass" label="原密码">-->
          <!--<Input type="password" v-model="passform.oldpass"/><label style="font-weight: normal; color:#666">原密码默认为 111111</label>-->
        <!--</FormItem>-->
        <FormItem label="密码" prop="newpass">
          <Input type="password" v-model="passform.newpass"/>
        </FormItem>
        <FormItem prop="confirmpass" label="再次确认">
          <Input type="password" v-model="passform.confirmpass" />
        </FormItem>
        <FormItem label="">
          <Button @click.native="passSubmit" type="primary" size="large">保存</Button>
        </FormItem>

      </Form>


    </div>

  </div>
</template>

<script>

  import Input from "iview/src/components/input/input";

  export default {
    components: {Input},
    data () {

      return {
        userinfo:{},
        npass:'',
        passform:{
          // oldpass:'',
          newpass:'',
          confirmpass:''
        },
        passRule:{
          // oldpass: [
          //   { required: true, trigger: 'blur' }
          // ],
          newpass: [
            { required: true,   trigger: 'blur' }
          ],
          confirmpass: [
            { required: true,   trigger: 'blur' }
          ],

        },
      }
    },
    mounted(){
      let that = this;
      // this.passRule.oldpass[0].validator = function(rule, value, callback){
      //   if(!value.trim()){
      //     return callback(new Error("请输入原密码"));
      //   }else{
      //     callback();
      //   }
      // };
      this.passRule.newpass[0].validator = function(rule, value, callback){
        if(!value.trim()){
          return callback(new Error("请输入新密码"));
        }else{
          that.npass = value;
          callback();
        }
      };
      this.passRule.confirmpass[0].validator = function(rule, value, callback){
        if(!value.trim()){
          return callback(new Error("请输入新密码"));
        }else if(that.npass != value){
          return callback(new Error('两次密码输入不一致'))
        }else{
          callback();
        }
      };

      this.getuser();


    },
    methods:{
      getuser(){
        this.$http.post('user/find').then(res=>{
          this.userinfo = res.data.data;
        })
      },
      passSubmit(){

        this.$refs['passVal'].validate((valid) => {
          if (valid) {
            this.$http.post('user/upPwd',{
              newpwd:this.passform.newpass
            }).then(res=>{
              if(res.data.status != 200){
                this.$Message.error(res.data.info);
              }else{
                this.$Message.success(res.data.info);
              }

            })


          } else {
            this.$Message.error('提交失败，请查看原因!');
          }
        })

      }


    }
  }
</script>

<style lang="scss" scoped>

  .epsd{
    width:300px;

    padding-top:50px;margin:0 auto;

  }
  .formdata{
    padding-top:80px;
    width:600px;

  }
</style>
