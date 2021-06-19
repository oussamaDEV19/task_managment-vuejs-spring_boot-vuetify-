<template>
  <v-app>
    <SideBar/>
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
        <v-toolbar-title>Manage All Users</v-toolbar-title>
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
              New User (employee or manager)
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text >
              <v-container>
                <v-row>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="editedItem.nom"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="editedItem.prenom"
                      label="Prenom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="editedItem.age"
                      label="Age"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="editedItem.telephone"
                      label="Telephone"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>

                  <v-col
                cols="12"
              >
              <!--
                <v-text-field
                      v-model="editedItem.role"
                      label="Role"
                    ></v-text-field>
                    -->

                    <v-select  v-model="selectedRole" label="Role" :items="role"></v-select>
              </v-col>
                </v-row>
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
                v-if="showAdd"
                @click="save"
              >
                Save
              </v-btn>

              <v-btn
                color="blue darken-1"
                text
                v-if="showUpdate"
                @click="update"
              >
                Update
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
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
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
import { db } from '../../store/db'

  export default {
    components: {
      SideBar: () => import('../Sidebar'),
    },
   data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {  text: 'Nom',value: 'nom'},
        {text: 'Prenom',value: 'prenom'},
        { text: 'Email', value: 'email' },
        { text: 'Age', value: 'age' },
        { text: 'Tele', value: 'telephone' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [],
      role : ["MANAGER" , "EMPLOYEE"],
      editedIndex: -1,
      deleteUserId: -1,
      selectedRole: null,
      showAdd: false,
      showUpdate: false,
      editedItem: {
        "age": "19",
        "email": "mustapha1@gmail.com",
        "nom": "hadou",
        "prenom": "mustapha",
        "role": "EMPLOYEE",
        "telephone": "0689826351",
      },
      defaultItem: {
        "age": "19",
        "email": "mustapha1@gmail.com",
        "nom": "hadou",
        "prenom": "mustapha",
        "role": "EMPLOYEE",
        "telephone": "0689826351",
      },
    }),

    computed: {
      formTitle () {
        this.showAdd = this.editedIndex === -1 ? true : false
        this.showUpdate = this.editedIndex === -1 ? false : true
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
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
      db.dispatch('RetrieveUsers')
      setTimeout(() => {
        this.initialize()
      }, 1)
      
    },
    methods: {
      initialize () {
        this.users = db.getters.AllUsers
      },
      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = item
        this.dialog = true
        
      },

      deleteItem (item) {
        this.deleteUserId = item.userId
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true

      },

      deleteItemConfirm () {
        this.users.splice(this.editedIndex, 1)
        this.closeDelete()
        db.dispatch('deleteUser', this.deleteUserId)
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
          db.dispatch('addUser', {
            age: this.editedItem.age,
            email: this.editedItem.email,
            nom: this.editedItem.nom,
            prenom: this.editedItem.prenom,
            role: this.selectedRole,
            telephone: this.editedItem.telephone,
            password: "a123456"
          })
            .then(response => {
             
          })  
          
         
        }
        this.close()
      },
      update (){
        Object.assign(this.users[this.editedIndex], this.editedItem)
        db.dispatch('updateUser', this.editedItem)
        this.close()
      }
    },
  }
</script>
