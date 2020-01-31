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
            src="https://moneydotcomvip.files.wordpress.com/2017/08/route-66.jpg"
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
            <h1>Welcome!</h1>
            <p
                class="title font-weight-light"
                style="line-height: 1.7 !important;"
            >
              Maps Saver is simple SPA Web App for saving maps coordinates by using GPX format.
              It can manage any maps type that support GPX.
              <br><br>Application is build with VueJS framework and using Symfony Framework as backend service.
              <br><br>With sign in, you have ability to store, edit and preview your trips. No registration confirmation mail is needed,
              just register or log in with public account.<br>

              <br>Public account credentials:<br>
              <b>email</b>: admin@mail.com<br>
              <b>password</b>: password
            </p>

            <v-btn
                class="mt-4"
                color="secondary"
                rounded
                @click="$router.replace({name: 'trips'})"
            >
              Check Your Trips
            </v-btn>

          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>
  </section>

</template>

<script>

export default {
  //
};
</script>
