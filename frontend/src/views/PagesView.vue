<script>
  import QTheader from '../components/QTheader/QTheader.vue'
  import QTsidebar from '../components/QTsidebar/QTsidebar.vue'
  import QTpagesContainer from '../components/QTpages/QTpagesContainer.vue'

  export default {
    components: {
      QTheader,
      QTsidebar,
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