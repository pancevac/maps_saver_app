<template>
  <v-container class="fill-height" fluid :style="{ backgroundImage: 'url(' + activeImg + ')' }">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Reset Password</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-form @submit.prevent="resetPassword">
            <v-card-text>
              
              <v-alert v-if="sendCompleted" type="info">
                <v-row align="center" no-gutters>
                  Check email address: {{ email }}
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

            

            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="danger" type="submit" :loading="loading">Reset password</v-btn>
              <v-btn
                color="primary"
                type="button"
                @click="$router.replace({name: 'login'})"
              >Log in</v-btn>
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
  name: "ResetPassword",

  mixins: [backgroundSwitcher],

  data: () => ({
    loading: false,
    hasError: false,
    sendCompleted: false,
    form: {
      email: ""
    },
    notification: {
      type: "",
      active: false,
      message: ""
    },
  }),

  methods: {
    resetPassword() {
      this.loading = true;
      axios.get(`/api/account/reset-password/${this.form.email}`)
        .then((res) => this.showNotification(res.data.message))
        .catch((err) => {
          this.hasError = true;
          if (err.response.status === 404) {
            this.showNotification('Email address not exist or account is not activated!', 'error')
          }
        })
        .finally(() => this.loading = false)
    },

    showNotification(message, type = "success") {
      this.notification.type = type;
      this.notification.message = message;
      this.notification.active = true;
    }
  }
};
</script>