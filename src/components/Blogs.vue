<template>
  <div>
    <div v-for="data in blogs" :key="data.id" >
      <blog-view v-bind:blog="data"></blog-view>
    </div>

    <ol id="el-pager" :length="numberOfPages">
      <li v-for="i in numberOfPages" :key="i">
        {{i}}
      </li>
    </ol>
  </div>  
</template>

<script>
  import Blog from '@/components/Blog.vue';

  export default {
    name: 'Blogs',
    components: { 
      'blog-view': Blog
    },
    data: () => ({
      blogs: [],
      render: false,
      numberOfPages: null,
      itemPerPage: null,
      page: null
    }),
    watch: {
      '$store.state.searchText'(){
        const searchText = this.$store.state.searchText;

        this.blogs = this.$store.state.blogs.filter((blog) => 
          blog.title.includes(searchText) || blog.post.includes(searchText) || blog.name.includes(searchText))
      },
      itemPerPage(){
        const allBlogs = this.$store.state.blogs;
        const searchText = this.$store.state.searchText;
        const catName = this.$route.query.category;

        let tmpCurrentBlogs = this.blogs;
        let tmpNumberOfPages = 0;

        tmpCurrentBlogs = allBlogs.slice(0, this.itemPerPage);
        tmpNumberOfPages = Math.ceil(allBlogs.length / this.itemPerPage);

        if (searchText) {
          tmpCurrentBlogs = allBlogs.filter((blog) => 
            blog.title.includes(searchText) || blog.post.includes(searchText) || blog.name.includes(searchText))
          tmpNumberOfPages = Math.ceil(this.blogs.length/ this.itemPerPage);
        }

        if (catName && catName !== 'None') {
          tmpCurrentBlogs = allBlogs.filter(blog => blog.categories.includes(catName));
        }

        this.blogs = tmpCurrentBlogs;
        this.numberOfPages = tmpNumberOfPages;
      }
    },
    methods: {
      filterBlogs(){
        const sortBy = this.$route.query.sortBy;
        const asc = this.$route.query.asc;
        const catName = this.$route.query.category;
        let tmpBlogs = [];

        if (catName && catName !== 'None') {
          tmpBlogs = this.$store.state.blogs.filter(blog => blog.categories.includes(catName))
        } else {
          tmpBlogs = this.$store.state.blogs;
        }

        if (sortBy === 'time') {
          const ascending = tmpBlogs.sort((a, b) => new Date(b.time) - new Date(a.time));

          return asc === 'true' ? ascending : ascending.reverse();
        } 

        if (sortBy === 'rating') {
          const ascending = tmpBlogs.sort((a, b) => {
              const aRatingSumm = a.comments.reduce((p, n) => p.rating + n.rating);
              const aAvarageRating = aRatingSumm / a.comments.length;
              const bRatingSumm = b.comments.reduce((p, n) => p.rating + n.rating);
              const bAvarageRating = bRatingSumm / a.comments.length;
  
              return aAvarageRating - bAvarageRating
            })

          return asc === 'true' ? ascending : ascending.reverse();
        }
        this.blogs = tmpBlogs;
        return tmpBlogs;
      }
    }
}
</script>