<script>

export default {
  data() {
    return {
      dragging: false
    }
  },
  props: {
    box: Object
  },
  methods: {
    drag(e) {
      if (this.dragging) {
        this.box.position.x = e.movementX + this.box.position.x;
        this.box.position.y = e.movementY + this.box.position.y;
      }
    },
    drag2(e) {
      this.box.position.x = e.movementX + this.box.position.x;
      this.box.position.y = e.movementY + this.box.position.y;
    }
  }
}

</script>



<template>
  <div id="box" ref="box" :style="{left: box.position.x+'px', top: box.position.y+'px', zIndex: box.position.z, width: box.dimensions.width+'px', height: box.dimensions.height+'px'}" @contextmenu.prevent @mousedown="this.dragging = true" @mousemove="drag($event)" @mouseup="this.dragging = false" @mouseleave="this.dragging = false">
  <!-- <div id="box" ref="box" :style="{left: box.position.x+'px', top: box.position.y+'px', zIndex: box.position.z, width: box.dimensions.width+'px', height: box.dimensions.height+'px'}" @contextmenu.prevent @ondrag="drag2"> -->
    <p>X: {{ box.position.x }}</p>
    <p>Y: {{ box.position.y }}</p>
  </div>
</template>

<style>
  #box {
    height: 100px;

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