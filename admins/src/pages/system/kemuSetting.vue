<template>
    <div>
        <Row style="border-bottom:2px solid #EEE; padding-bottom: 10px;">
            <Col span="24"><Button type="primary" icon="plus-round" @click="add">新增学科</Button></Col>
        </Row>
    </div>
</template>

<script>
  import addGrade from './add'
  export default {
    name: "grade-setting",
    methods:{
      add(){
        this.$mymsg(addGrade,{
          data: {
            message: '新增学科',
            addType:2
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