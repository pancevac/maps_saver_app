<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
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
                        :error-messages="errors ? errors.password : null"
                        required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                        name="confirmPassword"
                        label="Confirm Password"
                        id="confirmPassword"
                        v-model="form.confirmPassword"
                        type="password"
                        :rules="[comparePasswords]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Sign up</v-btn>
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
    name: "Register",

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
      comparePasswords () {
        return this.form.password !== this.form.confirmPassword ? 'Passwords do not match' : ''
      },
    },

    methods: {

      /**
       * Handle sing up action.
       */
      onSignup () {

        const { name, email, password } = this.form

        axios.post('/api/register', { name, email, password }).then(() => {
          this.$router.replace({name: "trips"})
        }).catch(err => {
          this.errors = err.response.data
        })
      }
    },
  }
</script>