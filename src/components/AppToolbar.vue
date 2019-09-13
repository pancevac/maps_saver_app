<template>
  <v-app-bar
      app
      clipped-left
  >
    <v-app-bar-nav-icon
        v-if="showBarIcon"
        @click="handleDrawerToggle"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-light">Maps Saver</span>
    </v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
    >
      <span class="mr-2">Sing In</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: "AppToolbar",

    props: {
      showBarIcon: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      handleDrawerToggle() {
        this.$emit("toggle-drawer")
      },
    }
  }
</script>