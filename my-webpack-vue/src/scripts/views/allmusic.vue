<template>
    <div class="box">
        <a id="top"></a>
        <h1 class="title">
            <i class="iconfont icon-fanhui back" @click="goback"></i>所有音乐
            <i class="iconfont icon-shoucang like"></i>
        </h1>
        <mt-loadmore
            :top-method="loadTop"
            :bottom-all-loaded="allLoaded"
            ref="loadmore"
            style="margin-top:40px;"
        >
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
            >
                <li v-for="(mu,i) in mus" :key="i" class="list">
                    <router-link :to="{name:'musicinfo',params:{title:mu.title},query:{id:mu.id}}">
                        <img v-lazy="mu.image" alt="">
                        <p>专辑名：{{mu.title}}</p>
                        <p>乐队：{{mu.attrs.singer[0]}}</p>
                        <p>年份：{{mu.attrs.pubdate[0]}}</p>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>
        <div class="top" v-if="show">
            <div class="topicon" @click="top">
                <i class="iconfont icon-huidingbu"></i>
            </div>
        </div>
    </div>
</template>


<script>

import { Indicator , Toast} from 'mint-ui';
import {mapState,mapActions,mapGetters} from 'vuex';
import { InfiniteScroll } from 'mint-ui';
import { Loadmore } from 'mint-ui';


export default {
    computed:{
        ...mapState(['mus']),
        // console.log(mus)
    },
    data(){
        return {
            list:[],
            show:true,
            allLoaded:false,
            loading:false,
        }
    },
    methods:{
        ...mapActions(['getmus']),
        loadTop(){
            var that = this
            // console.log("loadTop-下拉刷新");
            this.getmus({url:"/getmusic",limit:10,callback:function(){
            // Indicator.close();
            setTimeout(()=>{
                    that.$refs.loadmore.onTopLoaded();
                    // this.mvs  = res.body.reverse();
                    Toast({
                        message: '下拉刷新成功',
                    })
                },500)
            }})
            
        },
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                let last = this.mus[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
                }
                this.loading = false;
            }, 2500)    
            },
        top(){
               var scrollToptimer = setInterval(function () {
                // console.log("定时循环回到顶部")
                var top = document.body.scrollTop || document.documentElement.scrollTop;
                var speed = top / 6;
                if (document.body.scrollTop!=0) {
                    document.body.scrollTop -= speed;
                }else {
                    document.documentElement.scrollTop -= speed;
                }
                if (top == 0) {
                    clearInterval(scrollToptimer);
                }
                }, 50); 
            },
             goback(){
             this.$router.go(-1);
        }
        // handleScroll(){
        //     var scroll = document
            
        // }
            
    },
    mounted(){
        Indicator.open({
            text:"加载中...",
            spinnerType:'triple-boounce'
        })
        this.getmus({url:"/getmusic",limit:10,callback:function(){
            Indicator.close();
            Toast({
                message:'加载成功',
                iconClass:'iconfont icon-tuichu',
                duration:1000,
            })
        }})
        this.top()
        //  window.addEventListener('scroll', this.handleScroll)
    }


}
</script>


<style lang="scss" scoped>
.box {
  background: #9b9898;
  .title {
    z-index: 999;
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
  ul {
    // margin-top:100px;
    // margin-bottom: 100px;
    width: 85%;
    margin: 70px auto 100px;
    li {
      text-align: center;
      margin-bottom: 20px;
      padding: 10px;
      background-color: #b43973;
      border-radius: 10px;
      img {
        display: inline-block;
        border-radius: 5px;
      }
    }
  }

  image[lazy='loading'] {
    width: 600px;
    height: 600px;
    margin: auto;
  }
  .top {
    position: fixed;
    right: 10px;
    bottom: 120px;
    .topicon {
      //   width: 40px;
      //   height: 40px;
      i {
        font-size: 50px;
      }
      //   background-color: #67366b;
    }
  }
}
</style>


