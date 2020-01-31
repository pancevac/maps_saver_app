<template>
  <v-container
      class="fill-height"
      fluid
      :style="{ backgroundImage: 'url(' + activeImg + ')' }"
  >
    <v-row
        align="center"
        justify="center"
    >
      <v-col
          cols="12"
          sm="8"
          md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
              color="primary"
              dark
              flat
          >
            <v-toolbar-title>Sign In</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-form @submit.prevent="onSingin">
            <v-card-text>
              <b>Default Email:</b> admin@mail.com<br>
              <b>Default password:</b> password
              <v-text-field
                  name="email"
                  label="Email"
                  id="email"
                  v-model="form.email"
                  :error="hasError"
                  type="email"
                  required>
              </v-text-field>

              <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="form.password"
                  :error="hasError"
                  type="password"
                  required>
              </v-text-field>

            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="danger" type="submit" :loading="loading">Sign In</v-btn>
              <v-btn color="primary" type="button" @click="$router.replace({name: 'register'})">Register</v-btn>
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
          <v-btn
              dark
              text
              @click="notification = false"
          >
            Close
          </v-btn>
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
        message: "",
      },
    }),

    methods: {
      onSingin() {

        this.loading = true
        this.$store.dispatch('auth/authRequest', {username: this.form.email, password: this.form.password})
            .then(() => {
              this.$router.replace({name: "trips"})
            })
            .catch(err => {
              this.loading = false
              this.hasError = true
              this.showNotification(err.response.data.message, 'error')
            })
      },

      showNotification(message, type = 'success') {
        this.notification.type = type
        this.notification.message = message
        this.notification.active = true
      }

    },
  }
</script>