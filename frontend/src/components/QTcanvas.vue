<script>
  import QTbox from './QTbox.vue'
  import QTline from './QTline.vue'
  import QTcontextMenu from './Menus/QTcontextMenu.vue'
  import axios from 'axios';

  export default {
    data() {
      return {
        camera: {
          x: 0,
          y: 0,
        },
        boxes: null,
        showContextMenu: false,
        contextMenuX: 0,
        contextMenuY: 0,
        hoveringOver: 'nothing'
      }
    },
    components: {
      QTbox,
      QTline,
      QTcontextMenu
    },
    beforeCreate() {
      axios
        .get('http://192.168.1.145:3050/api/'+this.$route.params.QTnotebook+'/'+this.$route.params.QTpage)
        .then(response => this.boxes = response.data.QTboxes);
    },
    methods: {
      showQTcontextMenu(event) {
        this.showContextMenu = true;
        this.contextMenuX = event.clientX;
        this.contextMenuY = event.clientY;
      },
      moveCamera(event){
        if (this.dragging) {
          this.camera.x = event.movementX + this.camera.x;
          this.camera.y = event.movementY + this.camera.y;
        }
      },
      congrats() {
        console.log("congrats! You done did it!1!");
      },
      stopCam() {
        this.dragging = false;
      },
      setAsHovered(something) {
        this.hoveringOver = something;
      }
    },
    computed: {
      line2() {
        if (this.boxes) {
          let x1 = this.boxes[0].pos.x + 210;
          let y1 = this.boxes[0].pos.y + 100;
  
          let x2 = this.boxes[1].pos.x - 10;
          let y2 = this.boxes[1].pos.y + 100;
          return { _id: 'test2' , p1: { x: x1, y: y1 }, p2: { x: x2, y: y2}, strokeWidth: 4, color: 'green' };
        }

        return { _id: 'test2' , p1: { x: 2, y: 2 }, p2: { x: 2, y: 2}, strokeWidth: 4, color: 'green' };
      }
    }
  }
</script>

<template>
  <!-- <div id="main" @contextmenu.prevent="showQTcontextMenu($event)" @mousedown="showContextMenu = false"> -->
  <div id="main" @mousedown.middle="this.dragging = true" @mousemove="moveCamera" @mouseup="this.dragging = false" @mouseleave="this.dragging = false" @mousedown.left="this.dragging = false">
  <!-- <div id="main" @mousedown="this.dragging = true" @mouseup="this.dragging = false" @mouseleave="this.dragging = false"> -->
    <div class="border">
      <div class="int" @mouseenter="setAsHovered('canvas')" @mouseleave="setAsHovered('nothing')">
        <p>hoveringOver: {{ hoveringOver }}</p>
        <p>X: {{ camera.x }}</p>
        <p>Y: {{ camera.y }}</p>

        <svg width="100%" height="100%" style="position: absolute; top: 0px; left: 0px;">
          <defs>
            <pattern id="polka-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle fill="rgba(0, 0, 0, 0.2)" cx="5" cy="5" r="2">
              </circle>
              <circle fill="rgba(0, 0, 0, 0.3)" cx="15" cy="15" r="1">
              </circle>
            </pattern>
          </defs>

          <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"></rect>
        </svg>

        <QTbox v-for="box in boxes" :box :camera :key="box._id" @entered="setAsHovered" @leaved="setAsHovered"/>

        <QTline :camera :line="line2"/>
      </div>
    </div>
  </div>

  <QTcontextMenu v-if="showContextMenu" :x="contextMenuX" :y="contextMenuY" ></QTcontextMenu>
</template>

<style>
  div#main {
    width: 100%;
    height: 100%;

    display: flex;

    padding-right: 15px;
    padding-bottom: 15px;
  }

  div#main>div.border {
    /* background-color: rgb(217, 234, 255); */

    border-radius: 15px;

    width: 100%;
    height: 100%;

    padding: 2px;
    padding: 0px;

    display: flex;
  }

  div#main div.int {
    width: 100%;
    height: 100%;

    background-color: var(--color-container-background);

    /* background: radial-gradient(circle, rgba(43,48,54,1) 0%, rgba(217,234,255,1) 1000%); */

    /* box-shadow: inset 0px 0px 0px 0px ; */
    box-shadow: black inset 0px 0px 20px 2px;
    box-shadow: black inset 0px 0px 10px 2px;

    border-radius: 13px;
    border-radius: 15px;

    overflow: hidden;

    position: relative;
  }

  #svgtest {
    position: absolute;

    top: 50px;
    left: 150px;
  }

  #svgtest2 {
    position: absolute;

    top: 38px;
    left: 38px;
  }
</style>