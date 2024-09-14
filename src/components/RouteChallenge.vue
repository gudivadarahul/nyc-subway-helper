<template>
  <div class="challenge">
    <h2>Real-Time Subway Challenge</h2>
    <p>Check real-time status of trains on the A, C, E lines.</p>

    <div v-if="loading">Loading real-time data...</div>

    <div v-if="!loading && tripUpdates.length > 0">
      <ul>
        <li v-for="(update, index) in tripUpdates" :key="index">
          Train {{ update.routeId }} at {{ update.stopId }} scheduled to arrive
          at {{ update.arrivalTime }}
        </li>
      </ul>
    </div>

    <div v-if="!loading && tripUpdates.length === 0">
      <p>No updates available at the moment.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

const tripUpdates = ref([]);
const loading = ref(true);

const fetchGtfsData = async () => {
  try {
    const response = await axios.get(
      'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
      {
        responseType: 'arraybuffer', // Important: GTFS data is in binary format
      }
    );

    // Decode the binary data using gtfs-realtime-bindings
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data)
    );

    // Extract trip updates from the feed
    tripUpdates.value = feed.entity.map((entity) => ({
      routeId: entity.tripUpdate.trip.routeId,
      stopId: entity.tripUpdate.stopTimeUpdate[0]?.stopId || 'Unknown Stop',
      arrivalTime:
        new Date(
          entity.tripUpdate.stopTimeUpdate[0]?.arrival?.time.low * 1000
        ).toLocaleTimeString() || 'Unknown Time',
    }));

    loading.value = false;
  } catch (error) {
    console.error('Error fetching GTFS data:', error);
    loading.value = false;
  }
};

onMounted(() => {
  fetchGtfsData();
});
</script>

<style scoped>
.challenge {
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 8px;
  text-align: center;
}
</style>
