<template>
<div class="theme-bg-light section-padding terms-content">
  <div class="theme-container">
    <div v-if="blockData.content && blockData.content.length > 0" >
    <div v-for="(data, index) in blockData.content" :key="index">
      <h3>{{data.title}}</h3>
      <div v-if="data.description" v-html="$md.render(data.description)"></div>
    </div>
    </div>
    <div v-else>
      <h3>{{blockData.name}}</h3>
      <div v-if="blockData.description" v-html="$md.render(blockData.description)"></div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        props: ['blockData']
    }
</script>

<style lang="scss">
.terms-content{
  p{font-size: 16px;}
}
</style>