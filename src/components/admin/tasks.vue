<template>
  <v-app>
    <SideBar/>



<v-row justify="center" class="col-12" >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="ma-4"
        >
          Create New Projet
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">NEW PROJET</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"

              >
                <v-text-field
                v-model="titre"
                  label="Titre Projet"
                  required
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                  <v-textarea
                    v-model="description"
                    solo
                    name="input-7-4"
                    label="desciption"
                    required
                  ></v-textarea>
                  <v-file-input
                    truncate-length="15"
                    v-modal="fileCahierDeCharge"
                  >
            
                  </v-file-input>

              </v-col>
              <v-col
                cols="12"
              >
                <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="date fin"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  :items="users"
                  item-value="dddd"
                  v-model="manager"
                  label="Managers"
                  required
                  @change="GetIdSelected(manager)"
                >
                
                
                </v-select>
              </v-col>
              
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="AddProjet"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>




  <v-data-table
    :headers="tasksHeaders"
    :items="desserts"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1 ma-5"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Tasks Table</v-toolbar-title>  
        <v-spacer></v-spacer>
        <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch>
      </v-toolbar>
    </template>
    
    <template v-slot:expanded-item="{ headers, item }">
        
      <td :colspan="headers.length">
            <v-timeline
            align-top
            dense
            class="ma-5"
        >
            <v-timeline-item
            color="green"
            small
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>21-04-2021</strong>
                </v-col>
                <v-col >
                <strong>Mobile App task</strong>
                <div class="caption">
                    with kotlin
                </div>
                </v-col>
            </v-row>
            </v-timeline-item>

            <v-timeline-item
            color="teal lighten-3"
            small
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>22-04-2021</strong>
                </v-col>
                <v-col >
                <strong>start conception part</strong>
                <div class="caption">
                    using adobe xd,ulistrator
                </div>
                </v-col>
            </v-row>
            </v-timeline-item>

            <v-timeline-item
            color="teal lighten-3"
            small
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>24-04-2021</strong>
                </v-col>
                <v-col >
                <strong>start development part</strong>
                <div class="caption">
                    Using kotlin, android studio, sqlite
                </div>
                </v-col>
            </v-row>
            </v-timeline-item>

            <v-timeline-item
            color="red"
            small
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>29-04-2021</strong>
                </v-col>
                <v-col >
                <strong>Finish the application</strong>
                <div class="caption">
                    deploy and hosting
                </div>
                </v-col>
            </v-row>
            </v-timeline-item>
        </v-timeline>
      </td>
    </template>
    <template v-slot:item.state="{ item }">
      <v-chip
        :color="getColor(item.state)"
        dark
      >
        {{ item.state }}
      </v-chip>
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
    data () {
      return {
        date: new Date().toISOString().substr(0, 10),
        users: [],
        usersId: [],
        description: "",
        titre: "",
        manager: "",
        managerId: "",
      menu: false,
      modal: false,
      menu2: false,
        dialog: false,
        expanded: [],
        singleExpand: false,
        fileCahierDeCharge:"",
        tasksHeaders: [
          {
            text: 'Task Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Employees', value: 'Employees' },
          { text: 'Managers', value: 'Managers' },
          { text: 'Deadline (Days)', value: 'Deadline' },
          { text: 'N sub tasks', value: 'n_sub_tasks' },
          { text: 'Price', value: 'Price' },
          { text: 'progression (%)', value: 'progression' },
          { text: 'Task State', value: 'state' },
          { text: '', value: 'data-table-expand' },
        ],
        desserts: [
          {
            name: 'Kotlin Application , QCM',
            Employees: "khalid moussaoui , nassim larouji",
            Managers: "said chadi",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Finished"
          },
          {
            name: 'JEE',
            Employees: "khalid moussaoui , nassim larouji",
            Managers: "said chadi",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Finished"
          },
          {
            name: 'Laravel , Angular Store',
            Employees: "khalid moussaoui , nassim larouji",
            Managers: "said chadi",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Under Processing"
          },
          {
            name: 'API - Fecebook',
            Employees: "khalid moussaoui , nassim larouji",
            Managers: "said chadi",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Cancelled"
          },
          {
            name: 'Ebay Tool Ranking',
            Employees: "khalid moussaoui , nassim larouji",
            Managers: "said chadi",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Finished"
          },
          {
            name: 'Amazon Resell Template',
            Employees: "khalid moussaoui , nassim larouji",
            Managers: "said chadi",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Under Processing"
          },
          {
            name: 'C# Program , statistics',
            Employees: "khalid moussaoui , nassim larouji",
            Managers: "said chadi",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Created"
          },
        ],
      }
    },
    methods: {
            getColor (state) {
                if (state == "Created") return 'blue'
                else if (state == "Under Processing") return 'orange'
                else if (state == "Finished") return 'green'
                else if (state == "Cancelled") return 'red'
            },
            AddProjet () {
              this.dialog = false
              console.log(this.titre)
              console.log(this.description)
              console.log(this.date)
              const current = new Date();
              var mm = ""
              if(current.getMonth() <10){
                mm = "0" + current.getMonth();
              }
              const date = `${current.getFullYear()}-${mm}-${current.getDate()}`;
              console.log(date)
              console.log(this.managerId)

              db.dispatch('addProjet', {
                titre: this.titre,
                status: "created",
                description: this.description,
                date_debut: date,
                date_fin: this.date,
                ManagerId : this.managerId,
              })
                .then(response => {
                
              })

            },
            GetIdSelected(userId){
              var i
              for(i = 0 ; i < db.getters.AllUsers.length ; i++){
                var tt = db.getters.AllUsers[i].nom + " " + db.getters.AllUsers[i].prenom
                if(tt == this.manager){
                  this.managerId = db.getters.AllUsers[i].userId 
                }
                this.users.push(db.getters.AllUsers[i].nom + " " + db.getters.AllUsers[i].prenom)
              }
              console.log(this.managerId)
            },
        },
        created () {
          db.dispatch('RetrieveUsers')
          setTimeout(() => {
            var i
            //console.log(db.getters.AllUsers.length)
            for(i = 0 ; i < db.getters.AllUsers.length ; i++){
              this.users.push(db.getters.AllUsers[i].nom + " " + db.getters.AllUsers[i].prenom)

            }
        //this.users = db.getters.AllUsers[0].nom
      }, 5)
      
            
        },
        
  }
</script>
