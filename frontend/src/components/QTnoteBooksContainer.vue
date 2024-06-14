<script>
  import QTcontextMenu from './Menus/QTcontextMenu.vue'
  import QTnotebook from './QTnotebook.vue'

  export default {
    data() {
      return {
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
        notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11],
        showContextMenu: false,
        contextMenuX: 0,
        contextMenuY: 0
      }
    },
    components: {
      QTcontextMenu,
      QTnotebook
    },
    methods: {
      showQTcontextMenu(event) {
        this.showContextMenu = true;
        this.contextMenuX = event.clientX;
        this.contextMenuY = event.clientY;
      }
    }
  }
</script>

<template>
  <div id="noteBooksContainer">
    <div class="int">
      <ul class="notebooks">
        <li v-for="notebook in notebooks">
          <QTnotebook />
        </li>
      </ul>
    </div>
  </div>

  <QTcontextMenu v-if="showContextMenu" :x="contextMenuX" :y="contextMenuY" ></QTcontextMenu>
</template>

<style>
  div#noteBooksContainer {
    width: 100%;
    height: 100%;

    display: flex;

    padding-right: 15px;
    padding-bottom: 15px;
  }

  div#noteBooksContainer>div.int {
    width: 100%;
    height: 100%;

    border-radius: 15px;

    background-color: var(--color-container-background);

    padding: 15px;

    display: flex;
  }

  div#noteBooksContainer>div.int>ul.notebooks {
    /* display: flex; */
    flex-wrap: wrap;
    list-style-type: none;
    width: 100%;
    margin: 0px;
    padding: 0;
    /* justify-content: center; */
  }

  div#noteBooksContainer>div.int>ul.notebooks>li {
    float: left;
    /* width: 16.666%; */
    width: 14.28%;
    height: 33.333%;
    padding: 10px;
  }
</style>