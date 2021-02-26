<template>
  <div>
    <div class="menuWrap">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#fff" active-text-color="#409EFF">
        <el-menu-item index="/channel/index"><router-link to="/channel/index"><i class="el-icon-view" />频道预览</router-link></el-menu-item>
        <el-menu-item index="/channel/setting"><router-link to="/channel/setting"><i class="el-icon-setting" />频道配置</router-link></el-menu-item>
        <li class="el-menu-item"><span class="mainTag">{{ maintag === 1 ? '主' : maintag === 0 ? '副' : '' }}</span></li>
        <el-menu-item index="" style="float:right;"><img src="../assets/logo_zght.png" class="logo"></el-menu-item>
      </el-menu>
    </div>
    <div class="mainWrap">
      <router-view ref="child" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path,
      maintag: ''
    }
  },
  watch: {
    $route(nval) {
      this.activeIndex = nval.path
    }
  }
}
</script>

<style scoped>
.mainTag {
  background-color: #F56C6C;
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
}
</style>
