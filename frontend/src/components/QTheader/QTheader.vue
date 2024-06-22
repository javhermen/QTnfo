<script>
  import QTbuttonHeader from './QTbuttonHeader.vue'

  export default {
    data() {
      return {
        rotate: {},
        hide: {}
      }
    },
    components: {
      QTbuttonHeader
    },
    methods: {
      switchPos() {
        if (!this.rotate.transform) {
          this.rotate = {transform: 'rotate(180deg)'};
          this.hide = {
            marginTop: '-75px'
          }
        } else {
          this.rotate = {};
          this.hide = {};
        }
      },
    }
  }
</script>

<template>
  <header>
    <div>
      <div class="header" :style="hide">
        <ul>
          <QTbuttonHeader link="/"></QTbuttonHeader>
        </ul>
      </div>
      <div class="handle" @mousedown.left="switchPos">
        <div class="gradLeft"></div>
        <span class="material-symbols-outlined" :style="rotate">
          keyboard_arrow_up
        </span>
        <div class="gradRight"></div>
      </div>
    </div>
  </header>
</template>

<style>
  header {
    width: 100%;
    display: flex;
  }

  header>div {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }

  header>div>div.handle {
    /* background-color: rgb(56, 56, 56); */
    height: 15px;

    width: 100%;

    display: flex;

    overflow: hidden;

    cursor: pointer;
  }

  .grad {
    background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

    background: linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%);
    
    background: radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.25) 95%, rgba(255,255,255,0) 100%);

    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,0.25) 95%, rgba(255,255,255,0) 100%);
  }

  .gradLeft {
    background-color: rgba(255,255,255,0.25);
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,0.25) 95%, rgba(255,255,255,0) 100%);
  }

  .gradRight {
    background-color: rgba(255,255,255,0.25);
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 5%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%);
  }

  header>div>div.handle>div {
    /* background-color: rgba(255,255,255,0.25); */

    margin: 15px;

    margin-top: 7px;
    margin-bottom: 7px;


    width: 100%;
  }


  header .material-symbols-outlined {
    user-select: none;
    margin-top: -4px;
    margin-bottom: -4px;
    transition: transform 0.5s;
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  }


  .header {
    background-color: var(--color-container-background);
    width: 100%;
    
    margin-top: 15px;
  
    border-radius: 15px;

    padding-bottom: 10px;

    box-shadow: black inset 0px 0px 10px 2px;

    overflow: hidden;

    transition: margin 0.5s;
  }

  ul {
    margin: 0;
    padding: 0;

    list-style: none;
  }
</style>