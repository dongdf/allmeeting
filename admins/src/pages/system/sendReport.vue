<template>
  <div  >
    <div class="ivu-modal-mask" style=""></div>
    <div class="ivu-modal-wrap">
      <div class="ivu-modal" style="width: 520px;">
        <div class="ivu-modal-content"><a class="ivu-modal-close"><i style="font-size:30px; color:#666"  @click="close"   class="ivu-icon ivu-icon-ios-close"></i></a>
          <div class="ivu-modal-header">
            <div class="ivu-modal-header-inner"><Icon color="#08F" type="md-mail" />发送报告</div>
          </div>
          <div class="ivu-modal-body">
            <div class="msgtips">将<span style="color:#08F;">{{companyInfo.company_name}}</span>的评估报告发送给</div>
              <div class="ckbx">
                <CheckboxGroup v-model="checkcontact">
                  <Checkbox  v-for="(obj,idx) in companyInfo.contactList" :key="idx" v-bind:label="obj.id">
                  <span>{{obj.contact_name}} {{obj.contact_phone}}</span>
                  </Checkbox>
                </CheckboxGroup>
              </div>
            <div   class="confirms">
              <br>
              <Button type="primary" :disabled="checkcontact.length==0" @click="sendbb()" size="large">确定发送</Button>
            </div>

          </div>
          <!--<div class="ivu-modal-footer">-->
            <!--<button type="button" @click="cancle" class="ivu-btn ivu-btn-text ivu-btn-large">&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <span>取消</span></button>-->
            <!--<button type="button" @click="ok" class="ivu-btn ivu-btn-primary ivu-btn-large">&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <span>确定</span></button>-->
          <!--</div>-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "send-report",
    data(){
      return{
        message:null,
        name:null,
        sendcrm:false,
        cids:3,
        sendurl:'',
        nf:'',
        social:{},
        companyInfo:{},
        checkcontact:[],
      }
    },
    mounted(){
      this.getdetail();
    },
    methods:{
      sendbb(){
        console.log(this.checkcontact.join(','));
        // return false;
        var surl = '/#/bbview?id='+this.cids;
        this.$http.post('financial/userService/sendReportSms',{
        subData: {
          userIds: this.checkcontact.join(','),
          reportId: this.bbid,
          nf:this.nf,
          showUrl:this.sendurl
        }
        }).then(res=>{
          if(res.data.code == 1){
            this.$el.parentNode.removeChild(this.$el);
            this.$Message.success(res.data.msg);

          }else{
            this.$Message.error(res.data.msg)
          }
        })
      },

      getdetail(){
        this.$http.post('financial/companyService/infoCompany',{
          subData:this.cids
        }).then(res=>{
          this.companyInfo = res.data.data;
        })

      },
      cancle(){
        this.$el.parentNode.removeChild(this.$el);
      },

      ok(){//回调
        this.$el.parentNode.removeChild(this.$el);
        if(typeof this.onOk === 'function'){
          this.onOk(this);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ckbx{
    text-align: center;
    padding:15px 0;
  }
  .confirms{
     text-align: center;
    padding-bottom:50px;
    h3{
      b{
        color:#F60;
      }
    }
  }
.msgtips{
  text-align: center;
  padding:15px 0;
  font-size:18px;
  font-weight: bold;
}
</style>
