<template>
	<div>
		<vue-particles
		                 class="login-background"
		                 color="#97D0F2"
		                 :particleOpacity="0.7"
		                 :particlesNumber="50"
		                 shapeType="circle"
		                 :particleSize="4"
		                 linesColor="#97D0F2"
		                 :linesWidth="1"
		                 :lineLinked="true"
		                 :lineOpacity="0.4"
		                 :linesDistance="150"
		                 :moveSpeed="3"
		                 :hoverEffect="true"
		                 hoverMode="grab"
		                 :clickEffect="true"
		                 clickMode="push">
		</vue-particles>
			<div class="login-wrap" v-show="showLogin">
			<el-form class="loginContainer">
				<H3 class="loginTitle">物联网设备接入管理平台</H3>
				<!-- <p v-show="showmsg">{{msg}}</p> -->
				<el-form-item prop="username">
				<el-input prefix-icon="el-icon-user-solid" size="normal" type="text" v-model="username"
				    auto-complete="off"
					placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
				<el-input prefix-icon="el-icon-lock" size="normal" type="password" v-model="password"
				    auto-complete="off"
				    placeholder="请输入密码"
            @keyup.enter="login()" />
				</el-form-item>
				<el-button size="normal" type="primary" style="width: 100%;" @click="login()">登录</el-button>
				<span v-on:click="ToRegister">没有账号？马上注册</span>
			</el-form>
			</div>

			<div class="register-wrap" v-show="showRegister">
			<el-form class="loginContainer">
				<H3 class="loginTitle">物联网设备接入管理平台</H3>
				<!-- <p v-show="showmsg">{{msg}}</p> -->
				<el-form-item prop="newUsername">
				<el-input prefix-icon="el-icon-user-solid" size="normal" type="text" v-model="newUsername"
				    auto-complete="off"
					placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="newPassword">
				<el-input prefix-icon="el-icon-lock" size="normal" type="password" v-model="newPassword"
				    auto-complete="off"
				    placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="newRole">
				<el-input prefix-icon="el-icon-s-check" size="normal" type="text" v-model="newRole"
				    auto-complete="off"
					placeholder="请输入角色号(默认填为1)"></el-input>
				</el-form-item>
				<el-form-item prop="newTelephone">
				<el-input prefix-icon="el-icon-mobile-phone" size="normal" type="text" v-model="newTelephone"
				    auto-complete="off"
					@keyup.enter="register"
					placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-button size="normal" type="primary" style="width: 100%;" @click="register">注册</el-button>
				<span v-on:click="ToLogin">已有账号？马上登录</span>
			</el-form>
			</div>
	</div>
</template>

<style>
	.login-wrap{text-align:center; z-index: 1;
        margin: 180px 0 0 calc(calc(100vw - 410px) / 2);
        position: absolute;}
	.register-wrap{text-align:center; z-index: 1;
        margin: 180px 0 0 calc(calc(100vw - 410px) / 2);
        position: absolute;}
	input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
	p{color:red;}
	button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#55557f; color:#fff; font-size:16px; margin-bottom:5px;}
	span{cursor:pointer;}
	span:hover{color:#55557f;}
	.loginContainer {
	        border-radius: 15px;
	        background-clip: padding-box;
	        width: 350px;
	        padding: 15px 35px 15px 35px;
	        background: #fefefe;
	        border: 1px solid #eaeaea;
	        box-shadow: 0 0 25px #cac6c6;
	    }
	.login-background {
	         background: linear-gradient(-180deg, #000024 0%, #ffffff 100%);
	         width: 100%;
	         height: 100%; /**宽高100%是为了图片铺满屏幕 */
	         z-index: -1;
	         position: absolute;
	    }
	.loginTitle {
	        margin: 15px auto 20px auto;
	        text-align: center;
	        color: #707070;
	    }
</style>

<script>
// import { setCookie,getCookie } from '../../assets/js/cookie.js'
	export default{
		data(){
			return{
				username: '',
				password: '',
				role:'',
				telephone:'',
				token:'',
				newUsername: '',
				newPassword: '',
				newRole:'1',
				newTelephone:'',
				// msg: '',
				// showmsg: false,
				showLogin: true,
				showRegister: false,
			}
		},
		methods: {
			login(){
				if(this.username == "" || this.password == ""){
					// alert("请输入用户名或密码")
					this.$message('用户名和密码不能为空!');
				}else{
					let data = {'username':this.username,'password':this.password}
					this.$http.post('http://192.168.3.26:9990/login',data).then((res)=>{
						console.log(res)
						if(res.body.code == 1003){
							// this.msg = "该用户不存在"
							// this.showmsg = true
							this.$message({
							          showClose: true,
							          message: '用户名不存在哦!',
							          type: 'error'
							        });
						}else if(res.body.code == 1002){
							// this.msg = "密码输入错误"
							// this.showmsg = true
							this.$message({
							          showClose: true,
							          message: '密码输入错误哦!',
							          type: 'error'
							        });
						}
						// else if(res.body.login_info.role == 0){
						// 	// this.msg = "欢迎管理员"
						// 	// this.showmsg = true
						// 	this.$router.push('/main')}
						else{
							// this.msg = "登录成功"
							// this.showmsg = true
							this.$message({
							          showClose: true,
							          message: '恭喜你，登录成功!',
							          type: 'success'
							        });
							var token = res.body.login_info.token
							var username = res.body.login_info.username
							window.localStorage["token"] = token
							// localStorage.setItem("token",this.token)
							localStorage.setItem("username",this.username)
							// window.localStorage["username"]=username
							setTimeout(function(){
								this.$router.push('/home')
							}.bind(this),1000)
						}
					})
				}
			},
			ToRegister(){
				this.showRegister = true
				this.showLogin = false
			},
			ToLogin(){
				this.showRegister = false
				this.showLogin = true
			},
			register(){
				if(this.newUsername == "" || this.newPassword == "" || this.newRole == "" || this.newTelephone == ""){
					// alert("请检查!")}
					this.$message({
					          showClose: true,
					          message: '信息不能为空!!!'
					        });
						}
				else{
					let data = {
					'username':this.newUsername,
					'password':this.newPassword,
					'role':this.newRole,
					'telephone':this.newTelephone
					}
					this.$http.post('http://192.168.3.26:9990/register',data).then((res)=>{
						console.log(res);
					if(res.body.code == 2002){
						// this.msg = "用户名已存在,注册失败!!!"
						// this.showmsg = true
						this.$message({
						          showClose: true,
						          message: '用户名已存在,注册失败!!!',
						          type: 'error'
						        });
					}else if(res.body.code == 2004){
						// this.msg = "手机号格式不正确!!!"
						// this.showmsg = true
						this.$message({
						          showClose: true,
						          message: '手机号格式不正确!!!',
						          type: 'error'
						        });
					}else if(res.body.code == 2005){
						// this.msg = "手机号已被注册!!!"
						// this.showmsg = true
						this.$message({
						          showClose: true,
						          message: '手机号已被注册!!!',
						          type: 'error'
						        });
					}else{
							// this.msg = "注册成功"
							// this.showmsg = true
							this.$message({
							          showClose: true,
							          message: '恭喜你，注册成功!',
							          type: 'success'
							        });
							setTimeout(function(){
								this.showRegister = false
								this.showLogin = true
								// this.showmsg = false
								 this.$router.push("/")
							}.bind(this),1000)
						}
					}).catch((res)=>{
						console.log(err);
					})
				}
			}
		}
	}
</script>
