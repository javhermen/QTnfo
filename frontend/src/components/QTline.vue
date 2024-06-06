<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      line: Object,
      camera: Object
    },
    methods: {
      sortLine() {
        let maxX = this.line.p1.x > this.line.p2.x ? this.line.p1.x : this.line.p2.x;
        let minX = this.line.p1.x > this.line.p2.x ? this.line.p2.x : this.line.p1.x;

        let maxY = this.line.p1.y > this.line.p2.y ? this.line.p1.y : this.line.p2.y;
        let minY = this.line.p1.y > this.line.p2.y ? this.line.p2.y : this.line.p1.y;

        return { p1: {}, p2: {}};
      },
      calcDimensions() {
        // casos posibles:
        // { p1: { x: 1, y: 1 }, p2: { x: 1, y: 1 } }
        // { p1: { x: 1, y: 1 }, p2: { x: 2, y: 1 } }
        // { p1: { x: 2, y: 1 }, p2: { x: 1, y: 1 } }

        let maxX = this.line.p1.x > this.line.p2.x ? this.line.p1.x : this.line.p2.x;
        let minX = this.line.p1.x > this.line.p2.x ? this.line.p2.x : this.line.p1.x;

        let maxY = this.line.p1.y > this.line.p2.y ? this.line.p1.y : this.line.p2.y;
        let minY = this.line.p1.y > this.line.p2.y ? this.line.p2.y : this.line.p1.y;

        let dimension = { width: (maxX-minX + this.strokeWidth), height: (maxY-minY + this.strokeWidth)};

        return dimension;
      },
      calcPos() {
        let maxX = this.line.p1.x > this.line.p2.x ? this.line.p1.x : this.line.p2.x;
        let minX = this.line.p1.x > this.line.p2.x ? this.line.p2.x : this.line.p1.x;

        let maxY = this.line.p1.y > this.line.p2.y ? this.line.p1.y : this.line.p2.y;
        let minY = this.line.p1.y > this.line.p2.y ? this.line.p2.y : this.line.p1.y;

        return { x: minX + this.camera.x - (this.strokeWidth/2), y: minY + this.camera.y - (this.strokeWidth/2)}
      },
      drawLine() {
        let dimension = this.calcDimensions();

        let val1 = this.line.p1.x > this.line.p2.x ? dimension.width - (this.strokeWidth/2) : 0 + (this.strokeWidth/2)
        let val3 = this.line.p1.x > this.line.p2.x ? 0 + (this.strokeWidth/2) : (this.line.p2.x - this.line.p1.x + (this.strokeWidth/2));

        let val2 = this.line.p1.y > this.line.p2.y ? dimension.height - (this.strokeWidth/2) : 0 + (this.strokeWidth/2);
        let val4 = this.line.p1.y > this.line.p2.y ? 0 + (this.strokeWidth/2) : (this.line.p2.y - this.line.p1.y + (this.strokeWidth/2));

        let middleX = this.line.p1.y > this.line.p2.y ? ((val3 + (this.strokeWidth/2)) - (val1 - (this.strokeWidth/2))) / 2 : ((val1 + (this.strokeWidth/2)) - (val3 - (this.strokeWidth/2))) / 2;

        middleX = middleX < 0 ? -middleX + this.strokeWidth : middleX;

        return this.line.straight ? 'M ' + val1 + ' ' + val2 + ' ' + val3 + ' ' + val4 : 'M ' + val1 + ' ' + val2 + ' C ' + middleX + ' ' + val2 + ' ' + middleX + ' ' + val4 + ' ' + val3 + ' ' + val4;
        return "M 0 20 c 50 0 50 -5 80 -5";
      },
      drawDot() {
        let dimension = this.calcDimensions();

        let val1 = this.line.p1.x > this.line.p2.x ? dimension.width - (this.strokeWidth/2) : 0 + (this.strokeWidth/2)
        let val3 = this.line.p1.x > this.line.p2.x ? 0 + (this.strokeWidth/2) : (this.line.p2.x - this.line.p1.x + (this.strokeWidth/2));

        let val2 = this.line.p1.y > this.line.p2.y ? dimension.height - (this.strokeWidth/2) : 0 + (this.strokeWidth/2);
        let val4 = this.line.p1.y > this.line.p2.y ? 0 + (this.strokeWidth/2) : (this.line.p2.y - this.line.p1.y + (this.strokeWidth/2));

        // let middleX = ((val3 + (this.strokeWidth/2)) - (val1 - (this.strokeWidth/2))) / 2;
        let middleX = this.line.p1.y > this.line.p2.y ? (val3 - val1) / 2 : (val1 - val3) / 2;
        
        middleX = middleX < 0 ? -middleX + this.strokeWidth/2 : middleX + this.strokeWidth/2;

        return 'M ' + middleX + ' ' + val2 + ' ' + middleX + ' ' + val4;
        return "M 0 20 c 50 0 50 -5 80 -5";
      },
      drawConnector() {
        let dimension = this.calcDimensions();

        let val1 = this.line.p1.x > this.line.p2.x ? dimension.width - (this.strokeWidth/2) : 0 + (this.strokeWidth/2)
        let val3 = this.line.p1.x > this.line.p2.x ? 0 + (this.strokeWidth/2) : (this.line.p2.x - this.line.p1.x + (this.strokeWidth/2));

        let val2 = this.line.p1.y > this.line.p2.y ? dimension.height - (this.strokeWidth/2) : 0 + (this.strokeWidth/2);
        let val4 = this.line.p1.y > this.line.p2.y ? 0 + (this.strokeWidth/2) : (this.line.p2.y - this.line.p1.y + (this.strokeWidth/2));

        // let middleX = ((val3 + (this.strokeWidth/2)) - (val1 - (this.strokeWidth/2))) / 2;
        let middleX = this.line.p1.y > this.line.p2.y ? (val3 - val1) / 2 : (val1 - val3) / 2;
        
        middleX = middleX < 0 ? -middleX + this.strokeWidth/2 : middleX + this.strokeWidth/2;

        return 'M ' + middleX + ' ' + val2 + ' ' + middleX + ' ' + val4;
        return "M 0 20 c 50 0 50 -5 80 -5";
      }
    },
    computed: {
      style() {
        let pos = this.calcPos();
        let dimension = this.calcDimensions();

        return {top: pos.y+'px', left: pos.x+'px', height: dimension.height+'px', width: dimension.width+'px'}
      },
      strokeWidth() {
        if (this.line.strokeWidth) {
          return this.line.strokeWidth;
        } else {
          return 4;
        }
      },
      color() {
        if (this.line.color) {
          return this.line.color;
        } else {
          return "red";
        }
      }
    }
  }
</script>

<template>
  <svg class="line" :style>
    <defs>
      <marker :id="'circle'+this.line._id" markerWidth="2" markerHeight="2" refX="1" refY="1">
        <circle cx="1" cy="1" r="0.5" :fill="color" />
      </marker>
    </defs>

    <!-- <path d="M 0 50 L 100 50" stroke="cyan" stroke-width="4" fill="none" /> -->
    <path :d="drawLine()" :marker-start="'url(#circle'+this.line._id+')'" :marker-end="'url(#circle'+this.line._id+')'" :stroke="color" :stroke-width="strokeWidth" fill="none" />

    <!-- <path :d="drawDot()" :marker-start="'url(#circle'+this.line._id+')'" :marker-end="'url(#circle'+this.line._id+')'" :stroke="color" :stroke-width="strokeWidth" fill="none" /> -->
  </svg>
</template>

<style>
  .line {
    position: absolute;

    /* border: solid 1px black; */
    /* z-index: 100; */
  }
</style>