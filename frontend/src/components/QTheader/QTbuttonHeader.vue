<script>
  import { RouterLink } from 'vue-router';

  export default {
    props: {
      link: {
        type: String,
        default: "/"
      }
    }
  }
</script>

<template>
  <li class="linkHeader">
    <RouterLink :to="link">
      <slot>
        <img src="/home-icon.png" alt="">
      </slot>
    </RouterLink>
  </li>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  .linkHeader a:-webkit-any-link {
    color: var(--color-text);
    cursor: pointer;
    text-decoration: none;
  }

  li.linkHeader {
    width: 75px;
    height: 75px;
    height: 65px;


    display: flex;

    padding: 10px;

    padding-bottom: 10px;
    padding-bottom: 0px;
  }

  li.linkHeader>a {

    font-family: "Share Tech Mono", monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 50px;

    text-decoration: none;

    text-align: center;

    vertical-align: middle;

    line-height: 58px;

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
  }

  li.linkHeader>a>img {
    width: 85%;
    padding-top: 5%;
  }
</style>