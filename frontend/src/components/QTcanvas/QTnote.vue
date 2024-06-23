<script>

  import QTresizer from './QTresizer.vue'

  export default {
    data() {
      return {
      }
    },
    props: {
      note: Object,
      infoWritable: Boolean,
      snapInfoEditor: Array,
    },
    components: {
      QTresizer
    },
    computed: {
      style() {
        return {
          left: this.note.pos.x+'px',
          top: this.note.pos.y+'px',
          backgroundColor: this.note.color,
          width: this.note.dimensions.width+'px',
          height: this.note.dimensions.height+'px'
        }
      },
      styleIn() {
        if (this.infoWritable && this.snapInfoEditor.slice(-1)[0]._id === this.note._id) {
          setTimeout(() => this.$refs.input.focus(), 1);
          return {
            left: this.note.pos.x+'px',
            top: this.note.pos.y+'px',
            backgroundColor: 'rgba(0,0,0,0)',
            border: 'none',
            color: 'var(--text-color)',
            width: this.note.dimensions.width+'px',
            height: this.note.dimensions.height+'px'
          }
        } else {
          return {
            left: this.note.pos.x+'px',
            top: this.note.pos.y+'px',
            backgroundColor: 'rgba(0,0,0,0)',
            border: 'none',
            color: 'var(--text-color)',
            width: this.note.dimensions.width+'px',
            height: this.note.dimensions.height+'px'
          }
        }
        
      },
      styleBlocker() {
        if (this.infoWritable && this.snapInfoEditor.slice(-1)[0]._id === this.note._id) {
          return {
            width: 0+'px',
            height: '0px',
          }
        } else {
          return {
          width: this.note.dimensions.width+'px',
          height: this.note.dimensions.height+'px'
        }
        }
      }
    }
  }

</script>



<template>
  <div :id="note._id" class="note" :style @mouseenter="$emit('entered', { object: 'QTnote', _id: this.note._id })" @mouseleave="$emit('leaved')">
    <!-- <div class="title" @mouseenter="$emit('entered', { object: 'title', _id: this.box._id })" @mouseleave="$emit('leaved')">
      <div v-if="ifBlocker" class="titleBlocker" :style="styleBlocker" ></div>
      <input ref="input" :style="styleTitle" onfocus="this.select();" v-model="box.title" :readonly="!titleWritable" ></input>
    </div>
    <p>{{ note.info }}</p> -->
    <div class="infoBlocker" :style="styleBlocker" ></div>
    <textarea ref="input" :style="styleIn" onfocus="this.select();" v-model="note.info" :readonly="!infoWritable" ></textarea>
    <QTresizer @mouseenter="$emit('entered', { object: 'resizer', _id: this.note._id })" @mouseleave="$emit('leaved')" />
  </div>
</template>

<style>
  .note {
    position: absolute;

    z-index: 2;
    /*
    top: 50px;
    left: 50px;
    */

    /* background-color: rgb(27, 48, 73); */

    border-radius: 10px;
    /* border-radius: 100%; */

    /* box-shadow: inset 0px 0px 25px -15px aqua; */
    box-shadow: inset 0px 0px 25px -15px rgb(0, 0, 0);
    /* box-shadow: inset 10px -10px 25px -15px rgb(0, 0, 0); */

    /* overflow: hidden; */
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

  div.infoBlocker {
    position: absolute;

    top: 0;
    left: 0;

    /* background-color: aqua; */
  }

  textarea {
    resize: none;
    overflow: hidden;
    padding: 12px;
    padding-bottom: 0px;
    text-align: justify;
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