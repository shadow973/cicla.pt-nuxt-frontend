<template>
  <div id="loading" class="text-center"><div class="logo-center"><img class="brand-logo mb-3" src="~assets/images/logo-cicla.png" alt="CICLA"><br>Loading...</div></div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#loading {
  background-color: #f8f8f8;
  color: rgb(0, 0, 0);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  z-index: 99999;
  font-size: 32px;
  padding-top: 10vh;
  height: 100vh;
      display: grid;
    align-items: center;
   }
</style>