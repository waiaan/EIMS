<template>
  <el-container>
    <el-main>
      <div class="table-container">
        <el-form ref="form" :model="departmentsData" label-width="0" :rules="formRules" :inline="true">
          <el-table :data="departmentsData.rows" header-cell-class-name="header-cell" :default-sort="{prop: 'department_name', order: 'ascending'}" @sort-change="changeSort" stripe>
            <el-table-column label="index" width="100" align="center">
              <template slot-scope="scope">
                <span>
                  {{scope.$index+1}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="department_name" label="department name" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.department_name}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.department_name'" :rules="formRules.department_name">
                    <el-input v-model="scope.row.department_name"></el-input>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="manager_name" label="manager name" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.manager_name}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.manager_name'" :rules="formRules.manager_name">
                    <el-input v-model="scope.row.manager_name"></el-input>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="postal_code" label="postal_code" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.postal_code}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.postal_code'">
                    <el-input-number v-model="scope.row.postal_code" :min="0"></el-input-number>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="street_address" label="street_address" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.street_address}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.street_address'">
                    <el-input-number v-model="scope.row.street_address" :min="0"></el-input-number>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="city" label="city" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.city}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.city'">
                    <el-input-number v-model="scope.row.city" :min="0"></el-input-number>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="state_province" label="state_province" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.state_province}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.state_province'">
                    <el-input-number v-model="scope.row.state_province" :min="0"></el-input-number>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="country_id" label="country_id" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  {{scope.row.country_id}}
                </div>
                <div v-else>
                  <el-form-item :prop="'rows.'+scope.$index+'.country_id'">
                    <el-input-number v-model="scope.row.country_id" :min="0"></el-input-number>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center">
              <template slot="header">
                <el-button type="primary" size="small" @click="handleAdd">
                  + Add
                </el-button>
              </template>
              <template slot-scope="scope">
                <div v-if="scope.row.status==='show'">
                  <el-button size="mini" @click.stop="handleEdit(scope)">Edit</el-button>
                  <el-button size="mini" type="danger" @click.stop="handleDelete(scope.$index)">Delete</el-button>
                </div>
                <div v-else-if="scope.row.status==='edit'">
                  <el-button type="primary" size="mini" @click.stop="save(scope,'modify')">Save</el-button>
                  <el-button size="mini" type="danger" @click.stop="cancleSave(scope)">Cancle</el-button>
                </div>
                <div v-else-if="scope.row.status==='add'">
                  <el-button type="primary" size="mini" @click.stop="save(scope,'add')">Add</el-button>
                  <el-button size="mini" type="danger" @click.stop="departmentsData.rows.pop()">Cancle</el-button>
                </div>
              </template>
            </el-table-column> -->
          </el-table>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Departments',
  data () {
    return {
      departmentsData: { rows: [] },
      formRules: {
      },
      currEditData: {},
      sort: {
        prop: 'department_name',
        order: 'ascending'
      }
    }
  },
  created () {
    if (this.departments.length < 1) {
      this.fetchData()
    } else {
      this.departmentsData.rows = this.departments;
      this.resetDepartmentStatus();
    }
  },
  computed: {
    ...mapState(['departments'])
  },
  methods: {
    ...mapActions(['getAllData', 'saveData', 'addData', 'deleteData']),
    fetchData () {
      this.getAllData(
        {
          type: 'departments',
          params: {
            sortProp: this.sort.prop,
            sortOrder: this.sort.order
          }
        }
      ).then((data) => {
        this.departmentsData = { rows: [] };
        this.departmentsData.rows = data;
        this.resetDepartmentStatus();
      })
    },
    resetDepartmentStatus () {
      for (let i = 0; i < this.departmentsData.rows.length; i++) {
        this.$set(this.departmentsData.rows[i], 'status', 'show');
      }
    },
    handleEdit (scope) {

    },
    save (scope, type) {

    },
    cancleSave (scope) {

    },
    handleAdd () {

    },
    handleDelete (index) {

    },
    changeSort (...args) {
      const { prop, order } = args[0];
      this.sort.prop = prop;
      this.sort.order = order;
      this.fetchData();
    }
  }
}
</script>
<style lang="scss" scoped>
.table-container {
  width: 85%;
  margin: 0 auto;
}
</style>
