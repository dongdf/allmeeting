<template>
  <div>
    <Row style="border-bottom:2px solid #EEE; padding-bottom: 10px;">
      <Col span="18">
      <div class="cpageTitle"><Icon size="20" type="ios-construct-outline" /><span>关闭申请</span></div>
        <!--<Button type="primary" icon="plus-round" @click="add">新增教师</Button>-->
      </Col>
      <Col span="6" style="text-align: right">
      <Input placeholder="请输入会议编号" v-model="keyword">
      <span slot="prepend"><Icon type="ios-search"></Icon></span>
      <span slot="append">
                <Button type="primary" @click="search()" >搜索</Button>
            </span>
      </Input>
      </Col>
    </Row>
   <br>
    <center>
      <ButtonGroup>
        <i-button   class="ivu-btn ivu-btn-primary"  >

          待审核
        </i-button>
        <i-button   class="ivu-btn"  >

          已审核
        </i-button>


      </ButtonGroup>
    </center>
    <br>



      <div class="ivheaders">
          <Row>
        <Col span="2">编号</Col>
        <Col span="4">会议名称</Col>
        <Col span="2">创建人</Col>
        <Col span="4">开始时间</Col>
        <Col span="4">创建时间</Col>
        <Col span="2">保证金</Col>
        <Col span="2">参会人数</Col>
        <Col span="4">操作</Col>
          </Row>
      </div>


      <div class="iv_items">
          <Row>
        <Col span="2">编号</Col>
        <Col span="4">会议会议名称会议名称会议名称名称</Col>
        <Col span="2">创建人</Col>
          <Col span="4">开始时间</Col>
        <Col span="4">创建时间</Col>
        <Col span="2">保证金</Col>
        <Col span="2">参会人数</Col>
        <Col span="4"><Button  @click="viewmeeting" size="small" type="primary">审批通过</Button>  <Button type="error" @click="viewmeeting" size="small">驳回</Button></Col>
          </Row>
      </div>







    <div class="pager" v-show="cjlist.length>0">
      <Page :total="rtotal" :current="pnumb" :page-size="psize" show-total @on-change="change" />
    </div>
    <no v-show="cjlist.length == 0" :tipText="'暂无记录'"></no>
  </div>
</template>

<script>
  import productReport from '@/pages/system/productReport.vue'
  import viewMeet from '@/pages/system/viewMeet.vue'
  import md from '@/components/modals'
  import no from '@/components/no'
  import Button from "iview/src/components/button/button";
  export default {
    name: "caiji-manager",
    components:{
      Button,
      productReport,no},
    data(){
      return{
        rtotal:0,
        psize:100,
        pnumb:1,
        cjlist:[],
        keyword:''
      }

    },
    mounted(){
      this.getcjList();
    },
    methods:{
      viewmeeting(){
        this.$mymsg(viewMeet,{
          data:{optbtn:true},
          methods:{

          }
        })
      },
      change:function (page) {
        console.log(page);
        this.pnumb = page;
        this.getcjList();

      },
      search(){
        this.pnumb = 1;
        this.getcjList();
      },
      delcj(obj){

        let that = this;
        this.$mymsg(md,{
          data: {
            message: '确定删除此条记录？'
          },
          methods:{
            onOk(){
              that.$http.get('financial/bbService/cjglDelete?qyId='+obj.companyId).then(res=>{
                if(res.data.code !=1){
                  that.$Message.error(res.data.msg);
                }else{

                  var idx = that.cjlist.findIndex(function (item) {
                    return item.companyId == obj.companyId;
                  })
                  that.cjlist.splice(idx,1)

                }

              })
            }
          }
        });


      },
      edit(obj){
        let that = this;
        if(obj.hasReport == 0){
          that.$router.push({name:'grade',query:{edit:1,id:obj.companyId,cur:1}})
        }else{
          this.$mymsg(md,{
            data: {
              message: '编辑企业会将企业已生成的报告删除，继续操作请点击[确定]'
            },
            methods:{
              onOk(){

                that.$http.get('financial/reportService/deleteReport?qyId='+obj.companyId+'&year=2018').then(res=>{
                  that.$router.push({name:'grade',query:{edit:1,id:obj.companyId,cur:1}})
                })


              }
            }
          });
        }



      },
      isEdit(){

      },
      getcjList(){
        this.$http.get('Apply/lists?size='+this.psize+"&page="+this.pnumb+"&keywords="+this.keyword).then(res=>{
          this.cjlist = res.data.data.list;
          this.rtotal = res.data.data.total;

        })
      },

      productIng(obj){
        let that = this;
        this.$mymsg(productReport,{
          data: {
            message: 'you click me btn1',
            qyId:obj.companyId
          },
          methods:{
            onOk(){
              alert('回调');
            },
            onBuy(){
              that.$router.push({name:'miyaoMgr'})
            },
            updateList(){
              that.getcjList();
            },
            viewbb(){
              alert('回调')
            }
          }
        });

      }
    }
  }
</script>

<style lang="scss" scoped>
  .ivheaders{
    background: #F8F8F8;
    color:#999;
    height:40px;
    line-height: 40px;
    padding:0 10px;
  }
  .iv_items{
    border-bottom: 1px solid #EEE;
    padding:10px 10px;
  }
  .iv_items:hover{ background: #F8F8F8;}
  .iv_row_head{
    text-align:center;
    background:#E8ECF4;
    color:#666C8C;
    padding:8px 0;
    font-weight: normal;
  }

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

