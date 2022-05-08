<template>
	<div>
	 <el-table
		:data="tableData"
	    height="100%"
	    class="table-container"
		>
	    <el-table-column
		  fixed
		  prop="id" 
		  label="ID" 
		  width="50">
		  <template slot-scope="scope">
		    {{ scope.row.id }}
		  </template>
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="设备名称"
	      width="150">
			<template slot-scope="scope">
			  {{ scope.row.name }}
			</template>
	    </el-table-column>
		<el-table-column
		  prop="model"
		  label="设备型号"
		  width="100">
		  <template slot-scope="scope">
		    {{ scope.row.model }}
		  </template>
		</el-table-column>
		<el-table-column
		  prop="purpose"
		  label="设备用途"
		  width="100">
		  <template slot-scope="scope">
		    {{ scope.row.purpose }}
		  </template>
		</el-table-column>
	    <el-table-column
	      prop="weight"
	      label="重量"
		  width="80">
		  <template slot-scope="scope">
		    {{ scope.row.weight }}
		  </template>
	    </el-table-column>
		<el-table-column
		  prop="count"
		  label="数量"
		  width="80">
		  <template slot-scope="scope">
		    {{ scope.row.count }}
		  </template>
		</el-table-column>
		<el-table-column
		  label="状态"
		  width="80"
		  align="center">
			<template slot-scope="scope">
				<el-tooltip :content="'运行状态: ' + value" placement="top">
				  <el-switch
				    v-model="value"
				    active-color="#13ce66"
				    inactive-color="#ff4949"
				    active-value="开启"
				    inactive-value="关闭">
				  </el-switch>
				</el-tooltip>
			</template>
		</el-table-column>
		<el-table-column
		  label="操作"
		  align="center"
		>
		  <template slot-scope="scope">
		    <el-button-group>
			  <el-button
				 type="primary"
				 icon="el-icon-edit"
				 size="mini"
				 @click="edit(scope.row.id)"
				  >
			    修改
			  </el-button>
		      <el-button
			    :plain="true"
		        type="danger"
		        icon="el-icon-delete"
		        size="mini"
		        @click="del(scope)"
		      >
		        删除
		      </el-button>
		    </el-button-group>
		  </template>
		</el-table-column>
	  </el-table>
	  
			<el-dialog
			  :visible.sync="dialogVisible"
			  :title="dialogType === 'modify' ? '修改' : '新增'"
			>
			  <el-form
			    ref="dataForm"
			    :model="temp"
			    label-width="120px"
			    label-position="right"
			  >
				<el-form-item label="ID">
				  <el-input v-model="temp.id" placeholder="请输入id" />
				</el-form-item>
			    <el-form-item label="设备名称">
			      <el-input v-model="temp.name" placeholder="请输入设备名" />
			    </el-form-item>
			    <el-form-item label="设备型号">
			      <el-input v-model="temp.model" placeholder="请输入设备型号" />
			    </el-form-item>
				<el-form-item label="设备用途">
				  <el-input type="text" v-model="temp.purpose" placeholder="请输入设备用途" />
				</el-form-item>
			    <el-form-item label="设备重量">
					<el-input v-model="temp.weight" placeholder="请输入设备重量" />
				</el-form-item>
			    <el-form-item label="设备数量">
			      	<el-input v-model="temp.count" placeholder="请输入设备数量" />
			    </el-form-item>
			  </el-form>
			  <div class="text-right">
			    <el-button type="danger" @click="dialogVisible = false">
			      取消
			    </el-button>
			    <el-button type="primary" @click="submit">
			      确定
			    </el-button>
			  </div>
			</el-dialog>
	  </div>
</template>

<script>
const _temp = {
  id: '',
  name: '',
  model: '',
  purpose:'',
  weight:'',
  count:'',
  // status: 1
}
	export default{
		name:'devInfo',
		data(){
			return {
					// list:[],
					total:0,
					value:'',
			        tableData: [{
					  id:'1',
			          name: '王小虎',
					  model: '201D0-1',
					  purpose: '清洗',
			          weight: '2kg',
					  count:'2'
			        }],
					temp: Object.assign({}, _temp),
					dialogVisible: false,
					dialogType: 'create',
					loading: false,
			      }
			    }, 
						methods: {
							resetTemp() {
							  this.temp = Object.assign({}, _temp)
							},
							  edit(id) {
							  this.resetTemp()
							  this.dialogVisible = true
							  this.dialogType = 'modify'
							  this.temp = deepClone(scope.row)
							  this.$nextTick(() => {
							    this.$refs['dataForm'].clearValidate()
							  })
							},
						      del(scope) {
						        this.$confirm('确认删除该条数据吗？', '提示', {
						          confirmButtonText: '确定',
						          cancelButtonText: '取消',
						          type: 'warning'
						        }).then(() => {
						          setTimeout(() => {
						            this.list.splice(scope.$index, 1)
						            this.$message({
									  // showClose:true,
						              message: '删除成功',
						              type: 'success'
						            })
						          }, 300)
						        }).catch(() => {
									this.$message({type: 'info',message: '已取消删除' }); 
								});
						      },
						      submit() {
						        if (this.loading) {
						          return
						        }
						        this.loading = true
						        setTimeout(() => {
						          this.$message({
						            message: '提交成功',
						            type: 'success'
						          })
						          this.dialogVisible = false
						          this.loading = false
						        }, 300)
						      }
						    }
		}
	
</script>

<style>
</style>
