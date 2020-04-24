<template>
  <div id="app">
    <!--header-->
    <MyHeader></MyHeader>
    <!--navigation-->
    <MyNav></MyNav>
    <!--body-->
    <!--router exit-->
    <!--rendering content matched with the routes-->
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from './components/Header/Header'
import MyNav from './components/Nav/Nav'
export default {
  name: 'app',
  components: {
    MyHeader,
    MyNav
  }
}
</script>

<style>

</style>
