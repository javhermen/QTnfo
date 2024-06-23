<script>
  import QTcontextMenu from '../Menus/QTcontextMenu.vue'
  import QTpage from './QTpage.vue'
  import apiUrl from '../../assets/apiUrl'
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
        pages: null,
        showContextMenu: false,
        contextMenuX: 0,
        contextMenuY: 0
      }
    },
    components: {
      QTcontextMenu,
      QTpage
    },
    beforeCreate() {
      axios
        // .get('http://localhost:3050/api/'+this.$route.params.QTnotebook+'/pages')
        .get(apiUrl+''+this.$route.params.QTnotebook+'/QTpages')
        .then(response => this.pages = response.data);
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
  <div id="pagesContainer">
    <div class="int">
      <ul class="pages">
        <li>
          <QTpage :page="{ name: 'New Page', color: '#333333', static: true}" />
        </li>
        <li v-for="page in pages">
          <QTpage :page />
        </li>
      </ul>
    </div>
  </div>

  <QTcontextMenu v-if="showContextMenu" :x="contextMenuX" :y="contextMenuY" ></QTcontextMenu>
</template>

<style>
  div#pagesContainer {
    width: 100%;
    height: 100%;

    display: flex;

    padding-right: 15px;
    padding-bottom: 15px;
  }

  div#pagesContainer>div.int {
    width: 100%;
    height: 100%;

    border-radius: 15px;

    background-color: var(--color-container-background);

    padding: 15px;

    display: flex;

    box-shadow: black inset 0px 0px 10px 2px;
  }

  div#pagesContainer>div.int>ul.pages {
    /* display: flex; */
    flex-wrap: wrap;
    list-style-type: none;
    width: 100%;
    margin: 0px;
    padding: 0;
    /* justify-content: center; */
  }

  div#pagesContainer>div.int>ul.pages>li {
    float: left;
    /* width: 16.666%; */
    width: 14.28%;
    height: 33.333%;
    padding: 10px;
  }
</style>