/* eslint-disable vue/valid-v-for */

<template>
  <v-container class="my-0">
    <v-layout row>
      <v-flex xs8 class="pa-2">
        <blogs-view />
      </v-flex>

      <v-flex xs4 class="pa-2">
        <filter-bar />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script> 
  import FilterBar from '@/components/FilterBar';
  import Blogs from '@/components/Blogs';

  export default {
    name: 'Home',
    components: { 
      'filter-bar': FilterBar,
      'blogs-view': Blogs
    },
    computed: {
      blogs(){
        return this.$store.state.blogs
      }
    }
  }
</script>