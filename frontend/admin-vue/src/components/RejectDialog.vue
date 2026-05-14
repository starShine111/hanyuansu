<template>
  <el-dialog
    v-model="props.dialogVisible"
    :title="title"
    width="600"
    :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="拒绝原因" prop="reason">
        <el-select
          v-if="options.length>0"
          v-model="form.reason"
          placeholder="请选择拒绝原因"
          clearable
          style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
        <el-input
          v-else
          v-model="form.reason"
          type="textarea"
          :rows="4"
          placeholder="请填写拒绝理由"/>
      </el-form-item>
      <el-form-item label="详细说明" prop="detail" v-if="showDetail">
        <el-input
          v-model="form.detail"
          type="textarea"
          :rows="3"
          placeholder="详细说明（选填）"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="danger" @click="submit" :loading="submitting">确认拒绝</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";

const props=defineProps({
  dialogVisible:{
    type:Boolean,
    default:false
  },
  title:{
    type:String,
    default:'拒绝审核'
  },
  options:{
    type:Array,
    default:()=>[]
  },
  showDetail:{
    type:Boolean,
    default:false
  }
})
const submitting=ref(false);
const formRef=ref(null);

const form=reactive({
  reason:'',
  detail:''
})
const rules={
  reason:[
    {required:true,message:'请填写拒绝理由',trigger:'blur'}
  ]
}
const emit=defineEmits(['update:dialogVisible','confirm'])
const handleClose=()=>{
  emit('update:dialogVisible',false)
  clearData()
}
const submit=async ()=>{
//  调用表单验证
  try{
    await formRef.value.validate()
    submitting.value=true;

  //  组合完整原因
    let fullReason=form.reason;
    if(form.detail){
      fullReason+=`:${form.detail}`
    }
  //  把拒绝原因传给父组件
    emit('confirm',fullReason)
    handleClose();
  }catch{
    ElMessage.error("验证失败")
  }finally {
    submitting.value=false;
  }
}
const clearData=()=>{
  //  重置表单
  form.reason=''
  form.detail=''
  formRef.value?.clearValidate()
}
</script>

<style scoped>

</style>