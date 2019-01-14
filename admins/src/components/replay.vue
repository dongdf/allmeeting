<template>
    <div>
        <div class="ivu-modal-mask" style=""></div>
        <div class="ivu-modal-wrap">
            <div class="ivu-modal" style="width: 520px; top:30%;">
                <div class="ivu-modal-content"><a class="ivu-modal-close"><i @click="close"
                                                                             class="ivu-icon ivu-icon-ios-close"></i></a>
                    <div class="ivu-modal-header">
                    <div class="ivu-modal-header-inner">回复内容</div>
                    </div>
                    <div class="ivu-modal-body">
                        <!--<div class="ivu-modal-body">-->
                            <div class="ivu-modal-confirm">
                                <!--<div class="ivu-modal-confirm-head">-->
                                    <!--<div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-confirm"></div>-->
                                    <!--<div class="ivu-modal-confirm-head-title">回复内容</div>-->
                                <!--</div>-->
<!--{{replayid}}-->
                                <!--{{replayContent}}-->
                                    <Input v-model="replayContent"  type="textarea" :rows="4"  placeholder="请输入回复内容..."></Input>

                                <!--<div class="ivu-modal-confirm-footer">-->
                                    <!--<button type="button" @click="close" class="ivu-btn ivu-btn-text ivu-btn-large">&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <span>取消</span>-->
                                    <!--</button>-->
                                    <!--<button type="button" @click="ok" class="ivu-btn ivu-btn-primary ivu-btn-large">&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <span>确定</span>-->
                                    <!--</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                    <div class="ivu-modal-footer">
                    <button type="button" @click="close" class="ivu-btn ivu-btn-text ivu-btn-large"><!----> <!---->
                    <span>取消</span></button>
                    <button type="button" @click="ok" class="ivu-btn ivu-btn-primary ivu-btn-large"><!----> <!---->
                    <span>确定</span></button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  export default {
    name: "replay",

    data(){
      return{
        replayid:'',
        replayContent:''
      }
    },
    methods: {
      ok() {//回调
        if(!this.replayContent.trim()){
          alert('请输入回复内容');
          return false;
        }
        this.$http.post('msg/reply',{id:this.replayid,reply:this.replayContent}).then(res=>{


        })



        this.$el.parentNode.removeChild(this.$el);
        if (typeof this.onOk === 'function') {
          this.onOk(this);
        }
      }
    }

  }
</script>

<style scoped>

</style>
