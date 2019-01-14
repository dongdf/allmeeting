<template>
  <div style="margin:0 auto">
    <div>
      <!--<Upload action="http://test.caiheshui.com/gw/financial/bbService/importData">-->
        <!--<Button icon="ios-cloud-upload-outline">{{bbid}}-{{qyid}}上传</Button>-->
      <!--</Upload>-->
      <form accept-charset="GBK">
        <div class="ucontent">
          <Button type="primary" ghost size="small">
            <Icon  type="ios-cloud-upload" />
            上传</Button>
          <input class="realfile" ref="uploads" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  @change="getFile($event)" />
        </div>
      </form>
    </div>

  </div>
</template>
<script>
  import { HOSTUPLOAD } from '@/constants'
  export default {
    props:['tipText','uploadDone','bbid','qyid'],
    data(){
      return{
        file:null
      }

    },
    methods:{
      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
        this.submitForm();
      },
      submitForm(event) {
        // event.preventDefault();
        let formData = new FormData();

        formData.append('bbId', this.bbid);
        formData.append('qyId', this.qyid);
        formData.append('file', this.file);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let that = this;

        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'ios-loading',
                  size: 18
                }
              }),
              h('div', '上传中,请稍后')
            ])
          }
        });

        this.$http.post(HOSTUPLOAD+'financial/bbService/importData', formData, config).then(function (res) {
          that.$Spin.hide();
          if (res.data.code !=1) {
            that.$refs.uploads.value = ''
            alert(res.data.msg);

            // that.$Message.error(res.data.msg);
          }else{
            that.$Message.success('上传成功');
            that.$emit('updatelist')
          }
        },(e)=>{
          // console.log(e.data)
          that.$Spin.hide();
          that.$refs.uploads.value = ''
          alert(e.data.message)
          // that.$Message.error(e.data.message);
        })
      },

    }


  }
</script>
<style scoped lang="scss">
  .ucontent{
    position: relative;
    width:80px;
    margin:0 auto;

    overflow: hidden;
    .realfile{
      font-size:100px;
      position: absolute;
      top:0;
      opacity: 0;
      cursor: pointer;
      left:0;
    }

  }
</style>

