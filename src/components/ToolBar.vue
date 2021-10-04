<template>
 <v-card
    flat
    tile
  >
    <v-toolbar color="primary">

      <router-link id="btn-home" to="/">
        <v-toolbar-title class="white--text"> 
          <v-icon
            v-if="isHome"
            medium
            id="btn-back"
            color="white"
          >
            mdi-arrow-left
          </v-icon>
          My Blog
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn icon color="white" v-if="!isHome">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-text-field id="search-input" v-model="text" v-if="!isHome" @input="searchChanged" placeholder="Search ..." />
    </v-toolbar>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'ToolBar',
    data: () => ({
      text: ''
    }),
    computed: {
      isHome() {
        return this.$route.path !== '/'
      },
    },
    methods: {
      searchChanged(){
        this.searchText(this.text)
      },
      ...mapActions({
        searchText: 'searchText'
      })
    }
  }
</script>