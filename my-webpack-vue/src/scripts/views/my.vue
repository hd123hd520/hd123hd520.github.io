<template>
    <div class="box">
        <div class="boxtop">
            <div class="ibox">
                <img src="../../assets/images/head.jpg" alt="">
            </div>
            <div id="show1">
                <p style="text-align:center;font-size:16px;">您还未登录</p>
                <div class="buttons">
                    <mt-button
                        size="large"
                        type="primary"
                        plain
                        @click="gotoLogin"
                        style="width: 120px;height: 38px;margin-right: 10px;color:green;border:1px solid #668f31;display:inline-block"
                    >登录</mt-button>
                    <mt-button
                        size="normal"
                        type="primary"
                        plain
                        @click="gotoRegist"
                        style="width: 120px;height: 38px;color:green;border:1px solid #668f31;display:inline-block"
                    >注册</mt-button>
                </div>
            </div>
            <div id="show2">Adiue</div>
            <mt-button
                size="large"
                type="primary"
                id="go2"
                plain
                @click="gotoLogin"
                style="text-align: center;width:270px;margin:15px auto;color:#fff;border:1px solid #668f31;background:#668f31;"
            >登出</mt-button>
            <div class="topbt">
                <div class="sbox">
                    <p>-</p>
                    <p>喜欢的人</p>
                </div>
                <div class="sbox">
                    <p>-</p>
                    <p>浏览记录</p>
                </div>
                <div class="sbox">
                    <p>-</p>
                    <p>加入小组</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div>
                <p>收藏的电影</p>
                <div>
                    <img src="../../assets/images/jt.png" alt="">
                </div>
            </div>
            <div>
                <p>收藏的音乐</p>
                <div>
                    <img src="../../assets/images/jt.png" alt="">
                </div>
            </div>
            <div>
                <p>收藏的图书</p>
                <div>
                    <img src="../../assets/images/jt.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import router from "../router";
export default {
    
    mounted(){
        if(localStorage.tel.length!=0){
            document.getElementById("show1").style.display="none";
            document.getElementById("show2").style.color="block";
            document.getElementById("show2").innerHTML=localStorage.tel;
            document.getElementById("go2").onclick=null;
            
        }else{
            document.getElementById("show1").style.color="block";
            document.getElementById("show2").style.color="none";
            document.getElementById("show2").innerHTML="";
            // document.getElementById("go2").style.display="none"
            document.getElementById("go2").setAttribute("disabled",true)
        }
    }, methods:{
        gotoLogin(){
            // this.$router.push("")
            window.localStorage.tel=""
            router.push({name:"login"})
        },
        gotoRegist(){
            window.localStorage.tel=""
            router.push({name:"login"})
        }
    }
}
</script>


<style lang="scss" scoped>
.header1 {
  .box {
    width: 33vw;
  }
}
.boxtop {
  height: 52vh;
  width: 80vw;
  padding: 10vw;
  background: #fff;
  .ibox {
    height: 15vh;
    margin-top: 50px; /*no*/
    width: 80vw;
    img {
      width: 25%;
      margin: 0 auto;
    }
  }
  #show2 {
    text-align: center;
    margin-top: 26px; /*no*/
  }
  .buttons {
    text-align: center;
    margin-top: 26px; /*no*/
    mt-button {
      margin-right: 15px; /*no*/
    }
  }
  .topbt {
    height: 10vh;
    .sbox {
      width: 10%;
      float: left;
      margin-left: 54px; /*no*/
      text-align: center;
      color: #959595;
      height: 10vh;
      p {
        margin-top: 8px; /*no*/
      }
    }
  }
}
.bottom {
  height: 35vh;
  width: 80vw;
  padding: 0 10vw;
  background: #fff;
  margin-top: 10px; /*no*/
  margin-bottom: 0;
  div {
    border-bottom: 1px solid #f3efef;
    width: 80vw;
    height: 60px; /*no*/

    p {
      width: 70%;
      float: left;
      line-height: 60px; /*no*/
    }
    div {
      width: 30%;
      float: left;
      line-height: 60px;
      position: relative;
      img {
        width: 10%;
        line-height: 60px; /*no*/
        vertical-align: middle;
        display: block;
        text-align: center;
        position: absolute;
        top: 35%;
        left: 88%;
      }
    }
  }
}
</style>


