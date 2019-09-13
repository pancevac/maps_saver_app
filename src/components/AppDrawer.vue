<template>
  <v-navigation-drawer
      app
      v-model="drawer"
      clipped
  >
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