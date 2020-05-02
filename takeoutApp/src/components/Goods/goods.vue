<template>
  <div class="goods">
    <!--左侧菜单分类-->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!--专场-->
        <li class="menu-item" :class="{'current':currentIndex === 0}" @click="selectMenu(0)">
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon"/>
            {{container.tag_name}}
          </p>
        </li>
        <li class="menu-item" v-for="(item, index) in goods" :class="{'current':currentIndex === index + 1}" @click="selectMenu(index + 1)"><!--index 就是当前li的下标-->
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon"/>
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>

    <!--商品列表-->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!--专场-->
        <li class="container-list food-list-hook">
          <div v-for="item in container.operation_source_list">
            <img :src="item.pic_url"/>
          </div>
        </li>
        <!--具体分类-->
        <li v-for="item in goods" class="food-list food-list-hook">

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
    <shopCart :shipping_fee_tip="poiInfo.shipping_fee_tip" :min_price_tip="poiInfo.min_price_tip"></shopCart>
  </div>
</template>

<script>
  // 倒入BScroll
  import BScroll from 'better-scroll'
  import shopCart from "../shopCart/shopCart";
    export default {
      data(){
        return {
          container:{},
          goods:[],
          poiInfo:{},
          listHeight:[],
          scrollY:0, // 当前的滚动位置
          menuScroll:{},
          foodScroll:{}
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
              that.poiInfo = dataSource.data.poi_info;
              // 调用滚动的初始化方法
              // that.initScroll() 这样直接调用是不行的
              // 开始时，create 阶段 dom元素还没有渲染，这个时候的高度是有问题的，
              // 应该在获取到dom元素之后，并且已经渲染的时候，表示列表高度是没问题的
              // nextTick将回调延迟到下次 DOM 更新循环之后执行。DOM更新之后会出发的一个方法
              that.$nextTick(()=>{
                // DOM已经更新
                that.initScroll();
                // 计算分类区间
                that.calculateHeight();
              })
            }
          })
          .catch(function(error) {		// 出错处理
            console.log(error);
          });
      },
      methods:{
        head_bg(imageName){
          return "background-image:url("+imageName+");"
        },
        // initialize the scroll
        initScroll() {
          // ref属性就是用来绑定每个dom元素或某个组件，在this.$ref可以找到
          // ref：一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例
          this.menuScroll = new BScroll(this.$refs.menuScroll,{
            click:true //默认阻止了浏览器的原生点击事件
          });
          this.foodScroll = new BScroll(this.$refs.foodScroll,{
            probeType:3
          });
          // 添加滚动监听事件
          this.foodScroll.on("scroll", (pos)=>{
            //console.log(pos.y);
            this.scrollY = Math.abs(Math.round(pos.y)); // 对数据进行取正和取整处理

          })
        },
        // 用于联动左边列表和右边菜单
        calculateHeight(){
           // 通过$ref获取到对应的元素
          let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook");
          // 添加到数组区间
          // 0 ~ 216 专场区间；217 ～ 1342 热销 第二个区间
          let height = 0;
          this.listHeight.push(height);
          for(let i = 0 ; i < foodlist.length; i ++){
            let item = foodlist[i]

            // 累加
            height += item.clientHeight; //clientHeight = height + CSS padding - 水平滚动条高度 (如果存在)
            this.listHeight.push(height);
          }
        },
        selectMenu(index){
          //console.log(index)
          let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook");
          // 根据下标获取商品对应的列表
          let el = foodlist[index];
          this.foodScroll.scrollToElement(el, 250)

        }
      },
      computed:{
        currentIndex(){ // 根据右侧滚动位置，确定对应的索引
          for(let i = 0; i < this.listHeight.length - 1; i++){
            // 获取商品区间的范围
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            // 判断是否在上述区间
            if(this.scrollY >= height1 && this.scrollY <= height2){
              //console.log(i)
              return i;
            }
          }
          return 0;
        }

      },
      components:{
        BScroll,
        shopCart
      }
    }
</script>

<style scoped>
  @import url("goods.css");
</style>
