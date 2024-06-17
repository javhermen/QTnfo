<script setup>
  import QTbuttonSidebar from './QTbuttonSidebar.vue'
</script>

<template>
  <aside>
    <div class="aside">
      <ul>
        <QTbuttonSidebar link="/notebook/pageNameNum">1</QTbuttonSidebar>
        <QTbuttonSidebar link="/phone">2</QTbuttonSidebar>
      </ul>
    </div>
  </aside>
</template>

<style>
  aside {

    height: 100%;

    padding-bottom: 15px;

    display: flex;
  }

  .aside {
    background-color: var(--color-container-background);
    height: 100%;
    
    margin: 15px;

    margin-top: 0;
    margin-bottom: 0;
    
    border-radius: 150px;
    border-radius: 15px;

    padding-bottom: 10px;

    box-shadow: black inset 0px 0px 10px 2px;
  }

  ul {
    margin: 0;
    padding: 0;

    list-style: none;
  }
</style>