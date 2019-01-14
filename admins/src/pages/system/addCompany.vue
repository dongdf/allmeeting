<template>
  <div>
    <Row style="border-bottom:2px solid #EEE; padding-bottom: 10px;">
      <Col span="18">
      <div class="cpageTitle"><Icon size="20" type="logo-usd" /><span>保证金统计</span></div>
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

<br>
      <Row>

        <Col span="24">
        <div style="position:relative; text-align: left">
        <label class="filedtitle">从</label><DatePicker @on-change="changestartDay"    format="yyyy-MM-dd"  placement="bottom" placeholder="请选择时间段" style=" width:200px; "></DatePicker> <label class="filedtitle">到</label><DatePicker @on-change="changeendDay"   format="yyyy-MM-dd"   placement="bottom" placeholder="请选择时间段" style=" width:200px; "></DatePicker> <Button type="primary">查询</Button>
        </div>
        </Col>
      </Row>
      <br>


    <Row style="border:1px solid #EEE; padding:20px 0; border-radius: 5px;">

      <Col span="4"><div class="moneytotal"><h3>1000.00</h3><p>支付金额(参与聚会)</p></div></Col>
      <Col span="4"><div class="moneytotal"><h3>1000.00</h3><p>退款金额(准时签到)</p></div></Col>
      <Col span="6"><div class="moneytotal"><h3>1000.00</h3><p>迟到金额(微信商户收入)</p></div></Col>
      <Col span="6"><div class="moneytotal"><h3>1000.00</h3><p>企业转账(发红包)</p></div></Col>
      <Col span="4"><div class="moneytotal"><h3>1000.00</h3><p>净利润</p></div></Col>
    </Row>

    <br>
    <div style="border:1px solid #EEE;">
    <Row style="background: #F8F8F8; padding:10px;">
      <Col span="4">交易金额</Col>
      <Col span="4">交易类型</Col>
      <Col span="4">交易状态</Col>
      <Col span="4">交易备注</Col>
      <Col span="4">订单号</Col>
      <Col span="4">交易时间</Col>
    </Row>
    <div class="jyitem">
      <Row>
      <Col span="4">交易金额</Col>
      <Col span="4">交易类型</Col>
      <Col span="4">交易状态</Col>
      <Col span="4">交易备注</Col>
      <Col span="4">订单号</Col>
      <Col span="4">交易时间</Col>
      </Row>
    </div>

    <div class="jyitem">
      <Row>
        <Col span="4">交易金额</Col>
        <Col span="4">交易类型</Col>
        <Col span="4">交易状态</Col>
        <Col span="4">交易备注</Col>
        <Col span="4">订单号</Col>
        <Col span="4">交易时间</Col>
      </Row>
    </div>


    <div class="jyitem">
      <Row>
        <Col span="4">交易金额</Col>
        <Col span="4">交易类型</Col>
        <Col span="4">交易状态</Col>
        <Col span="4">交易备注</Col>
        <Col span="4">订单号</Col>
        <Col span="4">交易时间</Col>
      </Row>
    </div>


    <div class="jyitem">
      <Row>
        <Col span="4">交易金额</Col>
        <Col span="4">交易类型</Col>
        <Col span="4">交易状态</Col>
        <Col span="4">交易备注</Col>
        <Col span="4">订单号</Col>
        <Col span="4">交易时间</Col>
      </Row>
    </div>


    <div class="jyitem">
      <Row>
        <Col span="4">交易金额</Col>
        <Col span="4">交易类型</Col>
        <Col span="4">交易状态</Col>
        <Col span="4">交易备注</Col>
        <Col span="4">订单号</Col>
        <Col span="4">交易时间</Col>
      </Row>
    </div>


    <div class="jyitem">
      <Row>
        <Col span="4">交易金额</Col>
        <Col span="4">交易类型</Col>
        <Col span="4">交易状态</Col>
        <Col span="4">交易备注</Col>
        <Col span="4">订单号</Col>
        <Col span="4">交易时间</Col>
      </Row>
    </div>


    <div class="jyitem">
      <Row>
        <Col span="4">交易金额</Col>
        <Col span="4">交易类型</Col>
        <Col span="4">交易状态</Col>
        <Col span="4">交易备注</Col>
        <Col span="4">订单号</Col>
        <Col span="4">交易时间</Col>
      </Row>
    </div>
    </div>


  </div>
</template>

<script>

  import Button from "iview/src/components/button/button";
  import treeComponent from "../../components/treeComponent"
  import Input from "iview/src/components/input/input";
  export default {
    components: {
      Input,
      Button},
    data () {

      return {
        startDay: '',
        endDay: ''


      }
    },
    mounted(){


    },
    methods:{
      changestartDay(dateString){
        console.log(dateString);
        this.startDay = dateString +' 00:00';

      },
      changeendDay(dateString){
        this.endDay = dateString+' 23:59';
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
    h3{font-size:20px; color:#F60;}
    p{
      font-size:12px; color:#666;
      font-weight: normal;
    }
    text-align: center;
    border-left:1px solid #EEE;
    margin-left:-1px;
  }
  .filedtitle{
    padding:0 10px;
  }

  .formdata{
    padding-top:80px;
    width:600px;

  }
</style>
