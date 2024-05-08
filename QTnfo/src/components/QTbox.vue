<script>
</script>



<template>
  <div id="box" ref="box">
    <p>X:</p>
    <p>Y:</p>
  </div>
</template>

<style>
  #box {
    width: 100px;
    height: 100px;

    position: absolute;

    top: 50px;
    left: 50px;

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
</style>