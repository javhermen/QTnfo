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
        contextMenuY: 0
      }
    },
    components: {
      QTbox,
      QTline,
      QTcontextMenu
    },
    beforeCreate() {
      axios
        .get('http://localhost:3050/api/QTnotes')
        // .then(response => this.boxes = response.data);
        .then(response => console.log(response.data));
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
      }
    },
    computed: {
      line2() {
        if (this.boxes) {
          let x1 = this.boxes[0].position.x + 110;
          let y1 = this.boxes[0].position.y + 50;
  
          let x2 = this.boxes[1].position.x - 10;
          let y2 = this.boxes[1].position.y + 50;
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
      <div class="int">
        <p>X: {{ camera.x }}</p>
        <p>Y: {{ camera.y }}</p>
      <!-- <div class="int" @click="showConfetti"> -->

        <!-- <QTbox :X=50 :Y=50 /> -->
        <!-- <QTbox :X=250 :Y=100 /> -->
        <QTbox v-for="box in boxes" :box :camera :key="box._id"/>

        <svg  id="svgtest2" height="124" width="124">
          <marker id="circleWhite" markerWidth="2" markerHeight="2" refX="1" refY="1">
            <circle cx="1" cy="1" r="0.5" fill="white" />
          </marker>

          <path d="M 122 112 Q 122 122 112 122 L 12 122 Q 2 122 2 112 L 2 12 Q 2 2 12 2 L 112 2 Q 122 2 122 10" marker-start="url(#circleWhite)" marker-end="url(#circleWhite)" stroke="white" stroke-width="4" fill="none" />
          <!-- <path d="M 122 112 L 122 122 L 2 122 L 2 2 L 122 2 L 122 10" marker-start="url(#circleWhite)" marker-end="url(#circleWhite)" stroke="white" stroke-width="4" fill="none" /> -->
          <!-- <path d="M 2 2 L 122 2 L 122 10" marker-start="url(#circleWhite)" marker-end="url(#circleWhite)" stroke="white" stroke-width="4" fill="none" /> -->
        </svg>

        <svg id="svgtest" height="200" width="150">
          <defs>
            <marker id="circleRed" markerWidth="2" markerHeight="2" refX="1" refY="1">
              <circle cx="1" cy="1" r="0.5" fill="red" />
            </marker>
            
            <marker id="circleBlu" markerWidth="2" markerHeight="2" refX="1" refY="1">
              <circle cx="1" cy="1" r="0.5" fill="cyan" />
            </marker>
            
            <marker id="circleGreen" markerWidth="2" markerHeight="2" refX="1" refY="1">
              <circle cx="1" cy="1" r="0.5" fill="lime" />
            </marker>

            <marker id="circleBlack" markerWidth="2" markerHeight="2" refX="1" refY="1">
              <circle cx="1" cy="1" r="0.5" fill="black" />
            </marker>
          </defs>

          <!-- <path d="M 0 50 L 100 50" stroke="cyan" stroke-width="4" fill="none" /> -->

          <!-- <path d="M 10 20 c 50 0 50 -5 80 -5" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" /> -->
          <!-- <path d="M 10 10 l 0 20" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" /> -->
          <!-- <path d="M 90 5 l 0 20" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" /> -->

          <!-- <path d="M 10 50 c 40 0 40 50 80 50" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" /> -->
          <!-- <path d="M 10 50 C 75 50 25 100 90 100" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" /> -->
          <path d="M 10 50 C 50 50 50 100 90 100" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" />
          <!-- <path d="M 10 50 C 65 50 35 100 90 100" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" /> -->
          <!-- <path d="M 10 50 C 75 50 25 100 90 100" marker-start="url(#circleGreen)" marker-end="url(#circleGreen)" stroke="lime" stroke-width="4" fill="none" /> -->
          
          <path d="M 50 50 50 50" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" />
          <path d="M 50 100 50 100" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" />

          <path d="M 65 50 65 50" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" />
          <path d="M 35 100 35 100" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" />

          <path d="M 50 75 50 75" marker-start="url(#circleBlack)" marker-end="url(#circleBlack)" stroke="black" stroke-width="4" fill="none" />
          <path d="M 30 62.5 30 62.5" marker-start="url(#circleBlack)" marker-end="url(#circleBlack)" stroke="black" stroke-width="4" fill="none" />
          <path d="M 70 87.5 70 87.5" marker-start="url(#circleBlack)" marker-end="url(#circleBlack)" stroke="black" stroke-width="4" fill="none" />

          <path d="M 75 50 75 50" marker-start="url(#circleGreen)" marker-end="url(#circleGreen)" stroke="green" stroke-width="4" fill="none" />
          <path d="M 25 100 25 100" marker-start="url(#circleGreen)" marker-end="url(#circleGreen)" stroke="green" stroke-width="4" fill="none" />

          <path d="M 0 40 l 0 20" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" />
          <!-- <path d="M 100 90 l 0 20" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" /> -->

          <!-- <path d="M 10 80 c 50 0 50 100 80 100" marker-start="url(#circleGreen)" marker-end="url(#circleGreen)" stroke="lime" stroke-width="4" fill="none" /> -->
          <!-- <path d="M 10 70 l 0 20" marker-start="url(#circleGreen)" marker-end="url(#circleGreen)" stroke="lime" stroke-width="4" fill="none" /> -->
          <!-- <path d="M 90 170 l 0 20" marker-start="url(#circleGreen)" marker-end="url(#circleGreen)" stroke="lime" stroke-width="4" fill="none" /> -->
          <!-- <path d="M 10 0 Q -10 50 10 100" stroke="cyan" fill="none" /> -->
          <!-- <path d="M 10 0 Q -25 50 10 100" stroke="cyan" fill="none" /> -->
        </svg>

        <QTline :camera :line="{ p1: { x: 300, y: 300 }, p2: { x: 500, y: 400} }"/>

        <QTline :camera :line="{ p1: { x: 600, y: 300 }, p2: { x: 800, y: 400}}"/>
        <!-- <QTline :camera :line="{ p1: { x: 600, y: 350 }, p2: { x: 800, y: 350} }"/> -->
        <QTline :camera :line="{ p1: { x: 800, y: 300 }, p2: { x: 600, y: 400}}"/>

        <QTline :camera :line="{ p1: { x: 600, y: 300 }, p2: { x: 700, y: 350}, straight: true }"/>
        <QTline :camera :line="{ p1: { x: 800, y: 300 }, p2: { x: 700, y: 350}, straight: true }"/>

        <QTline :camera :line="{ p1: { x: 900, y: 400 }, p2: { x: 1100, y: 300} }"/>



        <!-- <QTline :camera :line="{ p1: { x: 600, y: 100 }, p2: { x: 700, y: 200} }"/> -->
        <!-- <QTline :camera :line="{ p1: { x: 700, y: 200 }, p2: { x: 800, y: 100} }"/> -->

        <QTline :camera :line="{ p1: { x: 705, y: 225 }, p2: { x: 710, y: 150} }"/>
        <QTline :camera :line="{ p1: { x: 695, y: 225 }, p2: { x: 690, y: 150} }"/>
        <QTline :camera :line="{ p1: { x: 710, y: 150 }, p2: { x: 800, y: 300} }"/>
        <QTline :camera :line="{ p1: { x: 690, y: 150 }, p2: { x: 600, y: 300} }"/>

        <QTline :camera :line="{ p1: { x: 700, y: 225 }, p2: { x: 800, y: 300} }"/>
        <QTline :camera :line="{ p1: { x: 700, y: 225 }, p2: { x: 600, y: 300} }"/>

        <QTline :camera :line="{ p1: { x: 1000, y: 200 }, p2: { x: 1200, y: 200} }"/>
        <QTline :camera :line="{ p1: { x: 1000, y: 100 }, p2: { x: 1200, y: 100} }"/>


        <QTline :camera :line="{ p1: { x: 52, y: 52 }, p2: { x: 150, y: 150}, strokeWidth: 4, straight: true }"/>
        <QTline :camera :line="{ p1: { x: 52, y: 148 }, p2: { x: 150, y: 50}, strokeWidth: 4, straight: true }"/>

        <QTline :camera :line="{ p1: { x: 55, y: 50 }, p2: { x: 150, y: 50}, strokeWidth: 4 }"/>
        <QTline :camera :line="{ p1: { x: 50, y: 55 }, p2: { x: 50, y: 145}, strokeWidth: 4 }"/>
        <QTline :camera :line="{ p1: { x: 150, y: 150 }, p2: { x: 55, y: 150}, strokeWidth: 4 }"/>
        <!-- <QTline :camera :line="{ p1: { x: 150, y: 150 }, p2: { x: 150, y: 50}, strokeWidth: 4 }"/> -->


        <!-- <QTline :camera :line="{ _id: 'test' , p1: { x: 700, y: 100 }, p2: { x: 700, y: 400}, strokeWidth: 4, color: 'cyan' }"/> -->


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
    background-color: rgb(217, 234, 255);

    border-radius: 15px;

    width: 100%;
    height: 100%;

    padding: 10px;

    display: flex;
  }

  div#main div.int {
    width: 100%;
    height: 100%;

    background-color: var(--color-container-background);

    /* background: radial-gradient(circle, rgba(43,48,54,1) 0%, rgba(217,234,255,1) 1000%); */

    box-shadow: inset 0px 0px 20px 2px ;

    border-radius: 10px;

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