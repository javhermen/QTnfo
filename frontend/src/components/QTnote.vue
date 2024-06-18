<script>
  export default {
    data() {
      return {
        tempX: 50,
        tempY: 50
      }
    },
    props: {
      note: Object,
    },
    computed: {
      style() {
        return {
          left: this.note.pos.x+'px',
          top: this.note.pos.y+'px',
          zIndex: this.note.pos.z,
          width: this.note.dimensions.width+'px',
          height: this.note.dimensions.height+'px'
        }
      }
    },
    methods: {
      drag() {
        this.tempX = this.note.pos.x;
        this.tempY = this.note.pos.y;
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

        
        this.note.pos.x = ((this.tempX/10).toFixed(0)) * 10;
        this.note.pos.y = ((this.tempY/10).toFixed(0)) * 10;
      }
    }
  }

</script>



<template>
  <div :id="note._id" class="note" :style @mousedown.left="drag" @mousedown.middle="stopDrag" @mouseup="stopDrag" @mouseenter="$emit('entered', { object: 'QTnote', _id: this.note._id })" @mouseleave="$emit('leaved')">
  <!-- <div :id="box._id" class="box" ref="box" :style="{left: box.position.x + camera.x+'px', top: box.position.y + camera.y+'px', zIndex: box.position.z, width: box.dimensions.width+'px', height: box.dimensions.height+'px'}" @mousedown="drag"> -->
    <p>{{ note.info }}</p>
  </div>
</template>

<style>
  .note {
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

  .note>div {
    position: relative;

    margin-left: 10px;

    width: 90%;

    height: 150px;

    background-color: var(--color-container-background);
    
    filter: brightness(1.2);

    box-shadow: rgba(0, 0, 0, 0.2) inset 0px 0px 10px 2px;

    border-radius: 10px;
  }

  .note>h1 {
    text-align: center;
    user-select: none;
  }

  .note>p {
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