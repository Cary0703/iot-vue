<template>
	<div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="ID" prop="id">
    <el-input v-model="ruleForm.id"></el-input>
  </el-form-item>
  <el-form-item label="设备名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
  <el-form-item label="设备型号" prop="model">
    <el-input v-model="ruleForm.model"></el-input>
  </el-form-item>
  <el-form-item label="设备用途" prop="purpose">
    <el-input v-model="ruleForm.purpose"></el-input>
  </el-form-item>
  <el-form-item label="设备重量" prop="weight">
    <el-input v-model="ruleForm.weight"></el-input>
  </el-form-item>
  <el-form-item label="设备数量" prop="count">
    <el-input v-model="ruleForm.count"></el-input>
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
          id: '',
          name: '',
          model: '',
          purpose:'',
          weight:'',
          count:''
        },
        rules: {
			id: [
				{required: true, message: '请输入ID', trigger: 'blur'}
			],
          name: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          model: [
            { required: true, message: '请输入设备型号', trigger: 'blur' }
          ],
          purpose: [
            { type: 'text', required: true, message: '请输入设备用途', trigger: 'blur' }
          ],
          weight: [
            { required: true, message: '请输入设备重量', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '请输入设备数量', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
