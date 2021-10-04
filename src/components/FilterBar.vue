<template>
  <div></div>
</template>

<script>
  export default {
    name: 'FilterBar',
    data: () => ({
      sortTime: false,
      sortRate: false,
      selectedCat: ''
    }),
    watch: {
      selectedCat(){
        this.$router.push({ query: {}});
      }
    },
    methods: {
      filter(){
        if (this.selectedCat) {
          const prev = this.sortTime && this.$route.query;

          this.$router.push({ query: { ...prev, category: this.selectedCat }})
        }
      },
      sort(i){
        const query = { sortBy: '', asc: '' };
        const category = this.selectedCat && { category: this.selectedCat  };

        if (i === 0) {
          query.sortBy = 'time';
          query.asc = this.sortTime;
        } else {
          query.sortBy = 'rating';
          query.asc = this.sortRate;
        }

        this.$router.push({ query: { sortBy: query.sortBy, asc: query.asc,  ...category } })

        return query;
      }
    }
  }
</script>