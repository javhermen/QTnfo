<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      camera: Object,
      QTbox: Object
    },
    mounted() {
      setTimeout(() => document.getElementById('titleEditor').focus(), 10);
    },
    computed: {
      style() {
        if (this.QTbox) {
          console.log(this.QTbox);
          return {
            left: this.QTbox.pos.x + this.camera.x+'px',
            top: this.QTbox.pos.y + this.camera.y+'px',
            width: this.QTbox.dimensions.width+'px',
            height: 40+'px'
          }
        }
      }
    }
  }
</script>

<template>
  <input ref="title" type="text" id="titleEditor" :style v-model="this.QTbox.title">
</template>

<style>

  #titleEditor {
    position: absolute;

    z-index: 999;

    background-color: rgba(0, 0, 0, 0.2);

    border-radius: 10px;

    border: none;

    /* font-size: 2em; */

    padding: 7px;

    font-size: 2em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;

    /* color: rgba(0,0,0,0); */
  }
</style>