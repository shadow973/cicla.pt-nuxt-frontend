<template>
    <section class="feature-content section-padding vision-section theme-bg-light">
      <div class="theme-container">
        <div class="row justify-content-between d-flex align-items-center">
          <div class="col-12 col-md-12 text-center">            
            <h4 class="them-title">{{ data.content[1].title }}</h4>
            <p>{{ data.content[1].description }}</p>      
          </div>         
        </div>
      </div>
    </section>
</template>

<script>
    export default {
        props: ["data"]
    }
</script>

<style lang="scss" scoped>
.vision-section p {
    font-size: 18px;
}
</style>