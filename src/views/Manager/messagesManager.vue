<template>
  <v-app>
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
   <br>
    <v-textarea
          v-model="msg"
          solo
          name="input-7-4"
          label="message"
          required
        ></v-textarea>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4 mt-3"
      @click="envoyer()"
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
    }),

    methods: {
      envoyer(){
        this.$refs.form.validate()
        projet.dispatch('envoyer',this.avancement)
      },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>
