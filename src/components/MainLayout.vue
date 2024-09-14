<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/learn">Learn</router-link></li>
          <li><router-link to="/practice">Practice</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style scoped>
header {
  background-color: #333;
  color: #fff;
  padding: 10px;
}
nav ul {
  display: flex;
  list-style: none;
  gap: 10px;
}
nav a {
  color: #fff;
  text-decoration: none;
}
</style>
