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
                    <v-dialog
                    v-model="dialog"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }"> 
                      <v-btn
                        color="primary"
                        text
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                      vous voullez changer le mot de passe?
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-center">Changer le mot de passe</span>
                      </v-card-title>
          
                      <v-card-text >
                        <v-container>
                          <v-row>
          
                            <v-col
                              cols="6"
                            >
                              <v-text-field
                                v-model="NVMDP"
                                label="Nom"
                              ></v-text-field>
                            </v-col>
                     
                           
                           
                          </v-row>
                        </v-container>
                      </v-card-text>
          
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="updateMDP"
                        >
                          Update
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
                </v-row> 
                 </v-form>
              </v-container>
              <div class="text-center">
  <v-btn depressed  color="error" @click="update">
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
        dialog: false,
        employeConnecte:[],
        NVMDP:""
    }
    },
   methods: {
   
    update (){
        db.dispatch('updateUser', this.employeConnecte)
      },
    updateMDP(){
        db.dispatch('updateUserMDP', this.NVMDP)
        this.dialog = true

      },
      close () {
        this.dialog = false
      }
   },
    mounted(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        axios.get('http://localhost:9090/users/infosUtili')
            .then(response => (
            this.employeConnecte=response.data
        )); 
  console.log("hh");
    }, 

  }
</script>

<style>

</style>
