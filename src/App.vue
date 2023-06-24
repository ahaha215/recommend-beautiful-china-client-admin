<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

.left{
  float: left;
}

.right{
  float: right;
}

.clearfix:after{
  content: "";
  display: block;
  height: 0;
  clear:both;
  visibility: hidden;
}

</style>
