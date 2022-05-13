<template>
	<div>
		<h3>所有注册用户</h3>
		<ul>
			<li v-for="item in list">
				{{list}}
			</li>
		</ul>
	</div>
</template>

<style>
	ul{padding: 0;}
	ul li{list-style: none;}
</style>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		mounted(){
			// let list = {"username":'',"role":'',"telephone":''}
			this.$http.get('http://114.116.2.171:9990/users').then((res)=>{
				this.list = res.body.data
				console.log(res)
			})
		}
	}
</script>
