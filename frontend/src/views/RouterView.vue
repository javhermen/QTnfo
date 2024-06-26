<script>
  import { RouterView } from 'vue-router'
  import QTheader from '../components/QTheader/QTheader.vue'
  import QTsidebar from '../components/QTsidebar/QTsidebar.vue'

  export default {
    components: {
      QTheader,
      QTsidebar
    }
  }
</script>

<template>
  <div id="canvasView">
    <QTheader />
    <div class="wrapper">
      <QTsidebar />
      <RouterView />
    </div>
  </div>
</template>

<style>
  div#canvasView {
    height: 100%;
    width: 100%;

    display: flex;

    flex-direction: column;
  }
  div#canvasView>div.wrapper {
    height: 100%;
    width: 100%;
    display: flex;
  }
</style>