<script>
export default {
  mounted() {
    this.dragElement(this.$refs.box);
  },
  methods: {
    dragElement(elmnt) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      elmnt.onmousedown = dragMouseDown;

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }
}
</script>



<template>
  <div id="box" ref="box">
    <p>X:{{ pos1 }}</p>
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

    box-shadow: 0px 0px 13px -5px aqua;
  }
</style>