
<template>
  <v-app>
  <v-data-table
    :headers="tasksHeaders"
    :items="desserts"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="projet"
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
                      <aboutProjet />
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
                        <avancement/>
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
                      <listeEmp />
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item
                >
                  <v-card
                    color="basil"
                    flat
                  >
                    <v-card-text>salmmam</v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </template>
           
            
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
  export default {
    components: {
      avancement: () => import('@/views/Manager/avancement'),  
      aboutProjet:() => import('@/views/Manager/aboutProjet'),
      listeEmp:() => import('@/views/Manager/listeEmploye'),
    },
    data () {
      return {
        tab: null,
          items: [
            'About Projet', 'Avancement Projet', 'Employe', 'Taches',
          ],
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        expanded: [],
        singleExpand: false,
        tasksHeaders: [
          
          {
            text: 'Projet',
            align: 'start',
            sortable: false,
            value: 'projet',
          },
          { text: 'Date Debut', value: 'Date_Debut' },
          { text: 'Date Fin ', value: 'Date_Fin' },
          { text: 'progression (%)', value: 'progression' },
          { text: 'Task State', value: 'state' },
          { text: '', value: 'data-table-expand' },
        ],
        desserts: [
          {
            projet: 'Kotlin Applicationdf , QCM',
            Date_Debut: 20,
            Date_Fin: 20,
            progression: '40%',
            state: "Finished"
          },
          {
            projet: 'Kotlin Applicationbv , QCM',
            Date_Debut: 20,
            Date_Fin: 20,
            progression: '40%',
            state: "Finished"
          },
          {
            projet: 'Kotlin Applicationbb , QCM',
            Date_Debut: 20,
            Date_Fin: 20,
            progression: '40%',
            state: "Finished"
          },
          {
            projet: 'Kotlin Application , QCM1',
            Date_Debut: 20,
            Date_Fin: 20,
            progression: '40%',
            state: "Finished"
          },
          {
            projet: 'Kotlin Application , QCM',
            Date_Debut: 20,
            Date_Fin: 20,
            progression: '40%',
            state: "Finished"
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
        },
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