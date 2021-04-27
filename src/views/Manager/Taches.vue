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
          color="primary"
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
              <v-col
                cols="12"

              >
                <v-text-field
                  label="Tache Name"
                  required
                ></v-text-field>
              </v-col>
               <v-col
                cols="12"

              >
                <v-textarea
          solo
          name="input-7-4"
          label="Solo textarea"
        ></v-textarea>
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
            v-model="date"
            label="Deadline"
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
              ></v-col>
              <v-col  md="6"
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['samir']"
                  label="Employe"
                  required
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
            @click="dialog = false"
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
  export default {
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
            text: 'Tache Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Employees', value: 'Employees' },
          { text: 'date debut', value: 'date_debut' },
          { text: 'date fin', value: 'date_fin' },
          { text: 'progression (%)', value: 'progression' },
          { text: 'Task State', value: 'state' },
          { text: '', value: 'data-table-expand' },
        ],
        desserts: [
          {
            name: 'C# Program ',
            Employees: "khalid moussaoui ",
            date_debut: 20,
            date_fin: 20,
            progression: '40%',
            state: "Created"
          },
          {
            name: 'statistics',
            Employees: "khalid moussaoui ",
            date_debut: 20,
            date_debut: 20,
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
        },
  }
</script>
