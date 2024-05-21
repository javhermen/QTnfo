<script>

export default {
  data() {
    return {
    }
  },
  props: {
    X: Number,
    Y: Number,
    Z: Number
  }
}

</script>



<template>
  <div id="box" ref="box" :style="{left: X+'px', top: Y+'px'}">
    <p>X: {{ X }}</p>
    <p>Y: {{ Y }}</p>
  </div>
</template>

<style>
  #box {
    z-index: 10;
    width: 100px;
    height: 100px;

    position: absolute;

    /*
    top: 50px;
    left: 50px;
    */

    background-color: rgb(27, 48, 73);

    border-radius: 10px;
    /* border-radius: 100%; */

    /* box-shadow: inset 0px 0px 25px -15px aqua; */
    box-shadow: inset 0px 0px 25px -15px rgb(0, 0, 0);
    /* box-shadow: inset 10px -10px 25px -15px rgb(0, 0, 0); */
  }

  p {
    margin: 10px;
    margin-left: 15px;
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