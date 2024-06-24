<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      message: {type: String, default: 'Are you sure that you want to delete this?'}
    }
  }
</script>

<template>
  <div class="all" >
    <div class="outside" @mousedown.left="$emit('ignored')" ></div>
    <div id="deleteModal">
      <p class="message" >{{ message }}</p>
      <div class="buttons">
        <span class="yesOption" @mousedown.left="$emit('accepted')" >yes</span>
        <span class="noOption" @mousedown.left="$emit('declined')" >no</span>
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

#deleteModal {
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

#deleteModal .message {
  /* border: solid black 1px; */
  padding: 20px;

  font-size: 2em;

  text-align: justify;

  /* height: 200px; */

  display: table-cell;
  vertical-align: middle;

  user-select: none;
}

#deleteModal .buttons {
  display: flex;

  width: 100%;

  height: 50px;

  cursor: pointer;

  /* background-color: rgb(191, 0, 255); */
}

#deleteModal .buttons>span {
  width: 50%;
  height: 100%;

  font-size: 2em;

  text-align: center;

  display: table-cell;
  vertical-align: middle;

  user-select: none;
}

#deleteModal .yesOption {
  background-color: rgba(255, 0, 0, 0.5);
  transition: background-color 0.4s;
}

#deleteModal .noOption {
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.4s;
}

#deleteModal .yesOption:hover {
  background-color: rgba(255, 0, 0, 1);
}

#deleteModal .noOption:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

</style>