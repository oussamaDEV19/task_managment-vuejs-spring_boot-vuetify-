<template>
  <v-app>
  <v-data-table
    :headers="tasksHeaders"
    :items="infostacheEmploye"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="tache"
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
            <v-timeline
            align-top
            dense
            class="ma-5"
        >
            <v-timeline-item
            color="green"
            small
            v-for="ite in item.avancementTache">
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>{{ite.score}}</strong>
                </v-col>
                <v-col >
                <strong>{{ite.titre}}</strong>
                <div class="caption">
                  {{ite.date_ajout}}
                </div>
                </v-col>
            </v-row>
            </v-timeline-item>            
        </v-timeline>
         <v-row>
              <v-col></v-col>
              <v-col></v-col>
              <v-col>
              </v-col>
              <v-col>
                  <formA  :idTache="item.tache_id"/>
              </v-col>
            </v-row>
      </td>
    </template>
   
   


    <template v-slot:item.status="{item}">
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
  export default {
    components: {
      
      formA: () => import('@/views/Employe/form_avancement'),
      
    },
    data () {
      return {
        expanded: [],
        singleExpand: false,
        tasksHeaders: [
          
          {
            text: 'Projet',
            align: 'start',
            sortable: false,
            value: 'projet',
          },
          {
            text: 'Tache',
            align: 'start',
            sortable: false,
            value: 'titre',
          },
          { text: 'Manager', value: 'manager' },
          { text: 'duree restant (Jours)', value: 'deadline' },
          { text: 'progression (%)', value: 'score' },
          { text: 'Task State', value: 'status' },
          { text: '', value: 'data-table-expand' },
        ],
        infostacheEmploye:[],
      }
    },
    methods: {
            getColor (state) {
                if (state == "Created") return 'blue'
                else if (state == "Under Processing") return 'orange'
                else if (state == "Finished") return 'green'
                else if (state == "Cancelled") return 'red'
            },
             calculDernierScore (state) {
                if (state == "Created") return 'blue'
                else if (state == "Under Processing") return 'orange'
                else if (state == "Finished") return 'green'
                else if (state == "Cancelled") return 'red'
            },
        },
        mounted(){
      console.log("heyyyyy");
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

      axios
      .get('http://localhost:8081/tache/getTacheEmploye')
      .then(response =>{
      
      this.infostacheEmploye= response.data
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

          element.avancementTache.forEach(eltAvan => {
          
          const dda = new Date(eltAvan.date_ajout)
          eltAvan.date_ajout = dda.toISOString().split('T')[0];
          element.score=eltAvan.score
          })

        } )
      
        
      
      }
      
      
      
      
      
      
      
      
      
      
      
      );  
      
   
      }
  }
</script>