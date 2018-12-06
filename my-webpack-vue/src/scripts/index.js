// const word = "hdhdhd"

// console.log(word)

// import{names,flag,arr} from "./demo";

// document.getElementById("app").innerHTML +=word

import Vue from "vue";
import VueResouce from "vue-resource";
import MintUI from "mint-ui";
import vueAwesomeSwiper from "vue-awesome-swiper"
import axios from "axios"
import Head from "./components/head.vue"

import router from "./router"

import store from "./vuex/store"
import {
    Navbar,
    TabItem
} from 'mint-ui';

import {
    Lazyload
} from 'mint-ui';

import {
    InfiniteScroll
} from 'mint-ui';

import {
    Loadmore
} from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);

Vue.use(InfiniteScroll);

Vue.use(Lazyload);



Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

Vue.use(VueResouce)
Vue.use(MintUI)
Vue.use(vueAwesomeSwiper)
Vue.component("Head", Head)






//  import Home from "./components/home.vue"

const vm = new Vue({
    store,
    el: "#app",
    router,
    data: {
        title: "vue+webpack",
        msg: "hhh"
    },
    components: {

    },
    mounted() {
        // this.$http.get("http://47.94.208.182:3000/movie")
        // .then(res=>{
        //     console.log(res.body)
        // })
    },
    watch: {

    }
})