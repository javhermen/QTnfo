<script setup>
  import QTbuttonSidebar from './QTbuttonSidebar.vue'
</script>

<template>
  <header>
    <div class="header">
      <ul>
        <QTbuttonSidebar link="/"></QTbuttonSidebar>
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
    background-color: var(--color-container-background);
    width: 100%;
    
    margin: 15px;
    
    border-radius: 150px;
    border-radius: 15px;

    padding-bottom: 10px;
  }

  ul {
    margin: 0;
    padding: 0;

    list-style: none;
  }
</style>