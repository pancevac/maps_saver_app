<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>

        <v-flex lg12>
          <v-card>
            <v-card-title>
              My Trips
              <div class="flex-grow-1"></div>
              <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <!--<v-divider></v-divider>-->
            <v-card-text class="pa-0">
              <v-data-table
                  :headers="headers"
                  :items="trips"
                  :search="search"
                  :loading="loading"
                  sort-by="name"
                  class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <!--<v-toolbar-title>Trip List</v-toolbar-title>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>-->
                    <div class="flex-grow-1"></div>
                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-btn
                            :loading="gpxImporting"
                            color="primary"
                            dark
                            class="mb-2"
                            v-on="on"
                        >New Trip
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col>
                                <v-text-field
                                    v-model="editedItem.name"
                                    label="Trip name"
                                    :error-messages="errors ? errors.name : null"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row v-if="!editing">
                              <v-col>
                                <v-file-input
                                    :rules="[
                                      value => !value || value.type < '.gpx' || 'FIle must have gpx extension',
                                    ]"
                                    accept=".gpx"
                                    @change="setFile"
                                    show-size label="File input"
                                ></v-file-input>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-chip
                      class="mr-2"
                      @click="previewItem(item)"
                  >
                    <v-icon
                        small
                        class="mr-2"
                    >
                      search
                    </v-icon>
                    Preview
                  </v-chip>
                  <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                      small
                      @click="deleteItem(item)"
                  >
                    delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initializeTrips()">Reset</v-btn>
                </template>
              </v-data-table>
            </v-card-text>
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

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      errors: null,
      gpx: {},
      notification: {
        type: "",
        active: false,
        message: "",
      },
      firestore: {},
      search: "",
      dialog: false,
      loading: false,
      gpxImporting: false,
      headers: [
        {
          text: 'name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false
        },
      ],
      trips: [],
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Trip' : 'Edit Trip'
      },

      editing() {
        return this.editedIndex !== -1
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    created() {

      this.initializeTrips()
    },

    methods: {

      setFile(file) {
        if (file) {
          this.gpx = {
            name: file.name,
            ext: file.name.slice(file.name.lastIndexOf('.')),
            file: file
          }
        } else {
          this.gpx = {}
        }
      },

      /**
       * Retrieve user's trips.
       */
      initializeTrips() {
        this.loading = true
        axios.get('/api/trips').then(response => {
          this.trips = response.data.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },

      editItem(item) {
        this.editedIndex = this.trips.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        if (confirm('Are you sure you want to delete this item?')) {
          axios.delete(`/api/trips/${item.id}`).then((response) => {
            this.showNotification(response.data.message)
            this.initializeTrips()
          })
        }
      },

      previewItem(item) {
        this.$router.push({name: "show_trip", params: {id: item.id}})
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.errors = null
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          // Updating
          // Validate input
          if (!this.validateName()) return

          axios.put(`/api/trips/${this.editedItem.id}`, {name: this.editedItem.name})
              .then(response => {
                this.initializeTrips()
                this.showNotification(response.data.message)
                this.close()
              })
              .catch(err => {
                this.errors = err.response.data
                this.showNotification(err.response.data.message, 'error')
              })

        } else {

          // Creating
          if (!this.validateName() || !this.validateFile()) return

          let formData = new FormData()
          formData.append('trip', this.gpx.file)
          formData.append('name', this.editedItem.name)

          this.gpxImporting = true
          this.showNotification('Trip is importing', 'info')

          axios.post('/api/trips', formData)
              .then(response => {
                this.gpxImporting = false
                this.initializeTrips()
                this.showNotification(response.data.message, 'success')
                this.close()
              })
              .catch(err => {
                this.errors = err.response.data
                this.showNotification(err.response.data.message, 'error')
                this.gpxImporting = false
              })
        }
      },

      validateName() {
        if (this.editedItem.name) {
          return true
        } else {
          this.showNotification('You must fill a name field', 'error')
          return false
        }
      },

      validateFile() {
        if (Object.getOwnPropertyNames(this.gpx).length >= 1 && this.gpx.ext === '.gpx') {
          return true
        } else {
          this.showNotification('You must fill all fields', 'error')
          return false
        }
      },

      showNotification(message, type = 'success') {
        this.notification.type = type
        this.notification.message = message
        this.notification.active = true
      }
    },
  }
</script>