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
      <span class="font-weight-light">
        <router-link
            style="text-decoration: none; color: rgba(0, 0, 0, 0.87)"
            :to="{name: 'home'}"
        >
          Maps Saver
        </router-link>
      </span>
    </v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-toolbar-items>
      <v-btn text @click="$router.replace({name: 'about'})">About</v-btn>
    </v-toolbar-items>

    <v-btn
        v-if="!isAuth"
        text
        @click="$router.replace({name: 'login'})"
        target="_blank"
    >
      <span class="mr-2">Log In</span>
    </v-btn>
    <v-btn v-if="isAuth">
      <span @click="singOut" class="mr-2">Logout</span>
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

    computed: {
      isAuth() {
        return this.$store.getters['auth/isAuth']
      }
    },

    methods: {
      handleDrawerToggle() {
        this.$emit("toggle-drawer")
      },

      singOut() {
        this.$store.dispatch('auth/authLogout').then(() => {
          this.$router.replace({name: "home"})
        })
      }
    }
  }
</script>