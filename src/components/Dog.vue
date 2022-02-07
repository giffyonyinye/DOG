<template>
  <div>
    <RandomDogList/>
  </div>
</template>

<script>
import RandomDogList from './components/RandomDogList.vue';
export default {
  name: 'App',
  components:{RandomDogList}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
