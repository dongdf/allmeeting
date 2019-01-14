<template>
  <div>
  <!--<a  @click="click1">click1</a>-->
  <!--<a @click="click2">click2</a>-->
    <!--{{selectQytype}}-->
    <br>

    <form>
      <Select v-model="selectQytype">
        <Option value="0">全部</Option>
        <Option value="1">企业会计准则企业</Option>
        <Option value="2">小企业会计准则企业</Option>
      </Select>
      <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  @change="getFile($event)" />
      <Button  @click="submitForm($event)">提交</Button>
    </form>
  </div>
</template>

<script>
  import t1 from '@/test/testModal.vue'
  import t2 from '@/test/testModal2.vue'
  import { HOSTUPLOAD } from '@/constants'
  import axios from 'axios'
  export default {
    name: "test",
    data(){
      return{
        selectQytype:0
      }
    },
    methods:{
      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      submitForm(event) {
        event.preventDefault();
        let formData = new FormData();

        formData.append('qyType', this.selectQytype);
        formData.append('file', this.file);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.$http.post('financial/bbModelService/uploadModel', formData, config).then(function (response) {
          if (response.status === 200) {
            console.log(response.data);
          }
        })
      },

      click3(){
        //financial/bbModelService/uploadModel


      },
      click1(){
        this.$mymsg(t1,{
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
      click2(){
        this.$mymsg(t2,{
          data: {
            message: 'this is a click t2 method'
          },
          methods:{
            onOk(){
              alert('回调2');
            }
          }
        });
      }

    }
  }
</script>

<style scoped>

</style>
