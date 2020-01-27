<template>
  <section
      id="welcome"
      class="hide-overflow"
  >
    <v-layout>
      <v-flex
          hidden-sm-and-down
          md6
      >
        <v-img
            :lazy-src="activeImg"
            height="100vh"
        />
      </v-flex>

      <v-flex
          xs12
          md6
          layout
          :pa-5="$vuetify.breakpoint.smAndDown"
          wrap
      >
        <v-layout
            align-center
            justify-center
        >
          <v-flex
              xs10
              md6
          >
            <h1>About</h1>
            <p
                class="title font-weight-light"
                style="line-height: 1.7 !important;"
            >
              Developed with VueJS (Vuex, Vuetify) and Symfony as backend service.
              <br><br>App store GPX format which can be used to describe waypoints, tracks, and routes, with that,
              we can view tracks projected onto various map sources and annotating maps such is Google Maps.
              <br><br>App also support preview feature which project tracks and routes using Google Maps API for a given trip.
              <br><br><b>Repositories</b>
              <br>
              <a
                  style="text-decoration: none"
                  target="_blank"
                  href="https://github.com/pancevac/maps_saver_app">
                <v-icon>mdi-github-circle</v-icon>
                Frontend
              </a>
              <br>
              <a
                  style="text-decoration: none"
                  target="_blank"
                  href="https://github.com/pancevac/maps_saver_symfony">
                <v-icon>mdi-github-circle</v-icon>
                Backend
              </a>
            </p>

            <v-btn
                class="mt-4"
                color="secondary"
                rounded
                @click="$router.replace({name: 'home'})"
            >
              Back to home
            </v-btn>

          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>
  </section>
</template>

<script>
  import backgroundSwitcher from "../mixins/backgroundSwitcher";

  export default {
    name: "About",

    mixins: [backgroundSwitcher],
  }
</script>
