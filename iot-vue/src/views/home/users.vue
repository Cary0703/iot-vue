<template>
	<div>
		<!-- <p v-show="showmsg">{{msg}}</p> -->
		<el-table :data="user" style="width: 100%">
		        <el-table-column prop="id" label="ID" width="50" align="center">
					<template slot-scope="scope">
					  {{ scope.row.id }}
					</template>
		        </el-table-column>
		        <el-table-column prop="username" label="姓名" width="120" align="center">
					<template slot-scope="scope">
					  {{ scope.row.username }}
					</template>
		        </el-table-column>
		        <el-table-column prop="role" label="角色号" width="90" align="center">
					<template slot-scope="scope">
					  {{ scope.row.role }}
					</template>
				</el-table-column>
				<el-table-column prop="telephone" label="手机号" width="110" align="center">
					<template slot-scope="scope">
					  {{ scope.row.telephone }}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
				<template slot-scope="scope">
				<el-button-group>
				    <el-button
					  :plain="true"
				      type="primary"
				      icon="el-icon-edit"
				      size="mini"
				      @click="Edit(scope.row.id)"
				    >修改
				    </el-button>
				    <el-button
					  :plain="true"
				      type="danger"
				      icon="el-icon-delete"
				      size="mini"
				      @click="Delete(scope.row.username)"
				    >
				      删除
				    </el-button>
				  </el-button-group>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import message from 'element-ui'
	export default{
		name:'users',
		data(){
			return{
				user:[],
				admin_user:'',
				token:'',
				// msg : '',
				// showmsg : false
			}
		},
		mounted(){
			this.$http.get('http://192.168.3.26:9999/users').then((res)=>{
				this.user = res.body.data
				console.log(res)
				})
		},
		methods: {
			Edit(id) {
				this.$router.push('/edit/' + id)
		},
			Delete(username) {
				// this.$router.push('/Delete/' + username)
				let data = {'admin_user':localStorage.getItem('username'),
							  'token':localStorage.getItem('token')}
			    // 弹框询问用户是否删除数据
			    this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
			      }).then(async() => {
					this.$http.post('http://192.168.3.26:9999/delete/user/'+username,data).then((res)=>
					  {	  console.log(res)
						  if(res.body.code == 3004){
						  	// return this.$message.Error('当前用户非管理员，无法操作!');
							// this.msg = '当前用户非管理员，无法操作!'
							// this.showmsg = true
							this.$message({
							          showClose: true,
							          message: '当前用户非管理员，无法操作!',
							          type: 'warning'
							        });
						  }else if(res.body.code == 3006){
						  	// return this.$message.Error('不可删除此用户');
							// this.msg = '不可删除此用户'
							// this.showmsg = true
							this.$message({
							          showClose: true,
							          message: '不可删除此用户!',
							          type: 'warning'
							        });
						  }else{
						  	// this.$message.success('删除成功!!!');
							// this.msg = '删除成功!!!'
							// this.showmsg = true
							this.$message({
							          showClose: true,
							          message: '删除成功!!',
							          type: 'success'
							        });
						  }
						// this.$message({type: 'success',message: '删除成功!'});
						this.getUsersList();
					  })         
			      }).catch(() => {
			        this.$message({type: 'info',message: '已取消删除' }); 
			  });
		  
		 }	
	   }
	}
</script>

<style>
</style>
