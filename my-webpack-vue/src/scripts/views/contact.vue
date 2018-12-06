<template>
    <div class="box" style="margin-top:120px;" id="top">
        <Head></Head>
        <div class="bar"></div>
        <div class="mtitle">
            <h3 id="yy">吐血推荐</h3>
        </div>
        <div class="music" id="music">
            <!-- music-banner -->
            <div class="swiper-container" id="banner">
                <div class="swiper-wrapper">
                    <div class="swiper-slide bannerbox">
                        <router-link
                            :to="{name:'musicinfo',query:{id:'1395617'},params:{title:'(Whats The Story) Morning Glory?'}}"
                        >
                            <img src="../../assets/imgs/music-banner0.jpg" alt="">
                        </router-link>
                    </div>
                    <div class="swiper-slide bannerbox">
                        <router-link
                            :to="{name:'musicinfo',query:{id:'1395118'},params:{title:'The Best of Blur'}}"
                        >
                            <img src="../../assets/imgs/music-banner1.jpg" alt="">
                        </router-link>
                    </div>
                    <div class="swiper-slide bannerbox">
                        <router-link
                            :to="{name:'musicinfo',query:{id:'3533452'},params:{title:'21st Century Breakdown'}}"
                        >
                            <img src="../../assets/imgs/music-banner2.jpg" alt="">
                        </router-link>
                    </div>
                    <div class="swiper-slide bannerbox">
                        <router-link
                            :to="{name:'musicinfo',query:{id:'1455695'},params:{title:'A Rush of  Blood to the Head'}}"
                        >
                            <img src="../../assets/imgs/music-banner4.jpg" alt="">
                        </router-link>
                    </div>
                    <div class="swiper-slide bannerbox">
                        <router-link
                            :to="{name:'musicinfo',query:{id:'1418337'},params:{title:'Led Zeppelin'}}"
                        >
                            <img src="../../assets/imgs/music-banner6.jpg" alt="">
                        </router-link>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <!-- music-tip -->
            <div style="padding:0 30px;">摇滚分类
                <router-link :to="{name:'allmusic'}">
                    <span style="float:right;font-weight:bold;">>>>全部</span>
                </router-link>
            </div>
            <div class="swiper-container" id="musictip">
                <div class="swiper-wrapper">
                    <div class="swiper-slide bannerbox">
                        <span class="font-intro">英伦</span>
                        <img src="../../assets/imgs/rock_0.jpg" alt="">
                    </div>
                    <div class="swiper-slide bannerbox">
                        <span class="font-intro">朋克</span>
                        <img src="../../assets/imgs/rock_1.jpg" alt="">
                    </div>
                    <div class="swiper-slide bannerbox">
                        <span class="font-intro">EMO</span>
                        <img src="../../assets/imgs/rock_2.jpg" alt="">
                    </div>
                    <div class="swiper-slide bannerbox">
                        <span class="font-intro">独立</span>
                        <img src="../../assets/imgs/rock_3.jpg" alt="">
                    </div>
                    <div class="swiper-slide bannerbox">
                        <span class="font-intro">数学</span>
                        <img src="../../assets/imgs/rock_4.jpg" alt="">
                    </div>
                    <div class="swiper-slide bannerbox">
                        <span class="font-intro" style="color:#000">实验</span>
                        <img src="../../assets/imgs/rock_5.jpg" alt="">
                    </div>
                </div>
            </div>
            <div class="mtitle mbox">
                <h3 id="hot">热映电影</h3>
                <router-link :to="{name:'allmovie'}">
                    <p>>>>全部</p>
                </router-link>
                <div class="swiper-container" id="mbanner">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide bannerbox">
                            <router-link
                                :to="{name:'movieinfo',query:{id:'27039069'},params:{title:'宝贝儿'}}"
                            >
                                <img v-if="mvs.length" :src="mvs[0].images.small" alt="">
                            </router-link>
                        </div>
                        <div class="swiper-slide bannerbox">
                            <router-link
                                :to="{name:'movieinfo',query:{id:'26999424'},params:{title:'我的间谍前男友'}}"
                            >
                                <img v-if="mvs.length" :src="mvs[1].images.small" alt="">
                            </router-link>
                        </div>
                        <div class="swiper-slide bannerbox">
                            <router-link
                                :to="{name:'movieinfo',query:{id:'26425063'},params:{title:'无双'}}"
                            >
                                <img v-if="mvs.length" :src="mvs[2].images.small" alt="">
                            </router-link>
                        </div>
                        <div class="swiper-slide bannerbox">
                            <router-link
                                :to="{name:'movieinfo',query:{id:'27140071'},params:{title:'找到你'}}"
                            >
                                <img v-if="mvs.length" :src="mvs[3].images.small" alt="">
                            </router-link>
                        </div>
                        <div class="swiper-slide bannerbox">
                            <router-link
                                :to="{name:'movieinfo',query:{id:'30140571'},params:{title:'嗝嗝老师'}}"
                            >
                                <img v-if="mvs.length" :src="mvs[4].images.small" alt="">
                            </router-link>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Indicator,Toast } from 'mint-ui';
import Swiper from "../utils/swiper-3.3.1.min.js";
import axios from "axios"
import {mapState,mapActions,mapGetters} from "vuex";
import { Loadmore } from 'mint-ui';
import { Lazyload } from 'mint-ui';


// import { Indicator } from 'mint-ui';
// import { Lazyload } from 'mint-ui';


export default {
    data(){
      return{
          selected:"1",
      }
    },
    computed:{
        ...mapState(['muscibanner','mvs']),
    },
    methods:{
        ...mapActions(['getmv']),
        dzsIdear(){
            var banner = new Swiper("#banner", {
                direction: "horizontal",
                loop: true,
                speed: 1500,
                autoplay: 2000,
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 20,
                autoplayDisableOnInteraction : false,
                pagination: ".swiper-pagination",
                paginationType: "progress"
            });
            var musictip = new Swiper("#musictip",{
                direction: "horizontal",
                speed: 6000,
                loop:true,
                autoplay:"auto",
                slidesPerView: "auto",
                spaceBetween: 10,
                freeMode : true,
                autoplayDisableOnInteraction : true,
            });
            var mbanner = new Swiper("#mbanner",{
                irection: "horizontal",
                speed: 4000,
                loop:true,
                centeredSlides: true,
                autoplay:"auto",
                slidesPerView: "auto",
                spaceBetween: 10,
                freeMode : false,
                autoplayDisableOnInteraction : false,
                pagination: ".swiper-pagination",
                paginationType: "bullets"
            })
        }
    },
    mounted() {
        // Indicator.open({
        //     text:"加载中...",
        //     spinnerType:'triple-bounce'
        // })
        this.dzsIdear(); 
        this.getmv({url:"/gethot",limit:6,callback:function(){
            // setTimeout(()=>{
            //         Indicator.close();
            // },4200)
        }})
        // Indicator.close()
    },
    created(){
    }
}
</script>

<style lang="scss" scoped>
// image[lazy=loading] {
//   width: 40px;
//   height: 300px;
//   margin: auto;
// }
.mint-indicator {
  //   z-index: 99999;
}
.mtitle {
  margin: auto;
  width: 6.2rem;
  // border-radius: 20px;
  text-align: center;
  margin-top: 50px;
  font-size: 30px;
  line-height: 70px;
  height: 70px;
  background: #007aff;
}
.music {
  width: 100%;
  height: 500px;
  // background-color: pink;
  #banner {
    // margin-top: 60px;
    width: 620px;
    height: 460px;
    margin-bottom: 40px;
    padding-top: 30px;

    .swiper-wrapper {
      .swiper-slide {
        width: 500px;
        border-radius: 20px;

        img {
          width: 500px;
          height: 460px;
          border-radius: 15px;
          box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
          transform: translate3d(-5px, -5px, 0);
          transition: 0.8s;
          //   z-index: -1000;
        }
      }
      .swiper-slide-prev {
        margin-top: 18px;
        height: 400px !important;
        img {
          height: 360px !important;
        }
      }

      .swiper-slide-next {
        margin-top: 18px;
        height: 400px !important;
        img {
          height: 360px !important;
        }
      }
      .swiper-slide-active {
        width: 500px;
      }
    }

    .swiper-pagination {
      background: #fff;
    }
  }
  #musictip {
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
}
.mbox {
  margin-bottom: 200px;
  #mbanner {
    margin-bottom: 100px;
    width: 100%;
    height: 580px;
    text-align: center;
    padding-top: 20px;
    img {
      display: inline-block;
      width: 600px;
      height: 560px;
      border-radius: 15px;
      box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
      transform: translate3d(-5px, -5px, 0);
      transition: 0.8s;
    }
  }
}
</style>


