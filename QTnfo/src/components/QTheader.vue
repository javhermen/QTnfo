<script setup>
  import QTbuttonSidebar from './QTbuttonSidebar.vue'
</script>

<template>
  <header>
    <div class="header">
      <ul>
        <QTbuttonSidebar />
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
    height: 75px;
    
    margin: 15px;
    
    border-radius: 15px;
  }

  .headerText {
    margin-left: 20px;
    font-size: 4em;
  }
</style>