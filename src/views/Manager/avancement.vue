<template>
 <v-timeline
            align-top
            dense
            class="ma-5"
        >

<v-timeline-item
            color="green"
            small
             v-for="item in avancemenetProjet"
             :key="item.score"
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>{{item.score}}</strong>
                </v-col>
                <v-col >
                <strong>{{item.titre}}</strong>
                <div class="caption">
                    {{item.score}}
                </div>
                </v-col>
            </v-row>
</v-timeline-item>

           
            <v-row>
                <v-col></v-col>
                <v-col></v-col>
                <v-col></v-col>
                <v-col>
                  <formA :idProjet="idProjet" />
                </v-col>

            </v-row>
        </v-timeline>

</template>


<script>
    export default {
      components: {
        formA: () => import('@/views/Manager/form_avancement'),  
      },
      props:[
      "avancemenetProjet",
      "idProjet"
      ]

    }
</script>