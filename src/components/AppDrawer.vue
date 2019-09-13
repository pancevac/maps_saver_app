<template>
  <v-navigation-drawer
      app
      v-model="drawer"
      clipped
  >

    <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
      <v-row align="end" class="lightbox white--text pa-2 fill-height">
        <v-col>
          <div class="subheading">Jonathan Lee</div>
          <div class="body-1">heyfromjonathan@gmail.com</div>
        </v-col>
      </v-row>
    </v-img>

    <v-list dense>
      <v-list-item
        v-for="(link, key) in links"
        :key="key"
        @click="$router.push({name: link.route})"
      >

        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title v-text="link.text"></v-list-item-title>

      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "AppDrawer",

    props: {
      drawer: Boolean
    },

    data: () => ({
      links: [
        {icon: "mdi-home", text: "Trips", route: "trips"},
      ]
    })

  }
</script>