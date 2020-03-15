<template>
  <section id="welcome" class="hide-overflow">
    <v-layout>
      <v-flex hidden-sm-and-down md6>
        <v-img :lazy-src="activeImg" height="100vh" />
      </v-flex>

      <v-flex xs12 md6 layout :pa-5="$vuetify.breakpoint.smAndDown" wrap>
        <v-layout align-center justify-center>
          <v-flex xs10 md6>
            <h1>Email Confirmation</h1>
            <p class="title font-weight-light" style="line-height: 1.7 !important;">
              Activation link was sent on your email address:
              <b>{{ email }}</b>
            </p>

            <v-btn
              :loading="loading"
              class="mt-4"
              color="secondary"
              rounded
              @click="resendActivationLink"
            >Resend Activation Link</v-btn>
          </v-flex>
        </v-layout>

        <v-snackbar
          v-model="notification.active"
          bottom
          :color="notification.type"
          right
          :timeout="6000"
        >
          {{ notification.message }}
          <v-btn dark text @click="notification = false">Close</v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import backgroundSwitcher from "../mixins/backgroundSwitcher";

export default {
  name: "EmailConfirmation",

  mixins: [backgroundSwitcher],

  data() {
    return {
      email: null,
      loading: false,
      notification: {
        type: "",
        active: false,
        message: ""
      }
    };
  },

  mounted() {
    const userEmail = this.$store.getters["auth/registeredEmail"]

    // this will ensure that user can
    // not visit this page randomly, only if he/she is previously
    // redirected from register page.
    if (!userEmail) {
      this.$router.replace({ name: "home" })
    }

    this.email = userEmail
    this.$store.dispatch("auth/setRegisteredEmail", null)
  },

  methods: {
    /**
     * Request resending email activation link.
     */
    resendActivationLink() {
      this.loading = true
      axios
        .get(`/api/account/resend/${this.email}`)
        .then(res => this.showNotification(res.data.message))
        .catch(err => this.showNotification(err.response.data.error, 'error'))
    },

    showNotification(message, type = "success") {
      this.notification.type = type
      this.notification.message = message
      this.notification.active = true
      this.loading = false
    }
  }
};
</script>
