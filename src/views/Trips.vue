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
                  :items="desserts"
                  :search="search"
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
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Trip</v-btn>
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
                            <v-row>
                              <v-col>
                                <v-file-input show-size label="File input"></v-file-input>
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
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      search: "",
      dialog: false,
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
      desserts: [],
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
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {name: 'Frozen Yogurt'},
          {name: 'Ice cream sandwich'},
          {name: 'Eclair'},
          {name: 'Cupcake'},
          {name: 'Gingerbread'},
          {name: 'Jelly bean'},
          {name: 'Lollipop'},
          {name: 'Honeycomb'},
          {name: 'Donut'},
          {name: 'KitKat'},
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>