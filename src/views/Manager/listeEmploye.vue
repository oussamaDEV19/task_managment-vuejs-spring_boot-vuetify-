<template>
  <v-app>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="name"
    class="elevation-1 ma-5"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
             message
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text >
              <v-container>
                 <v-textarea
          solo
          name="input-7-4"
          label="message"
        ></v-textarea>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Envoiyer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this User?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </v-app>
</template>

<script>
  export default {
    components: {
      
    },
   data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Full Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Tache', value: 'tache' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
      },
      defaultItem: {
        name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
       tache:"conception"
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'message a tout ' : 'Message'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.users = [
          {
            name: 'oussama el aaoumari',
            email: 'ousssama@gmail.com',
           tache:"conception"
          },
          {
            name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
          },
          {
            name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
          },
          {
            name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
          },
          {
            name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
          },
          {
            name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
          },
          {
            name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
          },
          {
            name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
          },
          {
            name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
          },
          {
            name: 'oussama el aaoumari',
        email: 'ousssama@gmail.com',
        tache:"conception"
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.users.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.users.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
