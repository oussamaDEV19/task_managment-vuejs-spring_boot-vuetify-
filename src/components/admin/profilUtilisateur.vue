<template>

<v-app>
<SideBar/>
<v-container>
<v-form
    ref="form"
    lazy-validation
    class="ma-5 col-12"
  >
                <v-row>
                  <v-col
                    cols="6">
                    <v-text-field
                      v-model="employeConnecte.nom"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="employeConnecte.prenom"
                      label="Prenom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="employeConnecte.age"
                      label="Age"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="employeConnecte.telephone"
                      label="Telephone"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="employeConnecte.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                <v-col></v-col>
                               
                <v-col>
                <a>vous voullez changer le mot de passe?</a>
                </v-col>
                </v-row> 
                 </v-form>
              </v-container>
              <div class="text-center">
  <v-btn depressed small color="error" @click="update">
                Update
  </v-btn>
</div>
</v-app>


</template>

<script>
  import axios from 'axios'
  import { db } from '../../store/db'
 
  export default {  
    components: {
      SideBar: () => import('../Sidebar'),
    },
    data () {
      return {
        employeConnecte:[],
    }
    },
   methods: {
   
    update (){
        db.dispatch('updateUser', this.employeConnecte)
      },

   },
    mounted(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        axios.get('http://localhost:8081/users/infosUtili')
            .then(response => (
            this.employeConnecte=response.data
        )); 
  console.log("hh");
    }, 
  }
</script>

<style>

</style>
