<template>
  <div class="header">
    <!--顶部通栏-->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="Please enter items">
      </form>

      <div class="more-wrapper">
        <a class="spelling-bt" href="#">Spell List</a>
        <div class="more-bt"></div>
      </div>
    </div>
    <!--主要内容-->
    <div class="content-wrapper">

    </div>
    <!--公告内容-->
    <div class="bulletin-wrapper">

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
  @import url("../../common/styles/icon.css");
  @import url("head.css");
</style>
