<template>
    <v-container fluid id="features" class="mt-2">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
            <!-- <v-col cols="12" class="text-center">
              <h1 class="font-weight-light display-2">Title</h1>
              <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
            </v-col> -->
            <v-col
              cols="12"
              sm="4"
              class="text-center"
              v-for="(feature, i) in infosProjetEmploye"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="card"
                  shaped
                  :elevation="hover ? 10 : 4"
                  :class="{ up: hover }"
                >
                  <v-img
                    :src="img"
                    max-width="100px"
                    class="d-block ml-auto mr-auto"
                    :class="{ 'zoom-efect': hover }"
                  ></v-img>
                  <h1 class="font-weight-regular">{{ feature.titre }}</h1>
                  <h2 class="font-weight-regular " >{{ feature.manager.nom }}</h2>
                  <h4 class="font-weight-regular subtitle-1">
                    {{ feature.description }}
                  </h4>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    components: {
      SideBar: () => import('@/components/SidebarEmp'),
      
    },
    data: () => ({ 
      img: require("@/assets/img/projet.png"),
      infosProjetEmploye: []
    }),
    mounted(){
      console.log("heyyyyy");
      axios
      .get('http://localhost:8081/projets/getProjetEmploye',{headers:{'Authorization':`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmFzQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJFTVBMT1lFRSJ9XSwiZXhwIjoxNjI0MDM1NTI2fQ.4TWLXXPMRctpomYaElTvvbJJMkJnkqFZG1scFvm9cd07WVokx6CrxbiQtnXfn5zt4iZ0qE-DB9tldT3_CRzuYw `}})
      .then(response => (this.infosProjetEmploye= response.data));  
      console.log("heyyyyy222");
   
      }
  }
</script>
