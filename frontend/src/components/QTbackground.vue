<script>
  export default {
    data() {
      return {
        id: null
      }
    },
    props: {
      camera: { type: Object, default: { x: 0, y: 0 } }
    },
    computed: {
      xOffset() {
        return -5 + (this.camera.x % 20)
      },
      yOffset() {
        return -5 + (this.camera.y % 20)
      }
    },
    mounted() {
      this.id = this.$.uid;
    }
  }
</script>

<template>
  <svg width="100%" height="100%" style="position: absolute; top: 0px; left: 0px;">
    <defs>
      <pattern :id="this.id" :x="xOffset" :y="yOffset" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle fill="rgba(0, 0, 0, 0.2)" cx="5" cy="5" r="2">
        </circle>
        <circle fill="rgba(0, 0, 0, 0.3)" cx="15" cy="15" r="1">
        </circle>
      </pattern>
    </defs>

    <rect x="0" y="0" width="100%" height="100%" :fill="'url(#'+this.id+')'"></rect>
  </svg>
</template>