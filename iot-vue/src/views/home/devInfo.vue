<template>
  <div>
   <el-table :data="devInfo" style="width: 100%">
        <el-table-column label="ID" width="50" align="center">
        <template #default="scope">
          {{ scope.row.id }}
        </template>
        </el-table-column>
           <el-table-column label="UID" width="90" align="center">
   			<template #default="scope">
   			  {{ scope.row.uid }}
   			</template>
           </el-table-column>
           <el-table-column label="设备名" width="150" align="center">
   			<template #default="scope">
   			  {{ scope.row.name }}
   			</template>
           </el-table-column>
           <el-table-column label="Key" width="210" align="center">
   			<template #default="scope">
   			  {{ scope.row.key }}
   			</template>
   		</el-table-column>
   		<el-table-column label="设备信息" width="210" align="center">
   			<template #default="scope">
   			  {{ scope.row.msg }}
   			</template>
   		</el-table-column>
   		<el-table-column label="操作行为" align="center" width="100">
   		<template #default="scope">
          {{ scope.row.action }}
   		</template>
   	</el-table-column>
     <el-table-column label="Operation" align="center">
       <template #default="scope">
         <el-button
         type="text"
         @click.prevent="open(scope.row)"
         >
         执行
         </el-button>
       </template>
     </el-table-column>
   </el-table>
  </div>
</template>

<script>
import message from 'element-ui'
  export default {
    name:'devInfo',
    data(){
      return {
        devInfo:[{
          // id:'',
          // uid:'',
          // key:'',
          // name:'',
          // msg:'',
          // status:''
        }]
      }
    },
    mounted(){
      var vm = this;
      this.$http.get('http://114.116.2.171:9990/devices').then((res)=>{
      	vm.devInfo = res.body.data
      	console.log(res)
      	})
    },
     methods: {
          open(row) {
            // console.log(id)
            // const h = this.$createElement;
            this.$msgbox({
              title: '提示',
              message: '是否执行操作?',
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm'){
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = '执行中...';
                  setTimeout(() => {
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 3000);
                } else {
                  done();
                }
               }
             }).then(async() => {
               let data = {'uid':row.uid, 'key':row.key, 'action':row.action, 'status':row.status}
               this.$http.post('http://114.116.2.171:9990/update_action', data).then((res) => {
                 console.log(res)
                 if(res.data.code == 2001){
                   this.$message({
                             showClose: true,
                             message: '设备uid或key不能为空!',
                             type:'error'
                           });
                 }
                 else if(res.data.code == 2002){
                   this.$message({
                             showClose: true,
                             message: '设备不存在,请检查uid或key',
                             type:'error'
                           });
                 }else if(res.data.code == 2003){
                   this.$message({
                             showClose: true,
                             message: '该操作已不存在,请重新获取可操作指令!',
                             type:'error'
                           });
                 }else if(res.data.code == 2004){
                   this.$message({
                             showClose: true,
                             message: '该操作已经记录,无需重复操作!',
                             type:'warning'
                           });
                 }else{
                   this.$message({
                             showClose: true,
                             message: '该操作记录成功,等待设备接入更新!',
                             type:'success'
                           });
                 }
                 // console.log(row.id)
               })
             }).catch(() => {
               this.$message({type: 'info',message: '已取消执行' });
             })
          }
        }
  }
</script>
<style>

</style>
