<template>
  <v-app>
    <SideBar/>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1 ma-5"
  >
    <template v-slot:item.n_tasks="{ item }">
      <v-chip
        :color="getColor(item.n_tasks)"
        dark
      >
        {{ item.n_tasks }}
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
        headers: [
          {
            text: 'Full Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'N Tasks', value: 'n_tasks' },
          { text: 'N Employees', value: 'n_employees' },
          { text: 'Done', value: 'done' },
          { text: 'Cancelled', value: 'cancelled' },
          { text: 'Effctive (%)', value: 'effictive' },
        ],
        desserts: [
          {
            name: 'Said Chadi',
            n_tasks: 8,
            n_employees: 6,
            done: 1,
            cancelled: 1,
            effictive: '90%',
          },
          {
            name: 'Oualid Bouaarifi',
            n_tasks: 2,
            n_employees: 1,
            done: 0,
            cancelled: 1,
            effictive: '80%',
          },
          {
            name: 'Oualid Jraifi',
            n_tasks: 5,
            n_employees: 2,
            done: 2,
            cancelled: 1,
            effictive: '80%',
          },
          {
            name: 'Yassar danim',
            n_tasks: 5,
            n_employees: 2,
            done: 2,
            cancelled: 1,
            effictive: '80%',
          },
          {
            name: 'Karim sani',
            n_tasks: 5,
            n_employees: 2,
            done: 2,
            cancelled: 1,
            effictive: '80%',
          },
          {
            name: 'Saad Boumdon',
            n_tasks: 4,
            n_employees: 2,
            done: 1,
            cancelled: 1,
            effictive: '88%',
          },
          {
            name: 'Khalid Baraka',
            n_tasks: 8,
            n_employees: 5,
            done: 3,
            cancelled: 0,
            effictive: '99%',
          },
        ],
      }
    },
    methods: {
      getColor (n_tasks) {
        if (n_tasks >= 8) return 'green'
        else if (n_tasks >= 5) return 'orange'
        else return 'red'
      },
    },
  }
</script>
