<template>
  <div >
    <div class="ivu-modal-mask" style=""></div>
    <div class="ivu-modal-wrap">
      <div class="ivu-modal" style="width: 620px; top:20%">
        <div class="ivu-modal-content">
          <!--<a class="ivu-modal-close"><i style="font-size:30px; color:#666"  @click="close"   class="ivu-icon ivu-icon-ios-close"></i></a>-->
          <div class="ivu-modal-header">
            <div class="ivu-modal-header-inner" style=" height:60px">

              <div class="tijian" v-show="doneReport == 1">
                <div class="fl bigicon2">
                  <Icon size="30" color="#FFF" type="ios-bulb-outline" />
                </div>
                <div class="icontext fl">
                  <h3>生成报告将消耗 <span>1</span>个秘钥</h3>
                  <p class="small">当前秘钥 {{userinfo.keyt_num}} 个,还可以生成{{userinfo.keyt_num}}次报告 <b @click="gobuy" style="cursor: pointer">购买秘钥>></b></p>

                </div>
                <div class="actbtn">
                  <Button size="large"  @click="startFx" type="primary" :disabled="!userinfo.keyt_num">生成报告</Button>
                  <Button size="large" @click="cancle" type="text">取消</Button>
                </div>

              </div>

              <div class="tijian" v-show="doneReport == 2">
                <div class="fl bigicon">
                  <Icon color="#FFF" size="30" type="ios-hammer" />
                </div>
                <div class="icontext fl">
                  <h3>正在生成报告...</h3>
                  <p class="small"><b>{{bigtext}}</b></p>
                </div>
                <div class="actbtn">
                  <!--<Button size="large"  type="primary">生成报告</Button>-->
                  <Button size="large" @click="cancle" type="text">取消</Button>
                </div>

              </div>

              <div class="tijian" v-show="doneReport == 3">
                <div class="fl bigicon2" v-if="zj_total<=3">
                  <Icon color="#FFF" size="30" type="md-checkmark" />
                </div>
                <div class="fl bigicon2" style="background: #F60;" v-if="zj_total>3 && zj_total<=7">
                  <!--<Icon type="md-information"    />-->
                  <Icon type="md-warning" color="#FFF" size="30" />
                </div>
                <div class="fl bigicon2" style="background: red;" v-if="zj_total>7">

                  <Icon color="#FFF" size="30" type="ios-sad-outline" />
                </div>
                <div class="icontext fl">
                  <h3>该企业税收风险等级为
                    <span v-if="zj_total<=3" style="color:green;">初级</span>
                    <span v-if="zj_total>3 && zj_total<=7" style="color:#F60;">中级</span>
                    <span v-if="zj_total>7" style="color:red;">高级</span>
                    </h3>
                  <p class="small">提示:等级越高风险越大<b></b></p>
                </div>
                <div class="actbtn">
                  <Button size="large"  @click="gobb" type="primary">查看报告</Button>
                  <Button size="large" @click="cancle" type="text">关闭</Button>
                </div>

              </div>

            </div>
          </div>
          <div class="ivu-modal-body">
            <div class="proingC" id="proingC">
              <div class="times">
                <Timeline>
                  <TimelineItem color="green" v-for="(item,index) in fxlist" :key="index">
                    <Icon type="ios-paper"  size="20" slot="dot"></Icon>
                    <p class="time"  ><h3>{{item.list.title}}<span class="fr xjf" v-show="item.list.value">{{item.list.value}}分</span></h3></p>
                    <p class="content " :class="x.state ==2?'cur':''"  :key="idx" v-for="(x,idx) in item.list.children" >
                      <span><Icon type="ios-add" />{{x.title}}</span>
                      <span class="fr">
                        <Icon size="16"   :size="20" v-show="x.state ==1"  type="ios-time-outline" />

                        <Icon type="ios-hammer"  :size="20" color="#F60"   v-show="x.state ==2" />

                        <template v-if="x.state ==3">
                          <Badge status="default" v-if="x.value<0" text="异常"   />
                        <Badge status="error" v-if="x.value>0" :text="x.value+'分'"   />
                        <Badge status="success" v-if="x.value==0" :text="x.value+'分'"   />
                        </template>

                      </span>
                    </p>
                  </TimelineItem>

                </Timeline>
              </div>



            </div>




          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {FLODER} from '@/constants'
  export default {
    name: "product-report",
    data(){
      return{
        isStop:true,
        doneReport:1,
        zj_total:'',
        bigtext:'正在生成，请稍后...',
        isbaogao:true,
        curyear:'123',
        qyId:'',
        fxlist:[
          {
            list:{
              title:'税负指标',
              state:1,
              value:'',
              children:[
                {title:'增值税税负率',state:1,value:1,api:'financial/reportService/analysisZzsfl'},
                {title:'企业所得税税负率',state:1,value:2,api:'financial/reportService/analysisQysfl'},
                {title:'企业所得税贡献率',state:1,value:2,api:'financial/reportService/analysisQygxl'},

              ]
            }
          },
          {
            list:{
              title:'税源指标',
              state:1,
              value:'',
              children:[
                {title:'速动比率',state:1,value:2,api:'financial/bbzbService/syzbfx/sdbl'},
                {title:'流动比率',state:1,value:1,api:'financial/bbzbService/syzbfx/ldbl'},

                {title:'资产负债率',state:1,value:3,api:'financial/bbzbService/syzbfx/zcfzl'},
                {title:'存货周转率',state:1,value:4,api:'financial/bbzbService/syzbfx/chzzl'},
                {title:'应收账款周转率',state:1,value:5,api:'financial/bbzbService/syzbfx/yszkzzl'},
                {title:'毛利率',state:1,value:5,api:'financial/bbzbService/syzbfx/mll'},
                {title:'销售费用率',state:1,value:5,api:'financial/bbzbService/syzbfx/xsfyl'},
                {title:'管理费用率',state:1,value:5,api:'financial/bbzbService/syzbfx/glfyl'},
                {title:'营业利润率',state:1,value:5,api:'financial/bbzbService/syzbfx/yylrl'},
                {title:'利润率',state:1,value:5,api:'financial/bbzbService/syzbfx/lrl'},
                // {title:'费用率',state:1,value:5,api:'financial/bbzbService/syzbfx/fyl'},

              ]
            }
          },
          {
            list:{
              title:'主要项目',
              state:1,
              value:'',
              children:[
                {title:'增值税申报表主表计税销售额与企业所得税申报表主表营业收入比对',state:1,value:1,api:'financial/reportService/analysisZzsJsxs'},
                {title:'增值税申报表主表计税销售额与利润表表营业收入比对',state:1,value:1,api:'financial/reportService/analysisZzsJsxs_lrsr'},
                {title:'企业所得税申报表主表前13行与利润表相关项目比对',state:1,value:1,api:'financial/reportService/analysisQysdsyysr'},

                {title:'货币资金',state:1,value:1,api:'financial/reportService/analysisHbzj'},
                {title:'应收票据+应收账款',state:1,value:2,api:'financial/reportService/analysisYspj'},
                // {title:'应收账款',state:1,value:3,api:'financial/reportService/analysisYszk'},
                {title:'存货',state:1,value:4,api:'financial/reportService/analysisCh'},
                {title:'长期股权投资',state:1,value:5,api:'financial/reportService/analysisCqgqtz'},
                {title:'固定资产原值',state:1,value:6,api:'financial/reportService/analysisGdzcjz'},
                {title:'累计折旧',state:1,value:1,api:'financial/reportService/analysisLjzj'},
                {title:'无形资产',state:1,value:2,api:'financial/reportService/analysisWxzc'},
                {title:'短期借款+长期借款',state:1,value:3,api:'financial/reportService/analysisDqjk'},
                {title:'应付账款',state:1,value:4,api:'financial/reportService/analysisYfzk'},
                // {title:'应付职工薪酬',state:1,value:4,api:'financial/reportService/analysisYdzgxc'},
                {title:'其他应付款',state:1,value:5,api:'financial/reportService/analysisQtyfk'},
                // {title:'长期借款',state:1,value:6,api:'financial/reportService/analysisCqjk'},
                {title:'实收资本（股本）',state:1,value:6,api:'financial/reportService/analysisSszb'},
                {title:'资本公积',state:1,value:6,api:'financial/reportService/analysisZbgj'},
                {title:'盈余公积',state:1,value:6,api:'financial/reportService/analysisYygj'},
                {title:'未分配利润',state:1,value:6,api:'financial/reportService/analysisWfplr'},
                {title:'营业收入',state:1,value:6,api:'financial/reportService/analysisYysr'},
                {title:'营业成本',state:1,value:6,api:'financial/reportService/analysisYycb'},
                {title:'销售费用',state:1,value:6,api:'financial/reportService/analysisXsfy'},
                // {title:'费用',state:1,value:6,api:'financial/reportService/analysisFy'},
                {title:'管理费用',state:1,value:6,api:'financial/reportService/analysisGlfy'}

              ]
            }
          },
        ],
        userinfo:{}

      }
    },
    mounted(){
      this.getuser();

    },
    methods:{
      gobb(){

        this.$http.get('financial/reportService/result2Html?type=1&year='+this.curyear+'&companyId='+this.qyId).then(res=>{
          if(res.data.code!=1){
            this.$Message.error(res.data.msg);
          }else{
            setTimeout(()=>{
              window.open(res.data.data)
            },50)

            this.$el.parentNode.removeChild(this.$el);

          }
        })

        // this.$el.parentNode.removeChild(this.$el);
        // setTimeout(()=>{
        //   window.open(FLODER+'#/bbview/homes?id='+this.qyId);
        // },50)

      },
      useKey(){
        this.$http.get('financial/userService/useKeyt').then(res=>{

        })
      },
      getuser(){
        this.$http.post('financial/userService/getCurUser').then(res=>{
          this.userinfo = res.data;
        })
      },
      cancle(){
        this.isStop = false;
        this.$el.parentNode.removeChild(this.$el);
      },
      gobuy(){
        this.$el.parentNode.removeChild(this.$el);
        if(typeof this.onBuy === 'function'){
          this.onBuy(this);
        }
      },
      updateList(){

        if(typeof this.updateList === 'function'){
          this.updateList(this);
        }
      },
      startFx(){
        let that = this;
        var ts =1000;
        var i=0;
        var r=0;

        this.$http.get('financial/reportService/analysisStart?userId='+this.userinfo.id+'&qyId='+that.qyId).then(res=>{
          if(res.data.code!=1){
            this.$Message.error(res.data.msg);

          }else{
            that.doneReport = 2;
            htts('',0,0);
          }

        })

        function  htts(str,i,j) {
          if(!that.isStop){
            return false;
          }
            that.$http.get(that.fxlist[j].list.children[i].api+"?year=2018&qyId="+that.qyId).then(res=>{
              console.log(i);
              that.fxlist[j].list.children[i].state=3;
              that.bigtext = '正在计算'+that.fxlist[j].list.children[i].title;
              that.fxlist[j].list.children[i].value=res.data.data.value;
              if(j==2 && i== that.fxlist[j].list.children.length-1){
                that.bigtext = '计算完成';
                that.zj_total = res.data.data.zj_value;
                that.curyear = res.data.data.nf;
                that.doneReport = 3;
                that.updateList();
                // that.useKey();
              }
              r++;
              document.getElementById('proingC').scrollTop = r*30;
              i++;
              if(res.data.code == 1){

                if(i>that.fxlist[j].list.children.length-1){

                    that.fxlist[j].list.value= res.data.data.xm_value;
                    // that.fxlist[j].list.value= res.data.data.zj_value;



                  j++;
                  i=0;
                  setTimeout(function () {
                    htts('',i,j)
                  },100)
                }else{
                  setTimeout(function () {
                    htts('',i,j)
                  },100)

                }

              }else{
                that.isStop = false;
              }



            },(error)=>{
              that.isStop = false;
              alert('分析出错，请进行重新分析！')
            })

        }




      }
    }
  }
</script>

<style lang="scss" scoped>
  .tijian{
    position: relative;
    .bigicon{
      text-align: center;
      width:50px;
      height:50px;
      margin:5px 0px 0px 20px;
      padding-top:10px;
      -webkit-border-radius: 1000px;
      -moz-border-radius: 1000px;
      border-radius: 1000px;
      background: #08F;
      animation:mymove .8s infinite;
      @keyframes mymove
      {
        from {transform:rotate(50deg)}
        to {transform:rotate(0deg)}
        from {transform:rotate(50deg)}

      }
    }
    .bigicon2{
      text-align: center;
      width:50px;
      height:50px;
      margin:5px 0px 0px 20px;
      padding-top:10px;
      -webkit-border-radius: 1000px;
      -moz-border-radius: 1000px;
      border-radius: 1000px;
      background: #19be6b;

    }
    .icontext{
      padding-left:10px;
      position: relative;
      top:-8px;
      span{
        color:#F60;
      }
      padding-top:20px;
      .small{
        color:#666;
        font-size:12px;
        font-weight: normal;
        b{
          color: #08F;
        }
      }

    }
    .actbtn{
      position: absolute;
      top:15px;
      right:20px;
    }
  }
    .proingC{
      padding:20px;
      text-align: center;
      overflow: scroll;
.content{
  padding:10px 10px;
}
      .cur{
        background: #F8F8F8;

      }

      .times{
        h3{
          .xjf{
            color:#F60;
            padding-right:10px;
          }
        }

        padding:0 3%;
        margin:0 auto;
        text-align: left;
        height: 360px;

      }
    }
</style>
