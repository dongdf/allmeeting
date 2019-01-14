<template>
  <div>
    <Row style="border-bottom:2px solid #EEE; padding-bottom: 10px;">
      <Col span="18">
      <div class="cpageTitle"><Icon size="20" type="ios-document" /><span>报告管理</span></div>
      <!--<Button type="primary" icon="plus-round" @click="add">新增教师</Button>-->
      </Col>
      <Col span="6" style="text-align: right">
      <Input placeholder="请输入公司名称"  v-model="keywords">
      <span slot="prepend"><Icon type="ios-search"></Icon></span>
      <span slot="append">
                <Button type="primary">搜索</Button>
            </span>
      </Input>
      </Col>
    </Row>
    <Row class="iv_row" v-for="(r,idx) in repList" :key="idx">
      <Col span="1">
      <Icon size="40" style="opacity: .2" type="ios-document" />
      </Col>
      <Col span="8">
      <div class="iv_info">
        <h3>{{r.report_name}}</h3>
        <p>公司名称：{{r.company_name}}</p>

        <p>
          <!--<Badge class-name="iv_sc" count="物理"></Badge>-->
          <!--<Badge class-name="iv_sc" count="物理"></Badge>-->
          <!--<Badge class-name="iv_sc" count="物理"></Badge>-->
          <!--<Badge class-name="iv_sc" count="物理"></Badge>-->
          <!--<Badge class-name="iv_sc" count="物理"></Badge>-->
        </p>
      </div>
      </Col>
      <Col span="9">
      <Row type="flex" class="yearc" justify="center">
        <Col span="6">
        <div class="yearc_c">
          <p class="t1">税负指标</p>
          <p><Badge status="default" :text="r.sf_value+'分'" /></p>

        </div>
        </Col>
        <Col span="6">
        <div class="yearc_c">
          <p class="t1">税源指标</p>
          <p><Badge status="default" :text="r.sy_value+'分'" /></p>

        </div>
        </Col>
        <Col span="6">
        <div class="yearc_c">
          <p class="t1">项目指标</p>
          <p><Badge status="default" :text="r.xm_value+'分'" /></p>

        </div>
        </Col>
        <Col span="6">
        <div class="yearc_c">
          <p class="t1">税收风险</p>
          <p class="">
            <!--<Rate v-model="value3" disabled character="A" />-->
            <Badge status="success" v-show="r.zh_pf<=3" text="初级" />
            <Badge status="warning" v-show="r.zh_pf>3 && r.zh_pf<=7" text="中级" />
            <Badge status="error" v-show="r.zh_pf>7" text="高级" />
          </p>

        </div>
        </Col>
      </Row>
      </Col>

      <Col span="6">
      <div class="edits">
        <Button type="primary" size="small" ghost  @click="godetail(r,1)">详情</Button>
        <!--simple_summary_url-->
        <Button type="primary" size="small" ghost  @click="godetail(r,2)">总结报告</Button>
        <!--中介报告-->
        <Button  type="success"  size="small" ghost @click.native = "sendMsg(r)"   icon="md-mail">发送报告</Button>
        <Button  type="error" @click="delcj(r)" ghost   size="small">删除</Button>
      </div>
      </Col>
    </Row>




    <div class="pager" v-show="repList.length >0 ">
      <Page :total="rtotal" :current="pnumb" :page-size="psize" show-total @on-change="change" />
    </div>
    <no v-show="repList.length == 0" :tipText="'暂无记录'"></no>
  </div>
</template>

<script>
  import sendReport from '@/pages/system/sendReport.vue'
  import md from '@/components/modals'
  import {FLODER} from '@/constants'
  import no from '@/components/no'
  export default {
    name: "report-mgr",
    data(){
      return{
        value3:3,
        rtotal:0,
        psize:100,
        pnumb:1,
        keywords:'',
        repList:[]
      }
    },
    components:{sendReport,no},
    mounted(){
      this.getreportList();
    },
    methods:{
      getreportList(){
        this.$http.post('financial/reportService/reportList',{
          subData:{
            pageNum:this.pnumb,
            pageSize:this.psize
          }
        }).then(res=>{
          this.repList = res.data.data.list;
          this.rtotal = res.data.data.total;
        })
      },
      delcj(obj){

        let that = this;
        this.$mymsg(md,{
          data: {
            message: '确定删除此条报告吗？'
          },
          methods:{
            onOk(){
              that.$http.get('financial/reportService/deleteReport?qyId='+obj.qy_id+'&year=2018').then(res=>{

                if(res.data.code !=1){
                  that.$Message.error(res.data.msg);
                }else{

                  var idx = that.repList.findIndex(function (item) {
                    return item.companyId == obj.companyId;
                  })
                  that.repList.splice(idx,1)

                }


              })

            }
          }
        });


      },
      godetail(obj,bbtype){
        if(bbtype == 1) {

          if (obj.simple_url) {
            window.open(obj.simple_url)
          } else {
            this.$http.get('financial/reportService/login/result2Html?type=1&year=' + obj.nf + '&companyId=' + obj.qy_id).then(res => {
              if (res.data.code != 1) {
                this.$Message.error(res.data.msg);
              } else {
                var idx = this.repList.findIndex(function (item) {
                  return item.qy_id == obj.qy_id
                })
                this.repList[idx].simple_url = res.data.data;
                // alert(this.repList[idx].pc_url);
                window.open(res.data.data)
              }
            })
          }

        }else{

          if(obj.simple_summary_url){
            window.open(obj.simple_summary_url)
          }else{
            this.$http.get('financial/reportService/login/result2Html?type=2&year='+obj.nf+'&companyId='+obj.qy_id).then(res=>{
              if(res.data.code!=1){
                this.$Message.error(res.data.msg);
              }else{
                var idx = this.repList.findIndex(function (item) {
                  return item.qy_id == obj.qy_id
                })
                this.repList[idx].simple_summary_url = res.data.data;
                // alert(this.repList[idx].pc_url);
                window.open(res.data.data)
              }
            })
          }



        }


        // window.open(FLODER+'#/bbview/homes?id='+obj)
        // this.$router.push({name:'bbview',query:{id:1}})
      },
      change:function (page) {
        console.log(page);
        this.pnumb = page;
        this.getreportList();
      },
      sendMsg(obj){

        this.$mymsg(sendReport,{
          data: {
            message: 'you click me btn1',
            cids:obj.qy_id,
            bbid:obj.id,
            nf:obj.nf,
            sendurl:obj.pc_url
          },
          methods:{
            onOk(){
              // alert('回调');
            }
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>

  .edits{
    text-align: left;
    padding-top:20px;
    button{
      margin:2px 0;
    }
  }
  .yearc{

    font-weight: normal;
    .yearc_c{
      .t1{
        padding:0 0 10px 0;
        font-weight: bold;
      }
      .starts{
        position: relative;
        top:-10px;
      }
    }
  }
  .iv_tearch_head{
    width:100%;
  }
  .iv_info{
    padding:0 20px;
    font-weight: normal;
  }
  .iv_sc{
    background: #5cb85c !important;
  }
  .iv_row {
    padding:10px 10px;
    border-bottom: 1px solid #EEE;
    margin-top:10px;
  }
  .iv_row:hover{
    background: #F8F8F8;
  }
  .iv_btn{
    padding:40px 20px 0 0;
    text-align: right;
  }
  .pager{
    text-align: center;
    padding:20px;
  }
</style>


