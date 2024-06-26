<script>
  import { RouterLink } from 'vue-router';

  export default {
    data() {
      return {
      }
    },
    computed: {
      nameQTnotebook() {
        if (this.$route.params.QTnotebook) {
          return this.$route.params.QTnotebook;
        } else {
          return false;
        }
      },
      urlQTnotebook() {
        if (this.$route.params.QTnotebook) {
          return '/'+this.$route.params.QTnotebook;
        } else {
          return '/'
        }
      },
      nameQTpage() {
        if (this.$route.params.QTpage) {
          return this.$route.params.QTpage;
        } else {
          return false;
        }
      },
      urlQTpage() {
        if (this.$route.params.QTpage) {
          return '/'+this.$route.params.QTnotebook+'/'+this.$route.params.QTpage;
        } else {
          return '/'
        }
      }
    }
  }
</script>


<template>
  <div v-if="nameQTnotebook" id="breadcrumb" >
    <RouterLink v-if="nameQTnotebook" :to="urlQTnotebook" >
      <h1>{{ nameQTnotebook }}</h1>
    </RouterLink>
    <h1 v-if="nameQTpage" >/</h1>
    <RouterLink v-if="nameQTpage" :to="urlQTpage" >
      <h1>{{ nameQTpage }}</h1>
    </RouterLink>
  </div>
</template>


<style>
  #breadcrumb {
   padding-right: 10px;
   padding-left: 10px;
   
   margin-top: 10px;

   align-content: center;
   display: flex;

   box-shadow: inset 0px 0px 25px -15px rgb(0, 0, 0);

   border-radius: 10px;
   background-color: var(--color-background);
  }

  #breadcrumb h1 {
    text-align: center;
    align-content: center;
    padding-left: 10px;
    padding-right: 10px;
  }

  #breadcrumb a {
    align-content: center;
  }

  #breadcrumb a h1 {
    border-radius: 10px;
    transition: box-shadow 0.4s;
    box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.2);
  }

  #breadcrumb a:hover h1 {
    box-shadow: 0px 0px 0px 2px rgb(255, 255, 255);
  }
</style>