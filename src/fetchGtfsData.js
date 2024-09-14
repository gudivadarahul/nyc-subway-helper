// fetchGtfsData.js

import axios from 'axios';
import protobuf from 'protobufjs'; // Import protobufjs to handle GTFS data parsing

export const fetchGtfsData = async () => {
  try {
    // Load the custom proto file with NYCT extensions
    const root = await protobuf.load('../nyct_subway.proto'); // Ensure the path to your proto file is correct
    const FeedMessage = root.lookupType('transit_realtime.FeedMessage');

    // Fetch the GTFS-RT data
    const response = await axios.get(
      'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace', // GTFS-RT feed for A, C, E lines
      {
        responseType: 'arraybuffer', // Important: GTFS data is in binary format
      }
    );

    // Decode the binary data
    const message = FeedMessage.decode(new Uint8Array(response.data)); // Decode the binary response
    const feed = FeedMessage.toObject(message, { longs: String }); // Convert the decoded data to a JavaScript object

    // Extract trip updates and relevant data
    const tripUpdates = feed.entity
      .map((entity) => {
        if (entity.tripUpdate) {
          const { trip, stopTimeUpdate } = entity.tripUpdate;

          // Safely access the extensions and specific NYCT descriptor
          const nyctTripDescriptor = trip?.extensions?.[1001] || {}; // Fallback to an empty object if undefined

          // Check if stopTimeUpdate is an array and has at least one element
          const firstStopTimeUpdate =
            Array.isArray(stopTimeUpdate) && stopTimeUpdate.length > 0
              ? stopTimeUpdate[0]
              : null;

          return {
            routeId: trip.routeId || 'Unknown Route',
            stopId: firstStopTimeUpdate?.stopId || 'Unknown Stop',
            arrivalTime: firstStopTimeUpdate?.arrival?.time
              ? new Date(
                  firstStopTimeUpdate.arrival.time * 1000
                ).toLocaleTimeString()
              : 'Unknown Time',
            direction: nyctTripDescriptor.direction || 'Unknown Direction',
            isAssigned: nyctTripDescriptor.isAssigned || false,
          };
        }
        return null;
      })
      .filter(Boolean); // Filter out any null values

    return tripUpdates; // Return the extracted trip updates
  } catch (error) {
    console.error('Error fetching or parsing GTFS data:', error);
    throw error;
  }
};
