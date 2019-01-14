<template>
  <div>
    <Row style="border-bottom:2px solid #EEE; padding-bottom: 10px;">
      <Col span="18">
      <div class="cpageTitle"><Icon size="20" type="logo-usd" /><span>费率设置</span></div>
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
      <Form ref="passVal" :model="passform" :rules="passRule" :label-width="120">
        <!--<FormItem  label="登录名">-->

          <!--<div style="text-align: left">{{userinfo.username}}</div>-->
        <!--</FormItem>-->
        <!--<FormItem prop="oldpass" label="原密码">-->
          <!--<Input type="password" v-model="passform.oldpass"/><label style="font-weight: normal; color:#666">原密码默认为 111111</label>-->
        <!--</FormItem>-->
        <FormItem label="微信支付手续费率" prop="newpass">
          <Input type="text" v-model="passform.newpass">
          <span slot="append">%</span>
          </Input>
        </FormItem>
        <FormItem prop="confirmpass" label="迟到费率">
          <Input type="text" v-model="passform.confirmpass" >
          <span slot="append">%</span>
          </Input>
        </FormItem>
        <FormItem prop="confirmpass" label="全部迟到费率">
          <Input type="text" v-model="passform.all_late_rate" >
          <span slot="append">%</span>
          </Input>
        </FormItem>

        <FormItem prop="distance" label="与会人员签到距离">
          <Input type="text" v-model="passform.distance" >
          <span slot="append">米</span>
          </Input>
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
          distance:'',
          confirmpass:'',
          all_late_rate:''
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
          distance: [
            { required: true,   trigger: 'blur' }
          ],
          all_late_rate: [
            { required: true,   trigger: 'blur' }
          ]

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
          return callback(new Error("手续费率"));
        }else{
          that.npass = value;
          callback();
        }
      };
      this.passRule.confirmpass[0].validator = function(rule, value, callback){
        if(!value.trim()){
          return callback(new Error("提成费率"));
        }else{
          that.npass = value;
          callback();
        }
      };

      this.passRule.all_late_rate[0].validator = function(rule, value, callback){
        if(!value.trim()){
          return callback(new Error("全部迟到费率"));
        }else{
          that.npass = value;
          callback();
        }
      };

      this.passRule.distance[0].validator = function(rule, value, callback){
        var temp = value.trim();
        var r = /^\+?[1-9][0-9]*$/;　　//正整数
        // String str = "123";
        // boolean flag=r.test(str);
        if(!value.trim()){
          return callback(new Error("签到距离"));
        }else if(!r.test(temp)){
          return callback(new Error("必须会正整数"));
        }else{
          that.npass = value;
          callback();
        }
      };

      this.getuser();


    },
    methods:{
      getuser(){
        this.$http.post('base/find').then(res=>{
          this.userinfo = res.data.data;
          this.passform.newpass = this.userinfo.join_fl;
          this.passform.confirmpass = this.userinfo.out_fl;
          this.passform.distance = this.userinfo.distance;
          this.passform.all_late_rate = this.userinfo.all_late_rate
        })
      },
      passSubmit(){

        this.$refs['passVal'].validate((valid) => {
          if (valid) {
            this.$http.post('base/upInfo',{
              sxf:this.passform.newpass,
              tic:this.passform.confirmpass,
              distance:this.passform.distance,
              all_late_rate:this.passform.all_late_rate
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
