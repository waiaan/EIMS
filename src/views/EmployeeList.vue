<template>
  <el-container>
    <el-header class="header-title">
      Employee Information Management System
    </el-header>
    <el-main>
      <el-container>
        <el-header style="text-align:right;">
          <router-link :to="{name:'employeeEdit'}">
            <el-button type="primary">
              + Add
            </el-button>
          </router-link>
        </el-header>
        <el-main>
          <el-table :data="employees" style="width: 100%" stripe @sort-change="handleSortChange" header-cell-class-name="header-cell">
            <el-table-column label="index" width="70" align="center">
              <template slot-scope="scope"><span>{{scope.$index+(pageNum - 1) * pageSize + 1}} </span></template>
            </el-table-column>
            <el-table-column prop="employee_id" label="employee_id" sortable="custom" align="center">
            </el-table-column>
            <el-table-column prop="name" label="name" sortable="custom" align="left">
            </el-table-column>
            <el-table-column prop="phone_number" label="phone_number" sortable="custom" align="left">
            </el-table-column>
            <el-table-column prop="email" label="email" sortable="custom" align="left">
            </el-table-column>
            <el-table-column prop="job_title" label="job_title" sortable="custom" align="left">
            </el-table-column>
            <el-table-column prop="department_name" label="department_name" sortable="custom" align="center" width="200">
            </el-table-column>
            <el-table-column prop="salary" label="salary" sortable="custom" align="center">
            </el-table-column>
            <el-table-column prop="manager" label="manager" sortable="custom" align="left">
            </el-table-column>
            <el-table-column prop="hiredate" label="hiredate" sortable="custom" align="center">
            </el-table-column>
            <el-table-column label="operation" align="center">
              <template slot-scope="scope">
                <router-link :to="{name:'employeeEdit',params:{employee:employees[scope.$index]}}" class="button-left">
                  <el-button size="mini" type="success">EDIT</el-button>
                </router-link>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">DELETE</el-button>
                {{scope.row.index}}
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-main>
    <el-footer style="text-align:right;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'EmployeeList',
  data () {
    return {
      employees: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      pageNum: 1
    }
  },
  created () {
    this.fetchData({ pageSize: this.pageSize, pageNum: this.pageNum });
  },
  methods: {
    fetchData (params) {
      api('getData', params).then((res) => {
        this.employees = res.data;
      });
      api('getTotal').then((res) => {
        this.total = res.data[0].total;
      });
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.fetchData({ pageSize });
    },
    handleCurrentChange (pageNum) {
      this.pageNum = pageNum;
      this.fetchData({ pageNum });
    },
    handleSortChange (col, field, sort) {

    },
    handleDelete (index, row) {
      const id = this.employees[index].employee_id;
      api('delete', { id }).then((res) => {
        if (res.data.changedRows === 1) {
          this.fetchData();
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-table {
  font-size: 16px;
}
</style>
