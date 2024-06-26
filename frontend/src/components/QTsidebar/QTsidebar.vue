<script>
  import QTbuttonSidebar from './QTbuttonSidebar.vue';
  import QTnewButtonSidebar from './QTnewButtonSidebar.vue';
  import QTcreateModal from '../Menus/QTcreateModal.vue';
  import apiUrl from '../../assets/apiUrl';
  import axios from 'axios';

  export default {
    data() {
      return {
        rotate: {},
        hide: {},
        QTfavorites: []
      }
    },
    components: {
      QTbuttonSidebar,
      QTnewButtonSidebar,
      QTcreateModal
    },
    beforeCreate() {
      axios
        .get(apiUrl +'QTfavorites')
        .then(response => {
          this.QTfavorites = response.data;
        });
    },
    methods: {
      switchPos() {
        if (!this.rotate.transform) {
          this.rotate = {transform: 'rotate(90deg)'};
          this.hide = {
            marginLeft: '-75px'
          }
        } else {
          this.rotate = {};
          this.hide = {};
        }
      },
      favoriteUrl() {

        let url = '';

        if (this.$route.params.QTnotebook) {
          url += this.$route.params.QTnotebook;
        }

        if (this.$route.params.QTpage) {
          url += '/'+this.$route.params.QTpage;
        }

        axios
          .put(apiUrl +'QTfavorite', { QTfavorite: { url } } )
          .then(response => {
            if (response.data.deleted) {
              this.QTfavorites = this.QTfavorites.filter(e => e.url !== url)
            } else {
              this.QTfavorites.push(response.data);
            }
          });
      }
    }
  }
</script>

<template>
  <aside>
    <div class="aside" :style="hide">
      <ul>
        <QTnewButtonSidebar @pressed="favoriteUrl" />
        <QTbuttonSidebar v-for="QTfavorite in QTfavorites" :link="'/'+QTfavorite.url" />
      </ul>
    </div>
    <div class="handle" @mousedown.left="switchPos">
      <div class="gradUp"></div>
      <span class="material-symbols-outlined" :style="rotate">
        keyboard_arrow_up
      </span>
      <div class="gradDown"></div>
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
    
    margin-left: 15px;
    margin-right: 0px;

    margin-top: 0;
    margin-bottom: 0;
    
    border-radius: 150px;
    border-radius: 15px;

    padding-bottom: 10px;

    box-shadow: black inset 0px 0px 10px 2px;

    position: relative;

    transition: margin 0.5s;
  }

  ul {
    margin: 0;
    padding: 0;

    list-style: none;
  }

  aside div.handle {
    width: 15px;

    display: flex;

    flex-direction: column;

    /* overflow: hidden; */

    cursor: pointer;
  }

  aside div.handle>div {
    /* background-color: rgba(255,255,255,0.25 */

    margin: 15px;

    margin-left: 7px;
    margin-right: 7px;


    width: 1px;
    height: 100%;
  }

  .gradUp {
    background-color: rgba(255,255,255,0.25);
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,0.25) 95%, rgba(255,255,255,0) 100%);
  }

  .gradDown {
    background-color: rgba(255,255,255,0.25);
    background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 5%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%);
  }

  aside .material-symbols-outlined {
    user-select: none;
    margin: -5px;
    transform: rotate(270deg);
    transition: transform 0.5s;
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  }
</style>