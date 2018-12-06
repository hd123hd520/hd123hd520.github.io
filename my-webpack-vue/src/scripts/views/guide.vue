<template>
    <div class="box">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(img,i) in imgs" :key="i">
                <img :src="img" alt="" @click="gotoIndex(i)">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>

import p1 from "../../assets/imgs/home2.jpg"
import p2 from "../../assets/imgs/home1.jpg"
import p3 from "../../assets/imgs/hb22.jpg"
import p4 from "../../assets/imgs/punk1.jpg"


export default {
    data(){
        return{
            imgs:[p1,p2,p3,p4],
            swiperOption:{
                loop:false,
                speed:1500,
                resistanceRatio:0,
                
            }
        }
    },
    mounted(){
        if(localStorage.vuecount){  
            localStorage.vuecount++;
            this.$router.push({name:'wechat'})
        }else{
            localStorage.vuecount = 1
        }
    },
    methods:{
        gotoIndex(idx){
            // console.log(idx)
            if(idx==this.imgs.length-1){
                this.$router.push({name:'wechat'})
            }
        }
    }
}
</script>

<style scoped>
.swiper-container,
.swiper-slide,
img {
  width: 100%;
  height: 100%;
}
.box {
  height: 100% !important;
}
</style>

