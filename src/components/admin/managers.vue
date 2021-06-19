<template>
  <v-app>
    <SideBar/>
  <v-data-table
    :headers="headers"
    :items="managers"
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
import { db } from '../../store/db'

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
          { text: 'Processing', value: 'processing' },
          { text: 'Done', value: 'done' },
          { text: 'Cancelled', value: 'cancelled' },
          { text: 'Effctive (%)', value: 'effictive' },
        ],
        managers: [],
      }
    },
    methods: {
      getColor (n_tasks) {
        if (n_tasks >= 4) return 'green'
        else if (n_tasks >= 2) return 'orange'
        else return 'red'
      },
      initialize () {
        
        setTimeout(() => {
            //this.managers = db.getters.Allmanagers
          }, 1000)
      },
    },
    created () {

          db.dispatch('RetrieveManagers')
          
          
          setTimeout(() => {
            this.initialize()
            
          }, 1000)
          var i = 0;
          setTimeout(() => {

            for(i = 0 ; i < db.getters.Allmanagers.length ; i++){
              if(db.getters.Allmanagers[i].role == "MANAGER" && db.getters.Allmanagers[i].n_tasks != null){
                this.managers.push(db.getters.Allmanagers[i])
              }
            }
          }, 1000)
          


    }
  }
</script>
