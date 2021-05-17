<template>
  <div>
    <v-container class="pa-0">
      <v-row
        align="center"
        justify="space-between"
      >
        <v-col
          cols="7"
        >
          <div class="mb-4">
            <span class="text-h6 text--secondary">
              <img
                src="../../assets/task_logo.png"
                alt=""
                height="100"
                style="vertical-align: middle;"
              >
            </span>
          </div>
          <h1 class="text-h5 mb-6">
            Create You Task-Managment Account Right Now !!
          </h1>
          <v-form>
            <v-container class="pa-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    ref="input"
                    class="mb-2"
                    :label="$vuetify.lang.t('$vuetify.auth.sign-up.firstname')"
                    name="login"
                    type="text"
                    hide-details="auto"
                    outlined
                    :error-messages="error"
                    dense
                    v-model="nom"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    ref="input"
                    class="mb-2"
                    :label="$vuetify.lang.t('$vuetify.auth.sign-up.lastname')"
                    name="login"
                    type="text"
                    hide-details="auto"
                    outlined
                    :error-messages="error"
                    dense
                    v-model="prenom"
                  />
                </v-col>
              </v-row>
              <v-text-field
                ref="input"
                class="mb-2"
                :label="$vuetify.lang.t('$vuetify.auth.sign-up.email')"
                name="login"
                type="text"
                hide-details="auto"
                :hint="$vuetify.lang.t('$vuetify.auth.sign-up.email-hint')"
                persistent-hint
                outlined
                :error-messages="error"
                dense
                v-model="email"
              />
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    ref="input"
                    class="mb-2"
                    :label="$vuetify.lang.t('$vuetify.auth.sign-up.password')"
                    name="login"
                    type="text"
                    hide-details="auto"
                    outlined
                    :error-messages="error"
                    dense
                    v-model="pass1"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    ref="input"
                    class="mb-2"
                    label="Confirm"
                    name="login"
                    type="text"
                    hide-details="auto"
                    outlined
                    :error-messages="error"
                    dense
                    v-model="pass2"
                  />
                </v-col>
              </v-row>
              <div class="body-2">
                {{ $vuetify.lang.t('$vuetify.auth.sign-up.password-props') }}
              </div>
            </v-container>
          </v-form>
          <div class="transition-wrapper">
            <div class="d-flex justify-space-between mt-8">
              <v-btn
                class="text-none letter-spacing-0"
                style="margin-left: -16px;"
                color="primary"
                text
                @click="$router.push({ name: 'signin' })"
              >
                {{ $vuetify.lang.t('$vuetify.auth.sign-up.instead') }}
              </v-btn>
              <v-btn
                class="text-none letter-spacing-0"
                style="min-width: 88px;"
                color="primary"
                depressed
                @click="signup"
              >
                SignUp
              </v-btn>
            </div>
            <!-- <transition :name="transitionName">
              <router-view @next="$emit('next', $event)" />
            </transition> -->
          </div>
        </v-col>

        <v-col
          cols="4"
        >
          <img
            src="../../assets/logo_only.png"
            alt="Vuetify Logo"
            class="w-100 h-auto"
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from '../../store/db'

export default {
  data: () => ({
    transitionName: '',
    error: '',
    nom: '',
    prenom: '',
    email: '',
    pass1: '',
    pass2: '',
  }),

  methods: {
    signup() {
      if(this.pass1 == this.pass2)
      {
        db.dispatch('addAdmin', {
            email: this.email,
            nom: this.nom,
            prenom: this.prenom,
            role: "ADMIN",
            password: this.pass1
          })
            .then(response => {
             this.$router.push({ name: 'signin' })
          })  
      }
    }
  }
}
</script>
