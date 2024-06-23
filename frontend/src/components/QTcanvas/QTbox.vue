<script>

  import QTbackground from './QTbackground.vue'
  import QTnote from './QTnote.vue'
  import QTresizer from './QTresizer.vue'

  export default {
    data() {
      return {
      }
    },
    components: {
      QTbackground,
      QTnote,
      QTresizer
    },
    props: {
      box: Object,
      camera: Object,
      titleWritable: Boolean,
      snapTitleEditor: Array,
      infoWritable: Boolean,
      snapInfoEditor: Array,
    },
    computed: {
      style() {
        return {
          left: this.box.pos.x + this.camera.x+'px',
          top: this.box.pos.y + this.camera.y+'px',
          zIndex: this.box.pos.z,
          backgroundColor: this.box.color,
          width: this.box.dimensions.width+'px',
          height: this.box.dimensions.height+'px'
        }
      },
      styleTitle() {
        if (this.titleWritable && this.snapTitleEditor.slice(-1)[0]._id === this.box._id) {
          setTimeout(() => this.$refs.input.focus(), 1);
          return {
            width: this.box.dimensions.width+'px',
            height: '40px',
            fontSize: '2em',
            backgroundColor: 'rgba(0,0,0,0.2)',
            border: 'none',
            color: 'var(--text-color)',
            textAlign: 'center',
            userSelect: 'none',
          }
        } else {
          return {
            width: this.box.dimensions.width+'px',
            height: '40px',
            fontSize: '2em',
            backgroundColor: 'rgba(0,0,0,0)',
            border: 'none',
            color: 'var(--text-color)',
            textAlign: 'center',
            userSelect: 'none',
            outline: 'none',
            cursor: 'default'
          }
        }
      },
      styleBlocker() {
        if (this.titleWritable && this.snapTitleEditor.slice(-1)[0]._id === this.box._id) {
          return {
            width: 0+'px',
            height: '0px',
          }
        } else {
          return {
            width: this.box.dimensions.width+'px',
            height: '40px',
          }
        }
      }
    }
  }

</script>



<template>
  <div :id="box._id" class="box" :style @mouseenter="$emit('entered', { object: 'QTbox', _id: this.box._id })" @mouseleave="$emit('leaved')">
    <!-- <h1 @mouseenter="$emit('entered', { object: 'title', _id: this.box._id })" @mouseleave="$emit('leaved')">{{ box.title }}</h1> -->
    <div class="title" @mouseenter="$emit('entered', { object: 'title', _id: this.box._id })" @mouseleave="$emit('leaved')">
      <div class="titleBlocker" :style="styleBlocker" ></div>
      <input ref="input" :style="styleTitle" onfocus="this.select();" v-model="box.title" :readonly="!titleWritable" ></input>
    </div>

    <div class="interior" style="overflow: hidden; position: relative;" @mouseenter="$emit('entered', { object: 'interior', _id: this.box._id })" @mouseleave="$emit('leaved')">
      <QTnote v-for="note in box.QTnotes" :note :key="note._id" @entered="(something) => $emit('entered', something)" @leaved="() => $emit('leaved')" :infoWritable :snapInfoEditor />

      <QTbackground />
    </div>

    <QTresizer @mouseenter="$emit('entered', { object: 'resizer', _id: this.box._id })" @mouseleave="$emit('leaved')" />
  </div>
</template>

<style>
  .box {
    position: absolute;

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
  }

  .title {
    position: relative;
  }

  .box>div.interior {
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

  div.titleBlocker {
    position: absolute;

    top: 0;
    left: 0;

    height: 40px;

    /* background-color: aqua; */
  }

  .box>h1 {
    text-align: center;
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