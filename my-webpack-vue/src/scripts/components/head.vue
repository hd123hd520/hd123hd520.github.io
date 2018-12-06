<template>
    <header>
        <div class="top">
            <span class="big">
                <i class="iconfont icon-search" @click="searchP"></i>
            </span>
            <input type="text" class="search" :placeholder="title" v-model="searchinp">
            <span class="sm">
                <i class="iconfont icon-saomiaoshibie380"></i>
            </span>
        </div>
        <mt-navbar v-model="selected" id="bar" v-if="show">
            <mt-tab-item id="1">
                <a :href="'#top'">音乐</a>
            </mt-tab-item>
            <mt-tab-item id="2">
                <a :href="'#hot'">电影</a>
            </mt-tab-item>
            <mt-tab-item id="3">读书</mt-tab-item>
        </mt-navbar>
    </header>
</template>

<script>
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import {mapState,mapActions,mapGetters} from "vuex";
import router from "../router";

export default {
    name:"head-one",
    data(){
        return{
            title:"热门搜索",
            selected:"1",
            show:true,
            searchinp:''
      }
        },
    
    
    methods:{
        ...mapActions(['search']),
		searchP(){
            var ss = this.searchinp
            var that = this
            this.search({url:"/search",name:ss,callback:function(data){
                // that.searchinp = data
                // console.log(data)
                if(data){
                    let instance = Toast('查询成功');
                    setTimeout(() => {
                    instance.close();
                    router.push({name:"movieinfo",params:{title:data.title},query:{id:data.id}}) 
                    }, 1000);
                    
                }else{
                    let instance = Toast('没有数据');
                    setTimeout(() => {
                    instance.close();
                    }, 2000);
                }
            }})
        }
        
    },
    computed:{
        ...mapState(['searchnews','searchM'])
        
    },
    mounted:function(){
        var that = this
        var i = 0
        var count = that.searchnews.length-1
        var time = setInterval(function(){
             that.title = that.searchnews[i].title
             if(i<count){
                 i++
             }else{
                 i = 0
             }
         },4000)
    }
    

}
</script>


<style lang="scss" scoped>
a {
  color: darkcyan;
}
header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: #8d8585;
  padding-top: 10px;
  .top {
    font-size: 40px;
    height: 50px;
    width: 90%;
    margin: auto;
    line-height: 40px;
    text-align: center;
    border-radius: 25px;
    background-color: #fff;
    margin-bottom: 20px;
    input {
      // display: inline-block;
      width: 70%;
      height: 40px;
      // font-size: 40px;
      border: none;
      // margin-bottom:100px;
      color: #8d8585;
    }
  }
}
</style>


