<template>
  <el-container>
    <el-header style="text-align:right;">
      <router-link to="/edit">
        <el-button type="primary">
          + Add
        </el-button>
      </router-link>
    </el-header>
    <el-main>
      <el-table :data="employees" style="width: 100%" stripe @sort-change="handleSortChange">
        <el-table-column :prop="key" :label="key" v-for="(value, key,index) in employees[0]" :key="index" sortable="custom" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      total: 0
    }
  },
  created () {
    this.fetchData();
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
      this.fetchData({ pageSize });
    },
    handleCurrentChange (pageNum) {
      this.fetchData({ pageNum });
    },
    handleSortChange (col, field, sort) {

    },
    handleEdit (index, row) {

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
