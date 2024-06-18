<script>
  import QTcontextMenu from './Menus/QTcontextMenu.vue'
  import QTnotebook from './QTnotebook.vue'
  import axios from 'axios';

  export default {
    data() {
      return {
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11],
        notebooks: null,
        showContextMenu: false,
        contextMenuX: 0,
        contextMenuY: 0
      }
    },
    components: {
      QTcontextMenu,
      QTnotebook
    },
    beforeCreate() {
      axios
        // .get('http://localhost:3050/api/QTnotebooks')
        .get('http://192.168.1.145:3050/api/QTnotebooks')
        .then(response => this.notebooks = response.data);
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
  <div id="notebooksContainer">
    <div class="int">
      <ul class="notebooks">
        <li>
          <QTnotebook :notebook="{ name: 'New Notebook', color: '#333333', static: true}" />
        </li>
        <li v-for="notebook in notebooks">
          <QTnotebook :notebook />
        </li>
      </ul>
    </div>
  </div>

  <QTcontextMenu v-if="showContextMenu" :x="contextMenuX" :y="contextMenuY" ></QTcontextMenu>
</template>

<style>
  div#notebooksContainer {
    width: 100%;
    height: 100%;

    display: flex;

    padding-right: 15px;
    padding-bottom: 15px;
  }

  div#notebooksContainer>div.int {
    width: 100%;
    height: 100%;

    border-radius: 15px;

    background-color: var(--color-container-background);

    padding: 15px;

    display: flex;

    box-shadow: black inset 0px 0px 10px 2px;
  }

  div#notebooksContainer>div.int>ul.notebooks {
    /* display: flex; */
    flex-wrap: wrap;
    list-style-type: none;
    width: 100%;
    margin: 0px;
    padding: 0;
    /* justify-content: center; */
  }

  div#notebooksContainer>div.int>ul.notebooks>li {
    float: left;
    /* width: 16.666%; */
    width: 14.28%;
    height: 33.333%;
    padding: 10px;
  }
</style>