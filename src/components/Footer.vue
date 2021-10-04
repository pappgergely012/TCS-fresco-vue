<template>
  <v-footer dark>
    <v-card-text class="py-2 white--text text-center">
      {{ new Date().getFullYear() }} — <strong>TCS</strong>
    </v-card-text>

    
    <router-link to="/add">
      <div
        id="btn-fab-add"
        style="position: fixed; right: 20px; width: 40px; height: 40px; bottom: 20px;"
        fixed
        class="primary rounded-circle d-flex justify-center align-center white--text"
      >+</div>
    </router-link>

    <router-link to="/about">
      <div id="btn-about"></div>
    </router-link>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer',
    computed: {
      isHome() {
        return this.$route.path !== '/'
      }
    },
  }
</script>
