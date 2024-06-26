<script>
  import QTcontextMenu from '../Menus/QTcontextMenu.vue'
  import QTdeleteModal from '../Menus/QTdeleteModal.vue'
  import QTcreateModal from '../Menus/QTcreateModal.vue'
  import QTpage from './QTpage.vue'
  import apiUrl from '../../assets/apiUrl'
  import axios from 'axios';

  export default {
    data() {
      return {
        QTnotebookID: null,
        pages: null,
        showContextMenu: false,
        showCreateModal: false,
        contextMenuX: 0,
        contextMenuY: 0,
        showDeleteModal: false,
        hoveringOver: [],
        snapHoveringOver: [],
        QTpageID: null,
        invalidNameResponse: false
      }
    },
    components: {
      QTcontextMenu,
      QTdeleteModal,
      QTcreateModal,
      QTpage,
    },
    beforeCreate() {
      axios
        .get(apiUrl+''+this.$route.params.QTnotebook+'/QTpages')
        .then(response => {
          this.pages = response.data.QTpages;
          this.QTnotebookID = response.data._id
        });
    },
    created() {
      this.$watch(
        () => this.$route.params.QTnotebook,
        (newQTnotebook, oldQTnotebook) => {
          axios
            .get(apiUrl+''+newQTnotebook+'/QTpages')
            .then(response => {
              this.pages = response.data.QTpages;
              this.QTnotebookID = response.data._id
            });
        }
      )
    },
    methods: {
      setAsHovered(something) {
        if (something.object === 'QTpageBackground') {
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
          case 'QTpageBackground':
            switch (option.option) {
              case 'add':
                this.showCreateModal = true;
                break;
            
              default:
                break;
            }
            break;
          case 'QTpage':
            switch (option.option) {
              case 'delete':
                this.QTpageID = option.target._id;
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
      addQTpage(input) {

        axios
          .post(apiUrl + this.QTnotebookID + '/QTpage', { QTpage: { name: input } })
          .then(response => {
            if (response.data.invalidName) {
              this.invalidNameResponse = true;
            } else {
              this.showCreateModal = false;
              this.invalidNameResponse = false;
              this.pages.push(response.data);
            }
          });

      },
      deleteQTpage() {
        this.showDeleteModal = false;

        let QTpageID = this.QTpageID;

        axios
          .delete(apiUrl +''+this.QTnotebookID+'/QTpage/'+ QTpageID)
          .then(response => {
            if (response.data.deleted) {
              this.pages = this.pages.filter(e => e._id !== QTpageID)
            } else {
              console.log('something went wrong');
            }
          });

        this.QTpageID = null;
      }
    }
  }
</script>

<template>
  <div id="pagesContainer">
    <div class="int" @mousedown.right="closeContextMenu()" @contextmenu.prevent="openContextMenu" @mouseenter="setAsHovered( { object: 'QTpageBackground'} )" @mouseleave="deleteAsHovered()">
      <ul class="pages">
        <li v-for="page in pages">
          <QTpage :page @mouseenter="setAsHovered( { object: 'QTpage', _id: page._id } )" @mouseleave="deleteAsHovered()"/>
        </li>
      </ul>
    </div>
  </div>

  <QTcreateModal v-if="showCreateModal" @ignored="showCreateModal = false" @accepted="addQTpage" @declined="showCreateModal = false" :invalidNameResponse :message="'What will be the name for the new QTpage?'" />

  <QTdeleteModal v-if="showDeleteModal" @ignored="showDeleteModal = false" @accepted="deleteQTpage" @declined="showDeleteModal = false" :message="'Are you sure that you want to delete this QTpage?'" />

  <QTcontextMenu v-if="showContextMenu" :x="contextMenuX" :y="contextMenuY" :snapHoveringOver @optionPressed="contextMenuHandler" @mouseenter="setAsHovered( { object: 'QTpageBackground'} )" @mouseleave="deleteAsHovered()" ></QTcontextMenu>
</template>

<style>
  div#pagesContainer {
    width: 100%;
    height: 100%;

    display: flex;

    padding-right: 15px;
    padding-bottom: 15px;
  }

  div#pagesContainer>div.int {
    width: 100%;
    height: 100%;

    border-radius: 15px;

    background-color: var(--color-container-background);

    padding: 15px;

    display: flex;

    box-shadow: black inset 0px 0px 10px 2px;
  }

  div#pagesContainer>div.int>ul.pages {
    /* display: flex; */
    flex-wrap: wrap;
    list-style-type: none;
    width: 100%;
    margin: 0px;
    padding: 0;
    /* justify-content: center; */
  }

  div#pagesContainer>div.int>ul.pages>li {
    float: left;
    /* width: 16.666%; */
    width: 14.28%;
    height: 33.333%;
    padding: 10px;
  }
</style>