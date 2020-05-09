<template>
  <div id="app">
    <!--header-->
    <MyHeader :poiInfo='poiInfo'></MyHeader>
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
  },
  data(){
    return{
      //header 组件需要的信息：商家信息（父->子 传信息）
      poiInfo: {} // 异步请求来获取数据
    }
  },
  created () { // 通过axios发起异步get请求，获取数据
    var that = this;
    // 通过axios发起get请求
    this.$axios.get('/goods')
      .then(function(response) {	// 获取到数据
        var dataSource = response.data;
        if(dataSource.code == 0){
          that.poiInfo = dataSource.data.poi_info;
          //console.log(dataSource)
        }
      })
      .catch(function(error) {		// 出错处理
        console.log(error);
      });
    // 通过axios发起get请求
    this.$axios.get('/ratings')
      .then(function(response) {	// 获取到数据
        var dataSource = response.data;
        if(dataSource.code == 0){
          that.commentNum = dataSource.data.comment_num;
        }
      })
      .catch(function(error) {		// 出错处理
        console.log(error);
      });
  },
  methods:{
    getdata(){

    }
  }
}
</script>

<style>

</style>
