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
    :items="tasks"
    item-key="titre"
    class="elevation-1 ma-5"
  >

    
  
    <template v-slot:item.status="{ item }">
      <v-chip
        :color="getColor(item.status)"
        dark
      >
        {{ item.status }}
      </v-chip>
    </template>

    <template v-slot:item.action="{ item }">
      <v-btn
      rounded
      small
      color="red"
      dark
      @click="deleteProjet(item)"
    >
      Delete
    </v-btn>
    <v-btn
      rounded
      small
      color="green"
      dark
      @click="avancementsProjet(item)"
      class="ml-6"
    >
      Show Avancements
    </v-btn>
    </template>


  </v-data-table>

<v-dialog v-model="dialog2" width="400">
  <v-row >
      <v-card width="400" class="mr-1 ml-6 mt-2 mb-2">
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Avancement du Projet {{ this.prj_selected }}
            
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="avc in avcProjects"
              :key="avc.time"
              :color="avc.color"
              small
            >
              <div>
                
                <div class="font-weight-normal">
                  
                  <strong>{{ avc.date_ajout }}</strong>
                </div>
                <div><strong>{{ avc.titre }}</strong></div>
                <strong>Progression : </strong>
                <v-progress-linear
                  color="light-blue"
                  height="10"
                  :value=avc.score
                  striped
                ></v-progress-linear>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
</v-dialog>


  
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
        dialog2 : false,
      menu: false,
      modal: false,
      menu2: false,
        dialog: false,
        expanded: [],
        singleExpand: false,
        fileCahierDeCharge:"",
        prj_selected: "",
        tasksHeaders: [
          {
            text: 'Task Name',
            align: 'start',
            sortable: false,
            value: 'titre',
          },  
          { text: 'Manager', value: 'manager_project' },
          { text: 'Deadline (Days)', value: 'date_fin' },
          { text: 'Task State', value: 'status' },
          { text: 'Actions', value: 'action' ,
            sortable: false},
        ],
        tasks: [],
        avcProjects: [],
      }
    },
    methods: {
      initialize () {
        
        setTimeout(() => {
            this.tasks = db.getters.AllProjects
          }, 600)
        
      },
            getColor (status) {
                if (status == "Created") return 'blue'
                else if (status == "Under Processing") return 'orange'
                else if (status == "Finished") return 'green'
                else if (status == "Cancelled") return 'red'
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

              setTimeout(() => {
            db.dispatch('RetrieveProjects')
            
          }, 500)
          
          setTimeout(() => {
            this.initialize()
            
          }, 1000)


          

            },
            GetIdSelected(userId){
              var i
              for(i = 0 ; i < db.getters.AllUsers.length ; i++){
                
                var tt = db.getters.AllUsers[i].nom + " " + db.getters.AllUsers[i].prenom
                if(tt == this.manager){
                  this.managerId = db.getters.AllUsers[i].userId 
                }
                //this.users.push(db.getters.AllUsers[i].nom + " " + db.getters.AllUsers[i].prenom)
              
                
              }
              
            },
        deleteProjet (item) {
          this.tasks.splice(this.tasks.indexOf(item), 1)
          db.dispatch('deleteProjet', item.prjet_id)
        },
        avancementsProjet(item){
          this.avcProjects = null
          
            this.dialog2 = true
            this.prj_selected = item.titre
            
            db.dispatch('RetrieveAvancementProjects' , item.prjet_id).then( () => {
              setTimeout(() => {
              this.avcProjects = db.getters.AllAvancementProjects
              }, 100)
            })
          
          
          
         
            
         

          // score titre date_ajout color

        }
        },
        created () {

          db.dispatch('RetrieveProjects')
          
          
          setTimeout(() => {
            this.initialize()
            
          }, 1)


          db.dispatch('RetrieveUsers')
          setTimeout(() => {
            var i
            //console.log(db.getters.AllUsers.length)
            for(i = 0 ; i < db.getters.AllUsers.length ; i++){
              if(db.getters.AllUsers[i].role == "MANAGER"){
                this.users.push(db.getters.AllUsers[i].nom + " " + db.getters.AllUsers[i].prenom)
              }
            }
        //this.users = db.getters.AllUsers[0].nom
      }, 1000)
      
            
        },
        
  }
</script>
