<script>
  import QTbox from './QTbox.vue'
  //const confetti = new JSConfetti()

  export default {
    data() {
      return {
        canWitdh: 300,
        canHeight: 150
      }
    },
    components: {
      QTbox
    },
    mounted() {
      this.showConfetti()

      let canv = this.$refs.myCanvas;

      this.canWitdh = canv.offsetWidth;
      this.canHeight = canv.offsetHeight;
    },
    methods: {
      showConfetti() {
        //confetti.addConfetti()
      },
      drawLine() {
        this.getBetter();
        let canv = this.$refs.myCanvas;


        let canCon = canv.getContext('2d');
        canCon.beginPath();
        canCon.moveTo(0,300);
        // canCon.lineTo(canv.offsetWidth,canv.offsetHeight);
        canCon.lineTo(1920,300);
        // canCon.strokeStyle = "red";
        canCon.lineWidth = 10;
        canCon.stroke();
      },
      getBetter() {
        let canv = this.$refs.myCanvas;

        this.canWitdh = canv.offsetWidth;
        this.canHeight = canv.offsetHeight;
      }
    }
  }
</script>

<template>
  <div id="main">
    <div class="border">
      <div class="int">
      <!-- <div class="int" @click="showConfetti"> -->
        <QTbox />
        <canvas class="int" @click="drawLine" ref="myCanvas" :width="canWitdh" :height="canHeight"></canvas>
      </div>
    </div>
  </div>
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
</style>