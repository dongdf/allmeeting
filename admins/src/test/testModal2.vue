<template>
  <div  >
    <div class="ivu-modal-mask" style=""></div>
    <div class="ivu-modal-wrap">
      <div class="ivu-modal" style="width: 520px;">
        <div class="ivu-modal-content"><a class="ivu-modal-close"><i   @click="close" class="ivu-icon ivu-icon-ios-close-empty"></i></a>
          <div class="ivu-modal-header">
            <div class="ivu-modal-header-inner">modal2</div>
          </div>
          <div class="ivu-modal-body"><p>{{message}}</p>
            <p>{{name}}<input type="text" v-model="name"/> </p>
            <p>对话框内容</p></div>
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
    name: "test-modal2",
    data(){
      return {
        name:null,
        message:null
      }
    },
    methods:{
      cancle(){
        this.$el.parentNode.removeChild(this.$el);
      },
      ok(){
        if(typeof this.onOk === 'function'){
          this.onOk(this);
          this.$el.parentNode.removeChild(this.$el);
        }
      }
    }
  }
</script>

<style scoped>

</style>
