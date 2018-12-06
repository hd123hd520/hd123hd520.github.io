// ACTIONS 


// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。  进行ajax 请求  
// context == store store 实例具有相同方法和属性的 context 对象  context.commit store.commit

// Action 通过 store.dispatch 方法触发：
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);
const baseUrl = 'http://106.14.201.102:3300/vue'; // 方便上线  方便修改域名 
import axios from "axios";
// axios.defaults.baseURL = "http://47.94.208.182:3000";


// this.$http 

export default {
    increment (context) { //  increment   actionType  
        // console.log("action-increment");
        // context = {commit:commit }  
        context.commit('increment'); //   increment mutationType 
    },
    decrement ({
        commit
    }) {
        // console.log("desc")
        commit("decrement");
    },
    getObj ({
        commit
    }, {
        url,
        title
    }) {
        // console.log(url);
        Vue.http.get(baseUrl + url, {
            params: {
                id: 6666,
                title
            }
        }).then(res => {
            // console.log(res);
            commit("getObj", res.body);
        })
    },
    getObjByAxios ({
        commit
    }, {
        url
    }) {
        // console.log(url);
        axios.get(url, {
            params: {
                id: 1234
            }
        }).then(res => {
            commit("getObjByAxios", res.data);
        })
    },
    getmv ({
        commit
    }, {
        url,
        limit,
        callback

    }) {
        // console.log(url);
        axios.get(baseUrl + url, {
            params: {
                limit
            }
        }).then(res => {
            // console.log(res.data)
            commit("getmv", res.data);
            callback()
        })
    },
    getmus ({
        commit
    }, {
        url,
        limit,
        callback
    }) {
        axios.get(baseUrl + url, {
            params: {
                limit
            }
        }).then(res => {
            commit("getmus", res.data);
            callback()
        })
    },
    getminfo ({
        commit
    }, {
        url,
        id
    }) {
        axios.get(baseUrl + url, {
            params: {
                id
            }
        }).then(res => {
            // console.log(res)
            commit("getminfo", res.data)
        })
    },
    getmovieInfo ({
        commit
    }, {
        url,
        id
    }) {
        axios.get(baseUrl + url, {
            params: {
                id
            }
        }).then(res => {
            // console.log(res)
            commit("getmovieInfo", res.data)
        })
    },
    search ({
        commit
    }, {
        url,
        name,
        callback
    }) {
        axios.get(baseUrl + url, {
            params: {
                name
            }
        }).then(res => {
            // console.log(res)
            // commit("search", res.data)
            callback(res.data)
        })
    }
}