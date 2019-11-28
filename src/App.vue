<template>
  <el-container style="width:100%;height:100%;">
    <el-header>
      Employee Information Management System
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="'0'" mode="vertical" style="height:100%;">
          <el-menu-item index="0">
            <router-link :to="{name:'employeesList'}">
              employees
            </router-link>
          </el-menu-item>
          <el-menu-item index="1">
            <router-link :to="{name:'jobsList'}">
              jobs
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{name:'locationsList'}">
              locations
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.el-header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
}
.el-menu-item a {
  font-size: 16px;
}
.el-menu-item.is-active a {
  color: #409eff;
  font-size: 18px;
}
</style>
