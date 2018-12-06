// 单一状态树 
// 用一个对象就包含了全部的应用层级状态


export default {
    number: 2018,
    con: 6666,
    city: 'wuhan',
    obj: {
        username: "zuozuomu",
        age: 28,
    },
    foots: [{
            txt: '首页',
            path: "/app/wechat",
            name: 'wechat',
            icon: "icon-zhuye"
        },
        {
            txt: '书影音',
            path: "/app/contact",
            name: 'contact',
            icon: "icon-shoucangshuji"
        },
        // {
        //     txt: '小组',
        //     path: "/app/find",
        //     name: 'find',
        //     icon: "icon-gongzuoxiaozuim"
        // },
        {
            txt: '我',
            path: "/app/my",
            name: 'my',
            icon: "icon-icon-"
        },
    ],
    mvs: [],
    searchnews: [{
            title: "无双"
        },
        {
            title: "Oasis"
        },
        {
            title: "ColdPlay"
        },
        {
            title: "神奇动物在哪里"
        },
        {
            title: "Green Day"
        }
    ],
    muscibanner: [{
            src: "../../assets/imgs/music-banner0.jpg"
        },
        {
            src: "../../assets/imgs/music-banner1.jpg"
        },
        {
            src: "../../assets/imgs/music-banner2.jpg"
        },
        {
            src: "../../assets/imgs/music-banner4.jpg"
        },
        {
            src: "../../assets/imgs/music-banner6.jpg"
        },
    ],
    mus: [],
    musicInfo: '',
    movieInfo: '',
    homes: [{
        imgNew: "../../assets/imgs/home1.jpg",
        title: "欢迎加入中国年轻音乐人"
    }, {
        imgNew: "../../assets/imgs/home2.jpg",
        title: "你能踏出去么"
    }, {
        imgNew: "../../assets/imgs/home3.jpg",
        title: "生而为人，我很抱歉"
    }],
    searchM: ''

}