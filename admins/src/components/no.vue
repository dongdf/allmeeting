<template>
    <div>
      <div class="no_pic"><img src="../assets/imgs/no.png"> </div>
      <div class="nor">{{tipText}}</div>
    </div>

</template>

<script>
  export default {
    name: "no",
    props:['tipText']
  }
</script>

<style scoped lang="scss">
  .no_pic{
    margin-top:30px;
    text-align: center;
    img{
      width:120px;
      opacity: .6;
    }

  }
.nor{
  text-align: center;
  font-weight: bold;
  padding:0px;
  color:#CCC;
}
</style>
