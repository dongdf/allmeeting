<template>
  <div  >
    <div class="ivu-modal-mask" style=""></div>
    <div class="ivu-modal-wrap">
      <div class="ivu-modal" style="width: 420px;">
        <div class="ivu-modal-content"><a class="ivu-modal-close"><i style="font-size:30px; color:#666"  @click="close"   class="ivu-icon ivu-icon-ios-close"></i></a>
          <div class="ivu-modal-header">
            <div class="ivu-modal-header-inner"><Icon color="#08F" type="md-key" />购买秘钥</div>
          </div>
          <div class="ivu-modal-body">
            <div>
              <h3>套餐购买</h3>
              <Row>
                <Col span="8"><div class="tcitem"><h3>100秘钥</h3><p>售价￥99</p><span class="jiaobiao">推荐</span></div></Col>
                <Col span="8"><div class="tcitem"><h3>500秘钥</h3><p>售价￥490</p></div></Col>
                <Col span="8"><div class="tcitem"><h3>1000秘钥</h3><p>售价￥980</p></div></Col>
              </Row>
            </div>
            <div>
              <h3>单独购买</h3>
            </div>
            <div class="buyctn">
              <Form  ref="buyKeyForm" :model="formC" :rules="ruleInline">
                <FormItem label="购买数量" prop="keyNumb">
                  <Input type="text"  placeholder="请输入" v-model="formC.keyNumb">
                  <span slot="prepend"><Icon type="md-key" /></span>
                  <span slot="append">个</span>
                  </Input>
                </FormItem>
              </Form>

              <div class="heji">合计:<b>{{formC.keyNumb}}元</b></div>
              <div class="buyden">
                <Button type="success" long  @click.native="bkey()" icon="md-cart" size="large">微信支付</Button>
              </div>
            </div>




          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "buy-miyao",
    data(){
      return{
        message:null,
        name:null,
        sendcrm:false,
        keyRules:'',
        formC:{
          keyNumb:"1"
        },
        iswechatBuy:false,
        ruleInline: {
          keyNumb: [
            { required: true, trigger: 'blur' },
          ],
        }
      }
    },
    mounted(){

      this.ruleInline.keyNumb[0].validator = function(rule, value, callback){
        var re = /^[1-9]+[0-9]*]*$/;

        if(!value.trim()){
          return callback(new Error("请输入购买数量"));
        }else if(!re.test(value)){
          return callback(new Error('请输入正整数'))
        }else{

          callback();
        }
      };
    },
    methods:{
      bkey(){

        this.$refs['buyKeyForm'].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!');
            this.$el.parentNode.removeChild(this.$el);
            if(typeof this.onOk === 'function'){
              this.onOk(this);
            }

          } else {
            this.$Message.error('提交失败，请查看原因!');
          }
        })
      },
      cancle(){
        this.$el.parentNode.removeChild(this.$el);
      },
      ok(){//回调
        this.$el.parentNode.removeChild(this.$el);
        if(typeof this.onOk === 'function'){
          this.onOk(this,this.formC.keyNumb);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tcitem{
    overflow: hidden;
    border:1px solid #19be6b;
    border-radius: 3px;
    cursor: pointer;
    margin:10px 5px;
    padding:8px 0;
    position: relative;
    text-align: center;
    h3{


    }
    color:#19be6b;
    p{ opacity: .7}
    .jiaobiao {
      width:70px;
      height:20px;
      background: #F60;
      color:#FFF;
      position: absolute;
      top: 5px;
      right: -21px;
      transform:rotate(45deg);
    }

  }
  .tcitem:hover{
    background: #19be6b;
    color:#FFF;
    box-shadow: 0 0 5px #DDD;
  }
  .buyctn{
    padding:5px 10% 10px 10%;
    .heji{
      b{
        color:red;
      }
    }
  }
  .buyden{
    text-align: center;
    padding:10px 0;
  }
</style>
