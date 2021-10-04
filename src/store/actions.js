const actions = {
  loadBlogs: async ({ commit }) => {
    commit({}, [1,1])
  },
  searchText: async ({ commit }, payload) => {
    commit('searchText', payload);
  },
  addComment: async ({ commit}, payload) => {
    commit('addComment', payload)
  },
  addBlog: async ({ commit }, payload) =>{
    commit('addBlog', payload)
  }
}

export default actions