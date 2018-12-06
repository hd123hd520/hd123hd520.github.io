<template>
    <div>
        <h1>详情</h1>
        <a id="top"></a>
        <h1 class="title">
            <i class="iconfont icon-fanhui back" @click="goback"></i>
            {{title}}
            <i class="iconfont icon-shoucang like"></i>
        </h1>
        <div class="info">
            <div class="imgbox">
                <img v-if="movieInfo" :src="movieInfo.images.medium" alt="">
            </div>
            <p>电影名：{{movieInfo.title}}</p>
            <p>主演：</p>
            <div class="swiper-container" id="actip">
                <div class="swiper-wrapper">
                    <div class="swiper-slide bannerbox" v-for="(t,i) in movieInfo.casts" :key="i">
                        <span class="font-intro">{{t.name}}</span>
                        <img v-if="movieInfo" :src="t.avatars.small" alt="">
                    </div>
                </div>
            </div>
            <!-- <ul>
                <li v-for="(t,i) in movieInfo.casts" :key="i">
                    <span>{{t.name}}</span>
                    <img v-if="load" :src="t.avatars.small" alt="">
                </li>
            </ul>-->

            <p>发行时间：{{movieInfo.mainland_pubdate}}</p>
            <p>
                电影时长：
                {{movieInfo.durations}}
            </p>
            <p v-if="movieInfo">
                评分：{{movieInfo.rating.average}}
                <br>
                <span>5星:{{movieInfo.rating.details["5"]}}</span>
                <span>4星:{{movieInfo.rating.details["4"]}}</span>
                <span>3星:{{movieInfo.rating.details["5"]}}</span>
                <span>2星:{{movieInfo.rating.details["2"]}}</span>
                <span>1星:{{movieInfo.rating.details["1"]}}</span>
            </p>
            <p v-if="movieInfo">
                导演：{{movieInfo.directors[0].name}}
                <!-- <img
                    v-if="movieInfo"
                    :scr="movieInfo.directors[0].avatars.small"
                    alt=""
                >-->
            </p>
            <p>分类：{{movieInfo.genres}}</p>
        </div>
    </div>
</template>

<script>

import {mapState,mapActions,mapGetters} from 'vuex';
import Swiper from "../utils/swiper-3.3.1.min.js";


export default {
    data(){
        return{
            title:this.$route.params.title,
            load:false
        }
    },
    created(){
        this.getmovieInfo({url:"/movieinfo",id:this.$route.query.id})
    },
    computed:{
        ...mapState(['movieInfo'])
    },
    methods:{
        ...mapActions(['getmovieInfo']),
        goback(){
             this.$router.go(-1);
        },
        top(){
              document.documentElement.scrollTop = 0
        },
        dzsIdear(){
            var actip = new Swiper("#actip",{
                direction: "horizontal",
                speed: 6000,
                // loop:true,
                // autoplay:"auto",
                slidesPerView: "auto",
                spaceBetween: 40,
                freeMode : true,
                autoplayDisableOnInteraction : true,
            });
        }
    }
    ,
    mounted(){
        this.getmovieInfo({url:"/movieinfo",id:this.$route.query.id})
        // this.getminfo
        this.top()
        this.dzsIdear()
        this.load = true
    }
}
</script>


<style lang="scss" scoped>
.title {
  i {
    font-size: 30px;
  }
  .back {
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    //   margin-left: 20px;
  }
  .like {
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
  }
}
h1 {
  text-align: center;
  line-height: 70px;
  background-color: #8d8585;
  position: fixed;
  top: 0;
  width: 100%;
}
.info {
  margin-top: 80px;
  margin: 100px auto;
  width: 90%;
  text-align: left;
  .imgbox {
    text-align: center;
    width: 100%;
    img {
      border-radius: 8px;
      display: inline-block;
    }
  }
  ul {
    width: 100%;
    li {
      display: inline-block;
      margin-right: 20px;
      img {
        width: 200px;
        height: 280px;
      }
    }
  }
  p {
    font-size: 36px;
    color: #2e473f;
    span {
      font-size: 28px;
      padding: 0 8px;
      color: #131312;
    }
  }
}
#actip {
  padding: 30px 0 30px 30px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .bannerbox {
    width: 240px;
    height: 280px;
    position: relative;
    img {
      border-radius: 14px;
      width: 100%;
      height: 280px;
    }

    .font-intro {
      color: #fff;
      font: 500 25px 'microsoft yahei';
      position: absolute;
      bottom: 20px;
      left: 45px;
      right: 0;
      z-index: 10;
    }
  }
  span {
    color: #000;
  }
}
</style>

