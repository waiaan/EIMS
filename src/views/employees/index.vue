<template>
  <el-container>
    <el-main>
      <el-table :data="employees.rows" stripe @sort-change="handleSortChange" header-cell-class-name="header-cell" :default-sort="sort">
        <el-table-column label="index" width="70" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pages.pageNum - 1) * pages.pageSize + 1}} </span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="employee_id" label="employee_id" sortable="custom" align="center">
        </el-table-column> -->
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
          <template slot="header">
            <router-link :to="{name:'employeeEdit'}">
              <el-button type="primary" size="small">
                + Add
              </el-button>
            </router-link>
          </template>
          <template slot-scope="scope">
            <router-link :to="{name:'employeeEdit',params:{employee:employees.rows[scope.$index]}}" class="button-left">
              <el-button size="mini" type="success">EDIT</el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">DELETE</el-button>
            {{scope.row.index}}
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer style="text-align:right;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="employees.total" background>
      </el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import http from '@/api'

export default {
  name: 'EmployeeList',
  data () {
    return {
      pages: {
        currentPage: 1,
        pageSize: 10,
        pageNum: 1
      },
      sort: {
        prop: 'name',
        order: 'ascending'
      }
    }
  },
  computed: {
    ...mapState(['employees'])
  },
  created () {
    this.fetchData();
  },
  methods: {
    ...mapActions(['getAllData', 'deleteData']),
    fetchData () {
      this.getAllData({
        type: 'employees',
        params: {
          pageSize: this.pages.pageSize, pageNum: this.pages.pageNum, orderBy: this.sort.prop, order: this.sort.order
        }
      })
    },
    handleSizeChange (pageSize) {
      this.pages.pageSize = pageSize;
      this.fetchData();
    },
    handleCurrentChange (pageNum) {
      this.pages.pageNum = pageNum;
      this.fetchData();
    },
    handleSortChange ({ col, prop, order }) {
      this.sort.prop = prop;
      this.sort.order = order;
      this.fetchData();
    },
    handleDelete (index, row) {
      const id = this.employees.rows[index].employee_id;
      this.deleteData({ type: 'employees', id }).then((res) => {
        const { message } = res;
        if (message === 'success') {
          this.fetchData();
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
