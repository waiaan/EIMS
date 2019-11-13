<template>
  <el-container>
    <el-header style="text-align:right;">
      <el-button type="primary">
        + Add
      </el-button>
    </el-header>
    <el-main>
      <el-table :data="data" style="width: 100%" stripe @sort-change="handleSortChange">
        <el-table-column :prop="key" :label="key" v-for="(value, key,index) in data[0]" :key="index" sortable="custom" align="center">
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
  name: 'home',
  data () {
    return {
      data: [],
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
        this.data = res.data;
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

    }
  }
}
</script>
