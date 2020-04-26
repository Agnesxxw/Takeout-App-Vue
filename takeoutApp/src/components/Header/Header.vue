<template>
  <div class="header">
    <!--顶部通栏-->
    <div class="top-wrapper">

    </div>
    <!--主要内容-->
    <div class="content-wrapper">

    </div>
    <!--公告内容-->
    <div class="bulletin-wrapper">
      {{poiInfo.name}}
    </div>

  </div>
</template>

<script>
  export default {
    props:{
      poiInfo:{
        type:Object,
        default:{}
      }
    }
  }
</script>

<style>
  @import url("head.css");
</style>
