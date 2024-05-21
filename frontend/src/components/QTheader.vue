<script setup>
  import QTbuttonSidebar from './QTbuttonSidebar.vue'
</script>

<template>
  <header>
    <div class="header">
      <ul>
        <QTbuttonSidebar>1</QTbuttonSidebar>
      </ul>
    </div>
  </header>
</template>

<style>
  header {
    width: 100%;
    display: flex;
  }

  .header {
    background-color: rgb(43, 48, 54);
    width: 100%;
    
    margin: 15px;
    
    border-radius: 15px;

    padding-bottom: 10px;
  }
</style>