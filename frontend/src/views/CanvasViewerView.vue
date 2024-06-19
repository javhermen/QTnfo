<script>
  import QTheader from '../components/QTheader/QTheader.vue'
  import QTsidebar from '../components/QTsidebar/QTsidebar.vue'
  import QTcanvas from '../components/QTcanvas/QTcanvas.vue'

  export default {
    components: {
      QTheader,
      QTsidebar,
      QTcanvas
    }
  }
</script>

<template>
  <div id="canvasView">
    <QTheader />
    <div class="wrapper">
      <QTsidebar />
      <QTcanvas />
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