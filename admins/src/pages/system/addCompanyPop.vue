<template>
  <div  >
    <div class="ivu-modal-mask" style=""></div>
    <div class="ivu-modal-wrap">
      <div class="ivu-modal" style="width: 620px; top:25%">
        <div class="ivu-modal-content">
          <a class="ivu-modal-close"><i style="font-size:30px; color:#666"  @click="close2"   class="ivu-icon ivu-icon-ios-close"></i></a>
          <div class="ivu-modal-header">
            <div class="ivu-modal-header-inner" >{{cinfo?'编辑企业':'添加企业'}}</div>
          </div>
          <div class="ivu-modal-body">


            <div>

              <div class="formdata">


                <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                  <FormItem label="企业名称" prop="companyName"
                            :rules="{required: true,validator:valiCompany, trigger: 'blur'}"
                  >
                    <Input v-model="formItem.companyName" placeholder="请输入企业名称"></Input>
                  </FormItem>
                  <FormItem v-if="!cinfo" label="会计准则"  prop="companyKjzz">
                    <Select  v-model="formItem.companyKjzz">
                      <Option value="1">企业会计准则企业</Option>
                      <Option value="2">小企业会计准则企业</Option>
                    </Select>
                  </FormItem>


                  <FormItem label="所属地区" prop="areas" :rules="{required: true,validator:valiArea, trigger: 'blur'}">
                    <al-cascader  v-model="res_s"  level="1"/>
                    <!--<Input v-model="formItem.areas"  placeholder="请选择地区"></Input>-->
                    <!--{{res_s}}-->
                  </FormItem>

                  <FormItem label="所属行业" prop="selectHy" :rules="{required: true,validator:valiHangye, trigger: 'blur'}"  >
                    <Button @click.native="chooseTree">点击选择</Button><span><b style="color:#08F; margin-left:10px;">{{pselectedTree.name?pselectedTree.name:''}}</b>&nbsp;&nbsp;<i style="font-weight: normal; color:#CCC;">选择行业计算更精准</i></span>
                  </FormItem>




                  <FormItem v-if="cinfo" label="会计准则" prop="companyKjzz">
                    <Select  v-model="formItem.companyKjzz">
                      <Option v-for="s in kjzzList" :key="s.id" :value="s.id">{{s.name}}</Option>
                    </Select>
                  </FormItem>

                  <Row v-for="(item,index) in formItem.contactLists" :key="index" >
                    <Col span="11">
                    <FormItem label="联系人"
                              :prop="'contactLists.' + index + '.contact_name'"
                              :rules="{required: true,validator:valiName, trigger: 'blur'}"
                    >
                      <Input prefix="ios-contact" v-model="item.contact_name"    placeholder="请输入姓名" style="width: auto" />
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem label="手机号"
                              :prop="'contactLists.' + index + '.contact_phone'"
                              :rules="{required: true,validator:valiPhone, trigger: 'blur'}"
                    >
                      <Input prefix="md-phone-portrait" v-model="item.contact_phone"    placeholder="请输入手机号" style="width: auto" />
                    </FormItem>
                    </Col>
                    <Col span="2">
                    <Button type="text" @click.native = "delRows(index)" v-show="formItem.contactLists.length>1">删除</Button>
                    </Col>
                  </Row>



                  <FormItem>
                    <Row>
                      <Col span="12">
                      <Button type="dashed" long @click="handleAdd" icon="md-add">增加联系人</Button>
                      </Col>
                    </Row>
                  </FormItem>


                  <FormItem>
                    <Button @click="handleSubmit('formValidate')" type="primary" size="large">保存</Button>
                    <!--<Button  size="large" style="margin-left: 8px">重置</Button>-->
                  </FormItem>
                </Form>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import treeComponent from "../../components/treeComponent"
  export default {
    data () {

      return {
        cinfo:'',
        openType:'',
        valiName:'',
        valiCompany:'',
        valiArea:'',
        valiHangye:'',
        pselectedTree:{name:''},
        res_s:[],
        valiPhone:'',

        kjzzList:[
          {
            name:'企业会计准则企业',id:'1'
          },
          {
            name:'小企业会计准则企业',id:'2'
          }
        ],
        formItem: {
          companyName: '',
          companyKjzz: '',
          areas:'',
          selectHy:'',
          contactLists:[
            {contact_name:'',contact_name:''}
          ]
        },
        ruleValidate: {
          companyKjzz: [
            { required: true, message: '请选择会计准则', trigger: 'blur' }
          ],

        },

      }

    },
    mounted(){
      let that = this;
    this.valiName = function(rule, value, callback){
      if(!value.trim()){
        return callback(new Error("请输入姓名"));
      }else{
        callback();
      }
    };
    this.valiPhone = function(rule, value, callback){
      let reg = /^(((14[0-9]{1})|(13[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if(!value){
        return callback(new Error("请输入手机号"));
      }else if(!reg.test(value)){
        return callback(new Error("请正确的手机号"))
      }else{
        callback();
      }
    };
    this.valiCompany = function (rule, value, callback) {
      if(!value.trim()){
        return callback(new Error("请输入公司名称"));
      }else{
        callback();
      }
    }


      this.valiArea = function (rule, value, callback) {
        if(that.res_s.length == 0){
          return callback(new Error("请选择公司所在地区"));
        }else{
          callback();
        }
      }
      this.valiHangye = function (rule, value, callback) {
        if(!that.selectHy){
          return callback(new Error("请选择公司行业"));
        }else{
          callback();
        }
      }

    if(this.cinfo){
      this.formItem.companyName = this.cinfo.company_name;
      var temp = this.cinfo.contactList;

      this.res_s.push(this.cinfo.area1+'');
      this.res_s.push(this.cinfo.area2+'');

      this.pselectedTree.id=this.cinfo.industry_id;
      this.$http.post('financial/industryService/detail',{subData:this.pselectedTree.id}).then(res=>{
        this.pselectedTree.name=res.data.data.name;
        this.selectHy = this.pselectedTree;
        // alert(this.pselectedTree.name)
        // alert(JSON.stringify(this.res_s))
      })

      this.formItem.contactLists = temp;
      this.formItem.companyKjzz = this.cinfo.accountant_rule+'';
    }


  },
    methods:{
      chooseTree(){
        let that = this;
        this.$mymsg(treeComponent,{
          data: {
            message: '编辑企业会将企业已生成的报告删除，继续操作请点击[确定]'
          },
          methods:{
            onOk(){
              that.pselectedTree = this.selectedTree;
              that.selectHy = this.selectedTree;

              // that.$http.get('financial/reportService/deleteReport?qyId='+obj.companyId+'&year=2018').then(res=>{
              //   that.$router.push({name:'grade',query:{edit:1,id:obj.companyId,cur:1}})
              // })


            }
          }
        });

      },
      close2(){
        this.$el.parentNode.removeChild(this.$el);
      },

  handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.cinfo){//编辑

              this.$http.post('financial/companyService/update',{
                "subData":{
                  "id":this.cinfo.id,
                  "company_name":this.formItem.companyName,
                  "accountant_rule":this.formItem.companyKjzz,
                  "contactList":this.formItem.contactLists,
                  "industry_id":this.pselectedTree.id,
                  "area1":this.res_s[0].code,
                  "area2":this.res_s[1].code
                }
              }).then(res=>{
                this.$Message.success('保存成功!');
                // this.formItem= {
                //   companyName: '',
                //   companyKjzz: '',
                //   contactList:[
                //     {contact_name:'',contact_name:''}
                //   ]
                // }
                this.onOk(this);
                this.$el.parentNode.removeChild(this.$el);


              })


            }else{//新增

              this.$http.post('financial/companyService/addCompany',{
                subData:{
                  company_name:this.formItem.companyName,
                  "accountant_rule":this.formItem.companyKjzz,
                  "contactList":this.formItem.contactLists
                }
              }).then(res=>{
                this.$Message.success('保存成功!');
                this.formItem= {
                  companyName: '',
                  companyKjzz: '',
                  contactLists:[
                    {contact_name:'',contact_name:''}
                  ]
                }
                this.onOk(this);
                this.$el.parentNode.removeChild(this.$el);


              })

            }



          } else {
            this.$Message.error('提交失败，请查看原因!');
          }
        })

      },
      handleAdd(){
        this.formItem.contactLists.push({contact_name:'',contact_phone:''})
      },
      delRows(idx){
        this.formItem.contactLists.splice(idx,1)

      }

    }
  }
</script>

<style lang="scss" scoped>

  .formdata{
    padding-top:0px;
    padding:20px;


  }
</style>
