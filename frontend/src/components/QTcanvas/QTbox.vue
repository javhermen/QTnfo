<script>

  import QTbackground from './QTbackground.vue'
  import QTnote from './QTnote.vue'
  import QTresizer from './QTresizer.vue'

  export default {
    data() {
      return {
        tempX: 50,
        tempY: 50
      }
    },
    components: {
      QTbackground,
      QTnote,
      QTresizer
    },
    props: {
      box: Object,
      camera: Object
    },
    computed: {
      style() {
        return {
          left: this.box.pos.x + this.camera.x+'px',
          top: this.box.pos.y + this.camera.y+'px',
          zIndex: this.box.pos.z,
          width: this.box.dimensions.width+'px',
          height: this.box.dimensions.height+'px'
        }
      }
    },
    methods: {
      drag() {
        this.tempX = this.box.pos.x;
        this.tempY = this.box.pos.y;
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

        
        this.box.pos.x = ((this.tempX/10).toFixed(0)) * 10;
        this.box.pos.y = ((this.tempY/10).toFixed(0)) * 10;
      }
    }
  }

</script>



<template>
  <div :id="box._id" class="box" :style @mouseenter="$emit('entered', { object: 'QTbox', _id: this.box._id })" @mouseleave="$emit('leaved')">
  <!-- <div :id="box._id" class="box" :style @mousedown.left="drag" @mousedown.middle="stopDrag" @mouseup="stopDrag" @mouseenter="$emit('entered', { object: 'QTbox', _id: this.box._id })" @mouseleave="$emit('leaved')"> -->
    <h1 @mouseenter="$emit('entered', { object: 'title', _id: this.box._id })" @mouseleave="$emit('leaved')">{{ box.title }}</h1>

    <div style="overflow: hidden; position: relative;" @mouseenter="$emit('entered', { object: 'interior', _id: this.box._id })" @mouseleave="$emit('leaved')">
      <QTnote v-for="note in box.QTnotes" :note :key="note._id" @entered="(something) => $emit('entered', something)" @leaved="() => $emit('leaved')" />

      <QTbackground />
    </div>

    <QTresizer @entered="(something) => $emit('entered', something)" @leaved="() => $emit('leaved')" />
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

  .box>div {
    position: relative;

    margin-left: 10px;
    margin-right: 10px;

    width: calc(100% - 20px);

    height: calc(100% - 10px - 40px);

    background-color: var(--color-container-background);
    
    filter: brightness(1.2);

    box-shadow: rgba(0, 0, 0, 0.2) inset 0px 0px 10px 2px;

    border-radius: 10px;
  }

  .box>h1 {
    text-align: center;
    user-select: none;
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