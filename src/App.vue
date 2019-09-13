<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
const defaultLayout = "default";

import Home from "./components/layouts/Home"

export default {
  name: 'App',

  components: {
    Home
  },

  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout
    }
  }
};
</script>
