<template>
	<div>
	   <el-container style="height: 700px; border: 1px solid #ffffff">
	     <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
	       <el-menu
	             default-active="2"
	             class="el-menu-vertical-demo"
				 @open="handleOpen"
			     @close="handleClose"
	             background-color="#545c64"
	             text-color="#fff"
	             active-text-color="#ffd04b">
	             <el-submenu index="1">
	               <template slot="title">
	                 <i class= "el-icon-menu"></i>
	                 <span>信息及设备管理</span>
	               </template>
	               <el-menu-item-group>
	                 <el-menu-item index="1-1" @click="Usermsg">
						 <i class="el-icon-s-check"></i>
						 用户信息
						 </el-menu-item>
	               </el-menu-item-group>				   
	             </el-submenu>
				 <el-menu-item index="2" @click="devManagement()">
				         <i class="el-icon-s-tools"></i>
				         <span slot="title">设备管理</span>
				       </el-menu-item>
				       <!-- <el-menu-item index="3" disabled>
				         <i class="el-icon-document"></i>
				         <span slot="title">导航三</span>
				       </el-menu-item> -->
				       <el-menu-item index="3" @click="devInformation()">
				         <i class="el-icon-s-data"></i>
				         <span slot="title">设备信息</span>
				       </el-menu-item>
	           </el-menu>
		  </el-aside>
		<el-container>
		  <el-header style="text-align: right; font-size: 25px;">
		        <el-dropdown>
		          <i class="el-icon-s-unfold" style="margin-right: 30px; font-size: 26px; 
				  color: #fff;"></i>
		          <el-dropdown-menu slot="dropdown" >
		            <el-dropdown-item>
						<router-link to="/logout" style="color: #8b0000 ">退出</router-link>  			
					</el-dropdown-item>
		          </el-dropdown-menu>
		        </el-dropdown>	
		  </el-header>
		  <el-main>
			  <router-view></router-view>
		  </el-main>
		</el-container>
	   </el-container>
	</div>
</template>

<script>
// import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
	export default{
		name:'home',
		methods:{
			handleOpen(key, keyPath) {
			        console.log(key, keyPath);
			      },
			      handleClose(key, keyPath) {
			        console.log(key, keyPath);
			      },
			// Logout(){
			// 	this.$router.push('/logout')
			// },
			Usermsg(){
				this.$router.push('/users')
			},
			devManagement(){
				this.$router.push('/devM')
			},
			devInformation(){
				this.$router.push('/devInfo')
			}
		}
	}
		
</script>

<style>
  .el-header {
    background-color: #545c64;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
