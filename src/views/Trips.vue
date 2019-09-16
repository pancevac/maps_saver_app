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
                                <v-text-field v-model="editedItem.name" label="Trip name"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row v-if="!editing">
                              <v-col>
                                <v-file-input @change="setFile" show-size label="File input"></v-file-input>
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
                  <v-btn color="primary" @click="initialize">Reset</v-btn>
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
  import firebase from "firebase"

  export default {
    data: () => ({
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
      formTitle () {
        return this.editedIndex === -1 ? 'New Trip' : 'Edit Trip'
      },

      editing() {
        return this.editedIndex !== -1
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.firestore = firebase.firestore()
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
        // TODO need different implementation for your custom backend
        this.loading = true
        this.firestore.collection('trips').get().then(results => {
          this.trips = results.docs.map(record => record.data())
          this.loading = false
        })
      },

      editItem (item) {
        this.editedIndex = this.trips.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.firestore.collection('trips').where('id', '==', item.id).get()
            .then(results => {
              const record = results.docs[0]
              if (confirm('Are you sure you want to delete this item?')) {
                record.ref.delete()
                this.initializeTrips()
              }
            })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          // Updating
          // Validate input
          if (!this.validateName()) return

          this.firestore.collection('trips')
              .where('id', '==', this.editedItem.id)
              .get()
              .then(result => {
                const record = result.docs[0]
                record.ref.update({name: this.editedItem.name})
                this.initializeTrips()
                this.showNotification('Trip name successfully updated!')
              })

        } else {

          // Creating
          if (!this.validateName() || !this.validateFile()) return

          this.gpxImporting = true
          const maxId = Math.max(...this.trips.map(trip => trip.id), 0)

          this.firestore.collection('trips').add({
            id: maxId + 1,
            name: this.editedItem.name
          }).then(() => {
            this.initializeTrips()
            this.showNotification('Trip is importing', 'info')

            const ref = firebase.storage().ref()
            const task = ref.child(this.gpx.name).put(this.gpx.file, {
              contentType: 'gpx'
            });

            task.then(() => {
              this.gpxImporting = false
              this.showNotification('Trip is successfully imported!')
            })

          })
        }
        this.close()
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