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
              v-for="(feature, i) in features"
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
                    :src="feature.img"
                    max-width="100px"
                    class="d-block ml-auto mr-auto"
                    :class="{ 'zoom-efect': hover }"
                  ></v-img>
                  <h1 class="font-weight-regular">{{ feature.title }}</h1>
                  <h2 class="font-weight-regular " >{{ feature.manager }}</h2>
                  <h4 class="font-weight-regular subtitle-1">
                    {{ feature.text }}
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
  export default {
    components: {
      SideBar: () => import('@/components/SidebarEmp'),
      
    },

    data: () => ({ 
        features: [
        {
          img: require("@/assets/img/projet.png"),
          manager:"Hadou",
          title: "Projet Name",
          text: "Statistics , manage all (employees,managers,tasks) , You are the Leader here.",
        },
        {
          img: require("@/assets/img/projet.png"),
          manager:"dounia",
          title: "Projet Name",
          text: "Add employees , affect tasks to them and check all progression !",
        },
        {
          img: require("@/assets/img/projet.png"),
          manager:"dounia",
          title: "Projet Name",
          text: "Login , and start Mark your Tasks and see your progression !!",
        },
         {
          img: require("@/assets/img/projet.png"),
          manager:"dounia",
          title: "Projet Name",
          text: "Login , and start Mark your Tasks and see your progression !!",
        },
      ],
    }),
  }
</script>

