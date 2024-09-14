<template>
  <div class="tutorial">
    <h2>Welcome to the NYC Subway Navigation Tutorial</h2>
    <p>
      Learn how to navigate the subway system, understand the lines, directions,
      and make transfers efficiently.
    </p>

    <!-- Step 1: Understanding Lines -->
    <section v-if="currentStep === 1">
      <h3>Step 1: Understanding Subway Lines</h3>
      <p>
        The NYC subway has multiple lines, each identified by a number or letter
        and color-coded on the map.
      </p>
      <button @click="nextStep">Next</button>
    </section>

    <!-- Step 2: Directional Navigation -->
    <section v-if="currentStep === 2">
      <h3>Step 2: Navigating Directions</h3>
      <p>
        Trains run in two directions: Uptown (North) and Downtown (South). Make
        sure you’re on the right platform!
      </p>
      <button @click="nextStep">Next</button>
    </section>

    <!-- Step 3: Making Transfers -->
    <section v-if="currentStep === 3">
      <h3>Step 3: Making Transfers</h3>
      <p>
        Some routes require transferring between lines. Follow signs and be
        aware of express vs. local trains.
      </p>
      <button @click="restart">Restart Tutorial</button>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentStep = ref(1);

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++;
};

const restart = () => {
  currentStep.value = 1;
};
</script>

<style scoped>
.tutorial {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
</style>
