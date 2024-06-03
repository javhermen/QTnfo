<script>

export default {
  data() {
    return {
      tempX: 50,
      tempY: 50
    }
  },
  props: {
    box: Object,
    camera: Object
  },
  computed: {
    style() {
      return {
        left: this.box.position.x + this.camera.x+'px',
        top: this.box.position.y + this.camera.y+'px',
        zIndex: this.box.position.z,
        width: this.box.dimensions.width+'px',
        height: this.box.dimensions.height+'px'
      }
    }
  },
  methods: {
    drag() {
      this.tempX = this.box.position.x;
      this.tempY = this.box.position.y;
      document.addEventListener("mousemove", this.updatePos);
      document.addEventListener("mouseup", this.stopDrag);
    },
    stopDrag() {
      document.removeEventListener("mousemove", this.updatePos);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    updatePos(e) {
      this.tempX = e.movementX + this.tempX;
      this.tempY = e.movementY + this.tempY;

      
      this.box.position.x = ((this.tempX/10).toFixed(0)) * 10;
      this.box.position.y = ((this.tempY/10).toFixed(0)) * 10;
      // this.box.position.y = e.movementY + this.box.position.y;
    }
  }
}

</script>



<template>
  <div :id="box._id" class="box" :style @mousedown.left="drag" @mousedown.middle="stopDrag" @mouseup="stopDrag">
  <!-- <div :id="box._id" class="box" ref="box" :style="{left: box.position.x + camera.x+'px', top: box.position.y + camera.y+'px', zIndex: box.position.z, width: box.dimensions.width+'px', height: box.dimensions.height+'px'}" @mousedown="drag"> -->
    <p>X: {{ box.position.x }}</p>
    <p>Y: {{ box.position.y }}</p>
  </div>
</template>

<style>
  .box {
    position: absolute;

    /*
    top: 50px;
    left: 50px;
    */

    background-color: rgb(27, 48, 73);

    border-radius: 10px;
    /* border-radius: 100%; */

    /* box-shadow: inset 0px 0px 25px -15px aqua; */
    box-shadow: inset 0px 0px 25px -15px rgb(0, 0, 0);
    /* box-shadow: inset 10px -10px 25px -15px rgb(0, 0, 0); */
  }

  p {
    margin: 10px;
    margin-left: 15px;
    user-select: none;
  }

  /*
  #box::after {
    z-index: 90;
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: rgb(27, 48, 73);

    position: absolute;

    top: 40px;
    right: -10px;

    border-radius: 0px 100% 100% 0px;
  }
  */
</style>