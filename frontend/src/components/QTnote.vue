<script>

  import QTresizer from './QTresizer.vue'

  export default {
    data() {
      return {
      }
    },
    props: {
      note: Object,
    },
    components: {
      QTresizer
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
    }
  }

</script>



<template>
  <div :id="note._id" class="note" :style @mouseenter="$emit('entered', { object: 'QTnote', _id: this.note._id })" @mouseleave="$emit('leaved')">
    <p>{{ note.info }}</p>
    <QTresizer @entered="(something) => $emit('entered', something)" @leaved="() => $emit('leaved')" />
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