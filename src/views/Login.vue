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
              <v-text-field
                  name="email"
                  label="Email"
                  id="email"
                  v-model="form.email"
                  type="email"
                  required>
              </v-text-field>

              <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="form.password"
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
      errors: {
        message: null
      },
      form: {
        email: "",
        password: ""
      }
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
              alert(`Oops. ${err.response.data}`)
            })
      }
    },
  }
</script>