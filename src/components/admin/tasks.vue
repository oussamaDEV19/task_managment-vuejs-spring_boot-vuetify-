<template>
  <v-app>
    <SideBar/>
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
      SideBar: () => import('../Sidebar'),
    },
    data () {
      return {
        expanded: [],
        singleExpand: false,
        tasksHeaders: [
          {
            text: 'Task Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Employees', value: 'Employees' },
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
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Finished"
          },
          {
            name: 'JEE',
            Employees: "khalid moussaoui , nassim larouji",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Finished"
          },
          {
            name: 'Laravel , Angular Store',
            Employees: "khalid moussaoui , nassim larouji",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Under Processing"
          },
          {
            name: 'API - Fecebook',
            Employees: "khalid moussaoui , nassim larouji",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Cancelled"
          },
          {
            name: 'Ebay Tool Ranking',
            Employees: "khalid moussaoui , nassim larouji",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Finished"
          },
          {
            name: 'Amazon Resell Template',
            Employees: "khalid moussaoui , nassim larouji",
            Deadline: 20,
            n_sub_tasks: 3,
            Price: 4000,
            progression: '40%',
            state: "Under Processing"
          },
          {
            name: 'C# Program , statistics',
            Employees: "khalid moussaoui , nassim larouji",
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
        },
  }
</script>
