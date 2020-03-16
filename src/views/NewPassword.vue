<template>
  <v-container class="fill-height" fluid :style="{ backgroundImage: 'url(' + activeImg + ')' }">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>New Password</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-form @submit.prevent="newPassword">
            <v-card-text>
              <v-text-field
                name="password"
                label="New Password"
                id="password"
                v-model="form.password"
                :error="hasError"
                :error-messages="errors ? errors.password : null"
                type="password"
                required
              ></v-text-field>

              <v-text-field
                name="password_confirm"
                label="Repeat Password"
                id="password_repeat"
                v-model="form.repeatPassword"
                type="password"
                :rules="[passwordConfirmationRule]"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="danger" type="submit" :loading="loading">Save Password</v-btn>
              <v-btn color="primary" type="button" @click="$router.replace({name: 'login'})">Log in</v-btn>
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
  name: "NewPassword",

  mixins: [backgroundSwitcher],

  data: () => ({
    loading: false,
    hasError: false,
    errors: {
      password: null
    },
    form: {
      password: "",
      repeatPassword: ""
    },
    token: null,
    notification: {
      type: "",
      active: false,
      message: ""
    }
  }),

  mounted() {
    this.token = this.$route.params.token;
    if (!this.token) {
      this.$router.replace({ name: "home" });
    }
  },

  computed: {
    passwordConfirmationRule() {
      return () => (this.form.password === this.form.repeatPassword) || 'Password must match'
    },
  },

  methods: {
    newPassword() {

      if (this.form.password !== this.form.repeatPassword) {
        return;
      }

      this.loading = true;
      this.hasError = false;

      axios
        .put(`/api/account/new-password/${this.token}`, {
          password: this.form.password
        })
        .then(this.handleSuccess)
        .catch(this.handleReject)
        .finally(() => this.loading = false)
    },

    showNotification(message, type = "success") {
      this.notification.type = type;
      this.notification.message = message;
      this.notification.active = true;
    },

    handleSuccess(res) {
      this.$router.replace({ name: "login" });
    },

    handleReject(err) {
      if (err.response.status === 404) {
        this.showNotification(
          "Email address not exist or account is not activated!",
          "error"
        );
      } else if (err.response.status === 422) {
        this.hasError = true;
        this.errors = err.response.data;
      } else {
        this.showNotification(err.response.data.error, "error");
      }
    }
  }
};
</script>