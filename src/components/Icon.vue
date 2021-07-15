<template>
  <svg class="icon">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
try {
  importAll(require.context('../assets/icons', true, /\.svg$/))

} catch (error) {
  console.log('error:' + error)
}
export default {
  props: ['name'],
  name: "Icon"
}
</script>

<style lang="scss" scoped>
  .icon{
    height:1em;
    width:1em;
    vertical-align: -0.15em;
    fill:currentColor;
    overflow: hidden;
  }
</style>