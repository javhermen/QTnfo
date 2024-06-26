<script>
  export default {
    data() {
      return {
        inputValue: '',
        emptyUserResponse: false,
        emptyUserResponseMessage: 'You have to give a name',
        invalidNameResponseMessage: 'That name is already in use, try another',
      }
    },
    props: {
      message: {type: String, default: 'Are you sure that you want to delete this?'},
      invalidNameResponse: {type: Boolean, default: false},
      renaming: {type: Boolean, default: false},
    },
    methods: {
      accept() {
        if (this.inputValue === '') {
          this.emptyUserResponse = true;
        } else {
          this.$emit('accepted', this.inputValue)
        }
      }
    }
  }
</script>

<template>
  <div class="all" >
    <div class="outside" @mousedown.left="$emit('ignored', inputValue)" ></div>
    <div id="createModal">

      <p v-if="invalidNameResponse" class="message" >{{ invalidNameResponseMessage }}</p>
      <p v-else-if="emptyUserResponse" class="message" >{{ emptyUserResponseMessage }}</p>
      <p v-else class="message" >{{ message }}</p>

      <input type="text" name="" id="createInput" v-model="inputValue">
      <div class="buttons" >
        <span v-if="!renaming" class="yesOption" @mousedown.left="accept" >create</span>
        <span v-else class="yesOption renaming" @mousedown.left="accept" >rename</span>
        <span class="noOption" @mousedown.left="$emit('declined', inputValue)" >discard</span>
      </div>
    </div>
  </div>
</template>

<style>

.all {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;


  overflow: hidden;
}

.outside {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0,0,0,0.6);

  overflow: hidden;
}

#createModal {
  /* height: 250px; */
  width: 500px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: var(--color-container-background);

  border-radius: 15px;

  overflow: hidden;
}

#createModal .message {
  /* border: solid black 1px; */
  padding: 20px;

  font-size: 2em;

  text-align: justify;

  /* height: 200px; */

  display: table-cell;
  vertical-align: middle;

  user-select: none;
}

#createModal .buttons {
  display: flex;

  width: 100%;

  height: 50px;

  cursor: pointer;

  /* background-color: rgb(191, 0, 255); */
}

#createModal .buttons>span {
  width: 50%;
  height: 100%;

  font-size: 2em;

  text-align: center;

  display: table-cell;
  vertical-align: middle;

  user-select: none;
}

#createModal .yesOption {
  background-color: rgba(0, 255, 0, 0.4);
  transition: background-color 0.4s;
}

#createModal .noOption {
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.4s;
}

#createModal .yesOption:hover {
  background-color: rgba(0, 255, 0, 0.6);
}

#createModal .noOption:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

#createInput {
  width: 450px;
  height: 40px;
  font-size: 2em;
  background-color: rgba(0,0,0,0.3);
  border: none;
  border-radius: 10px;
  color: var(--text-color);
  text-align: center;

  padding: 25px;
  margin: 25px;
  margin-top: 0px;
  margin-bottom: 25px;
}

#createModal .renaming {
  background-color: rgba(127, 255, 212, 0.2);
}

#createModal .renaming:hover {
  background-color: rgba(127, 255, 212, 0.5);
}

</style>