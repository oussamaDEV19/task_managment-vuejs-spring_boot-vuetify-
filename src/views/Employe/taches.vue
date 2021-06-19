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
                <strong>{{ite.date_ajout}}</strong>
                <div class="caption">
                  {{ite.titre}}
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
          { text: 'Deadline (Days)', value: 'Deadline' },
          { text: 'progression (%)', value: 'progression' },
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
      axios
      .get('http://localhost:8081/tache/getTacheEmploye',{headers:{'Authorization':`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmFzQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJFTVBMT1lFRSJ9XSwiZXhwIjoxNjI0MDM1NTI2fQ.4TWLXXPMRctpomYaElTvvbJJMkJnkqFZG1scFvm9cd07WVokx6CrxbiQtnXfn5zt4iZ0qE-DB9tldT3_CRzuYw `}})
      .then(response => (this.infostacheEmploye= response.data));  
      console.log("heyyyyy222");
   
      }
  }
</script>