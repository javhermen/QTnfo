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

        let dimension = { width: (maxX-minX), height: (maxY-minY)};

        return dimension;
      },
      calcPos() {
        let maxX = this.line.p1.x > this.line.p2.x ? this.line.p1.x : this.line.p2.x;
        let minX = this.line.p1.x > this.line.p2.x ? this.line.p2.x : this.line.p1.x;

        let maxY = this.line.p1.y > this.line.p2.y ? this.line.p1.y : this.line.p2.y;
        let minY = this.line.p1.y > this.line.p2.y ? this.line.p2.y : this.line.p1.y;

        return { x: minX + this.camera.x, y: minY + this.camera.y}
      },
      drawLine() {
        let dimension = this.calcDimensions();

        let val1 = this.line.p1.x > this.line.p2.x ? dimension.width : 0;
        let val3 = this.line.p1.x > this.line.p2.x ? this.line.p2.x : this.line.p1.x;

        let val2 = this.line.p1.y > this.line.p2.y ? this.line.p2.y : 0;
        let val4 = this.line.p1.y > this.line.p2.y ? this.line.p2.y : this.line.p1.y;



        return 'M ' + val1 + ' ' + val2 + ' '+ (this.line.p2.x - this.line.p1.x) +' '+ (this.line.p2.y - this.line.p1.y);
        return "M 0 20 c 50 0 50 -5 80 -5";
      }
    },
    computed: {
      style() {
        let pos = this.calcPos();
        let dimension = this.calcDimensions();

        return {top: pos.y+'px', left: pos.x+'px', height: dimension.height+'px', width: dimension.width+'px'}
      }
    }
  }
</script>

<template>
  <svg id="svgtest33" :style>
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
    <path :d="drawLine()" marker-start="url(#circleRed)" marker-end="url(#circleRed)" stroke="red" stroke-width="4" fill="none" />
  </svg>
</template>

<style>
  #svgtest33 {
    position: absolute;
  }
</style>