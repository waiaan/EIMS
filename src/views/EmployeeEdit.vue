<template>
  <el-container>
    <el-header>
      header
    </el-header>
    <el-main>
      <el-form :model="formData" :label-position="'right'" label-width="150px">
        <el-form-item label="name">
          <el-input v-model="formData.name" placeholder="input name" :size="'large'"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="formData.emial" placeholder="input email" :size="'large'"></el-input>
        </el-form-item>
        <el-form-item label="phone">
          <el-input v-model="formData.phone" placeholder="input phone" :size="'large'"></el-input>
        </el-form-item>
        <el-form-item label="job">
          <el-select v-model="formData.job" placeholder="select" size="medium" @change="selectJob">
            <el-option v-for="(item,index) in jobs" :key="index" :label="item.job_title" :value="item.job_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="salary">
          <el-input-number v-model="formData.salary" :min="minSalary" :max="maxSalary" :size="'medium'"></el-input-number>
        </el-form-item>
        <el-form-item label="commission">
          <el-input-number v-model="formData.commission" :min="0" :max="1" :step="0.01" :precision="2" size="medium"></el-input-number>
        </el-form-item>
        <el-form-item label="department">
          <el-select v-model="formData.department" placeholder="select" size="medium" @change="selectDepartment">
            <el-option v-for="(item,index) in departments" :key="index" :label="item.department_name" :value="item.department_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="manager">
          <el-input v-model="formData.manager" :size="'large'" disabled></el-input>
        </el-form-item>
        <el-form-item label="hireDate">
          <el-input v-model="formData.hireDate" placeholder="input hireDate" size="large"></el-input>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>
      footer
    </el-footer>
  </el-container>
</template>
<script>
import api from '@/api/api'

export default {
  name: 'EmployeeEdit',
  props: {
    employee: {
      required: false,
      type: Object
    }
  },
  data () {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        job: '',
        salary: 0,
        commission: 0,
        department: '',
        manager: '',
        hireDate: ''
      },
      managers: [],
      jobs: [],
      departments: [],
      minSalary: 0,
      maxSalary: 1
    }
  },
  created () {
    api('getJobs').then((res) => {
      this.jobs = res.data;
    })
    api('getDepartments').then((res) => {
      this.departments = res.data;
    })
    api('getManagers').then((res) => {
      this.managers = res.data;
    })
  },
  methods: {
    selectJob (val) {
      for (let i = 0; i < this.jobs.length; i++) {
        let { job_id, min_salary, max_salary } = this.jobs[i];
        if (job_id === val) {
          this.minSalary = min_salary;
          this.maxSalary = max_salary;
          break;
        }
      }
    },
    selectDepartment (val) {
      for (let i = 0; i < this.departments.length; i++) {
        let { job_id, min_salary, max_salary } = this.departments[i];
        if (job_id === val) {
          this.minSalary = min_salary;
          this.maxSalary = max_salary;
          break;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-main {
  padding-left: 30%;
  padding-right: 30%;
}
::v-deep .el-form-item__label {
  font-size: 16px;
}
::v-deep .el-select,
::v-deep .el-input-number {
  display: block;
}
</style>
