<template>
    <div>
        <Row style="border-bottom:2px solid #EEE; padding-bottom: 10px;">
            <Col span="18">
          <div class="cpageTitle"><Icon size="20" type="ios-albums-outline" /><span>企业管理</span></div>
          <!--<Button type="primary" icon="plus-round" @click="add">新增教师</Button>-->
          </Col>
            <Col span="6" style="text-align: right">
            <Input  v-model="keywords">
            <span slot="prepend"><Icon type="ios-search"></Icon></span>
            <span slot="append">
                <Button @click="search" type="primary">搜索</Button>
            </span>
            </Input>
        </Col>
        </Row>
      <!--{{companyList}}-->
        <Row   v-for="(c,idx) in companyList" :key="idx" class="iv_row">
            <Col span="1">
              <Icon size="25" style="opacity: .6; position:relative; top:-5px"  type="md-briefcase" />
            </Col>
            <Col span="6">
                <b>{{c.company_name}}</b>
            </Col>
          <Col span="3">
          <p>{{c.accountant_rule == 1?'企业会计准则企业':'小企业会计准则企业'}}</p>
          </Col>
          <Col span="6" >
          <div v-html="c.chtml"></div>
          <!--<p style="padding:0px 0 10px 0;" v-for="(p,index) in c.contactList"><Icon type="ios-contact-outline" size="20" /><span style="width:60px; display: inline-block">{{p.contact_name}}</span>  <Icon size="20" type="ios-phone-portrait" />{{p.contact_phone}}</p>-->
          </Col>
            <Col span="6" >
            <div class="oprBtn">
                            <Button size="small" ghost @click="editItem(c)" type="primary">编辑</Button>
                            <Button size="small" ghost @click="delItem(c)" :disabled="!c.ableDelete" type="error">删除</Button><span v-show="!c.ableDelete">&nbsp;&nbsp;<Icon type="ios-alert-outline" />已生成报告，不可删除</span>
            </div>
            </Col>
        </Row>


        <div class="pager" v-show="companyList.length>0">
          <Page :total="rtotal" :current="pnumb" :page-size="psize" show-total @on-change="change" />
        </div>
      <no v-show="companyList.length == 0" :tipText="'暂无记录'"></no>

    </div>
</template>
<script>
    import  addTeach from './addTeacher'
    import md from '@/components/modals'
    import addCompanyPop from '@/pages/system/addCompanyPop'
    import no from '@/components/no'
  export default {
      components:{addTeach,no},
    data () {
      return {
        companyList:[],
        rtotal:0,
        psize:100,
        pnumb:1,
        keywords:''

      }
    },
    mounted(){
        this.getCompany();
    },
    methods: {
      change:function (page) {
        console.log(page);
        this.pnumb = page;
        this.getCompany();
      },
      search(){
        this.pnumb = 1;
        this.getCompany();
      },
        editItem(obj){
        let that = this;

          this.$mymsg(addCompanyPop,{
            data: {
              cinfo:obj
            },
            methods:{
              onOk() {
                that.getCompany();
              }
              }

            })



        },
      delItem(obj){
        let that = this;
        this.$mymsg(md,{
          data: {
            message: '确定删除该企业吗？'
          },
          methods:{
            onOk(){
              that.$http.post('financial/companyService/del',{subData:obj.id}).then(res=>{
                if(res.data.code !=1){
                  that.$Message.error(res.data.msg);
                }else{

                  var idx = that.companyList.findIndex(function (item) {
                    return item.id == obj.id;
                  })
                  that.companyList.splice(idx,1)

                }

              })
            }
          }
        });
          // this.$http.post('financial/companyService/del',{"subData":obj.id}).then(res=>{
          //
          // })

      },
      getCompany(){
        let that = this;
        this.$http.post('financial/companyService/list',{
          subData:{
            pageNum:this.pnumb,
            pageSize:this.psize,
            searchText:that.keywords
          }
        }).then(res=>{
          this.companyList = res.data.data.list;
          this.rtotal = res.data.data.total;

          for(var j in this.companyList){
            var html = '';
            for(var i in this.companyList[j].contactList){
              html += '<p style="padding:0px 0 10px 0;" ><i data-v-394040b0="" class="ivu-icon ivu-icon-ios-contact-outline" style="font-size: 16px;"></i><span style="width:60px; display: inline-block">'+that.companyList[j].contactList[i].contact_name+'</span><i data-v-394040b0="" class="ivu-icon ivu-icon-ios-phone-portrait" style="font-size: 16px;"></i>'+that.companyList[j].contactList[i].contact_phone+'</p>';
            }
            this.companyList[j].chtml = html;

          }



        })
      },
      add(){
        this.$mymsg(addTeach,{
          data: {
            message: 'you click me btn1'
          },
          methods:{
            onOk(){
              alert('回调');
            }
          }
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .oprBtn{
    position: relative;
    top:-5px;
  }
    .iv_tearch_head{
        width:100%;
    }
    .iv_info{
        padding:0 20px;
    }
    .iv_sc{
        background: #5cb85c !important;
    }
    .iv_row {
      padding:15px 10px 5px 10px;
        border-bottom: 1px solid #EEE;

      font-weight:normal;
      h3{
        position: relative;

      }
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
