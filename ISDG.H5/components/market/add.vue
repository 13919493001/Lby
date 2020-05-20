<template>
  <div class="add">
    <!-- 新增地址 -->
    <el-form :model="form" :rules="rules" label-position="top">
      <el-form-item label="真实姓名" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入收货人的真实姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="id">
        <el-input
          v-model="form.id"
          placeholder="请输入收货人身份证号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="请输入收货人手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item :label="region" prop="name">
      <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange"
      class="cascader"
      placeholder="请选择地址省-市-区/县"
      >
    </el-cascader>
    </el-form-item>
      <el-form-item label="详细地址" prop="add">
        <el-input
          v-model="form.add"
          placeholder="请输入街道、门牌号等详细地址"
        ></el-input>
      </el-form-item>
      <!-- <div class="checkbox">
        <div class="checkbox_inner">
          <i class="el-icon-check"></i>
        </div>
        <div class="checkbox_text">保存该地址至地址簿</div>
      </div> -->
      <el-button type="primary" @click="changeShow">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import api from "@/plugins/api/api";
export default {
  props:{
    id:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      form: {},
      rules: {
        name: [
          { required: true, message: "请输入收货人的真实姓名", trigger: "blur" }
        ],
        id: [
          { required: true, message: "请输入收货人身份证号码", trigger: "blur" }
        ],
        add: [
          {
            required: true,
            message: "请输入街道、门牌号等详细地址",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入收货人手机号码",
            trigger: "blur"
          }
        ]
      },
      options: regionData,
      selectedOptions: [],
      economize:"",
      town:"",
      area:"",
      region:"地址省-市-区/县",
      list:[]
    };
  },
  mounted(){
    if(this.$props.id!=0){
      api.personal.getAddress(this.$props.id).then((res)=>{
        this.form={
          name:res.data.real_name,
          id:res.data.cardid,
          phone:res.data.phone,
          add:res.data.detail
        }
        for(var i=0; i<this.options.length; i++){
          if(this.options[i].label==res.data.province){
            this.list.push(this.options[i].value)
            this.economize=res.data.province
            for(var j=0; j<this.options[i].children.length; j++){
              if(this.options[i].children[j].label==res.data.city){
                 this.list.push(this.options[i].children[j].value)
                 this.town=res.data.city
                for( var k=0; k<this.options[i].children[j].children.length; k++){
                  if(this.options[i].children[j].children[k].label==res.data.district){
                     this.list.push(this.options[i].children[j].children[k].value)
                     this.selectedOptions=this.list
                     this.area=res.data.district
                     
                  }
                }
              }
            }
          }
        }
      })
    }
    
  },
  methods: {
    handleChange (value) {
      // console.log(this.options);
      for(var i=0; i<this.options.length; i++){
        if(this.options[i].value==this.selectedOptions[0]){
          this.economize=this.options[i].label
          // console.log(this.economize)
          for(var j=0; j<this.options[i].children.length; j++){
            if(this.options[i].children[j].value==this.selectedOptions[1]){
              this.town=this.options[i].children[j].label
              // console.log(this.town)
              for( var k=0; k<this.options[i].children[j].children.length; k++){
                if(this.options[i].children[j].children[k].value==this.selectedOptions[2]){
                  this.area=this.options[i].children[j].children[k].label
                  // console.log(this.area)
                }
              }
            }
          }
        }
      }
    },
    changeShow(){
      let params={
        address:{
					province:this.economize,
					city:this.town,
					district:this.area
				},
				is_default:1,
				real_name:this.form.name,
				post_code:"000000",
				phone:this.form.phone,
				detail:this.form.add,
        id:this.$props.id,
        cardid:this.form.id
        }
      api.personal.editAddress(params).then((res)=>{
        if(res.status==200){
          this.$emit("addChange")
          this.$message({
                type: 'success',
                message: res.msg
              });
        }else{
        
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.add {
  @include form;
}
@media screen and (max-width: 768px) {
  @include form-m;
}
.cascader{
  width: 100%;
}
</style>
