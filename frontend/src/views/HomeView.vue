<script>
  import QTheader from '../components/QTheader.vue'
  import QTsidebar from '../components/QTsidebar.vue'
  import QTcanvas from '../components/QTcanvas.vue'
  import QTnoteBooksContainer from '../components/QTnoteBooksContainer.vue'

  export default {
    components: {
      QTheader,
      QTsidebar,
      QTcanvas,
      QTnoteBooksContainer
    }
  }
</script>

<template>
  <div id="canvasView">
    <QTheader />
    <div class="wrapper">
      <QTsidebar />
      <QTnoteBooksContainer />
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