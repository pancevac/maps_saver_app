<template>
  <v-app>

    <app-drawer :drawer="drawer"></app-drawer>
    <app-toolbar :show-bar-icon="true" @toggle-drawer="toggleDrawer"></app-toolbar>

    <v-content>
      <slot/>
    </v-content>

  </v-app>
</template>

<script>
  import AppDrawer from "../AppDrawer";
  import AppToolbar from "../AppToolbar";

  export default {

    name: "Default",

    components: {
      AppDrawer,
      AppToolbar
    },

    data: () => ({
      drawer: true
    }),

    methods: {
      /**
       * Handle event for toggling drawer component.
       */
      toggleDrawer() {
        this.drawer = !this.drawer
      }
    },
  }
</script>