<template>
  <div>
    <div>
      <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>{{tipText}}</p>
        </div>
      </Upload>
    </div>
    <div v-show="!uploadDone">
      已上传
    </div>
  </div>


</template>
<script>
  export default {
    props:['tipText','uploadDone',]

  }
</script>
