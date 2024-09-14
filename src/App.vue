<!-- src/App.vue -->

<template>
  <div id="app">
    <RealtimeUpdates />
  </div>
</template>

<script>
import RealtimeUpdates from './components/RealtimeUpdates.vue';

export default {
  components: {
    RealtimeUpdates,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
