<template>
  <div  >
    <div class="ivu-modal-mask" style=""></div>
    <div class="ivu-modal-wrap">
      <div class="ivu-modal" style="width: 700px;">
        <div class="ivu-modal-content"><a class="ivu-modal-close"><i   @click="close" class="ivu-icon ivu-icon-ios-close"></i></a>
          <div class="ivu-modal-header">
            <div class="ivu-modal-header-inner">会议详情【{{mtinfo.info.id}}】</div>
          </div>
          <div class="ivu-modal-body">

            <Row class="meetinfo">
              <Col span="24"><b>会议标题：</b>{{mtinfo.info.title}}</Col>
              <Col span="24"><h5>会议地点：{{mtinfo.info.adr_name}}</h5><p>{{mtinfo.info.address}}</p></Col>
              <Col span="8"><b>活动时间：</b>{{mtinfo.info.active_time}}</Col>

              <Col span="8"><b>保证金：</b>{{mtinfo.info.promise_money}}</Col>
              <Col span="8"><b>参与人数：</b>{{mtinfo.info.quota}}人</Col>
              <Col span="8"><b>关门时间：</b>{{mtinfo.info.close_time}}</Col>
              <Col span="8"><b>保证金总额：</b>2012-12-12 10:28</Col>

            </Row>

            <div class="joinmeetTitle">参会人员</div>
            <Row class="meetinfo">
              <div class="iqds" style="background: #F8F8F8;">
              <Col span="4">姓名</Col>
              <Col span="4">电话</Col>
              <Col span="4">保证金</Col>
              <Col span="6">签到状态</Col>
              <Col span="6">红包状态</Col>
              <div style="display: block; clear: both"></div>
              </div>
              <div class="iqds" v-for="p in mtinfo.list">
                <Col span="4">{{p.name}}</Col>
                <Col span="4">{{p.mobile}}</Col>
                <Col span="4">{{p.order_money}}<label v-show="p.pay_type == 1">已支付</label><label v-show="p.pay_type != 1" style="color:red;">未支付</label></Col>
                <Col span="6"><label v-show="p.status == 2">已签到</label><label v-show="p.status != 2">未签到/迟到</label></Col>
                <Col span="6"><label v-show="p.hb_type == 1">已领取</label><label v-show="p.hb_type != 1">未领取</label> {{p.red_money}}</Col>
                <div style="display: block; clear: both"></div>
              </div>




            </Row>

          </div>
          <div class="ivu-modal-footer" v-if="optbtn" style="text-align: center;">

            <button type="button"   class="ivu-btn ivu-btn-primary ivu-btn-large"><!----> <!----> <span>审批通过</span></button>
            <button type="button"   class="ivu-btn ivu-btn-error ivu-btn-large"><!----> <!----> <span>驳回</span></button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {

    data(){
      return {
        name:null,
        optbtn:false,
        message:null,
        mtinfo:{},
        mid:''
      }
    },
    mounted(){
      this.getmeetinfo();
    },
    methods:{
      getmeetinfo(){
        this.$http.get('affair/find?id='+this.mid).then(res=>{
          this.mtinfo = res.data.data.data;
        })
      },
      cancle(){
        this.$el.parentNode.removeChild(this.$el);
      },
      ok(){
        if(typeof this.onOk === 'function'){
          this.onOk(this);
          this.$el.parentNode.removeChild(this.$el);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .joinmeetTitle{
    margin:10px 0 10px 0;
    border-bottom: 1px solid #EEE;
    padding:10px 0;
    font-size:14px;
    color:#000;
    font-weight: bold;
  }
  .iqds{
    border-bottom:1px solid #EEE;
    padding:5px 10px;
  }
  .iqds:hover{
    background: #F8F8F8;
  }
  .meetinfo{
    .ivu-col{
      padding:5px 0;
    }
  }

</style>
