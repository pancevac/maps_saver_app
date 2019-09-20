<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSingin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                        name="email"
                        label="Email"
                        id="email"
                        v-model="form.email"
                        type="email"
                        required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        v-model="form.password"
                        type="password"
                        required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 class="d-flex justify-space-between">
                    <v-btn type="submit">Sign in</v-btn>
                    <v-btn
                        type="button"
                        class="primary"
                        @click="$router.replace({name: 'register'})"
                    >Sign Up
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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