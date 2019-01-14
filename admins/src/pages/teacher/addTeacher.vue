
<template>
    <div  >
        <div class="ivu-modal-mask" style=""></div>
        <div class="ivu-modal-wrap">
            <div class="ivu-modal" style="width: 800px;">
                <div class="ivu-modal-content"><a class="ivu-modal-close"><i   @click="close" class="ivu-icon ivu-icon-ios-close-empty"></i></a>
                    <div class="ivu-modal-header">
                        <div class="ivu-modal-header-inner">添加老师</div>
                    </div>
                    <div class="ivu-modal-body">
                        <Row>
                            <Col span="8">
                            <div class="iv_p">
                                <Upload
                                        multiple
                                        type="drag"
                                        action="//jsonplaceholder.typicode.com/posts/">
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>上传老师照片</p>
                                    </div>
                                </Upload>
                            </div>

                            </Col>
                            <Col span="16">
                                <div class="iv_p">
                                    <Form   label-position="left" :label-width="60">
                                        <FormItem label="老师姓名">
                                            <Input ></Input>
                                        </FormItem>
                                        <FormItem label="联系方式">
                                            <Input placeholder="请输入手机号"></Input>
                                        </FormItem>
                                        <FormItem label="毕业学校">
                                            <Input ></Input>
                                        </FormItem>
                                        <FormItem label="教学擅长">
                                            <Select v-model="model3" multiple="true" style="width:100%">
                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="教授年级">
                                            <Select v-model="model4" multiple="true" style="width:100%">
                                                <Option v-for="item in gradList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Col>
                            <Col span="24">
                              <div class="iv_p">
                                  <label>老师简介</label>
                                  <Input   type="textarea" rows="5" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入老师简介"></Input>
                              </div>
                            </Col>

                        </Row>


                    </div>
                    <div class="ivu-modal-footer">
                        <button type="button" @click="cancle" class="ivu-btn ivu-btn-text ivu-btn-large"><!----> <!----> <span>取消</span></button>
                        <button type="button" @click="ok" class="ivu-btn ivu-btn-primary ivu-btn-large"><!----> <!----> <span>确定</span></button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
  export default {

    data(){
      return{
        message:null,
        name:null,
        cityList: [
          {
            value: 'New York',
            label: '语文'
          },
          {
            value: 'London',
            label: '数学'
          },
          {
            value: 'Sydney',
            label: '外语'
          },
          {
            value: 'Ottawa',
            label: '化学'
          },
          {
            value: 'Paris',
            label: '老师'
          },
          {
            value: 'Canberra',
            label: '政治'
          }
        ],
        gradList: [
          {
            value: '1',
            label: '一年级'
          },
          {
            value: '2',
            label: '二年级'
          },
          {
            value: '3',
            label: '三年级'
          },
          {
            value: '4',
            label: '四年级'
          },
          {
            value: '6',
            label: '五年级'
          }

        ],
        model3:'',
        model4:''
      }
    },
    methods:{
      cancle(){
        this.$el.parentNode.removeChild(this.$el);
      },
      ok(){//回调
        this.$el.parentNode.removeChild(this.$el);
        if(typeof this.onOk === 'function'){
          this.onOk(this);
        }
      }
    }
  }
</script>

<style scoped>
  .iv_p{
      padding:15px;
  }
</style>
