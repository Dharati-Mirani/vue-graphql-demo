<template>
  <div id="app">
    <h3>Users</h3>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <Users />
  </div>
</template>
<script>
import Users from "./components/Users.vue";

export default {
  name: "App",
  components: {
    Users,
  },
};
</script>

<style scoped>
#app {
  background: #f5f5f5;
}

#container {
  max-width: 550px;
  padding: 8px;
}

h3 {
  text-align: center;
  font-size: x-large;
}
</style>>
