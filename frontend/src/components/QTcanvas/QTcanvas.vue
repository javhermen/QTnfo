<script>
  import QTbox from './QTbox.vue'
  import QTline from './QTline.vue'
  import QTcontextMenu from '../Menus/QTcontextMenu.vue'
  import QTbackground from './QTbackground.vue'
  import axios from 'axios';

  export default {
    data() {
      return {
        camera: {
          x: 0,
          y: 0,
        },
        tempData: {},
        timer: [],
        boxes: null,
        showContextMenu: false,
        contextMenuX: 0,
        contextMenuY: 0,
        hoveringOver: [],
        snapHoveringOver: []
      }
    },
    components: {
      QTbox,
      QTline,
      QTcontextMenu,
      QTbackground
    },
    beforeCreate() {
      axios
        .get('http://192.168.1.145:3050/api/'+this.$route.params.QTnotebook+'/'+this.$route.params.QTpage)
        .then(response => this.boxes = response.data.QTboxes);
    },
    methods: {
      congrats() {
        console.log("congrats! You done did it!1!");
      },
      clickHandler() {
        this.snapHoveringOver = [...this.hoveringOver];

        let self = this;

        if (this.timer.length === 1) {
          clearInterval(this.timer[0].timer);
          
          this.timer = [];
        } else {

          this.timer.push({
            timer: setTimeout(function() { self.timer = []; }, 500)
          });

          this.prepareTempVars();
  
          document.addEventListener("mousemove", this.eventHandler);
          document.addEventListener("mouseup", this.stopEventHandler);
        }
      },
      prepareTempVars() {
        let lastHovered = this.snapHoveringOver.slice(-1)[0];
        let beforeLastHovered = this.snapHoveringOver.slice(-2)[0];

        switch (lastHovered.object) {
          case 'canvas':
            this.tempData = {};
            break;
          case 'interior':
          case 'QTbox':
            for (let i = 0; i < this.boxes.length; i++) {
              if (this.boxes[i]._id === lastHovered._id) {
                this.tempData = {
                  QTboxIndex: i,
                  pos: {
                    x: this.boxes[i].pos.x,
                    y: this.boxes[i].pos.y
                  }
                }
                break;
              }
            }
            break;
          case 'title':
            for (let i = 0; i < this.boxes.length; i++) {
              if (this.boxes[i]._id === beforeLastHovered._id) {
                this.tempData = {
                  QTboxIndex: i,
                  pos: {
                    x: this.boxes[i].pos.x,
                    y: this.boxes[i].pos.y
                  }
                }
                break;
              }
            }
            break;

          case 'resizer':
            if (beforeLastHovered.object === 'QTbox') {
              for (let i = 0; i < this.boxes.length; i++) {
                if (this.boxes[i]._id === beforeLastHovered._id) {
                  this.tempData = {
                    QTboxIndex: i,
                    dimensions: {
                      width: this.boxes[i].dimensions.width,
                      height: this.boxes[i].dimensions.height
                    }
                  }
                  break;
                }
              }
            } else {
              for (let i = 0; i < this.boxes.length; i++) {
                if (this.boxes[i]._id === this.snapHoveringOver.slice(-3)[0]._id) {
                  for (let j = 0; j < this.boxes[i].QTnotes.length; j++) {
                    if (this.boxes[i].QTnotes[j]._id === beforeLastHovered._id) {
                      this.tempData = {
                        QTboxIndex: i,
                        QTnoteIndex: j,
                        dimensions: {
                          width: this.boxes[i].QTnotes[j].dimensions.width,
                          height: this.boxes[i].QTnotes[j].dimensions.height
                        }
                      }
                      break;
                    }
                  }
                  break;
                }
              }
            }
            break;

          case 'QTnote':
            for (let i = 0; i < this.boxes.length; i++) {
              if (this.boxes[i]._id === beforeLastHovered._id) {
                for (let j = 0; j < this.boxes[i].QTnotes.length; j++) {
                  if (this.boxes[i].QTnotes[j]._id === lastHovered._id) {
                    this.tempData = {
                      QTboxIndex: i,
                      QTnoteIndex: j,
                      pos: {
                        x: this.boxes[i].QTnotes[j].pos.x,
                        y: this.boxes[i].QTnotes[j].pos.y
                      }
                    }
                    break;
                  }
                }
                break;
              }
            }
            break;
        
          default:
            this.tempData = {};
            break;
        }
      },
      eventHandler(e) {
        for (let i = 0; i < this.timer.length; i++) {
          clearTimeout(this.timer[i].timer);
        }
        this.timer = [];

        let lastHovered = this.snapHoveringOver.slice(-1)[0];
        let beforeLastHovered = this.snapHoveringOver.slice(-2)[0];

        switch (lastHovered.object) {
          case 'canvas':
            this.updateCamPos(e);
            break;
          case 'interior':
          case 'QTbox':
            this.updateBoxPos(e);
            break;
          case 'title':
            this.updateBoxPos(e);
            break;
          case 'resizer':
            if (beforeLastHovered.object === 'QTbox') {
              this.updateBoxDimensions(e);
            } else {
              this.updateNoteDimensions(e);
            }
            break;
          case 'QTnote':
            this.updateNotePos(e);
            break;
          default:
            break;
        }
      },
      stopEventHandler() {
        this.removeEventsListeners();
        this.cleanTempData();
      },
      removeEventsListeners() {
        document.removeEventListener("mousemove", this.eventHandler);
        document.removeEventListener("mouseup", this.stopEventHandler);
      },
      cleanTempData() {
        this.tempData = {};
        this.snapHoveringOver = [];
      },
      updateCamPos(e) {
        this.camera.x = e.movementX + this.camera.x;
        this.camera.y = e.movementY + this.camera.y;
      },
      updateBoxPos(e) {
        this.tempData.pos.x = e.movementX + this.tempData.pos.x;
        this.tempData.pos.y = e.movementY + this.tempData.pos.y;

        this.boxes[this.tempData.QTboxIndex].pos.x = ((this.tempData.pos.x/10).toFixed(0)) * 10;
        this.boxes[this.tempData.QTboxIndex].pos.y = ((this.tempData.pos.y/10).toFixed(0)) * 10;
      },
      updateNotePos(e) {
        this.tempData.pos.x = e.movementX + this.tempData.pos.x;
        this.tempData.pos.y = e.movementY + this.tempData.pos.y;

        this.boxes[this.tempData.QTboxIndex].QTnotes[this.tempData.QTnoteIndex].pos.x = ((this.tempData.pos.x/10).toFixed(0)) * 10;
        this.boxes[this.tempData.QTboxIndex].QTnotes[this.tempData.QTnoteIndex].pos.y = ((this.tempData.pos.y/10).toFixed(0)) * 10;
      },
      updateBoxDimensions(e) {
        this.tempData.dimensions.width = e.movementX + this.tempData.dimensions.width;
        this.tempData.dimensions.height = e.movementY + this.tempData.dimensions.height;

        this.boxes[this.tempData.QTboxIndex].dimensions.width = this.tempData.dimensions.width > 60 ? ((this.tempData.dimensions.width/10).toFixed(0)) * 10 : 60;
        this.boxes[this.tempData.QTboxIndex].dimensions.height = this.tempData.dimensions.height > 60 ? ((this.tempData.dimensions.height/10).toFixed(0)) * 10 : 60;
      },
      updateNoteDimensions(e) {
        this.tempData.dimensions.width = e.movementX + this.tempData.dimensions.width;
        this.tempData.dimensions.height = e.movementY + this.tempData.dimensions.height;

        this.boxes[this.tempData.QTboxIndex].QTnotes[this.tempData.QTnoteIndex].dimensions.width = this.tempData.dimensions.width > 20 ? ((this.tempData.dimensions.width/10).toFixed(0)) * 10 : 20;
        this.boxes[this.tempData.QTboxIndex].QTnotes[this.tempData.QTnoteIndex].dimensions.height = this.tempData.dimensions.height > 40 ? ((this.tempData.dimensions.height/10).toFixed(0)) * 10 : 40;
      },
      setAsHovered(something) {
        this.hoveringOver.push(something);
      },
      deleteAsHovered() {
        this.hoveringOver.pop();
      },
      dblclickHandler() {
        this.congrats();
        this.removeEventsListeners();
      },
      openContextMenu(e) {
        this.snapHoveringOver = [...this.hoveringOver];

        this.showContextMenu = true;
        this.contextMenuX = e.clientX;
        this.contextMenuY = e.clientY;

        document.addEventListener("mousedown", this.closeContextMenu);
      },
      closeContextMenu() {
        if (this.hoveringOver.length === 0) {
          this.showContextMenu = false;
          document.removeEventListener("mousedown", this.closeContextMenu);
        } else if (this.hoveringOver[0].object !== 'contextMenu') {
          this.showContextMenu = false;
          document.removeEventListener("mousedown", this.closeContextMenu);
        }
      }
    },
    computed: {
      cameraModded() {
        return {
          x: ((this.camera.x/10).toFixed(0)) * 10,
          y: ((this.camera.y/10).toFixed(0)) * 10,
        }
      },
      line2() {
        if (this.boxes) {
          let x1 = this.boxes[0].pos.x + 210;
          let y1 = this.boxes[0].pos.y + 100;
  
          let x2 = this.boxes[1].pos.x - 10;
          let y2 = this.boxes[1].pos.y + 100;
          return { _id: 'test2' , p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 }, strokeWidth: 4, color: 'green' };
        }

        return { _id: 'test2' , p1: { x: 2, y: 2 }, p2: { x: 2, y: 2}, strokeWidth: 4, color: 'green' };
      }
    }
  }
</script>

<template>
  <div id="main">
    <div class="int" ref="int" @mouseenter="setAsHovered( { object: 'canvas'} )" @mouseleave="deleteAsHovered()" @mousedown.left="clickHandler" @contextmenu.prevent="openContextMenu">
      <p>hoveringOver: {{ hoveringOver }}</p>
      <!-- <p>X: {{ cameraModded.x }}</p> -->
      <!-- <p>Y: {{ cameraModded.y }}</p> -->

      <QTbackground :camera="cameraModded" />

      <QTbox v-for="box in boxes" :box :camera="cameraModded" :key="box._id" @entered="setAsHovered" @leaved="deleteAsHovered"/>

      <!-- <QTline :camera="cameraModded" :line="line2"/> -->
    </div>
  </div>

  <QTcontextMenu v-if="showContextMenu" :x="contextMenuX" :y="contextMenuY" :snapHoveringOver @mouseenter="setAsHovered( { object: 'contextMenu'} )" @mouseleave="deleteAsHovered()" ></QTcontextMenu>
</template>

<style>
  div#main {
    width: 100%;
    height: 100%;

    display: flex;

    padding-right: 15px;
    padding-bottom: 15px;
  }

  div#main>div.border {
    /* background-color: rgb(217, 234, 255); */

    border-radius: 15px;

    width: 100%;
    height: 100%;

    padding: 2px;
    padding: 0px;

    display: flex;
  }

  div#main div.int {
    width: 100%;
    height: 100%;

    background-color: var(--color-container-background);

    box-shadow: black inset 0px 0px 10px 2px;

    border-radius: 15px;

    overflow: hidden;

    position: relative;
  }
</style>