import Vue from 'vue'
import vuex from 'vuex'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/views/login/login.vue'
import Register from '@/views/register/register.vue'
import Main from '@/views/main/main.vue'
import Home from '@/views/home/home.vue'
import users from '@/views/home/users.vue'
import edit from '@/views/home/edit.vue'
// import { component } from 'vue/types/umd'
import devM from '@/views/home/devM.vue'
import devInfo from '@/views/home/devInfo.vue'

Vue.use(VueRouter)
//创建路由实例对象
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
	{
	  path:'/logout',
	  redirect:'/'
	},
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/home/',
      name: 'Home',
      component: Home,
	  children:[
		  {
		    path:'/users',
		    name:'users',
		    component:users
		   },
		   {
		   path:'/edit/:id',
		   name:'edit',
		   component:edit
		   },
		   {
		   path:'/devM',
		   name:'devM',
		   component:devM
		   },
		   {
			path:'/devInfo',
			name:'devInfo',
			component:devInfo
		   }
	   ]
	 }
	]
  })
  
//只要发生了路由跳转，必然会触发指定的回调函数
router.beforeEach(function(to,from,next){
	 if(to.path === '/home' || to.path === '/users' || to.path === '/edit' ||
	 to.path === '/devInfo' || to.path === '/devM'){
		const token = localStorage.getItem('token')
		const username = localStorage.getItem('username')
		if(token || username){
			next()
	   }else{
			next('/')
	  }
	 }
	 else{
	 		next()
	 }
	 if(to.path === '/'){
		 localStorage.removeItem('token')
		 localStorage.removeItem('username')
	 }
})

export default router
