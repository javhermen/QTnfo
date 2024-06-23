<script>
  export default {
    data() {
      return {
        mounted: false
      }
    },
    props: {
      x: Number,
      y: Number,
      snapHoveringOver: Array
    },
    mounted() {
      this.mounted = true;
    },
    computed: {
      style() {
        if (this.mounted) {

          let x = this.x;
          let y = this.y;

          if ((window.innerWidth - 15 - this.$refs.context.clientWidth) < (this.x) ) {
            x = this.x - this.$refs.context.clientWidth;
          }

          if ((window.innerHeight - 15 - this.$refs.context.clientHeight) < (this.y) ) {
            y = this.y - this.$refs.context.clientHeight;
          }

          return {
            top: y + 'px',
            left: x + 'px'
          }
        }
        return {
          top: this.y + 'px',
          left: this.x + 'px'
        }
      }
    }
  }
</script>

<template>
  <input type="text" id="textEditor">
</template>

<style>

</style>