<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue';

    export default {
      props:{
        food:{
          type:Object
        }
      },
      methods:{
        decreaseCart(){
          this.food.count -= 1;
        },
        addCart(){
          if(!this.food.count){
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count += 1;
          }
        }
      }
    }
</script>

<style scoped>
  @import url("cartControl.css");
</style>
