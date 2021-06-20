<template>
  <v-app>
    <SideBar/>
    <v-container>
      <v-row dense class="mt-10">
        <v-col cols="12">
          <v-card
            color=""
            dark
          >
            <v-card-title class="text-h5">
              Good Morning {{this.admin}},
            </v-card-title>

            <v-card-subtitle>Injoy your space, manage projects, and check your managers, and manage all users and more ...</v-card-subtitle>

            <v-card-actions>
              <v-btn text  to="/tasks">
                Check Projects
              </v-btn>
               <v-btn text to="/managers">
                My Managers
              </v-btn>
               <v-btn text to="/users">
                Check Users
              </v-btn>
               <v-btn text to="/messages">
                Message
              </v-btn>
            </v-card-actions>
            
          </v-card>
        </v-col>


        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="4"
          class="mt-10 px-5"
        >
          <v-card
            :color="item.color"
            dark
          >
          <v-progress-linear
           :value="item.eff"
            color="amber"
            height="10"
          ></v-progress-linear>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                
                <v-card-title
                  class="text-h5"
                  v-text="item.title"
                >
                
              </v-card-title>
              <v-avatar
              class="nbb mt-5 mt-n2  "
              tile
                size="100"
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>

                <v-card-subtitle class="nbb mt-n12  ml-11" v-text="item.artist"></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    :to="item.link"
                  >
                    Check Result
                  </v-btn>
                  
                </v-card-actions>
                
              </div>

             
            </div>
          </v-card>
        </v-col>

        

      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import { db } from '../store/db'


  export default {
    components: {
      SideBar: () => import('../components/Sidebar'),
    },

    data: () => ({
      expandOnHover: false,
      admin : "",
      items: [
        {
          color: '#189adb',
          src: 'https://image.flaticon.com/icons/png/512/1177/1177568.png ',
          title: 'Total Managers',
          artist: 0,
          link: '/users',
          eff: 0,
        },
        {
          color: '#f5202a',
          src: 'https://image.flaticon.com/icons/png/512/1583/1583264.png',
          title: 'Total Processing Projects',
          artist: 0,
          link: '/tasks',
          eff: 0,
        },
        {
          color: '#7d9de8',
          src: 'https://image.flaticon.com/icons/png/512/3921/3921671.png',
          title: 'Total Projects',
          artist: 0,
          link: '/tasks',
          eff: 0,
        },
        {
          color: '#294994',
          src: 'https://image.flaticon.com/icons/png/512/1505/1505465.png',
          title: 'Total Finished Projects',
          artist: 0,
          link: '/tasks',
          eff: 0,
        },
        {
          color: '#69acff',
          src: 'https://image.flaticon.com/icons/png/512/782/782747.png',
          title: 'Total Cancelled Projects',
          artist: 0,
          link: '/tasks',
          eff: 0,
        },
        {
          color: '#fc8b90',
          src: 'https://image.flaticon.com/icons/png/512/1534/1534999.png',
          title: 'Effectiveness',
          artist: 0,
          link: '/tasks',
          eff: 0,
        },
      ],
    }),
    created() {
      console.log(this.parseJwt(localStorage.getItem('access_token')).sub)
      db.dispatch('getAdminName', {
        email: this.parseJwt(localStorage.getItem('access_token')).sub.toString()
      }).then(response => {
          setTimeout(() => {
            this.admin = db.getters.getNameAdmin
          }, 100);
          
          
        })

        db.dispatch('RetrieveManagers').then(response => {
          setTimeout(() => {
            console.log(db.getters.get_prj_proc)
            this.items[0].artist = db.getters.get_total_users
            this.items[0].eff = 100
            this.items[1].artist = db.getters.get_prj_proc
            this.items[1].eff = (db.getters.get_prj_proc/db.getters.get_prj_total)*100
            this.items[2].artist = db.getters.get_prj_total
            this.items[2].eff = 100
            this.items[3].artist = db.getters.get_prj_done  
            this.items[3].eff = (db.getters.get_prj_done /db.getters.get_prj_total)*100 
            this.items[4].artist = db.getters.get_prj_canc 
            this.items[4].eff = (db.getters.get_prj_canc /db.getters.get_prj_total)*100 
            this.items[5].artist = ((db.getters.get_prj_done /db.getters.get_prj_total)*100).toFixed(1) + '%'
            this.items[5].eff = (db.getters.get_prj_done /db.getters.get_prj_total)*100  
          }, 3000);
        })
    },
    methods: {
      parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }
    },
    
  }
</script>

<style scoped>
.nbb {
    font-size: 50px;
    margin-left: 230px;
}
</style>