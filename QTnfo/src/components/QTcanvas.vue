<script setup>
  import QTbox from './QTbox.vue'
</script>

<template>
  <div id="main">
    <div class="border">
      <div class="int">
        <QTbox />
        <!-- <canvas class="int"></canvas> -->
      </div>
    </div>
  </div>
</template>

<style>
  div#main {
    width: 100%;
    height: 100%;

    display: flex;

    padding-right: 15px;
    padding-bottom: 15px;
  }

  div#main>div.border {
    background-color: rgb(217, 234, 255);

    border-radius: 15px;

    width: 100%;
    height: 100%;

    padding: 10px;

    display: flex;
  }

  div#main div.int {
    width: 100%;
    height: 100%;

    background-color: rgb(43, 48, 54);

    background: radial-gradient(circle, rgba(43,48,54,1) 0%, rgba(217,234,255,1) 1000%);

    box-shadow: inset 0px 0px 20px 2px ;

    border-radius: 10px;

    overflow: hidden;

    position: relative;
  }

  div#main canvas.int {
    background-color: rgb(43, 48, 54);

    background: radial-gradient(circle, rgba(43,48,54,1) 0%, rgba(217,234,255,1) 1000%);

    box-shadow: inset 0px 0px 20px 2px ;

    border-radius: 10px;

    /* width: 100%; */
    /* height: 100%; */

    /* width: calc(100%); */
    /* height: calc(100% - 30px); */
    /* height: 50%; */

    display: block;
  }
</style>