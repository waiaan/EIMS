<template>
  <el-container style="width:100%;height:100%;">
    <el-header>
      Employee Information Management System
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeMenuIndex" mode="vertical" style="height:100%;">
          <el-menu-item index="0" @click="$router.push({name:'employeesList'})">
            employees
          </el-menu-item>
          <el-menu-item index="1" @click="$router.push({name:'jobs'})">
            jobs
          </el-menu-item>
          <el-menu-item index="2" @click="$router.push({name:'locations'})">
            locations
          </el-menu-item>
          <el-menu-item index="3" @click="$router.push({name:'departments'})">
            departments
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in paths" :key="index" :to="{ name: item.meta.title }">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    activeMenuIndex () {
      let index = '0';
      const { name } = this.$route;
      switch (name) {
        case 'jobs':
          index = '1'
          break;
        case 'locations':
          index = '2'
          break;
        case 'departments':
          index = '3'
          break;
        default:
          break;
      }
      return index;
    },
    paths () {
      return [{ meta: { title: 'home' } }].concat(this.$route.matched);
    }
  }
}
</script>
<style lang="scss">
.el-header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
}
.el-menu-item {
  font-size: 16px;
}
.el-menu-item.is-active {
  color: #409eff;
  font-size: 18px;
}
</style>
