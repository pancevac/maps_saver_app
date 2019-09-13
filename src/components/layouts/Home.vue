<template>
  <v-app>

    <app-toolbar></app-toolbar>

    <v-content>
      <slot/>
    </v-content>

  </v-app>
</template>

<script>
  import AppToolbar from "../AppToolbar";

  export default {
    name: "Home",
    components: {AppToolbar},
  }
</script>