<template>
	<div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="设备名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="UID" prop="uid">
      <el-input v-model="ruleForm.uid"></el-input>
    </el-form-item>
    <el-form-item label="Key" prop="key">
    <el-input v-model="ruleForm.key"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name:'devM',
	data() {
      return {
        ruleForm: {
          uid: '',
          name: '',
          key: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          uid: [
          	{required: true, message: '请输入UID', trigger: 'blur'}
          ],
          key: [
            { required: true, message: '请输入key', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
          let data = {
            'name':this.ruleForm.name,
            'uid':this.ruleForm.uid,
            'key':this.ruleForm.key
          }
          this.$http.post('http://192.168.3.26:9990/adddevice', data).then((res) => {
            console.log(res);
            if(res.body.code == 2001){
              this.$message({
                showClose: true,
                message: '信息不能为空!!!'
                });
            }
            else if(res.body.code == 2002){
              this.$message({
                showClose: true,
                message: '添加失败,设备已存在!',
                type: 'error'
                });
            }else{
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
            }
          }).catch((res)=>{
						console.log(err);
					})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
