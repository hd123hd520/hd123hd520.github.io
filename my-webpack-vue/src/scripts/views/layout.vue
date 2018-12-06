<template>
    <div class="layout">
        <router-view></router-view>
        <Foot></Foot>
    </div>
</template>

<script>
import Foot from "../components/foot.vue"
import {mapState} from "vuex";
export default {
    components:{
        Foot
    }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  //   margin-top: -100px;
  background: #fff;
}
</style>

