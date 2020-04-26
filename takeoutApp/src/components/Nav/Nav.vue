<script src="../../main.js"></script>
<template>
  <div class="nav">
    <router-link class="nav-item" to="/goods">
      Order
      <i class="line"></i>
    </router-link>
    <router-link class="nav-item" to="/ratings">
      Comments
      <i class="line"></i>
    </router-link>
    <router-link class="nav-item" to="/restaurant">
      Restaurant
      <i class="line"></i>
    </router-link>
  </div>

</template>

<script>
  export default {

  }
</script>

<style>
  .nav {
    display: flex;
    width:100%;
    height: 40px;
    line-height:40px;
    border-bottom: 1px solid #e4e4e4;
  }
  .nav .nav-item {
    flex:1;
    text-align: center;
    font-size:13px;
    text-decoration: none;
    color:#666666;
    position: relative;
  }
  .nav .active {
    color:#ffbb22;
  }
  .nav .active. line {
    width:20px;
    height:2px;
    background: #ffbb22;
    position: absolute;
    left:50%;
    bottom: 0;
    margin-left: -10px;
  }
</style>
