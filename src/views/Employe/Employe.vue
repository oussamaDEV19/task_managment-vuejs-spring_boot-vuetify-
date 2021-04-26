<template>
  <v-app>
    <SideBar/>
    <router-view />

  </v-app>
</template>

<script>
  export default {
    components: {
      SideBar: () => import('@/components/SidebarEmp'),
      
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
