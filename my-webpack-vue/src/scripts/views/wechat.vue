<template>
    <div class="box">
        <!-- <Head></Head> -->
        <!-- <h1>wechat</h1> -->
        <h1 class="title">
            <i class="iconfont icon-fanhui back"></i>
            小酒吧写的
            <i class="iconfont icon-shoucang like"></i>
        </h1>
        <mt-swipe :auto="4000" :show-indicators="false">
            <mt-swipe-item>
                <div class="bcon">
                    <div class="mcon">
                        <div class="con">
                            <img src="../../assets/imgs/home5.jpg" alt="" class="my">
                            <p
                                style="margin-top:10px;color:#231815;font-size:17px;height:40px;line-height:40px;"
                            >"吉他，鲜花，掌声，kurt"</p>
                        </div>
                    </div>
                    <!-- <mt-button type="default">进入</mt-button> -->
                    <div class="btcon">
                        <div class="dot box"></div>
                        <div class="box bb"></div>
                        <div class="dot box"></div>
                    </div>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class="bcon">
                    <div class="mcon">
                        <div class="con">
                            <img src="../../assets/imgs/home4.jpg" alt="" class="my">
                            <p
                                style="margin-top:10px;color:#231815;font-size:17px;height:40px;line-height:40px;"
                            >"放归少女重回田野，也是小偷的工作呢"</p>
                        </div>
                    </div>
                    <!-- <mt-button type="default">进入</mt-button> -->
                    <div class="btcon">
                        <div class="dot box"></div>
                        <div class="box bb"></div>
                        <div class="dot box"></div>
                    </div>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class="bcon">
                    <div class="mcon">
                        <div class="con">
                            <img src="../../assets/imgs/home3.jpg" alt="" class="my">
                            <p
                                style="margin-top:10px;color:#231815;font-size:17px;height:40px;line-height:40px;"
                            >"生而为人，我很抱歉"</p>
                        </div>
                    </div>
                    <!-- <mt-button type="default">进入</mt-button> -->
                    <div class="btcon">
                        <div class="dot box"></div>
                        <div class="box bb"></div>
                        <div class="dot box"></div>
                    </div>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
import router from "../router";
import { Indicator } from 'mint-ui';
import {mapState,mapActions,mapGetters} from "vuex";
import { Button } from 'mint-ui';
export default {
    data(){
        return{
            // homes:[]
        }
    },
    
     mounted(){
        Indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
        })
        setTimeout(()=>{
                 Indicator.close();
        },1200)
    },
    computed:{
         ...mapState(['homes']),
    },
    methods:{
       
    }
}
</script>

<style  scoped>
.box {
  background: #f6f6f6;
  /* height: 90vh; */
  margin-bottom: 0;
  /* height: 100%; */
  /* margin-top: -100px; */
  margin-top: 0;
}
.title {
  /* text-align: center; */
  text-align: center;
  line-height: 70px;
  background-color: #8d8585;
  position: fixed;
  top: 0;
  width: 100%;
}
.title i {
  font-size: 30px;
  /* text-align: center; */
}
.back {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  /* margin-left: 20px; */
}
.like {
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;
}
.mint-swipe {
  width: 100%;
  height: 85vh; /*no*/
  margin: auto;
  margin-top: 12px;
  border: 0px solid white;
  margin-top: 7vh;
}
.bcon {
  background: #f6f6f6;
  padding-left: 25px; /*no*/
  padding-right: 25px; /*no*/
  height: 70vh;
  margin-top: 10px;
}
.mcon {
  background-color: white;
  padding: 8px; /*no*/
  -webkit-box-shadow: 5px 15px 25px rgba(0, 0, 0, 0.1);
}
.con {
  border: 3px solid #b3bd5e; /*no*/
  padding: 5px; /*no*/
  /* background-image: url('../../assets/images/bg1.jpg'); */
  background-size: 100%;
}
.con p {
  width: 100%;
  text-align: center;
}

.my {
  width: 100%;
  height: 300px; /*no*/
}
.btcon {
  height: 110px; /*no*/
}
.btcon .box {
  float: left;
  width: 30%;
  padding-left: 3%;
}
.bb {
  height: 100%;
  /* background: url('../../assets/images/ibg2.jpg'); */
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}
.bb .content {
  width: 80%;
  margin-left: 1px; /*no*/
  text-align: center;
  font-size: 9px;
  position: absolute;
  top: 30px; /*no*/
  color: #7b902e;
}
.dot {
  height: 100%;
  /* background: url('../../assets/images/idot.jpg'); */
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>


