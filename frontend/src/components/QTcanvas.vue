<script>
  import QTbox from './QTbox.vue'
  import QTline from './QTline.vue'
  import QTcontextMenu from './Menus/QTcontextMenu.vue'
  import QTbackground from './QTbackground.vue'
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
        hoveringOver: []
      }
    },
    components: {
      QTbox,
      QTline,
      QTcontextMenu,
      QTbackground
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
      move(event) {
        let lastHovered = this.hoveringOver.slice(-1)[0];

        
      },
      setAsHovered(something) {
        this.hoveringOver.push(something);
      },
      deleteAsHovered() {
        this.hoveringOver.pop();
      }
    },
    computed: {
      cameraModded() {
        return {
          x: ((this.camera.x/10).toFixed(0)) * 10,
          y: ((this.camera.y/10).toFixed(0)) * 10,
        }
      },
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
  <div id="main" @mousedown.middle="this.dragging = true" @mousemove="moveCamera" @mouseup="this.dragging = false" @mouseleave="this.dragging = false" @mousedown.left="this.dragging = false">
    <div class="int" @mouseenter="setAsHovered( { object: 'canvas'} )" @mouseleave="deleteAsHovered()" @mousedown.left="move">
      <p>hoveringOver: {{ hoveringOver }}</p>
      <!-- <p>X: {{ cameraModded.x }}</p> -->
      <!-- <p>Y: {{ cameraModded.y }}</p> -->

      <QTbackground :camera="cameraModded" />

      <QTbox v-for="box in boxes" :box :camera="cameraModded" :key="box._id" @entered="setAsHovered" @leaved="deleteAsHovered"/>

      <!-- <QTline :camera="cameraModded" :line="line2"/> -->
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

    box-shadow: black inset 0px 0px 10px 2px;

    border-radius: 15px;

    overflow: hidden;

    position: relative;
  }
</style>