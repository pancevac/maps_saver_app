<template>
  <v-container
      class="fill-height"
      fluid
      style="background-image: url('https://www.pixelstalk.net/wp-content/uploads/2016/07/1080p-Full-HD-Images.jpg')"
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
          <v-card-text>
            <v-form @submit.prevent="onSingin">
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="danger" type="submit">Sign In</v-btn>
            <v-btn color="primary" type="button" @click="$router.replace({name: 'register'})">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "Login",

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

        this.$store.dispatch('auth/authRequest', {username: this.form.email, password: this.form.password})
            .then(() => {
              this.$router.replace({name: "trips"})
            })
            .catch(err => {
              alert(`Oops. ${err.response.data}`)
            })
      }
    },
  }
</script>