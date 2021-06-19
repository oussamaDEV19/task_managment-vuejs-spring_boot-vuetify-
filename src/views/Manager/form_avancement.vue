<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on,attrs }">
        <v-btn  v-bind="attrs" class="info" dark v-on="on">Ajouter form</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Avancement de tache</v-card-title>
        <v-container>
        <v-form >
           <v-slider class="pa-md-6 mx-lg-auto"
         v-model="avancement.score"
         :label="ex3.label"
         :thumb-color="ex3.color"
         thumb-label="always"
         ></v-slider>
        <v-text-field class="pa-md-6 mx-lg-auto"
          v-model="avancement.titre"
          label="Value must match"
        ></v-text-field>
        <v-text-field 
          v-model="avancement.idProjet"
          v-if="false"
        >
        </v-text-field>
        <div class="text-xs-center">
        <v-btn @click="submit()" class="green accent-4"  dark >Confirmer</v-btn>
        </div>
      </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>



<script>
  import { projet } from '../../store/projet'
  export default {
    props:['idProjet'],
    components: {
    },
    data: () => ({
        dialog: false,
        ex3: { label: 'Avancement : ', val: 50, color: 'red' },
        avancement:{
          titre:'',
          score:'',
          idProjet:''
                  }  
    }),
    methods: {
      submit(){
        this.avancement.idProjet=this.idProjet;
        projet.dispatch('envoyer',this.avancement)
        this.dialog = false;
      }
    },
  }
</script>