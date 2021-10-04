<template>
  <v-app>
    <ToolBar />

    <v-layout>
      <router-view></router-view>
    </v-layout>

    <Footer />
  </v-app>
</template>

<script>
  import Footer from './components/Footer';
  import ToolBar from './components/ToolBar';

  export default {
    name: 'App',
    components: {
      ToolBar,
      Footer,
    },
    data: () => ({
      //
    }),
  };
</script>
