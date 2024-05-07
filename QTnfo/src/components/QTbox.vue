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

    box-shadow: inset 0px 0px 25px -15px aqua;
  }

  p {
    margin: 10px;
    margin-left: 15px;
  }
</style>