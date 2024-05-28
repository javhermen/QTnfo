<script>
  import QTbox from './QTbox.vue'
  import QTcontextMenu from './Menus/QTcontextMenu.vue'
  import axios from 'axios';

  export default {
    data() {
      return {
        canWitdh: 300,
        canHeight: 150,
        boxes: null,
        lol: false,
        QTx: 0,
        QTy: 0
      }
    },
    components: {
      QTbox,
      QTcontextMenu
    },
    mounted() {
      axios
        .get('http://localhost:3050/api/QTnotes')
        .then(response => this.boxes = response.data)
    },
    methods: {
      showQTcontextMenu(event) {
        this.lol = true;
        this.QTx = event.clientX;
        this.QTy = event.clientY;
      }
    }
  }
</script>

<template>
  <!-- <div id="main" @contextmenu.prevent="console.log('you did it!')"> -->
  <div id="main" @contextmenu.prevent="showQTcontextMenu($event)" @mousedown="lol = false">
    <div class="border">
      <div class="int">
      <!-- <div class="int" @click="showConfetti"> -->

        <!-- <QTbox :X=50 :Y=50 /> -->
        <!-- <QTbox :X=250 :Y=100 /> -->
        <QTbox v-for="box in boxes" :box=box :X=box.position.x :Y=box.position.y :key="box._id" />

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
          </defs>

          <!-- <path d="M 0 50 L 100 50" stroke="cyan" stroke-width="4" fill="none" /> -->

          <path d="M 10 20 c 50 0 50 -5 80 -5" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" />
          <path d="M 10 10 l 0 20" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" />
          <path d="M 90 5 l 0 20" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" />

          <path d="M 10 50 c 50 0 50 50 80 50" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" />
          <path d="M 0 40 l 0 20" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" />
          <path d="M 100 90 l 0 20" marker-start="url(#circleBlu)" marker-end="url(#circleBlu)" stroke="cyan" stroke-width="4" fill="none" />

          <path d="M 10 80 c 50 0 50 100 80 100" marker-start="url(#circleGreen)" marker-end="url(#circleGreen)" stroke="lime" stroke-width="4" fill="none" />
          <path d="M 10 70 l 0 20" marker-start="url(#circleGreen)" marker-end="url(#circleGreen)" stroke="lime" stroke-width="4" fill="none" />
          <path d="M 90 170 l 0 20" marker-start="url(#circleGreen)" marker-end="url(#circleGreen)" stroke="lime" stroke-width="4" fill="none" />
          <!-- <path d="M 10 0 Q -10 50 10 100" stroke="cyan" fill="none" /> -->
          <!-- <path d="M 10 0 Q -25 50 10 100" stroke="cyan" fill="none" /> -->
        </svg>
      </div>
    </div>
  </div>

  <QTcontextMenu v-if="lol" :x="QTx" :y="QTy" ></QTcontextMenu>
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

    background-color: rgb(43, 48, 54);

    background: radial-gradient(circle, rgba(43,48,54,1) 0%, rgba(217,234,255,1) 1000%);

    box-shadow: inset 0px 0px 20px 2px ;

    border-radius: 10px;

    overflow: hidden;

    position: relative;
  }

  div#main canvas.int {
    background-color: rgb(43, 48, 54);

    /* background: radial-gradient(circle, rgba(43,48,54,1) 0%, rgba(217,234,255,1) 1000%); */

    box-shadow: inset 0px 0px 20px 2px ;

    border-radius: 10px;

    width: 100%;
    height: 100%;

    /* width: 1780px; */
    /* height: 430px; */

    /* width: calc(100%); */
    /* height: calc(100% - 30px); */
    /* height: 50%; */

    /* display: block; */

    position: absolute;

    /* top: 0; */
    
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