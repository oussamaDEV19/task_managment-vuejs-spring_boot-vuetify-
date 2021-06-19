<template class="ff">
  <center>
      <h2>404</h2>
    <h1>Not Found !</h1>
    <p>
      <a @click="$router.go(-1)">Go Back</a>
    </p>
  </center>
</template>

<script>

  export default {
    name: 'NotFound'
  }

</script>

<style scoped>

  center {
    margin: 15vw;
  }

  h1 {
    color: var(--border);
    font-size: 2em;
  }

  h2 {
    margin-top: -50px;
    color: var(--border);
    font-size: 200px;
  }


</style>