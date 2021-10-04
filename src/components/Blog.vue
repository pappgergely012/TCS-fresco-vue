<template>
  <div @click="navigate">
    <h1 class="headline">{{blog.title}}</h1>
    <div id="post-content">{{ formatPostContent }}</div>
    <div id="post-by">by:{{ blog.name }}</div>
    <div id="comment-count">{{ blog.comments.length }}</div>
    <div id="post-date">{{ formatDate }}</div>
    <div id="avg-rating">Avg Rating : {{ formatAvgRating }}</div>
    <img id="blog-img" :src="getImageUrl" />
  </div>
</template>

<script> 
  import Constants from '../constants';

  export default {
    name: 'Blog',
    props: [
      'blog'
    ],
    computed: {
      formatPostContent(){
        return `${this.blog.post.substring(0, 10)}.....`;
      },
      formatDate(){
        return (new Date(this.blog.time).getMonth() + 1) + '/' + new Date(this.blog.time).getFullYear();
      },
      formatAvgRating(){
        if (this.blog.comments.length > 0) {
          const ratings = (this.blog.comments[0].rating + this.blog.comments[1].rating)/2;
          const avg = Math.round(ratings * 100)/100;
  
          return avg;
        }

        return null
      },
      getImageUrl(){
        return this.blog.url || Constants.DEFAULT_IMG;
      }
    },
    methods: {
      navigate(){
        this.$router.push({ name: `blog-page`, params: { id: this.blog.id, blog: this.blog } });
      }
    },
    create(){
      console.log(this.blog.id)
    }
  }
</script>