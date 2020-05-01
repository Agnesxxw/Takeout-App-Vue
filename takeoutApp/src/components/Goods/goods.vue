<template>
  <div class="goods">
    <!--左侧菜单分类-->
    <div class="menu-wrapper">
      <ul>
        <!--专场-->
        <li class="menu-item">
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon"/>
            {{container.tag_name}}
          </p>
        </li>
        <li class="menu-item" v-for="item in goods">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon"/>
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <!--商品列表-->
    <div class="foods-wrapper">
      <ul>
        <!--专场-->
        <div class="container-list">
          <div v-for="item in container.operation_source_list">
            <img :src="item.pic_url"/>
          </div>
        </div>
        <!--具体分类-->
        <li v-for="item in goods" class="food-list">

          <h3 class="title">{{item.name}}</h3>
          <!--具体商品列表-->
          <ul>
            <li v-for="food in item.spus" class="food-item">
              <div class="icon" :style="head_bg(food.picture)">

              </div>
              <div class="content" >
                <h3 class="name"> {{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img class="product" :src="food.product_label_picture" v-if="food.product_label_picture"/>
                <p class="price">
                  <span class="text">¥{{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>

              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          container:{},
          goods:[]
        }
      },
      created () { // 通过axios发起异步get请求，获取数据
        var that = this;
        // 通过axios发起get请求
        this.$axios.get('/goods')
          .then(function(response) {	// 获取到数据
            var dataSource = response.data;
            if(dataSource.code == 0){
              // that.poiInfo = dataSource.data.poi_info;
              that.container = dataSource.data.container_operation_source;
              that.goods = dataSource.data.food_spu_tags;
            }
          })
          .catch(function(error) {		// 出错处理
            console.log(error);
          });
      },
      methods:{
        head_bg(imageName){
          return "background-image:url("+imageName+");"
        }
      }
    }
</script>

<style scoped>
  @import url("goods.css");
</style>
