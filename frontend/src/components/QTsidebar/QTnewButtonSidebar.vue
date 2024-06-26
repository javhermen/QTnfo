<script>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <li class="newFavorite">
    <div @mousedown.left="$emit('pressed')" >
      <!-- <img src="/plus-square-icon.png" alt=""> -->
      <img src="/favorite.png" alt="">
    </div>
  </li>
</template>

<style>
  li.newFavorite {
    width: 75px;
    height: 65px;

    display: flex;

    padding: 10px;

    padding-bottom: 0px;
  }

  li.newFavorite>div {
    text-decoration: none;

    text-align: center;

    cursor: pointer;

    vertical-align: middle;

    /* line-height: 58px; */

    width: 100%;

    background-color: rgb(86, 96, 106);

    border-radius: 100px;
    border-radius: 10px;

    overflow: hidden;

    box-shadow: inset 0px 0px 7px 1px rgb(43, 48, 54);
    /* box-shadow: inset 0px 0px 7px 1px rgb(0, 0, 0); */

    /* background-image: url('/001-a.png'); */

    background-size: cover;

    user-select: none;

    color: var(--color-text);
  }

  li.newFavorite>div>img {
    width: 85%;
    padding-top: 7%;
  }
</style>