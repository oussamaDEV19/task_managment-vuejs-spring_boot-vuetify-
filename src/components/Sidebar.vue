<template>
  <nav>
<!--
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="success"
    >
      {{ text }}
    </v-snackbar>
-->

      <v-app-bar flat app>
        <v-app-bar-nav-icon  class="grey--text" @click="drawer = ! drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase pink--text">
        <v-icon large color="pink" class="mr-3">mdi-timer-sand</v-icon>
        <span class="font-weight-light">Task</span>
        <span> Managment</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>



      <v-btn  text color="grey" @click="logout">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>


    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app :class="bcgcolor" >
      <v-layout column align-center>
        <v-layout class="mt-5">
          <v-avatar size="100">
            <img src="../assets/logo_only.png">
          </v-avatar>
          
        </v-layout>
        <p class="white--text subheading mt-4 ">
            Task Managment (Admin)
        </p>
 
      </v-layout>

      <v-list rounded >
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route"> 
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>



    </v-navigation-drawer>

  </nav>
</template>

<script>
import { db } from '../store/db'

export default {
  data() {
    return {
      drawer: false,
      links: [
        {icon : 'mdi-view-dashboard', text : 'Dashboard', route : '/dashboard'},
        {icon : 'mdi-calendar-check', text : 'All Tasks', route : '/tasks'},
        {icon : 'mdi-shield-account', text : 'My Managers', route : '/managers'},
        {icon : 'mdi-message-bulleted', text : 'Send Messages', route : '/messages'},
        {icon : 'mdi-account-cog', text : 'Manage Users', route : '/users'},
      ],
      snackbar: false,
      text: 'msg...',
      timeout: 5000,
      bcgcolor : "indigo"
    }
  },
  methods: {
    logout() {
      db.dispatch('destroyToken')
      .then(response => {
        this.$router.push({ name: 'HomePage' })
      })
    }
  },
};
</script>
