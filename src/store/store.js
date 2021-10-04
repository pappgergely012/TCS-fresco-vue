import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex)

const defaultBlog = {
  title: 'Default Title',
  id: '123asd1',
  name: 'Author name',
  time: '11/22/1111',
  cateogry: ['Tech'],
  post: 'asdasdasd',
  comments: []
}

const store = new Vuex.Store({
  state: {
    searchText: '',
    blogs: [ defaultBlog ],
    blogCategories: [
      'Culture',
      'Tech',
      'Self',
      'Politics',
      'Design',
      'Health',
      'Comics',
      'Movies',
      'Food',
      'Fiction',
      'Music',
      'Social Media'
    ]
  },
  mutations,
  actions
})

export default store;