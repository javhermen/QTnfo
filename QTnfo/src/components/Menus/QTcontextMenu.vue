<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      x: Number,
      y: Number
    }
  }
</script>

<template>
  <div class="contextMenu" :style="{top: y + 'px', left: x + 'px'}" @contextmenu.prevent="">

  </div>
</template>

<style>
  div.contextMenu {
    width: 150px;
    height: 200px;

    border-radius: 10px;

    background-color: blueviolet;

    position: absolute;

    top: 200px;
    left: 550px;

    z-index: 99;
  }
</style>