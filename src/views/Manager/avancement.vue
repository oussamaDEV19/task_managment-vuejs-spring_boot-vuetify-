<template>
 <v-timeline
            align-top
            dense
            class="ma-5"
        >

<v-timeline-item
            color="green"
            small
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>21-04-2021</strong>
                </v-col>
                <v-col >
                <strong>Mobile App task</strong>
                <div class="caption">
                    with kotlin
                </div>
                </v-col>
            </v-row>
            </v-timeline-item>

            <v-timeline-item
            color="teal lighten-3"
            small
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>22-04-2021</strong>
                </v-col>
                <v-col >
                <strong>start conception part</strong>
                <div class="caption">
                    using adobe xd,ulistrator
                </div>
                </v-col>
            </v-row>
            </v-timeline-item>

            <v-timeline-item
            color="teal lighten-3"
            small
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>24-04-2021</strong>
                </v-col>
                <v-col >
                <strong>start development part</strong>
                <div class="caption">
                    Using kotlin, android studio, sqlite
                </div>
                </v-col>
            </v-row>
            </v-timeline-item>

            <v-timeline-item
            color="red"
            small
            >
            <v-row class="pt-1">
                <v-col cols="1">
                <strong>29-04-2021</strong>
                </v-col>
                <v-col >
                <strong>Finish the application</strong>
                <div class="caption">
                    deploy and hosting
                </div>
                
                </v-col>
                
            </v-row>
            
            </v-timeline-item>
            <v-row>
                <v-col></v-col>
                <v-col></v-col>
                <v-col></v-col>
                <v-col>
                  <formA />
                </v-col>

            </v-row>
        </v-timeline>

</template>


<script>
    export default {
      components: {
        formA: () => import('@/views/Employe/form_avancement'),  
      },

    }
</script>