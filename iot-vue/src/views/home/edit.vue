<template>
	<div>
		<!-- <p v-show="showmsg">{{msg}}</p> -->
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
	label-width="100px" class="demo-ruleForm">
	  <el-form-item label="手机号" prop="telephone">
	    <el-input type="text" v-model="ruleForm.telephone"></el-input>
	  </el-form-item>
	  <el-form-item label="密码" prop="password">
	    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
	  </el-form-item>
	  <el-form-item label="确认密码" prop="checkPass">
	    <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button :plain="true" type="primary" @click="submitForm('ruleForm')">提交</el-button>
	    <el-button @click="resetForm('ruleForm')">重置</el-button>
	  </el-form-item>
	</el-form>
	</div>
</template>

<script>
	export default {
	    data() {
	      var checkTel = (rule, value, callback) => {
	        if (!value) {
	          return callback(new Error('手机号不能为空'))
	        }
			const tel = /^1[3456789]\d{9}$/;
	          if (!tel.test(value)) {
	            callback(new Error('请输入有效的手机号码'))
	        } else {
	            callback()
	        }
	      };
	      var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else {
	          if (this.ruleForm.checkPassword !== '') {
	            this.$refs.ruleForm.validateField('checkPassword');
	          }
	          callback();
	        }
	      };
	      var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.ruleForm.password) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	      };
	      return {
			  // msg:'',
			  // showmsg:false,
			  token:'',
			  admin_user:'',
	        ruleForm: {
	          password: '',
	          checkPassword: '',
	          telephone: '',
	        },
	        rules: {
	          telephone: [
	            { validator: checkTel, trigger: 'blur' }
	          ],
			  password: [
	            { validator: validatePass, trigger: 'blur' }
	          ],
	          checkPassword: [
	            { validator: validatePass2, trigger: 'blur' }
	          ]
	        }
	      };
	    },
	    methods: {
	      submitForm(formName) {
			  let data = {	'telephone':this.ruleForm.telephone,
							'password':this.ruleForm.password,
							'admin_user':localStorage.getItem('username'),
							'token':localStorage.getItem('token')}
			 // const id = this.$route.params.id
			 this.$http.put('http://192.168.3.26:9990/update/user/'+this.$route.params.id,data)
			 .then((resp)=>{
				 console.log(resp)
				 if(resp.body.code == 4001){
					 // this.msg = '不能为空,check it!'
					 // this.showmsg = true
					 this.$message({
					           showClose: true,
					           message: '不能为空,check it!'
					         });
				 }
				 else if(resp.body.code == 4004){
					 // this.msg = "抱歉，您不是管理员，无法进行修改!"
					 // this.showmsg = true
					 this.$message({
					           showClose: true,
					           message: '抱歉，您不是管理员，无法进行修改!',
					           type: 'warning'
					         });
				 }else if(resp.body.code == 4006){
					 // this.msg = '手机号已被注册!!!'
					 // this.showmsg = true
					 this.$message({
					           showClose: true,
					           message: '手机号已被注册,请重新输入!',
					           type: 'warning'
					         });
				 }else{
					 // this.msg = '修改成功!!!'
					 // this.showmsg = true
					 this.$message({
					           showClose: true,
					           message: '修改成功!',
					           type: 'success'
					         });
					 setTimeout(function(){
					 	this.$router.push('/users')
					 }.bind(this),1000)
				 }
			 })
	        //  this.$refs[formName].validate((valid) => {
	        //   if (valid) {
	        //     alert('submit!');
	        //   } else {
	        //     console.log('error submit!!');
	        //     return false;
	        //   }
	        // });

	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
	    }
	  }
</script>

<style>

</style>

<!-- <template>
	<div>
		{{this.$route.params.id}}
	</div>
</template>


<script>
	export default {
		name:'edit'
		data(){
			return{
				token:'',
				username:'',
				telephone:'',
				password:''
			}
		},
		methods:{
			er(){
				var token = localStorage.getItem('token')
				let data = {'username':this.username,
				'telephone':this.telephone,
				'token':this.token,
				'password':this.password}

			}
		}
	  }
</script>
<style>

</style>

<!-- <template>
	<div>
		{{this.$route.params.id}}
	</div>
</template>
<script>

</script>
<style> -->

