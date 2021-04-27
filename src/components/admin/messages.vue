<template>
  <v-app>
    <SideBar/>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="ma-5 col-6"
  >

  <v-text-field
      v-model="title"
      :counter="10"
      :rules="titleRules"
      label="Title Message"
      required  
    ></v-text-field>


        <v-textarea
          v-model="msg"
          solo
          name="input-7-4"
          label="message"
          required
        ></v-textarea>

    

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Manager is required']"
      label="Manager"
      required
    ></v-select>


    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4 mt-3"
      @click="validate"
    >
      Send Message
    </v-btn>

    <v-btn
      color="error"
      class="mr-4 mt-3"
      @click="reset"
    >
      Reset Fields
    </v-btn>

  </v-form>
  </v-app>
</template>

<script>
  export default {
    components: {
      SideBar: () => import('../Sidebar'),
    },
    data: () => ({
      valid: true,
      msg: '',
      msgRules: [
        v => !!v || 'Message is required',
        v => (v && v.length <= 30) || 'Message must be less than 30 characters',
      ],
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 10) || 'Title must be less than 10 characters',
      ],
      select: null,
      items: [
        'Mustapha hadou',
        'Dounia Lamsaddeq',
        'Iman rihani',
        'Said jamiri',
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>
