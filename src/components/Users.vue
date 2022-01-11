<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <users-list />
  </div>
</template>

<script>
import UsersList from "./UsersList.vue";
export default {
  name: "app",
  components: {
    UsersList,
  },
};
</script>