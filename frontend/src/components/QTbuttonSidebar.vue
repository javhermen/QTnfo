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
  <li>
    <!-- <a href="vier"> -->
    <RouterLink :to="link"><slot>0</slot></RouterLink>
    <!-- <img src="/001-a.png" alt=""> -->
    <!-- </a> -->
  </li>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  li {
    width: 75px;
    height: 75px;
    height: 65px;


    display: flex;

    padding: 10px;

    padding-bottom: 10px;
    padding-bottom: 0px;
  }

  a {

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

    border-radius: 10px;

    overflow: hidden;

    box-shadow: inset 0px 0px 7px 1px rgb(43, 48, 54);
    /* box-shadow: inset 0px 0px 7px 1px rgb(0, 0, 0); */

    /* background-image: url('/001-a.png'); */

    background-size: cover;
  }

  img {
    width: 100%;
  }
</style>