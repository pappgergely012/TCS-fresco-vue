const mutations = {
  loadBlogs(state, payload) {
    state.blogs = payload;
  },
  addBlog(state, payload){
    state.blogs.push(payload);
  },
  addComment(state, payload) {
    const { comment, id } = payload;

    state.blogs = state.blogs.map(blog => {
      if (blog.id.toString() === id.toString()) {
        blog.comments.push(comment); 
      }

      return blog;
    })
  },
  searchText(state, payload) {
    state.searchText = payload;
  }
}

export default mutations;