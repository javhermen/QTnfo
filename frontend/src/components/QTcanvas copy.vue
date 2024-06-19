<script>
  import QTbox from './QTbox.vue'
  import QTline from './QTline.vue'
  import QTcontextMenu from './Menus/QTcontextMenu.vue'
  import QTbackground from './QTbackground.vue'
  import axios from 'axios';

  export default {
    data() {
      return {
        camera: {
          x: 0,
          y: 0,
        },
        tempX: 0,
        tempY: 0,
        boxes: null,
        showContextMenu: false,
        contextMenuX: 0,
        contextMenuY: 0,
        hoveringOver: [ { object: 'nothing' } ],
        lastTwoHovered: [],
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
      showQTcontextMenu(event) {
        this.showContextMenu = true;
        this.contextMenuX = event.clientX;
        this.contextMenuY = event.clientY;
      },
      congrats() {
        console.log("congrats! You done did it!1!");
      },
      clickHandler() {
        this.lastTwoHovered = this.hoveringOver.slice(-2);

        switch (this.lastTwoHovered[1].object) {
          case 'canvas':
            document.addEventListener("mousemove", this.updatePos);
            document.addEventListener("mouseup", this.stopDrag);
            break;
          case 'QTbox':

            for (let i = 0; i < this.boxes.length; i++) {
              if (this.boxes[i]._id === this.lastTwoHovered[1]._id) {
                this.tempX = this.boxes[i].pos.x;
                this.tempY = this.boxes[i].pos.y;
                break;
              }
            }

            document.addEventListener("mousemove", this.updatePos);
            document.addEventListener("mouseup", this.stopDrag);
            break;

          case 'title':

            for (let i = 0; i < this.boxes.length; i++) {
              const box = this.boxes[i];
              
              if (box._id === this.lastTwoHovered[0]._id) {
                this.tempX = this.boxes[i].pos.x;
                this.tempY = this.boxes[i].pos.y;
                break;
              }
            }

            document.addEventListener("mousemove", this.updatePos);
            document.addEventListener("mouseup", this.stopDrag);
            break;
          
          case 'QTnote':

            let QTbox = this.lastTwoHovered[0]

            for (let i = 0; i < this.boxes.length; i++) {
              const box = this.boxes[i];
              
              if (box._id === QTbox._id) {

                for (let j = 0; j < this.boxes[i].QTnotes.length; j++) {
                  const note = this.boxes[i].QTnotes[j];
                  
                  if (note._id === this.lastTwoHovered[1]._id) {
                    this.tempX = this.boxes[i].QTnotes[j].pos.x;
                    this.tempY = this.boxes[i].QTnotes[j].pos.y;
                  }
                }

                document.addEventListener("mousemove", this.updatePos);
                document.addEventListener("mouseup", this.stopDrag);
                break;
              }
            }

            break;

          case 'resizer':

            for (let i = 0; i < this.boxes.length; i++) {
              const box = this.boxes[i];
              
              if (box._id === this.lastTwoHovered[0]._id) {
                this.tempX = this.boxes[i].dimensions.width;
                this.tempY = this.boxes[i].dimensions.height;
                break;
              }
            }

            document.addEventListener("mousemove", this.updatePos);
            document.addEventListener("mouseup", this.stopDrag);
            break;
        
          default:
            break;
        }
      },
      updateCamPos(e) {
        this.camera.x = e.movementX + this.camera.x;
        this.camera.y = e.movementY + this.camera.y;
      },
      updateBoxPos(e) {
        for (let i = 0; i < this.boxes.length; i++) {
          const box = this.boxes[i];
          
          if (box._id === this.lastTwoHovered[1]._id) {
            this.tempX = e.movementX + this.tempX;
            this.tempY = e.movementY + this.tempY;

            this.boxes[i].pos.x = ((this.tempX/10).toFixed(0)) * 10;
            this.boxes[i].pos.y = ((this.tempY/10).toFixed(0)) * 10;
            break;
          }
        }
      },
      updateNotePos(e) {
        this.camera.x = e.movementX + this.camera.x;
        this.camera.y = e.movementY + this.camera.y;
      },
      updateResPos(e) {
        this.camera.x = e.movementX + this.camera.x;
        this.camera.y = e.movementY + this.camera.y;
      },
      updatePos(e) {
        switch (this.lastTwoHovered[1].object) {
          case 'canvas':
            this.camera.x = e.movementX + this.camera.x;
            this.camera.y = e.movementY + this.camera.y;
            break;
          case 'QTbox':
            
            for (let i = 0; i < this.boxes.length; i++) {
              const box = this.boxes[i];
              
              if (box._id === this.lastTwoHovered[1]._id) {
                this.tempX = e.movementX + this.tempX;
                this.tempY = e.movementY + this.tempY;

                this.boxes[i].pos.x = ((this.tempX/10).toFixed(0)) * 10;
                this.boxes[i].pos.y = ((this.tempY/10).toFixed(0)) * 10;
                break;
              }
            }
            
            break;

          case 'title':

            for (let i = 0; i < this.boxes.length; i++) {
              const box = this.boxes[i];
              
              if (box._id === this.lastTwoHovered[0]._id) {
                this.tempX = e.movementX + this.tempX;
                this.tempY = e.movementY + this.tempY;

                this.boxes[i].pos.x = ((this.tempX/10).toFixed(0)) * 10;
                this.boxes[i].pos.y = ((this.tempY/10).toFixed(0)) * 10;
                break;
              }
            }
            
            break;

          case 'QTnote':

            let QTbox = this.lastTwoHovered[0];
            
            for (let i = 0; i < this.boxes.length; i++) {
              const box = this.boxes[i];
              
              if (box._id === QTbox._id) {

                for (let j = 0; j < this.boxes[i].QTnotes.length; j++) {
                  const note = this.boxes[i].QTnotes[j];
                  
                  if (note._id === this.lastTwoHovered[1]._id) {

                    this.tempX = e.movementX + this.tempX;
                    this.tempY = e.movementY + this.tempY;

                    this.boxes[i].QTnotes[j].pos.x = ((this.tempX/10).toFixed(0)) * 10;
                    this.boxes[i].QTnotes[j].pos.y = ((this.tempY/10).toFixed(0)) * 10;
                  }
                }
                break;
              }
            }

            break;

          case 'resizer':
            
            for (let i = 0; i < this.boxes.length; i++) {
              const box = this.boxes[i];
              
              if (box._id === this.lastTwoHovered[0]._id) {
                this.tempX = e.movementX + this.tempX;
                this.tempY = e.movementY + this.tempY;

                this.boxes[i].dimensions.width = ((this.tempX/10).toFixed(0)) * 10;
                this.boxes[i].dimensions.height = ((this.tempY/10).toFixed(0)) * 10;
                break;
              }
            }
            
            break;
        
          default:
            break;
        }
      },
      stopDrag() {
        document.removeEventListener("mousemove", this.updatePos);
        document.removeEventListener("mouseup", this.stopDrag);
      },
      setAsHovered(something) {
        this.hoveringOver.push(something);
      },
      deleteAsHovered() {
        this.hoveringOver.pop();
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
          return { _id: 'test2' , p1: { x: x1, y: y1 }, p2: { x: x2, y: y2}, strokeWidth: 4, color: 'green' };
        }

        return { _id: 'test2' , p1: { x: 2, y: 2 }, p2: { x: 2, y: 2}, strokeWidth: 4, color: 'green' };
      }
    }
  }
</script>

<template>
  <div id="main">
    <div class="int" @mouseenter="setAsHovered( { object: 'canvas'} )" @mouseleave="deleteAsHovered()" @mousedown.left="clickHandler">
      <p>hoveringOver: {{ hoveringOver }}</p>
      <!-- <p>X: {{ cameraModded.x }}</p> -->
      <!-- <p>Y: {{ cameraModded.y }}</p> -->

      <QTbackground :camera="cameraModded" />

      <QTbox v-for="box in boxes" :box :camera="cameraModded" :key="box._id" @entered="setAsHovered" @leaved="deleteAsHovered"/>

      <!-- <QTline :camera="cameraModded" :line="line2"/> -->
    </div>
  </div>

  <QTcontextMenu v-if="showContextMenu" :x="contextMenuX" :y="contextMenuY" ></QTcontextMenu>
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