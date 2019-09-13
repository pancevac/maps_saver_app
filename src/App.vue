<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
const defaultLayout = "Default";

import Home from "./components/layouts/Home"
import Default from "./components/layouts/Default"

export default {
  name: 'App',

  components: {
    Home,
    Default
  },

  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout
    }
  }
};
</script>
