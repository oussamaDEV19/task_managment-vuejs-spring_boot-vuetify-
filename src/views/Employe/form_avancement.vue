<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on,attrs }">
        <v-btn  v-bind="attrs" class="info" dark v-on="on">Ajouter form</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Avancement de tache</v-card-title>
        <v-container>
           <v-slider class="pa-md-6 mx-lg-auto"
         v-model="ex3.val"
         :label="ex3.label"
         :thumb-color="ex3.color"
         thumb-label="always"
         ></v-slider>
        <v-text-field class="pa-md-6 mx-lg-auto"
          v-model="match"
          label="Value must match"
        ></v-text-field>
        <div class="text-xs-center">
        <v-btn @click="dialog = false" class="green accent-4"  dark >Confermer</v-btn>
        </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>



<script>
  export default {
    components: {
     
      
    },

    data: () => ({
        dialog: false,
        ex3: { label: 'Avancement : ', val: 50, color: 'red' },
    }),
  }
</script>


