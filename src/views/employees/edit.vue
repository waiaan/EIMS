<template>
  <el-container>
    <el-main>
      <el-form :model="formData" :label-position="'right'" label-width="150px" style="width:700px">
        <el-form-item label="first_name">
          <el-input v-model="formData.first_name" placeholder="input first name" :size="'large'"></el-input>
        </el-form-item>
        <el-form-item label="last_name">
          <el-input v-model="formData.last_name" placeholder="input last name" :size="'large'"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="formData.email" placeholder="input email" :size="'large'"></el-input>
        </el-form-item>
        <el-form-item label="phone">
          <el-input v-model="formData.phone_number" placeholder="input phone" :size="'large'"></el-input>
        </el-form-item>
        <el-form-item label="job">
          <el-select v-model="formData.job_title" placeholder="select" size="medium">
            <el-option v-for="(item,index) in jobs" :key="index" :label="item.job_title" :value="item.job_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="salary">
          <el-input-number v-model="formData.salary" :min="minSalary" :max="maxSalary" :size="'medium'"></el-input-number>
        </el-form-item>
        <el-form-item label="commission">
          <el-input-number v-model="formData.commission_pct" :min="0" :max="1" :step="0.01" :precision="2" size="medium"></el-input-number>
        </el-form-item>
        <el-form-item label="department">
          <el-select v-model="formData.department_name" placeholder="select" size="medium" @change="selectDepartment">
            <el-option v-for="(item,index) in departments" :key="index" :label="item.department_name" :value="item.department_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="manager">
          <el-input v-model="formData.manager" :size="'large'" disabled></el-input>
        </el-form-item>
        <el-form-item label="hiredate">
          <el-date-picker v-model="formData.hiredate" type="date" size="large">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>
      <el-button type="primary" size="medium" @click="save">SAVE</el-button>
      <el-button size="medium" type="info" @click="backward">CANCEL</el-button>
    </el-footer>
  </el-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import http from '@/api'

export default {
  name: 'EmployeeEdit',
  data () {
    return {
      formData: {
        name: '',
        email: '',
        phone_number: '',
        job_title: '',
        salary: 0,
        commission_pct: 0,
        department_name: '',
        manager: '',
        hiredate: ''
      },
      managers: [],
      minSalary: 0,
      maxSalary: Number.POSITIVE_INFINITY
    }
  },
  computed: {
    ...mapState(['jobs', 'departments'])
  },
  created () {
    this.$route.params.id && this.fetchData(this.$route.params.id);
    this.jobs.length < 1 && this.getAllData({ type: 'jobs' });
    this.departments.length < 1 && this.getAllData({ type: 'departments' })
  },
  watch: {
    'formData.job_title': function (val) {
      for (let i = 0; i < this.jobs.length; i++) {
        let { job_title, min_salary, max_salary } = this.jobs[i];
        if (job_title === val) {
          this.minSalary = min_salary;
          this.maxSalary = max_salary;
          break;
        }
      }
    }
  },
  methods: {
    ...mapActions(['getAllData', 'saveData', 'addData', 'getOne']),
    fetchData (id) {
      this.getOne({ type: 'employees', id }).then((res) => {
        this.formData = res;
      })
    },
    selectDepartment (val) {
      let _id = 0;
      this.formData.manager = '';
      for (let i = 0; i < this.departments.length; i++) {
        let { department_id, manager_id } = this.departments[i];
        if (department_id === val) {
          _id = manager_id;
          break;
        }
      }
      for (let i = 0; i < this.managers.length; i++) {
        let { employee_id, name } = this.managers[i];
        if (employee_id === _id) {
          this.formData.manager = name;
          break;
        }
      }
    },
    backward () {
      this.$router.go(-1);
    },
    save () {
      if ('employee_id' in this.formData) {
        this.saveData({ type: 'employees', params: { ...this.formData } })
      } else {
        this.addData({ type: 'employees', params: { ...this.formData } })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-main,
::v-deep .el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .el-form-item__label {
  font-size: 16px;
}

::v-deep .el-select,
::v-deep .el-input-number,
::v-deep .el-date-editor.el-input {
  display: block;
}
</style>
