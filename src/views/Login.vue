<template>
  <v-container class="fill-height" fluid :style="{ backgroundImage: 'url(' + activeImg + ')' }">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Sign In</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-form @submit.prevent="onSign">
            <v-card-text>
              <b>Default Email:</b> admin@mail.com
              <br />
              <b>Default password:</b>
              password

              <v-alert v-if="showResendLink" type="warning">
                <v-row align="center" no-gutters>
                  Email not activated. Resend email activation link

                  <v-spacer></v-spacer>
                  <v-col class="shrink">
                    <v-btn 
                      @click="resendActivationLink"
                      :loading="resendLoading"
                      color="danger" 
                      outlined
                    >Resend</v-btn>
                  </v-col>
                </v-row>
              </v-alert>

              <v-text-field
                name="email"
                label="Email"
                id="email"
                v-model="form.email"
                :error="hasError"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                name="password"
                label="Password"
                id="password"
                v-model="form.password"
                :error="hasError"
                type="password"
                required
              ></v-text-field>

            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1">
                <a style="margin-left: 7px" href="#" @click="$router.push({name: 'reset_password'})">Forgot Password?</a>
              </div>
              <v-btn color="danger" type="submit" :loading="loading">Log In</v-btn>
              <v-btn
                color="primary"
                type="button"
                @click="$router.replace({name: 'register'})"
              >Sign up</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>

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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import backgroundSwitcher from "../mixins/backgroundSwitcher";

export default {
  name: "Login",

  mixins: [backgroundSwitcher],

  data: () => ({
    loading: false,
    hasError: false,
    form: {
      email: "",
      password: ""
    },

    notification: {
      type: "",
      active: false,
      message: ""
    },
    resendLoading: false,
    showResendLink: false
  }),

  methods: {
    onSign() {
      this.loading = true;
      this.$store
        .dispatch("auth/authRequest", {
          username: this.form.email,
          password: this.form.password
        })
        .then(() => {
          this.$router.replace({ name: "trips" });
        })
        .catch(err => {
          this.loading = false;
          this.hasError = true;
          this.showNotification(err.response.data.message, "error");
          if (err.response.data.message === 'Account is disabled.') {
            this.showResendLink = true
          }
        });
    },

    showNotification(message, type = "success") {
      this.notification.type = type;
      this.notification.message = message;
      this.notification.active = true;
    },

    /**
     * Request resending email activation link.
     */
    resendActivationLink() {
      this.resendLoading = true
      axios
        .get(`/api/account/resend/${this.form.email}`)
        .then(res => {
          this.showNotification(res.data.message)
          this.resendLoading = false
        })
        .catch(err => {
          this.showNotification(err.response.data.error, 'error')
          this.resendLoading = false
        })
    },
  }
};
</script>