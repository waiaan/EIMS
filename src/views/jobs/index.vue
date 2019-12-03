<template>
  <el-container>
    <el-main>
      <div class="table-container">
        <el-table :data="jobsData" header-cell-class-name="header-cell">
          <el-table-column label="index" width="100">
            <template slot-scope="scope">
              <span>
                {{scope.$index+1}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="job_title" label="job title">
            <template slot-scope="scope">
              <div v-if="scope.row._isEditable===false">
                {{scope.row.job_title}}
              </div>
              <div v-else>
                <el-input v-model="scope.row.job_title"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="min_salary" label="min salary" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row._isEditable===false">
                {{scope.row.min_salary}}
              </div>
              <div v-else>
                <el-input v-model="scope.row.min_salary"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="max_salary" label="max salary" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row._isEditable===false">
                {{scope.row.max_salary}}
              </div>
              <div v-else>
                <el-input v-model="scope.row.max_salary"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot="header">
              <el-button type="primary" size="small">
                + Add
              </el-button>
            </template>
            <template slot-scope="scope">
              <div v-if="scope.row._isEditable===false">
                <el-button size="mini" @click="scope.row._isEditable=true;">Edit</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </div>
              <div v-else>
                <el-button type="primary" size="mini" @click="save(scope)">Save</el-button>
                <el-button size="mini" type="danger" @click="scope.row._isEditable=false;">Cancle</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Jobs',
  data () {
    return {
      jobsData: []
    }
  },
  created () {
    this.getAllData({ type: 'jobs' }).then((res) => {
      this.initData(res.rows);
    }, (err) => {
      this.$notify({
        message: err
      })
    })
  },
  computed: {
    ...mapState(['jobs'])
  },
  methods: {
    ...mapActions(['getAllData']),
    initData (data) {
      for (let i = 0; i < data.length; i++) {
        data[i]._isEditable = false;
      }
      this.jobsData = data;
    },
    save (scope) {
      const { $index } = scope;
      let job = this.jobsData[$index];
      job._isEditable = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.table-container {
  width: 60%;
  margin: 0 auto;
}
</style>
