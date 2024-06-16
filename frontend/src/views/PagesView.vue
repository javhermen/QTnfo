<script>
  import QTheader from '../components/QTheader.vue'
  import QTsidebar from '../components/QTsidebar.vue'
  import QTcanvas from '../components/QTcanvas.vue'
  import QTpagesContainer from '../components/QTpagesContainer.vue'

  export default {
    components: {
      QTheader,
      QTsidebar,
      QTcanvas,
      QTpagesContainer
    }
  }
</script>

<template>
  <div id="canvasView">
    <QTheader />
    <div class="wrapper">
      <QTsidebar />
      <QTpagesContainer />
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