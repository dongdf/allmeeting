<template>
    <router-view v-if="isRouterAlive"></router-view>
</template>

<script>
  export default {
    name: "right",
    data(){
      return{
        isRouterAlive: true,
      }

    },
    watch:{
      '$route' (to, from) {
        console.log('aaaaa');
        this.isRouterAlive = false;
        this.$nextTick(()=>{
          this.isRouterAlive = true;


        })




      }
    },
  }
</script>

<style scoped>


</style>
