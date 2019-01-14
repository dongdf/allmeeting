<template>
  <div class="report_c">
    <div class="quickBar">
<div class="barcc"><span class="fl">{{curInfo.report_name}}</span><Button type="primary" class="fr" @click="sendre">发送报告</Button></div>
    </div>
    <div class="cc">
      <div class="saoma">
        <img :src="erweimaUrl"/>
        <p class="text">手机扫码看报告</p>
      </div>
      <div class="report_samllText">
        <h3>{{curInfo.report_name}}</h3>
        <p>感谢您使用财和税公司旗下税收健康检查产品。现将您检查结果分析如下，请您认真阅读，如果疑问请致电400-600-6969 ,我们将安排专业人员为您答疑解惑，欢迎您对我们的产品提出批评和建议。</p>


        <h3>汇总分析</h3>
        <p>
        <div class="zong">{{curInfo.report_name}} <b>2018年</b>税收健康检查等级为
        <i class="i1"  v-show="curTotal<=3">{{curInfoText}}风险</i>
        <i class="i2"  v-show="curTotal>3 && curTotal<=7">{{curInfoText}}风险</i>
        <i class="i3" v-show="curTotal>7">{{curInfoText}}风险</i>
      </div>
        <table class="tbs" border="1">
          <caption><span>指标汇总</span></caption>
          <thead>
          <td width="50%">项目</td>
          <td>分值</td>
          </thead>
          <tr>
            <td>税负指标</td>
            <td>{{curInfo.sf_value}}</td>
          </tr>
        <tr  >
          <td>税源指标</td>
          <td>{{curInfo.sy_value}}</td>
        </tr>
        <tr  >
          <td>主要项目</td>
          <td>{{curInfo.xm_value}}</td>
        </tr>
        <tr  >
          <td>合计</td>
          <td>{{curTotal}}</td>
        </tr>

        </table>
        <br>
        <div>税收风险等级为一级小于3.0分</div>
        <div>税收风险等级为二级	3.1——7分</div>
        <div>税收风险等级为三级	7.1——10分</div>
        </p>



      </div>
      <Divider />

      <div id="echarts1" ></div>



      <template v-for="b in bbinfo.mx">
      <table class="tbs" border="1">
        <caption><span>{{b[0].surname}}</span></caption>
        <thead>
          <td width="200">项目</td>
          <td width="100">年度</td>
          <td width="100">结果</td>
          <td width="100">参考范围</td>
          <td>描述</td>

        </thead>
        <tr v-for="c in b" :class="c.risk_describe?'bliang':''">
          <td>{{c.surname}}</td>
          <td>{{c.nf}}</td>
          <td>{{c.risk_value}}</td>
          <td>{{c.reference_value}}</td>
          <td>{{c.risk_describe?c.risk_describe:'正常'}}</td>
        </tr>
      </table>
      </template>
      <div class="tbs_desc">

      </div>
      <Divider />


    </div>

  </div>

</template>

<script>
  import sendReport from '@/pages/system/sendReport.vue'
  import {REDIRECT_URL} from '@/constants'
  export default {
    data() {
      return {
        //echarts实例
        erweimaUrl:'',
        chart: "",
        cids:'',
        bbinfo:{zb:[{report_name:''}]},
        curInfo:{},
        curInfoText:'',
        curTotal:0
      };
    },

    mounted() {
      this.init();
      document.body.style.background="#F8F8F8";
      if(this.$route.query.id){
        this.cids = this.$route.query.id;
        this.getbb();
        this.erweima();
      }
    },
    methods: {
      erweima(){
        var url = REDIRECT_URL+'/tax1.0/#/bbview/homes?id='+this.cids;
        // alert(encodeURI(url));

        this.$http.post('financial/bbCommonService/common/postQrUrl',{
          url:url,
          model:'tibb',
          primary:this.cids
        }).then(res=>{
        this.erweimaUrl = res.data.data;
        })
      },
      getbb(){
        this.$http.get('financial/reportService/login/analysisResult?companyId='+this.cids).then(res=>{
          if(res.data.code!=1){
            this.$Message.error(res.data.msg)
          }else{
            this.bbinfo = res.data.data;
            this.curInfo = this.bbinfo.zb[this.bbinfo.zb.length-1];
            var zjvalue = parseFloat(this.curInfo.sf_value)+parseFloat(this.curInfo.sy_value)+parseFloat(this.curInfo.xm_value);
            this.curTotal = zjvalue;
          // <span v-if="zj_total<=3" style="color:green;">一级</span>
          //     <span v-if="zj_total>3 && zj_total<=7" style="color:#F60;">二级</span>
          //     <span v-if="zj_total>7" style="color:red;">三级</span>
            if(zjvalue<=3){
              this.curInfoText = '一级';
            }else if(zjvalue>3 && zjvalue<=7){
              this.curInfoText = '二级';
            }else{
              this.curInfoText = '三级';
            }

          }

        })
      },
      sendre(){

          this.$mymsg(sendReport,{
            data: {
              message: 'you click me btn1'
            },
            methods:{
              onOk(){
                alert('回调');
              }
            }
          });

      },
      init() {
        var months=[];
        for(var i=1;i<=12;i++){
          months.push(i+'月');
        }
        console.log(JSON.stringify(months));
        var option = {
          title : {
            text: '未来一周气温变化',
            subtext: '对比折线图'
          },
          tooltip: {
            show: true
          },

          legend: {
            data:['销量']
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : months
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              "name":"2016年度",
              type:'line',
              "data":[5, 20, 40, 10, 10, -20,5, 20, 40, 10, 10, -20,]
            },
            {
              "name":"2017年度",
              type:'line',
              "data":[-10, 20, 10, 60, 20, -20,5, 20, 40, 10, 10, -29,]
            },
            {
              "name":"2018年度",
              type:'line',
              "data":[10, 15, 22, 50, 10, -10,5, 20, 40, 10, 10, -98,]
            }
          ]
        };

        this.chart = this.$echarts.init(document.getElementById('echarts1'));
        this.chart.setOption(option);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tbs,.report_samllText{
    border-collapse: collapse;/*边框会合并为一个单一的边框*/
    width:100%;
    .bliang{

      font-weight: bold;
      color:#F60;
    }
    margin-top:20px;
    td{
      padding:5px;
    }
    thead{
      background: #F8F8F8;
      font-weight: bold;
    }
    caption{
      padding:10px 0;
      font-weight: bold;
      margin-top:50px;
      font-size: 18px;
      span{
        padding:5px 10px;
        letter-spacing: 5px;
        background: #EEE;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        border-radius: 100px;
      }
    }
  }
  .tbs_desc{
    padding:10px 0px;
    margin-top:10px;
  }
  .report_c{
    .quickBar{
      position: fixed;
      z-index: 99;
      top:0;
      left:0;
      background: #FFF;
      width:100%;
      height:50px;
      border-bottom:1px solid #EEE;
      .barcc{
        max-width:1000px;
        min-width: 800px;
        margin:0 auto;
        padding-top:8px;
        span{
          font-size:18px;
        }
      }
    }
    width:80%;
    max-width:1100px;
    margin:0 auto;

    background: #FFF;
    min-width: 800px;
    .cc{

      .saoma{
        position: absolute;
        top:10px;
        right:10px;
        img{
          width:150px;
        }
        p.text{
          color:#666;
          text-align: center;
          padding:0;
          line-height: 0;
        }
      }
      position: relative;
      padding:20px;
      width:90%; margin:0 auto;
      max-width:1000px;
      min-width: 800px;

      font-size:14px;
      .report_samllText{
        position: relative;
        h3{
          font-size:25px;
          text-align: center;
          padding:80px 0;


        }
        p{
          line-height: 200%;
          font-size:18px;
          text-indent: 40px;
        }

      }
      margin-top:60px;

    }
  }
  .zong{
    font-size:18px;
    i{
      font-weight: bold;
      font-size:20px;
      padding:2px 5px;

      border-radius: 5px;
    }
    i.i1{
      background: green;
      color:#FFF;
      font-style: normal;
    }
    i.i2{
      background: #F60;
      color:#FFF;

    }
    i.i3{
      background: red;
      color:#FFF;

    }
  }
  #echarts1{
    width:800px;
    margin:50px auto;
    text-align: center;
    height:400px;
  }

</style>
