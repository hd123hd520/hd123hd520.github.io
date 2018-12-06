// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation 

// 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)

// 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数

// Mutation 必须是同步函数  mapMutations 
export default {
    increment (state) { // mutationType
        // console.log(state);
        state.number += 10;
    },
    getObj (state, data) {
        // state.word = data;
        state.obj = {
            ...state.obj,
            ...{
                word: data
            }
        } // 返回新数组 新对象 
    },
    getObjByAxios (state, word) {
        state.obj = {
            ...state.obj,
            ...{
                word
            }
        }
    },
    getmv (state, mvs) {
        state.mvs = mvs;
    },
    getmus (state, mus) {
        state.mus = mus
        // console.log(mus)
    },
    getminfo (state, musicInfo) {
        state.musicInfo = musicInfo
        // console.log(typeof musicInfo)
    },
    getmovieInfo (state, movieInfo) {
        state.movieInfo = movieInfo
        // console.log(movieInfo)

    },
    search (state, searchM) {
        state.searchM = searchM
        // console.log(searchM)
    }

}