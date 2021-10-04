<template>
  <div>
    <h1 class="headline">{{ getBlog.title }}</h1>
    <div id="post-content">{{ getBlog.post }}</div>
    <div id="post-by">by:{{ getBlog.name }}</div>
    <div id="comment-count">{{ getBlog.comments.length }}</div>
    <div id="post-date">Posted on : {{ formatDate }}</div>
    <div id="avg-rating">Avg Rating : {{ formatAvgRating }}</div>
    <ol>
      <li class="categories" v-for="(category, index) in getBlog.categories" :key="index">{{ category }}</li>
    </ol>
    <img id="blog-img" :src="getImageUrl" />
    <add-comment />
  </div>
</template>

<script>
  import AddComment from '@/components/AddComment';
  import Constants from '../constants';

  export default {
    name: 'BlogContent',
    components: {
      'add-comment': AddComment,
    },
    props: [
      'blog'
    ],
    computed: {
      formatDate(){
        return new Date(this.getBlog.time).getDate()+'/'+(new Date(this.getBlog.time).getMonth()+1)+'/'+new Date(this.getBlog.time).getFullYear();
      },
      formatAvgRating(){
        if (this.getBlog.comments.length > 0) {
          const ratings = (this.getBlog.comments[0].rating + this.getBlog.comments[1].rating)/2;
          const avg = Math.round(ratings * 100)/100;
  
          return avg;
        }

        return null;
      },
      getImageUrl(){
        return this.getBlog.url || Constants.DEFAULT_IMG;
      },
      getBlog(){
        if (!this?.blog) {
          const currentId = this.$route.params.id;

          return this.$store.state.blogs.find(i => i.id.toString() === currentId.toString());
        }

        return this.blog;
      }
    }
  }
</script>