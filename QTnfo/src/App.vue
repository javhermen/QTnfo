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
  div.wrapper {
    height: calc(100% - 105px);
    display: flex;
  }
</style>
