import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import Wechat from "./views/wechat.vue"
import Find from "./views/find.vue"
import My from "./views/my.vue"
import Contact from "./views/contact.vue"
import Guide from "./views/guide.vue"
import Layout from "./views/layout.vue"
import Login from "./views/login.vue"
import Allmusic from "./views/allmusic.vue"
import musicInfo from "./views/musicinfo.vue"
import Allmovie from "./views/allmovie.vue"
import movieInfo from "./views/movieinfo.vue"




const router = new VueRouter({
    routes: [{
            path: '/',
            component: Guide,
            name: "guide"
        },
        {
            path: "/login",
            component: Login,
            name: 'login'
        },
        {
            path: "/app",
            name: "app",
            component: Layout,
            children: [{
                    path: "",
                    redirect: "/app/wechat"
                },
                {
                    path: "haha",
                    component: Wechat,
                    name: "wechat"
                },
                {
                    path: "my",
                    component: My,
                    name: "my"
                },
                {
                    path: "find",
                    component: Find,
                    name: "find"
                },
                {
                    path: "hehe",
                    component: Contact,
                    name: "contact"
                },
                // {
                //     path: "*",
                //     redirect: {
                //         name: "wechat"
                //     }
                // },
                {
                    path: "allmusci",
                    component: Allmusic,
                    name: "allmusic"
                },
                {
                    path: "musicinfo/:title",
                    component: musicInfo,
                    name: "musicinfo"
                }, {
                    path: "movieinfo/:title",
                    component: movieInfo,
                    name: "movieinfo"
                },
                {
                    path: 'allmovie',
                    component: Allmovie,
                    name: "allmovie"
                }
            ]
        },
        {
            path: "*",
            redirect: "/app"
        }
    ],
    mode: "hash",
    base: "/"

})

export default router;