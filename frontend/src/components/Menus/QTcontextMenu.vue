<script>
  export default {
    data() {
      return {
        QTnotebookBackgroundOptions: [
          {text: 'Add QTnotebook', option: 'add', target: { object: 'QTnotebookBackground' }},
        ],
        QTnotebookOptions: [
          {text: 'Delete QTnotebook', option: 'delete', target: { object: 'QTnotebook', _id: '' }},
          {text: 'Rename notebook', option: 'rename', target: { object: 'QTnotebook', _id: '' }},
        ],
        QTpageBackgroundOptions: [
          {text: 'Add QTpage', option: 'add', target: { object: 'QTpageBackground' }},
        ],
        QTpageOptions: [
          {text: 'Delete QTpage', option: 'delete', target: { object: 'QTpage', _id: '' }},
          {text: 'Rename QTpage', option: 'rename', target: { object: 'QTpage', _id: '' }},
        ],
        QTcanvasOptions: [
          {text: 'Add QTbox', option: 'add', target: { object: 'canvas' }},
        ],
        QTboxOptions: [
          {text: 'Add QTnote', option: 'add', target: { object: 'QTbox', _id: '' }},
          // {text: 'Change title', option: 'title', target: { object: 'QTbox', _id: '' }},
          // {text: 'Change color', option: 'color', target: { object: 'QTbox', _id: '' }},
          {text: 'Delete QTbox', option: 'delete', target: { object: 'QTbox', _id: '' }},
        ],
        QTnoteOptions: [
          // {text: 'Change info', option: 'info', target: { object: 'QTnote', _id: '' }, parent: { object: 'QTbox', _id: '' }},
          // {text: 'Change color', option: 'color', target: { object: 'QTnote', _id: '' }, parent: { object: 'QTbox', _id: '' }},
          {text: 'Delete QTnote', option: 'delete', target: { object: 'QTnote', _id: '' }, parent: { object: 'QTbox', _id: '' }},
        ],
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
      optionsPacks() {
        let result = [];
        let QTboxID = '';

        for (let i = 0; i < this.snapHoveringOver.length; i++) {
          const element = this.snapHoveringOver[i];
          
          switch (element.object) {
            case 'canvas': 
              result.unshift(this.QTcanvasOptions);
              break;
            case 'QTnotebookBackground':
              result.unshift(this.QTnotebookBackgroundOptions);
              break;
            case 'QTnotebook':
              let filledQTnotebookOptions = [...this.QTnotebookOptions];

              let QTnotebookID = element._id;

              for (let j = 0; j < filledQTnotebookOptions.length; j++) {
                filledQTnotebookOptions[j].target._id = QTnotebookID;
              }

              result.unshift(filledQTnotebookOptions);
              break;
            case 'QTpageBackground':
              result.unshift(this.QTpageBackgroundOptions);
              break;
            case 'QTpage':
              let filledQTpageOptions = [...this.QTpageOptions];

              let QTpageID = element._id;

              for (let j = 0; j < filledQTpageOptions.length; j++) {
                filledQTpageOptions[j].target._id = QTpageID;
              }

              result.unshift(filledQTpageOptions);
              break;
            case 'QTbox':
              let filledQTboxOptions = [...this.QTboxOptions];

              QTboxID = element._id;

              for (let j = 0; j < filledQTboxOptions.length; j++) {
                filledQTboxOptions[j].target._id = QTboxID;
              }

              result.unshift(filledQTboxOptions);
              break;
            case 'QTnote':
              let filledQTnoteOptions = [...this.QTnoteOptions];

              for (let j = 0; j < filledQTnoteOptions.length; j++) {
                filledQTnoteOptions[j].target._id = element._id;
                filledQTnoteOptions[j].parent._id = QTboxID;
              }

              result.unshift(filledQTnoteOptions);
              break;
          
            default:
              break;
          }
        }

        return result;
      },
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
  <div id="contextMenu" ref="context" :style @contextmenu.prevent="">
    <!-- <ul v-for="QTboxOption in QTboxOptions" >
      <li>{{ QTboxOption }}</li>
    </ul> -->

    <ul v-for="optionsPack in optionsPacks" >
      <li v-for="option in optionsPack">
        <span @mousedown.left="$emit('optionPressed', option)">{{ option.text }}</span>
        <hr>
      </li>
    </ul>
  </div>
</template>

<style>
  div#contextMenu {
    width: 150px;
    /* height: 200px; */

    border-radius: 10px;

    background-color: blueviolet;
    /* background-color: yellow; */

    box-shadow: rgba(0, 0, 0, 0.5) inset 0px 0px 10px 2px;

    /* color: black; */

    overflow: hidden;

    position: absolute;

    top: 200px;
    left: 550px;

    z-index: 99999999;
  }

  div#contextMenu hr {
    border-color: rgba(255,255,255,0.25);
    margin-left: 5px;
    margin-right: 5px;
  }

  div#contextMenu li:last-child hr {
    border-style: solid;
    border-color: rgba(255,255,255,0.5);
    margin-left: 0px;
    margin-right: 0px;
  }

  div#contextMenu ul:last-child li:last-child hr {
    border: none;
  }

  div#contextMenu li {
    display: flex;
    flex-direction: column;
  }

  div#contextMenu span {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    user-select: none;

    cursor: pointer;
  }

  div#contextMenu span:hover {
    background-color: rgba(0,0,0,0.2)
  }
</style>