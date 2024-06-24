<script>
  import QTcontextMenu from '../Menus/QTcontextMenu.vue'
  import QTdeleteModal from '../Menus/QTdeleteModal.vue'
  import QTnotebook from './QTnotebook.vue'
  import apiUrl from '../../assets/apiUrl'
  import axios from 'axios';

  export default {
    data() {
      return {
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11,12],
        // notebooks: [1,2,3,4,5,6,7,8,9,10,11],
        notebooks: null,
        showContextMenu: false,
        showDeleteModal: false,
        contextMenuX: 0,
        contextMenuY: 0,
        hoveringOver: [],
        snapHoveringOver: [],
        QTnotebookID: null,
      }
    },
    components: {
      QTcontextMenu,
      QTnotebook,
      QTdeleteModal
    },
    beforeCreate() {
      axios
        // .get('http://localhost:3050/api/QTnotebooks')
        .get(apiUrl+'QTnotebooks')
        .then(response => this.notebooks = response.data);
    },
    methods: {
      setAsHovered(something) {
        if (something.object === 'QTnotebookBackground') {
          this.hoveringOver = [something];
        } else {
          this.hoveringOver.push(something);
        }
      },
      deleteAsHovered() {
        this.hoveringOver.pop();
      },
      openContextMenu(e) {

        this.snapHoveringOver = [...this.hoveringOver];

        this.showContextMenu = true;
        this.contextMenuX = e.clientX;
        this.contextMenuY = e.clientY;

        document.addEventListener("mousedown", this.closeContextMenu);
        
      },
      closeContextMenu(e) {
        if (e) {
          if (this.detectLeftButton(e)) {
            this.showContextMenu = false;
            document.removeEventListener("mousedown", this.closeContextMenu);
          }
        } else {
          this.showContextMenu = false;
          document.removeEventListener("mousedown", this.closeContextMenu);
        }

        // this.snapHoveringOver = [];
      },
      detectLeftButton(evt) {
        evt = evt || window.event;
        if ("buttons" in evt) {
          return evt.buttons == 1;
        }
        var button = evt.which || evt.button;
        return button == 1;
      },
      contextMenuHandler(option) {
        switch (option.target.object) {
          case 'QTnotebookBackground':
            switch (option.option) {
              case 'add':
                this.addQTnotebook();
                break;
            
              default:
                break;
            }
            break;
          case 'QTnotebook':
            switch (option.option) {
              case 'delete':
                this.QTnotebookID = option.target._id;
                this.showDeleteModal = true;
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      },
      addQTnotebook() {
        this.showDeleteModal = false;
      },
      deleteQTnotebook() {
        this.showDeleteModal = false;
      }
    }
  }
</script>

<template>
  <div id="notebooksContainer">
    <div class="int" @mousedown.right="closeContextMenu()" @contextmenu.prevent="openContextMenu" @mouseenter="setAsHovered( { object: 'QTnotebookBackground'} )" @mouseleave="deleteAsHovered()">
      <ul class="notebooks">
        <li v-for="notebook in notebooks">
          <QTnotebook :notebook @mouseenter="setAsHovered( { object: 'QTnotebook', _id: notebook._id } )" @mouseleave="deleteAsHovered()"/>
        </li>
      </ul>
    </div>
  </div>

  <QTdeleteModal v-if="showDeleteModal" @ignored="console.log('ignored')" @accepted="deleteQTnotebook" @declined="console.log('declined')" :message="'Are you sure that you want to delete this QTnotebook?'" ></QTdeleteModal>

  <QTcontextMenu v-if="showContextMenu" :x="contextMenuX" :y="contextMenuY" :snapHoveringOver @optionPressed="contextMenuHandler" @mouseenter="setAsHovered( { object: 'QTnotebookBackground'} )" @mouseleave="deleteAsHovered()" ></QTcontextMenu>
</template>

<style>
  div#notebooksContainer {
    width: 100%;
    height: 100%;

    display: flex;

    padding-right: 15px;
    padding-bottom: 15px;
  }

  div#notebooksContainer>div.int {
    width: 100%;
    height: 100%;

    border-radius: 15px;

    background-color: var(--color-container-background);

    padding: 15px;

    display: flex;

    box-shadow: black inset 0px 0px 10px 2px;
  }

  div#notebooksContainer>div.int>ul.notebooks {
    /* display: flex; */
    flex-wrap: wrap;
    list-style-type: none;
    width: 100%;
    margin: 0px;
    padding: 0;
    /* justify-content: center; */
  }

  div#notebooksContainer>div.int>ul.notebooks>li {
    float: left;
    /* width: 16.666%; */
    width: 14.28%;
    height: 33.333%;
    padding: 10px;
  }
</style>