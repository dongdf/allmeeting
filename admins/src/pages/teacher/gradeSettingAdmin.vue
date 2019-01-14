<template>
  <div>
    <!--<Row style="border-bottom:2px solid #EEE; padding-bottom: 10px;">-->
      <!--<Col span="18">-->
      <!--<div class="cpageTitle"><Icon size="20" type="md-color-wand" /><span>数据采集</span></div>-->
      <!--&lt;!&ndash;<Button type="primary" icon="plus-round" @click="add">新增教师</Button>&ndash;&gt;-->
      <!--</Col>-->
      <!--<Col span="6" style="text-align: right">-->
      <!--&lt;!&ndash;<Input placeholder="请输入公司名称" >&ndash;&gt;-->
      <!--&lt;!&ndash;<span slot="prepend"><Icon type="ios-search"></Icon></span>&ndash;&gt;-->
      <!--&lt;!&ndash;<span slot="append">&ndash;&gt;-->
                <!--&lt;!&ndash;<Button type="primary">搜索</Button>&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
      <!--&lt;!&ndash;</Input>&ndash;&gt;-->
      <!--</Col>-->
    <!--</Row>-->
    <div>
      <Row class="newStep" >
        <Col span="4">
        &nbsp;
           <!--<div class="setpItem " @click="changeSetp(0)" :class="cur == 0?'setpCur':''">-->
             <!--<div class="setpc">-->

               <!--<div class="icon icon1"><i>1</i></div>-->
               <!--<div class="icon_text">选择企业</div>-->
             <!--</div>-->
           <!--</div>-->
        </Col>
        <!--<Col span="1"><div class="jt"><img src="../system/img/jt.png"></div></Col>-->
        <Col span="4">
        <div class="setpItem"  @click="changeSetp(1)" :class="cur == 1?'setpCur':''">
          <div class="setpc">

            <div class="icon icon2">
              <!--<i>2016</i>-->
            </div>
            <div class="icon_text">2016年数据</div>
          </div>
        </div>
        </Col>
        <Col span="1"><div class="jt"><img src="../system/img/jt.png"></div></Col>
        <Col span="4">
        <div class="setpItem"  @click="changeSetp(2)" :class="cur == 2?'setpCur':''">
          <div class="setpc">

            <div class="icon icon2">
              <!--<i>2017</i>-->
            </div>
            <div class="icon_text">2017年数据</div>
          </div>
        </div>
        </Col>
        <Col span="1"><div class="jt"><img src="../system/img/jt.png"></div></Col>
        <Col span="4">
        <div class="setpItem" @click="changeSetp(3)" :class="cur == 3?'setpCur':''">
          <div class="setpc">

            <div class="icon icon2">
              <!--<i>2018</i>-->
            </div>
            <div class="icon_text">2018年数据</div>
          </div>
        </div>
        </Col>
        <!--<Col span="1"><div class="jt"><img src="../system/img/jt.png"></div></Col>-->
        <Col span="4">
        &nbsp;
        <!--<div class="setpItem"  @click="changeSetp(4)" :class="cur == 4?'setpCur':''">-->
          <!--<div class="setpc">-->

            <!--<div class="icon icon5"><i>5</i></div>-->
            <!--<div class="icon_text">完成</div>-->
          <!--</div>-->
        <!--</div>-->
        </Col>
      </Row>
    </div>
     <!--<div class="septs">-->
       <!--<Steps :current="cur" >-->
         <!--<Step  @click.native="changeSetp(0)" title="选择企业" content=" ">sdfsdfsdf</Step>-->
         <!--<Step  @click.native="changeSetp(1)" title="2016年度数据上传" content=" "></Step>-->
         <!--<Step  @click.native="changeSetp(2)" title="2017年度数据上传" content=" "></Step>-->
         <!--<Step  @click.native="changeSetp(3)" title="2018年度数据上传" content=" "></Step>-->
         <!--<Step  @click.native="changeSetp(4)" title="完成" content=" "></Step>-->
       <!--</Steps>-->
     <!--</div>-->
   <div class="stepcon">
     <div class="con0" v-if="cur == 0">
       <!--<h3>请选择企业</h3>-->
       <br><br><br><br>
       <div class="companys">
         <Form  :label-width="80">
           <FormItem label="选择企业">
             <Select v-model="selCompany.id" :disabled="!isableSelect" >
               <Option v-for="(item,idx) in companyList" :disabled="!item.ableDelete" :value="item.id" :key="idx">{{item.company_name}}
               </Option>
             </Select>
           </FormItem>
         </Form>
         <!--<center><Button size="large" type="primary" :disabled="!selCompany.id" @click="changeSetp(1)">下一步</Button><br><br><Button @click="addCompany()"  type="text">没有企业？点此添加</Button></center>-->
       </div>
       <!--<div class="no_company">-->
         <!--<h3>您当前还没有企业</h3>-->
         <!--<br>-->
         <!--<Button type="primary">添加企业</Button>-->
       <!--</div>-->
     </div>

     <div class="con1" v-if="cur == 1">

       <div class="uptips">
         <div class="selName">
           <h3>{{selCompany.company_name}}</h3>
           <p>
             <span v-show="selCompany.accountant_rule == 1">企业会计准则企业</span>
             <span v-show="selCompany.accountant_rule == 2">小企业会计准则企业</span>
           </p>
         </div>

         <!--<div class="descs">请上传<label>2016年度</label>报表数据，如果已上传的文件有问题，请点击右侧重新上传即可</div>-->
         <br>

         <div class="uptable">

           <div class="rowsh" v-for="b in bblist">
             <Row :gutter="20" type="flex" >
                 <Col span="6">{{b.bb_mc}}</Col>
                 <Col span="4"><a class="downexl" @click="viewmb(b)">模版下载</a></Col>
                 <Col span="12">
                        <template v-if="b.file_name">
                           <Badge status="success" text="已上传" /><i class="viewexl" @click="viewUploed(b)"><a>{{b.file_name}}</a></i>
                        </template>
                       <template v-if="!b.file_name">
                         <Badge status="error" text="未上传" /><i class="viewexl"><a>{{b.file_name}}</a></i>
                       </template>

                 </Col>
                 <!--<Col span="6"><sbsupload :uploadDone ="true" v-on:updatelist="updatelist"  :bbid="b.id" :qyid="comid" ></sbsupload></Col>-->

             </Row>

           </div>



         </div>
       </div>
       <br>
       <!--<center><Button type="primary" size="large" @click="changeSetp(2)">下一步</Button></center>-->

     </div>




     <div class="con1" v-if="cur == 2">

       <div class="uptips">
         <div class="selName">
           <h3>{{selCompany.company_name}}</h3>
           <p>
             <span v-show="selCompany.accountant_rule == 1">企业会计准则企业</span>
             <span v-show="selCompany.accountant_rule == 2">小企业会计准则企业</span>
           </p>
         </div>
         <!--<h3>请上传<label>2017年度</label>报表数据</h3>-->
         <!--<div class="descs">如果标识为 '已上传'的文件有问题，请点击右侧上传即可</div>-->
         <!--<div class="descs">请上传<label>2017年度</label>报表数据，如果已上传的文件有问题，请点击右侧重新上传即可</div>-->
         <br>

         <div class="uptable">

           <div class="rowsh" v-for="b in bblist">
             <Row :gutter="20" type="flex" >
               <Col span="6">{{b.bb_mc}}</Col>
               <Col span="4"><a class="downexl" @click="viewmb(b)">模版下载</a></Col>
               <Col span="12">
               <template v-if="b.file_name">
                 <Badge status="success" text="已上传" /><i class="viewexl"><a @click="viewUploed(b)">{{b.file_name}}</a></i>
               </template>
               <template v-if="!b.file_name">
                 <Badge status="error" text="未上传" /><i class="viewexl"><a>{{b.file_name}}</a></i>
               </template>

               </Col>
               <!--<Col span="6"><sbsupload :uploadDone ="true" v-on:updatelist="updatelist" :bbid="b.id" :qyid="comid" ></sbsupload></Col>-->

             </Row>
             <!--<sbsupload :uploadDone ="true"  :bbid="b.id" :qyid="comid" ></sbsupload>-->
           </div>


         </div>
       </div>
       <br>
       <!--<center><Button type="primary" size="large" @click="changeSetp(3)">下一步</Button></center>-->

     </div>

     <div class="con1" v-if="cur == 3">

       <div class="uptips">
         <div class="selName">
           <h3>{{selCompany.company_name}}</h3>
           <p>
             <span v-show="selCompany.accountant_rule == 1">企业会计准则企业</span>
             <span v-show="selCompany.accountant_rule == 2">小企业会计准则企业</span>
           </p>
         </div>
         <!--<h3>请上传<label>2018年度</label>报表数据</h3>-->
         <!--<div class="descs">如果标识为 '已上传'的文件有问题，请点击右侧上传即可</div>-->
         <!--<div class="descs">请上传<label>2018年度</label>报表数据，如果已上传的文件有问题，请点击右侧重新上传即可</div>-->
         <br>

         <div class="uptable">



           <div class="rowsh" v-for="b in bblist">
             <Row :gutter="20" type="flex" >
               <Col span="6">{{b.bb_mc}}</Col>
               <Col span="4"><a class="downexl" @click="viewmb(b)">模版下载</a></Col>
               <Col span="12">
               <template v-if="b.file_name">
                 <Badge status="success" text="已上传" /><i class="viewexl"><a  @click="viewUploed(b)">{{b.file_name}}</a></i>
               </template>
               <template v-if="!b.file_name">
                 <Badge status="error" text="未上传" /><i class="viewexl"><a>{{b.file_name}}</a></i>
               </template>

               </Col>
               <!--<Col span="6"><sbsupload :uploadDone ="true" v-on:updatelist="updatelist" :bbid="b.id" :qyid="comid" ></sbsupload></Col>-->

             </Row>
             <!--<sbsupload :uploadDone ="true"  :bbid="b.id" :qyid="comid" ></sbsupload>-->
           </div>


         </div>
       </div>
       <br>
       <!--<center><Button type="primary" size="large" @click="changeSetp(4)">下一步</Button></center>-->

     </div>

     <div class="con1" v-if="cur == 4"><br><br><br><br>
       <div class="complete">
         <h3><Icon type="md-checkmark-circle-outline" size="30" color="#08F" />恭喜您完成填写</h3>
         <p>请确保数据上传完整性</p>
         <p> <Button size="large" icon="ios-hammer" @click="productReport" type="primary">马上生成评测报告</Button></p>
       </div>
     </div>



   </div>



  </div>

</template>
<script>
  import sbsupload from '@/components/smallBsupload'
  import addCompanyPop from '@/pages/system/addCompanyPop'
  import productReport from '@/pages/system/productReport.vue'
  export default {
    data(){
      return{
        cur:0,
        comid:'',
        companyList:[],
        selCompany:{},
        isableSelect:true,
        bblist:[],
        editAttr:'',
        cid:'',
        cyear:'',
      }
    },
    components:{sbsupload},
    mounted(){
      if(this.$route.query.cur){
        this.cur = parseInt(this.$route.query.cur);
      }
      if(this.$route.query.id){
        this.comid = this.$route.query.id;
        // this.selCompany.id = this.comid;
        this.getCompanyInfo();
        var cid = this.comid;
        this.cid =  this.comid;
        var cyear;

        if(this.cur == 1){
          this.cyear = 2016
        }
        if(this.cur == 2){
          this.cyear = 2017
        }
        if(this.cur == 3){
          this.cyear = 2018
        }
        if(this.cur>0 && this.cur<4){
          this.getlists();
        }
        if(this.$route.query.edit){
          this.isableSelect = false;
          this.editAttr = 1;
        }

      }
      this.getCompanys();
    },
    methods:{
      updatelist(){
        this.getlists();
      },
      getlists(){
        this.$http.get('financial/bbService/bbList?qyId='+this.cid+'&year='+this.cyear).then(res=>{
          this.bblist = res.data.data;

        })
      },
      addCompany(){
        let that = this;
        this.$mymsg(addCompanyPop,{
          data: {
            openType:1
          },
          methods:{
            onOk(){
              that.getCompanys();
            }
          }
        });
      },
      getCompanyInfo(){
        this.$http.post('financial/companyService/infoCompany',{
          subData:this.comid
        }).then(res=>{
          this.selCompany = res.data.data;
        })

      },
      getCompanys(){
        this.$http.post('financial/companyService/list',{
          subData:{
            pageNum:1,
            pageSize:1000,
            searchText:""
          }
        }).then(res=>{
          this.companyList = res.data.data.list;
        })
      },
      productReport(){
        let that = this;
        this.$mymsg(productReport,{
        data: {
          message: 'you click me btn1',
          qyId:that.comid
        },
        methods:{
          onOk(){
            alert('回调');
          },
          onBuy(){
            that.$router.push({name:'miyaoMgr'})
          },
          updateList(){},
          viewbb(){
            alert('回调')
          }
        }
      });

      },
      viewUploed(obj){
        window.open(obj.oss_url);
      },
      viewmb(obj){

        window.open(obj.bb_model);
      },
      changeSetp(idx){
        if(!this.selCompany.id){
          this.$Message.error('请选择企业');
          return false;
        }
        // location.replace('/#/bbview/uploadData?edit='+this.editAttr+'&id='+this.selCompany.id+'&cur='+idx);
        this.$router.push({name:'uploadData',query:{cur:idx,id:this.selCompany.id,edit:this.editAttr}});
      }
    }

  }
</script>
<style lang="scss" scoped>
  .jt{
    margin-top:10px;
    img{
      width:90%;
      text-align: center;
    }
  }
  .setpItem{
    cursor: pointer;
    .setpc{

      .icon{
        width:32px;
        height:31px;
        position: relative;
        margin:0 auto;
        i{
          width:25px;
          display: block;
          height: 25px;
          position: absolute;
          top:-30px;
          left:-30px;
          line-height: 25px;
          font-style: normal;
          border-radius: 50px;
          color:#999;
          background: #eee;
        }



      }
      .icon1{
        background: url("../system/img/1-0.png") no-repeat center;
        background-size: 100%;
      }
      .icon2{
        background: url("../system/img/2-0.png") no-repeat center;
        background-size: 100%;
      }
      .icon3{
        background: url("../system/img/2-0.png") no-repeat center;
        background-size: 100%;
      }
      .icon4{
        background: url("../system/img/2-0.png") no-repeat center;
        background-size: 100%;
      }
      .icon5{
        background: url("../system/img/3-0.png") no-repeat center;
        background-size: 100%;
      }
      .icon_text{
        padding:5px;
        font-weight: normal;

      }
    }

  }

  .setpCur{
    .setpc{

      .icon{
        width:32px;
        height:31px;
        position: relative;
        margin:0 auto;
        i{
          width:25px;
          display: block;
          height: 25px;
          position: absolute;
          top:-30px;
          left:-30px;
          line-height: 25px;
          font-style: normal;
          border-radius: 50px;
          color:#FFF;
          background: #08F;
        }



      }
      .icon1{
        background: url("../system/img/1-1.png") no-repeat center;
        background-size: 100%;
      }
      .icon2{
        background: url("../system/img/2-1.png") no-repeat center;
        background-size: 100%;
      }
      .icon3{
        background: url("../system/img/2-1.png") no-repeat center;
        background-size: 100%;
      }
      .icon4{
        background: url("../system/img/2-1.png") no-repeat center;
        background-size: 100%;
      }
      .icon5{
        background: url("../system/img/3-1.png") no-repeat center;
        background-size: 100%;
      }
      .icon_text{
        padding:5px;
        font-weight: bold;
        color:#08F;

      }
    }

  }
  .newStep{
    text-align: center;
    width:80%;margin:0 auto;
    padding-top:50px;
    position: relative;
    top:20px;
  }
  .selName{
    padding:15px 0;
    text-align: center;
    p{
      color:#999;
      font-weight: normal;
    }
  }
  .uptable{
    .uphead{

    }
    .rowsh{
      padding:15px 15px;
      font-weight: normal;
      border-bottom: 1px solid #EEE;
.viewexl{
  font-style: normal;
  padding-left:10px;
}
      .downexl{
        color: #08F;
      }
    }
    .rowsh:hover{background:#F8F8F8; }
  }
  .upload{
    padding:15px 0;

    font-weight: normal;
    .title{
      padding:10px 0;
      white-space: nowrap;
    }
    p{
      display: inline;
      color:#08F;
      padding-left:8px;

    }
  }
  .septs{
    cursor: pointer;
    padding:50px 0 0 100px
  }
  .stepcon{
    padding:20px;


    border-radius: 5px;
    margin:0 50px;
    margin-top:10px;
    /*background: #f0faff;*/
    text-align: left;
    /*border:1px solid #EEE;*/
    .con0{
      .no_company{
        text-align: center;
        padding:50px 0;

      }
      .companys{
        width:500px;
        margin:0 auto;
      }

    }
    .con1{
      .complete{
        text-align: center;
        h3{
          font-size:18px;
          color:#08F;

        }
        p{font-weight: normal;padding:10px 0; color:#F60;}
      }
      .uptips{
        .descs{
          font-weight: normal;
          color:#666C8C;
          text-align: center;
          background: #E8ECF4;
          padding:10px;
        }
        text-align: left;
        h3{
          font-size:18px;
        }

      }

    }
  }
</style>
