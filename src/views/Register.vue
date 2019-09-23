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
            <v-toolbar-title>Sign Up</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-form @submit.prevent="onSignup">
            <v-card-text>

              <v-text-field
                  name="name"
                  label="Username"
                  id="name"
                  v-model="form.name"
                  type="text"
                  :error-messages="errors ? errors.name : null"
                  required>
              </v-text-field>

              <v-text-field
                  name="email"
                  label="Email"
                  id="email"
                  v-model="form.email"
                  type="email"
                  :error-messages="errors ? errors.email : null"
                  required>
              </v-text-field>

              <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="form.password"
                  type="password"
                  :error-messages="errors ? errors.password : null"
                  required>
              </v-text-field>

              <v-text-field
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  type="password"
                  :rules="[comparePasswords]">
              </v-text-field>


            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="danger" type="submit" :loading="loading">Sing Up</v-btn>
              <v-btn color="primary" type="button" @click="$router.replace({name: 'login'})">Sign In</v-btn>
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
    name: "Register",

    mixins: [backgroundSwitcher],

    data: () => ({
      loading: false,
      errors: {
        email: null,
      },
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    }),

    computed: {
      comparePasswords() {
        return this.form.password !== this.form.confirmPassword ? 'Passwords do not match' : ''
      },
    },

    methods: {

      /**
       * Handle sing up action.
       */
      onSignup() {
        this.loading = true
        const {name, email, password} = this.form

        axios.post('/api/register', {name, email, password}).then(() => {
          this.$router.replace({name: "trips"})
        }).catch(err => {
          this.loading = false
          this.errors = err.response.data
        })
      }
    },
  }
</script>