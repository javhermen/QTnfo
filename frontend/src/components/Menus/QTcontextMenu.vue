<script>
  export default {
    data() {
      return {
        QTcanvasOptions: [
          'Add QTbox',
        ],
        QTboxOptions: [
          'Add QTnote',
          'Change title',
          'Change color',
          'Delete QTbox',
        ],
        QTnoteOptions: [
          'Change info',
          'Change color',
          'Delete QTnote',
        ]
      }
    },
    props: {
      x: Number,
      y: Number,
      snapHoveringOver: Array
    },
    computed: {
      optionsPacks() {
        let result = [this.QTcanvasOptions];

        for (let i = 0; i < this.snapHoveringOver.length; i++) {
          const element = this.snapHoveringOver[i];
          
          switch (element.object) {
            case 'QTbox':
              result.unshift(this.QTboxOptions);
              break;
            case 'QTnote':
              result.unshift(this.QTnoteOptions);
              break;
          
            default:
              break;
          }
        }

        return result;
      }
    }
  }
</script>

<template>
  <div class="contextMenu" :style="{top: y + 'px', left: x + 'px'}" @contextmenu.prevent="">
    <!-- <ul v-for="QTboxOption in QTboxOptions" >
      <li>{{ QTboxOption }}</li>
    </ul> -->

    <ul v-for="optionsPack in optionsPacks" >
      <li v-for="options in optionsPack">
        <span>{{ options }}</span>
        <hr>
      </li>
    </ul>
  </div>
</template>

<style>
  div.contextMenu {
    width: 150px;
    /* height: 200px; */

    border-radius: 10px;

    background-color: blueviolet;

    overflow: hidden;

    position: absolute;

    top: 200px;
    left: 550px;

    z-index: 9999;
  }

  div.contextMenu hr {
    border-color: rgba(255,255,255,0.25);
    margin-left: 5px;
    margin-right: 5px;
  }

  div.contextMenu li:last-child hr {
    border-style: solid;
    border-color: rgba(255,255,255,0.5);
    margin-left: 0px;
    margin-right: 0px;
  }

  div.contextMenu ul:last-child li:last-child hr {
    border: none;
  }

  div.contextMenu li {
    display: flex;
    flex-direction: column;
  }

  div.contextMenu span {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    user-select: none;

    cursor: pointer;
  }

  div.contextMenu span:hover {
    background-color: rgba(0,0,0,0.2)
  }
</style>