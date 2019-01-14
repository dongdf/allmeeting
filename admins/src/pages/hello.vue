<template>
    <div>
        <img @click="test" src="../../static/img/1.pic.jpg"/>
        <Slider v-model="value" range></Slider>
    </div>


</template>
<script>
  export default {
    data(){
      return {
        value: [20, 50]
      }
    },
      methods:{
          test(){
              this.$mymsg({
                  data: {
                      message: 'hello222222'
                  },
                  methods:{
                      onCancle(){
                          alert('取消');
                      },
                      onOk(){
                          location.reload();
                      }
                  }
              });
              // this.$http.get('/api/getUserInfo').then(data => {
              //
              //   // if (res.code == 0) {
              //   //
              //   //   this.$messagebox.alert('提交成功，请等待', '提示');
              //   // }else{
              //   //   //
              //   // }
              // })
          },
          closed(){
              alert('callback')
          }
      }
  }
</script>