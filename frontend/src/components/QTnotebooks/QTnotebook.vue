<script>
  import { RouterLink } from 'vue-router';

  export default {
    data() {
      return {
      }
    },
    props: {
      notebook: Object,
    },
    computed: {
      style() {
        return {
          color: this.notebook.color,
          backgroundColor: this.notebook.color
        }
      },
      url() {
        if (this.notebook.static) {
          return 'new_notebook';
        } else {
          return this.notebook.name;
        }
      }
    }
  }
</script>

<template>
  <RouterLink class="notebook" :to="url" :style >
    <div class="int">
      <div class="title">
        <!-- <h1>Book of horrors test test test test test test test test</h1> -->
        <!-- <h1>Book of horrors test</h1> -->
        <h1>{{ this.notebook.name }}</h1>
        <!-- <h1>Book</h1> -->
      </div>
      <div class="image">
        <!-- <img src="/001-a.png" alt=""> -->
        <!-- <img src="/bad_omen.png" alt=""> -->
        <!-- <img src="/CrossHairQuote.gif" alt=""> -->
        <!-- <img src="/DabLuigi.png" alt=""> -->
        <!-- <img src="/DVD.gif" alt=""> -->
        <!-- <img src="/niko_blend.png" alt=""> -->
        <!-- <img src="/necoArk_pills.png" alt=""> -->
        <!-- <img src="/FunnyBoneMan.gif" alt=""> -->
      </div>
    </div>
  </RouterLink>
</template>

<style>
  a:-webkit-any-link {
    color: var(--color-text);
    cursor: pointer;
    text-decoration: none;
  }

  a.notebook {
    width: 100%;
    height: 100%;

    display: flex;

    /* background-color: var(--color-background); */
    /* background-color: #6464ff; */
    /* background-color: rgb(0, 0, 95); */

    border-radius: 10px 5px 5px 10px;
    transition: transform 1s;

    text-decoration: none;

    user-select: none;
  }

  a.notebook:hover {
    transition: transform 0.2s;
    transform: scale(1.05);
  }

  a.notebook::before {
    content: "";

    width: 3px;
    /* height: 270px; */

    margin: 5px 15px;

    background-color: rgba(0, 0, 0, 0.25);

    border-radius: 5px 5px 5px 5px;
  }

  a.notebook>div.int {
    width: calc(100% - (33px + 15px));
    height: 100%;
    display: flex;

    flex-direction: column;
  }

  a.notebook>div.int>div.title>h1 {
    max-height: 60px;
    /* overflow: hidden; */
    /* color: aliceblue; */
    color: var(--color-text);
    text-decoration: none;

    /* filter: invert(1); */

    line-height: 1em;
  }

  a.notebook>div.int>div.title {
    text-align: center;
    align-content: center;
    height: 80px;
    min-height: 80px;
    overflow: hidden;
  }

  a.notebook>div.int>div.image {
    width: calc(100%);
    /* height: calc(100% - 80px); */
    height: 173.33px;
    /* height: 133.33px; */
    /* height: 70%; */

    border-radius: 10px 10px 0 0 ;

    padding: 0;
    margin: 0;

    /* display: flex */
  }

  a.notebook>div.int>div.image>img {
    width: 100%;
    height: 100%;
    /* height: 70%; */

    border-radius: 10px 10px 0 0;

    padding: 0;
    margin: 0;

    display: inline;
  }
</style>