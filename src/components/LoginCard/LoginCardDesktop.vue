<template>
  <div>
    <v-card
      class="auth-card"
      :class="{ signup: $route.name === 'signup' }"
      style=""
      outlined
      :disabled="disabled"
    >
      <v-progress-linear
        v-if="loading"
        indeterminate
        absolute
      />
      <div class="pa-10">
        <slot />
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .auth-card {
    width: 450px;
    min-height: 500px;
    overflow: hidden;
  }

  .auth-card.signup {
    width: 750px;
  }
</style>
