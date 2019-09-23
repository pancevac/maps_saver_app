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
              Lorem ipsum dolor sit amet, consectetur ad
              ipiscin elit. Etiam vulputate augue vel felis gra
              vida porta. Lorem ipsum dolor sit amet, cons
              ectetur adipiscing elit.<br>
              Lorem ipsum dolor sit amet, consectetur ad
              ipiscin elit. Etiam vulputate augue vel felis gra
              vida porta. Lorem ipsum dolor sit amet, cons
              ectetur adipiscing elit.
            </p>

            <v-btn
                class="mt-4"
                color="secondary"
                rounded
            >
              Learn More!
            </v-btn>

          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>
  </section>

</template>

<script>

export default {
  name: "Home"
};
</script>
