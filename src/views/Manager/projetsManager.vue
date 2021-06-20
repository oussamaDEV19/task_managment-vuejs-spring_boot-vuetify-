<template>
  <v-app>
  <v-data-table
    :headers="tasksHeaders"
    :items="infosProjet"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="titre"
    show-expand
    class="elevation-1 ma-5"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Expandable Table</v-toolbar-title>
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
      <template>
            <v-card class="margin">
              <v-card-title class="text-center justify-center py-6">
                <h1 class="font-weight-bold display-3 basil--text">
                  Projets
                </h1>
              </v-card-title>     
              <v-tabs
                v-model="tab"
                background-color="transparent"
                color="basil"
                grow
              >
                <v-tab
                  v-for="item in items"
                  :key="item"
                >
                  {{ item }}
                </v-tab>
              </v-tabs>
          
              <v-tabs-items v-model="tab">
                <v-tab-item
                >
                  <v-card
                    color="basil"
                    flat
                  >
                    <v-card-text>
                      <aboutProjet :projet="item" />
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item
                >
                  <v-card
                    color="basil"
                    flat
                  >
                    <v-card-text>
                        <avancement :avancemenetProjet="item.avancementsProjet" :idProjet="item.prjet_id"/>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card
                    color="basil"
                    flat>
                    <v-card-text>
                      <listeEmp :listesEmploye="item.taches"/>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item
                >
                  <v-card
                    color="basil"
                    flat
                  >
                    <v-card-text>
                      <taches :listesTaches="item.taches" :idProjet="item.prjet_id"/>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </template>     
      </td>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip
        :color="getColor(item.status)"
        dark
      >
        {{ item.status }}
      </v-chip>  
    </template>
  </v-data-table>
  </v-app> 
</template>


<script>
import axios from 'axios'
import { projet } from '../../store/projet'
  export default {
    components: {
      avancement: () => import('@/views/Manager/avancement'),  
      aboutProjet:() => import('@/views/Manager/aboutProjet'),
      listeEmp:() => import('@/views/Manager/listeEmploye'),
      taches:() => import('@/views/Manager/Taches'),
    },
    data () {
      return {
        tab: null,
        ListeProjet:null,
        items: [
            'About Projet', 'Avancement Projet', 'Employe', 'Taches',
        ],
        expanded: [],
        infosProjet:[],
        singleExpand: false,
        tasksHeaders: [  
          {
            text: 'Projet',
            align: 'start',
            value: 'titre',
          },
          { text: 'Date Debut', value: 'date_debut' },
          { text: 'Date Fin ', value: 'date_fin' },
          { text: 'durée restante ', value: 'deadline' },
          { text: 'progression (%)', value: 'score' },
          { text: 'Task State', value: 'status' },
          { text: '', value: 'data-table-expand' },
        ],
      }
    },
    methods: {
            getColor (state) {
                if (state == "Created") return 'blue'
                else if (state == "Under Processing") return 'orange'
                else if (state == "Finished") return 'green'
                else if (state == "Cancelled") return 'red'
            }
    },
      mounted(){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
      axios
      .get('http://localhost:8081/projets/getProjetByManager')
      .then(response =>{
       this.infosProjet= response.data
       
       response.data.forEach(element => {
          
          const dd = new Date(element.date_debut)
          element.date_debut = dd.toISOString().split('T')[0];
          const df = new Date(element.date_fin)
          element.date_fin = df.toISOString().split('T')[0];

        var aDay = 86400000;
        const current = new Date();

        var diff = Math.floor(
          (
            Date.parse(element.date_fin) - Date.parse(current)
          ) / aDay);
          //console.log(diff)
          element.deadline = diff;

          element.avancementsProjet.forEach(elt => {
          
          const dd = new Date(elt.date_ajout)
          elt.date_ajout = dd.toISOString().split('T')[0];
          element.score=elt.score
          })
          element.taches.forEach(elt => {
          
          const dd = new Date(elt.date_debut)
          elt.date_debut = dd.toISOString().split('T')[0];

          const df = new Date(elt.date_fin)
          elt.date_fin = dd.toISOString().split('T')[0];


          elt.avancementTache.forEach(eltAvan => {
          
          const dda = new Date(eltAvan.date_ajout)
          eltAvan.date_ajout = dda.toISOString().split('T')[0];
          elt.score=eltAvan.score
          })
         
          })
          }
      )});     
      }
      
  }
</script>


  
<style>
    /* Helper classes */
    .basil {
      background-color: #FFFBE6 !important;
    }
    .basil--text {
      color: #356859 !important;
    }
    .margin{
        margin: 30px;
    }
</style>