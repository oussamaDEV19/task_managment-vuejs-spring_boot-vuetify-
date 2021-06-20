<template>
    <section id="about">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <v-row align="center" justify="center">
              <v-col cols="12" md="7">
                <h1 class="font-weight-light display-2">{{projet.titre}}</h1>
                <h1 class="font-weight-light display-1 mb-3" color="red">
                  
                </h1>
                <v-row>
                  <v-col cols="12" class="d-flex align-center">
                    <v-img
                      src="@/assets/img/icon1.svg"
                      max-width="60px"
                      class="mr-4"
                    />
                    <p class="text-justify">
                      {{projet.description}}
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
            <v-col>
            </v-col>
            <v-col>
            </v-col>
            <v-col>
                <a :href= "projet.document" target="_blank"><v-btn class="info">Document</v-btn></a>
            </v-col>
            
        </v-row>
      </v-container>
    </section>
  </template>
 <script>
  export default {
    props:[
      'projet'
    ],
    components: {
    },
    data: () => ({
        ex3: { label: 'Avancement : ', val: 50, color: 'red' }
    })
  }
</script>


