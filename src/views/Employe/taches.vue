
<template>
  <v-app>
  <v-data-table
    :headers="tasksHeaders"
    :items="desserts"
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
         <v-row>
              <v-col></v-col>
              <v-col></v-col>
              <v-col>
              </v-col>
              <v-col>
                  <formA />
              </v-col>
            </v-row>
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
            value: 'tache',
          },
          { text: 'Manager', value: 'Manager' },
          { text: 'Deadline (Days)', value: 'Deadline' },
          { text: 'progression (%)', value: 'progression' },
          { text: 'Task State', value: 'state' },
          { text: '', value: 'data-table-expand' },
        ],
        desserts: [
          {
            projet: 'Kotlin Application , QCM',
            tache: 'conception',
            Manager:'dodo',
            Deadline: 20,
            progression: '40%',
            state: "Finished"
          },
          {
            projet: 'Kotlin Application , QCM',
            tache: 'desgin',
            Manager:'dodo',
            Deadline: 20,
            progression: '40%',
            state: "Finished"
          },
          {
            projet: 'Kotlin Application , QCM',
            tache: 'front-end',
            Manager:'dodo',
            Deadline: 20,
            progression: '40%',
            state: "Finished"
          },
          {
            projet: 'Kotlin Application , QCM1',
            tache: 'back-end',
            Manager:'dodo',
            Deadline: 20,
            progression: '40%',
            state: "Finished"
          },
          {
            projet: 'Kotlin Application , QCM',
            tache: 'deploiment',
            Manager:'dodo',
            Deadline: 20,
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
