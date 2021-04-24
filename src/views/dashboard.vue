<template>
  <v-app>
    <SideBar/>

  </v-app>
</template>

<script>
  export default {
    components: {
      SideBar: () => import('../components/Sidebar'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
