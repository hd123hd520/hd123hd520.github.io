<template>
    <footer>
        <div v-for="(foot,i) in foots" :key="i">
            <router-link :to="{name:foot.name}">
                <i class="iconfont" v-bind:class="foot.icon"></i>
                <span>{{foot.txt}}</span>
            </router-link>
        </div>
    </footer>
</template>

<script>

import {mapState} from "vuex";
export default {
    data(){
        return{
            
        }
	},
	computed:{
		...mapState(['foots'])
		}
	
}
</script>

<style lang="scss" scoped>
footer{
	position:fixed;
	width:100%;
	height:90px;
	left:0;
	bottom:0;
	background:#fff;
	display:flex;
    z-index:100;
    border-top:1px solid black;
	div{
		flex:1;
		height:90px;
		a{
			display: block;
			width:100%;
			height:100%;
			display:flex;
			flex-direction:column;
			box-sizing:border-box;
			padding:6px 0;
			text-align:center;
			font-family:"微软雅黑";
			color:#999;
			i{
			width:100%;
			height:45px;
			line-height:45px;
			font-size:42px !important;
			}
			span{
				width:100%;
				height:35px;
				line-height:35px;
				font-size:26px;
			}
		}
		.router-link-exact-active{
			color:#0dc441;
		    border-color:#0dc441;
		}

	}
}
</style>


