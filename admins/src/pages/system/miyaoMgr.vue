<template>
    <div>
      <Row style="border-bottom:2px solid #EEE; padding-bottom: 10px;">
        <Col span="18">
        <div class="cpageTitle"><Icon size="20" type="md-key" /><span>反馈列表({{rtotal}})</span></div>
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
      <!--<Alert show-icon>-->
        <!--尊敬的{{userinfo.mobile}}用户您好-->
        <!--<Icon type="ios-contact" size="40" slot="icon"></Icon>-->
        <!--<template slot="desc">-->
          <!--<div class="miyaoPro">-->
            <!--当前秘钥：<b>{{userinfo.keyt_num}}</b>个   <span>已使用：<b>{{ysyDou}}</b>个</span>-->
            <!--<div class="buy"><Button size="large" @click.native="buyMy()" type="success">购买秘钥</Button> </div>-->
          <!--</div>-->
        <!--</template>-->
      <!--</Alert>-->
      <!--<br>-->
      <!--<center>-->
      <!--<ButtonGroup>-->
        <!--<i-button @click.native="changTb(1)"  class="ivu-btn" :class="active == 1?'ivu-btn-primary':''">-->
          <!--<Icon type="md-time" />-->
          <!--使用记录-->
        <!--</i-button>-->
        <!--<Button @click.native="changTb(2)"   class="ivu-btn" :class="active == 2?'ivu-btn-primary':''">-->
          <!--购买记录-->
          <!--<Icon type="ios-basket" />-->
        <!--</Button>-->
      <!--</ButtonGroup>-->
      <!--</center>-->

      <br>
      <div v-if="active == 1">
        <Row class="rheader">
          <Col span="4" class="tleft">姓名</Col>
          <Col span="12"  class="">内容</Col>
          <Col span="4" class="tcenter">时间</Col>
          <Col span="4" class="tcenter">操作</Col>
        </Row>
        <Row class="rerow" v-for="(o,idx) in odrList" :key="idx">
            <Col span="4" class="tleft">{{o.title}}</Col>
            <Col span="12"  class="">{{o.content}}</Col>
            <Col span="4" class="tcenter">{{o.create_time}}</Col>
            <Col span="4" class="tcenter"><label v-show="o.reply">已回复</label><Button @click="replayAuthor(o)" v-show="!o.reply">回复</Button></Col>
            <div v-if="o.reply" class="relpayContent">
                <p>回复内容:</p>
                <h3>{{o.reply}}</h3>
                <p>{{o.reply_time}}</p>

            </div>

        </Row>

      </div>

      <div v-if="active == 2">
        <Row class="rheader">
          <Col span="8" class="tleft">购买数量</Col>
          <Col span="8"  class="tcenter">购买时间</Col>
          <Col span="8" class="tcenter">金额</Col>
        </Row>
        <Row class="rerow" v-for="(o,idx) in odrList" :key="idx">
          <Col span="8" class="tleft"><Icon size="15" style="opacity: .6; position:relative; top:0px"  type="md-key" />{{o.num}}个</Col>
          <Col span="8"  class="tcenter">{{o.payTime | timeNumb('yyyy-MM-dd hh:mm')}}</Col>
          <Col span="8" class="tcenter"><span>￥{{o.amount}}</span></Col>
        </Row>

      </div>


  <div class="pager" v-show="odrList.length > 0">
    <Page :total="rtotal" :current="pnumb" :page-size="psize" show-total @on-change="change" />
  </div>
      <no v-show="odrList.length == 0" :tipText="'暂无记录'"></no>



    </div>
</template>

<script>
  import buyMiyao from '@/pages/system/buyMiyao.vue'
  import buyMa from '@/pages/system/buyMa.vue'
  import no from '@/components/no'
  import replay from '@/components/replay.vue'
  export default {
    data () {
      return {
        active:1,
        replayc:'',
        rtotal:0,
        psize:20,
        pnumb:1,
        odrList:[],
        userinfo:{},
        ysyDou:''

      }
    },
    components:{buyMiyao,buyMa,no},
    mounted(){
      // this.getuser();
      this.getused();

    },
    methods:{

      replayAuthor(obj){
        let that = this;
        this.$mymsg(replay,{
          data: {
            replayid: obj.id
          },
          methods:{
            onOk(){
              // alert('回调')
              that.getused();
            }
          }
        });
      },
      getuser(){
        this.$http.post('financial/userService/getCurUser').then(res=>{
          this.userinfo = res.data;
        })
      },
      change:function (page) {
        console.log(page);
        this.pnumb = page;
        this.getused();
      },
      changTb(idx){
        this.active = idx;
        this.pnumb = 1;
        if(this.active == 2){
          this.getOrder();
        }else{
          this.getused();
        }
      },
      buyMy(){
        let that = this;
        this.$mymsg(buyMiyao,{
          data: {
            message: 'you click me btn1'
          },
          methods:{
            onOk(){

              that.buyDou(this.formC.keyNumb)
              // that.showWechatMa()
            }
          }
        });

      },
      buyDou(numb){
        this.$http.post('financial/orderService/newOrder',{
          subData:numb
        }).then(res=>{
          if(res.data.code!=1){
            this.$Message.error(res.data.msg);
          }else{
            this.showWechatMa(res.data.data.codeURL,res.data.data.orderNo)
          }

        },(e)=>{
          alert(e.data.message)
        })
      },

      getused(){
        this.$http.post('msg/lists?page='+this.pnumb+"&size="+this.psize,{

            page:this.pnumb,
            size:this.psize

        }).then(res=>{
          this.odrList = res.data.data.list;
          this.rtotal = parseInt(res.data.data.count);
          // this.ysyDou = res.data.data.total

        })
      },
      getOrder(){
        this.$http.post('financial/orderService/list',{
          subData:{
            pageNum:this.pnumb,
            pageSize:this.psize
          }
        }).then(res=>{
          this.odrList = res.data.data.list;
          this.rtotal = parseInt(res.data.data.total);
        })

      },
      showWechatMa(picurl,orderno){
        let that = this;
        this.$mymsg(buyMa,{
          data: {
            message:picurl,
            orderNo:orderno
          },
          methods:{
            onOk(){
              that.getuser();

              if(that.active == 2){
                that.getOrder();
                that.getuser();
              }

            }
          }
        });

      }
    }
  }
</script>

<style lang="scss" scoped>
    .relpayContent{
        margin:0px 0;padding:10px;
        border:1px solid #EEE;
        clear:both;
        border-radius: 5px;
        background: #F8F8F8;
        color:#08F;
        p{
            color:#666;
        }
    }
  .tabs{
    color:#666;
    cursor: pointer;
  }
  .cur{
    color:#08F;
  }
.pager{
  text-align: center;
  padding-top:15px;
}
.rerow{
  padding:0 10px;
  border-bottom: 1px solid #EEE;
  padding:10px 0 5px 0;
  font-weight: normal;

}
.tleft{
  text-align: left;
  padding-left:10px;
}
.tcenter{
  text-align: center;
  span{
    color:red;
  }
}
.rerow:hover{
  background: #ebf7FF;
}
.rheader{
  padding:0 10px;
  background: #F8F8F8;
  padding:10px 0 5px 0;
  font-weight: normal;
}

  .miyaoPro{
    position: relative;
    padding:5px 0;
    span{
      padding-left:20px;
    }
    b{
      color:red;
    }
    .buy{
      position: absolute;
      right:10px;
      top:-15px;
    }
  }
</style>
