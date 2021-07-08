<template>
  <div class="nav">
    <router-link to="/money">
      <Icon name="Money"/>
      记账
    </router-link>
    |
    <router-link to="/labels">
      <Icon name="Labels"/>
      标签
    </router-link>
    |
    <router-link to="/statistics">
      <Icon name="Statistics"/>
      统计
    </router-link>
  </div>
</template>

<script lang="ts">

export default {
  name: "Nav"
}
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}
</style>