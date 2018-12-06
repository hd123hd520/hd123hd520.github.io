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
                <img v-if="musicInfo" :src="musicInfo.image" alt="">
            </div>
            <p>专辑名：{{musicInfo.title}}</p>
            <p v-if="musicInfo">乐队：{{musicInfo.attrs.singer[0]}}</p>
            <p v-if="musicInfo">发行年份：{{musicInfo.attrs.pubdate[0]}}</p>
            <p>
                热门标签：
                <span v-for="(t,i) in musicInfo.tags" :key="i">{{t.name}},</span>
            </p>
            <p v-if="musicInfo">评分：{{musicInfo.rating.average}} 评分数量{{musicInfo.rating.numRaters}}</p>
            <p v-if="musicInfo">发行商：{{musicInfo.attrs.publisher[0]}}</p>
            <p v-if="musicInfo">CD曲目：{{musicInfo.attrs.tracks[0]}}</p>
        </div>
    </div>
</template>

<script>

import {mapState,mapActions,mapGetters} from 'vuex';

export default {
    data(){
        return{
            title:this.$route.params.title,
            load:false
        }
    },
    created(){
       
    },
    computed:{
        ...mapState(['musicInfo'])
    },
    methods:{
        ...mapActions(['getminfo']),
        goback(){
             this.$router.go(-1);
        },
        top(){
              document.documentElement.scrollTop = 0
        }
    }
    ,
    mounted(){
        this.getminfo({url:"/musicinfo",id:this.$route.query.id})
        // this.getminfo
        this.top()
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
</style>

