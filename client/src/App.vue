
<template>
  <div id="app">
    <Navbar/>
    <router-view />


  </div>
</template>



<script >

export default {
  components:{
    Navbar
  },
  name: "App",
};
import Navbar from './components/navbar.vue';
</script>


<style scoped></style>
