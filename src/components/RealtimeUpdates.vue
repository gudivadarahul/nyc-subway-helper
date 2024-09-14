<!-- src/components/RealtimeUpdates.vue -->

<template>
  <div>
    <h2>Real-Time Subway Updates</h2>
    <ul v-if="tripUpdates.length">
      <li v-for="(update, index) in tripUpdates" :key="index">
        Route: {{ update.routeId }}, Stop: {{ update.stopId }}, Arrival:
        {{ update.arrivalTime }}, Assigned:
        {{ update.isAssigned ? 'Yes' : 'No' }}
      </li>
    </ul>
    <p v-else>No updates available.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tripUpdates: [],
    };
  },
  mounted() {
    this.fetchUpdates();
  },
  methods: {
    async fetchUpdates() {
      try {
        const response = await axios.get('http://localhost:3001/api/gtfs'); // Make sure the URL matches your backend
        this.tripUpdates = response.data;
      } catch (error) {
        console.error('Error fetching updates:', error);
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
