export default {
    mvHalf(state){
       return  state.mvs.filter((item,index)=>index%2==0)  ;
    }
}