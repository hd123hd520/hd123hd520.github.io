<template>
    <div class="login">
        <h1 class="title">
            <i class="iconfont icon-fanhui back" @click="goback"></i>
            <!-- <i class="iconfont icon-shoucang like"></i> -->
        </h1>
        <h1>登陆注册</h1>
        <h3>未注册的手机，验证后即完成注册</h3>
        <div class="main">
            <div class="tel">
                <span>+86</span>
                <input
                    type="text"
                    placeholder="手机号"
                    @blur="settel"
                    v-model="account.tel"
                    autocomplete="off"
                >
            </div>
            <div class="code">
                <input
                    type="text"
                    placeholder="验证码"
                    v-model="account.code"
                    autocomplete="off"
                    @blur="setcode"
                >
                <span @click="sendmsg">{{getcode}}</span>
            </div>
        </div>
        <mt-button type="primary" class="btn" @click="sign">登陆</mt-button>
        <!-- <div>11111{{account.tel}}</div>
        <div>22222{{account.code}}</div>-->
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import axios from 'axios'
export default {
  data() {
    return {
      account: {
        tel: '',
        code: ''
      },
      telSet: false,
      codeSet: false,
      getcode: '获取验证码',
      sendflag: true
    }
  },
  methods: {
    setcode() {
      var reg = /^[0-9]{4}$/
      if (reg.test(this.account.code)) {
        return (this.codeSet = true)
      } else {
        return (this.codeSet = false)
      }
    },
    sign() {
      var url = 'http://106.14.201.102:3300/vue/signup'
      var that = this
      if (this.telSet && this.codeSet) {
        axios
          .get(url, {
            params: {
              tel: that.account.tel,
              code: that.account.code
            }
          })
          .then(res => {
            let instance = Toast(res.data.msg)
            setTimeout(() => {
              instance.close()
              if (res.data.code == 0) {
                localStorage.tel = that.account.tel
                window.location.href = 'http://106.14.201.102/hd/myvue/#/my'
              } else {
                that.account.code = ''
              }
            }, 2000)
          })
      } else {
        let instance = Toast('格式错误')
        setTimeout(() => {
          instance.close()
        }, 2000)
      }
    },
    sendmsg() {
      var url = 'http://106.14.201.102:3300/vue/sendCode'
      var that = this

      if (this.telSet && this.sendflag) {
        axios
          .get(url, {
            params: {
              tel: that.account.tel
            }
          })
          .then(res => {
            console.log(res)
            let instance = Toast(res.data.msg)
            setTimeout(() => {
              instance.close()
            }, 2000)
            this.sendflag = false
            this.getcode = 60
            if (this.getcode > 0) {
              var time = setInterval(() => {
                this.getcode--
                var that = this
                if (that.getcode == 0) {
                  clearInterval(time)
                  that.getcode = '获取验证码'
                  that.sendflag = true
                }
              }, 1000)
            }
          })
      } else {
        if (this.sendflag) {
          let instance = Toast('手机号格式不正确')
          setTimeout(() => {
            instance.close()
          }, 2000)
        } else {
          let instance = Toast('请求过于重复')
          setTimeout(() => {
            instance.close()
          }, 2000)
        }
      }
    },
    settel() {
      var TelReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (TelReg.test(this.account.tel)) {
        return (this.telSet = true)
      } else {
        return (this.telSet = false)
      }
    },
    goback() {
      this.$router.go(-1)
    }
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
.login {
  width: 90%;
  margin: 0 auto;
  h1 {
    margin-top: 100px;
    font-size: 60px;
    text-align: center;
  }
  h3 {
    font-size: 30px;
    text-align: center;
    color: #969494;
    margin-bottom: 50px;
  }
  .main {
    border: 1px solid #b4b2b2;
    border-radius: 10px;
    padding: 10px;
    div {
      height: 55px;
      line-height: 55px;
      input {
        vertical-align: center;
        display: inline-block;
        margin: auto;
        line-height: 40px;
        height: 40px;
        border: none;
        text-indent: 20px;
      }
    }
    .tel {
      span {
        text-align: center;
        line-height: 60px;
        padding-right: 10px;
        border-right: 1px solid #b4b2b2;
      }
    }
    .code {
      border-top: 1px solid #969494;
      padding-top: 5px;
      span {
        color: rgb(47, 255, 141);
        float: right;
        line-height: 50px;
      }
    }
  }
  .btn {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    color: #3a3737;
  }
}
</style>
