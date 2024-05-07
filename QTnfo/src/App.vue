<script setup>
import { RouterLink, RouterView } from 'vue-router'
import QTheader from './components/QTheader.vue'
import QTsidebar from './components/QTsidebar.vue'
import QTcanvas from './components/QTcanvas.vue'

</script>

<template>
  <QTheader />
  <div class="wrapper">
    <QTsidebar />
    <QTcanvas />
  </div>

  
</template>

<style>
  div#app {
    display: flex;

    flex-direction: column;
  }
  div.wrapper {
    height: 100%;
    width: 100%;
    display: flex;
  }
</style>
