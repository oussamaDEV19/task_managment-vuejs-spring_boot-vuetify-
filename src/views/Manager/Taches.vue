<template>
<v-app>
<v-row justify="center" class="col-12" >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          dark
          v-bind="attrs"
          v-on="on"
          class="ma-4"
        >
          creer nouveau tache
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">nouveau tache</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                 v-model="titre"
                  label="Tache Name"
                  required
                ></v-text-field>
              </v-col>
               <v-col
                cols="12">
         <v-textarea
          solo
          name="input-7-4"
          v-model="description"
          label="Solo textarea"
        >
        </v-textarea>
        </v-col>
        <v-col
          cols="4"
          sm="6"
          md="4"
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
            v-model="date_fin"
            label="Deadline"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date_fin"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
              </v-col>
              <v-col 
              ></v-col>
              <v-col  md="6"
                cols="12"
                sm="6"
              >
                <v-select
                  :items="employeDisponible"
                  item-text="nom"
                  item-value="userId"
                  label="Employe"
                  required
                  v-model="idemploye"
                ></v-select>
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
            @click="CreerTache()"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <v-data-table
    :headers="tasksHeaders"
    :items="listesTaches"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="employee.nom"
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
    
    <template v-slot:expanded-item="{headers,item}">    
      <td :colspan="headers.length">
            <v-timeline
            align-top
            dense
            class="ma-5">
            <v-timeline-item
            color="green"
            small
            v-for="ite in item.avancementTache"
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>{{ite.score}}</strong>
                </v-col>
                <v-col >
                <strong>{{ite.date_ajout}}</strong>
                <div class="caption">
                  {{ite.titre}}
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
  import axios from 'axios'
  import { projet } from '../../store/projet'
  export default {
    props:['listesTaches','idProjet'],
    components: {
    },
    data () {
      return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
        dialog: false,
        expanded: [],
        singleExpand: false,
        tasksHeaders: [
          {
            text: 'Task',
            align: 'start',
            sortable: false,
            value: 'description',
          },
          { text: 'Employé', value: 'employee.nom' },
          { text: 'Date Debut', value: 'date_debut' },
          { text: 'Date Fin', value: 'date_fin' },
          { text: 'Progression (%)', value: 'status' },
          { text: 'Task State', value: 'status' },
          { text: '', value: 'data-table-expand' },
        ],
          titre:'',
          description:'',
          date_fin:new Date().toISOString().substr(0, 10),
          idemploye:'',
          employeDisponible:[]
      }
    },
    methods: {
            getColor (state) {
                if (state == "Created") return 'blue'
                else if (state == "Under Processing") return 'orange'
                else if (state == "Finished") return 'green'
                else if (state == "Cancelled") return 'red'
            },
            CreerTache(){
              const current = new Date();
              console.log(current);
              var mm = current.getMonth();
              var dd=current.getDate();
              if(current.getMonth() <10){
                mm = "0" + current.getMonth();
              }
              if(current.getDate() <10){
                dd = "0" + current.getDate();
              }
                const dateD = `${current.getFullYear()}-${mm}-${dd}`;               
                console.log(this.date_fin);
                console.log("ggg");
                console.log(dateD);
                projet.dispatch('creerTache',{
                titre: this.titre,
                description:this.description,
                date_debut:dateD,
                date_fin: this.date_fin,
                idProjet: this.idProjet,
                idEmploye:this.idemploye
                })
                this.dialog = false;
            },
        },
        mounted(){
              axios.get('http://localhost:8081/users/getEmployeParTaches/'+this.idProjet,{headers:{'Authorization':`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdXN0YXBoYTFAZ21haWwuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6Ik1BTkFHRVIifV0sImV4cCI6MTYyMzg3OTU3M30.rM-QJy7XPHjDDmo_6QHZ68-JAqkHT_y94Hc1sYBZK7fp3fXpRSY_OL9OXd3YR9J_Lw9uajRFeaX8HMtbxJqzOw `}})
              .then(response => (
                this.employeDisponible=response.data
              ));  
             
            },
  }
</script>