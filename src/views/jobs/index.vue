<template>
  <el-container>
    <el-main>
      <div class="table-container">
        <el-form ref="form" :model="jobsData" label-width="0" :rules="formRules" :inline="true">
          <el-table :data="jobsData.rows" header-cell-class-name="header-cell" :default-sort="{prop: 'job_title', order: 'ascending'}" stripe>
            <el-table-column label="index" width="100" align="center">
              <template slot-scope="scope">
                <span>
                  {{scope.$index+1}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="job_id" label="job id" sortable>
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.job_id}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.job_id'" :rules="formRules.job_id">
                    <el-input v-model="scope.row.job_id"></el-input>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="job_title" label="job title" sortable>
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.job_title}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.job_title'" :rules="formRules.job_title">
                    <el-input v-model="scope.row.job_title"></el-input>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="min_salary" label="min salary" align="center" sortable>
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.min_salary}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.min_salary'">
                    <el-input-number v-model="scope.row.min_salary" :min="0"></el-input-number>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="max_salary" label="max salary" align="center" sortable>
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.max_salary}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.max_salary'">
                    <el-input-number v-model.trim="scope.row.max_salary" :min="0"></el-input-number>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <el-button type="primary" size="small" @click="handleAdd">
                  + Add
                </el-button>
              </template>
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  <el-button size="mini" @click.stop="handleEdit(scope)">Edit</el-button>
                  <el-button size="mini" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </div>
                <div v-else-if="scope.row.status==='edit'">
                  <el-button type="primary" size="mini" @click.stop="save(scope,'modify')">Save</el-button>
                  <el-button size="mini" type="danger" @click.stop="cancleSave(scope)">Cancle</el-button>
                </div>
                <div v-else-if="scope.row.status==='add'">
                  <el-button type="primary" size="mini" @click.stop="save(scope,'add')">Add</el-button>
                  <el-button size="mini" type="danger" @click.stop="jobsData.rows.pop()">Cancle</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Jobs',
  data () {
    const validateJobId = (rule, value, cb) => {
      const currIndex = ~~rule.fullField.split('.')[1];
      value = value.trim();
      if (value === '') {
        cb(new Error('job_id is required'));
      } else {
        for (let i = 0; i < this.jobsData.rows.length; i++) {
          const { job_id } = this.jobsData.rows[i];
          if (value === job_id && i !== currIndex) {
            cb(new Error('job_id is already exist'))
          }
        }
        cb();
      }
    }
    const validateJobTitle = (rule, value, cb) => {
      const currIndex = ~~rule.fullField.split('.')[1];
      value = value.trim();
      if (value === '') {
        cb(new Error('job_title is required'));
      } else {
        for (let i = 0; i < this.jobsData.rows.length; i++) {
          const { job_title } = this.jobsData.rows[i];
          if (value === job_title && i !== currIndex) {
            cb(new Error('job_title is already exist'))
          }
        }
        cb();
      }
    }
    return {
      jobsData: { rows: [] },
      formRules: {
        job_id: [
          {
            validator: validateJobId
          }
        ],
        job_title: [
          {
            validator: validateJobTitle
          }
        ]
      },
      currEditData: {}
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    ...mapState(['jobs'])
  },
  methods: {
    ...mapActions(['getAllData', 'saveData', 'addData']),
    fetchData () {
      this.getAllData({ type: 'jobs' }).then((data) => {
        this.jobsData = { rows: [] };
        for (let i = 0; i < data.length; i++) {
          this.jobsData.rows.push(data[i]);
          this.$set(this.jobsData.rows[i], 'status', 'show');
        }
      })
    },
    resetJobStatus () {
      for (let i = 0; i < this.jobsData.rows.length; i++) {
        this.jobsData.rows[i].status = 'show';
      }
    },
    handleEdit (scope) {
      this.resetJobStatus();
      const { $index } = scope;
      this.currEditData = JSON.parse(JSON.stringify(this.jobsData.rows[$index]));
      this.jobsData.rows[$index].status = 'edit';
    },
    save (scope, type) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let { $index } = scope;
          if (type === 'add') {
            $index = this.jobsData.rows.length - 1;
          }
          let job = this.jobsData.rows[$index];
          const { job_id, job_title, max_salary, min_salary } = job;
          if (type === 'modify') {
            this.saveData({ type: 'jobs', params: { job_id, job_title, max_salary, min_salary } }).then((data) => {
              this.fetchData();
            });
          } else if (type === 'add') {
            this.addData({ type: 'jobs', params: { job_id, job_title, max_salary, min_salary } }).then((data) => {
              this.fetchData();
            });
          }
        }
      });
    },
    cancleSave (scope) {
      const { $index } = scope;
      this.jobsData.rows.splice($index, 1, JSON.parse(JSON.stringify(this.currEditData)));
      this.jobsData.rows[$index].status = 'show';
    },
    handleAdd () {
      this.resetJobStatus();
      this.jobsData.rows.push({ job_id: '', job_title: '', min_salary: 0, max_salary: 0, status: 'add' });
    }
  }
}
</script>
<style lang="scss" scoped>
.table-container {
  width: 65%;
  margin: 0 auto;
}
</style>
