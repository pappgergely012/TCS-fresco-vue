import {
  createLocalVue,
  mount
} from "@vue/test-utils"
import Comments from '@/components/Comments.vue'
import {
  blogs
} from './dataProvider'
//import Vuetify from 'vuetify'

// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);


describe('Comments.Vue', () => {
  let localVue
  let wrapper
  let idx=0
  let comments
  beforeEach(() => {
      idx=Math.floor((Math.random() * (blogs.length-1)) + 0)
      comments = blogs[idx].comments
      localVue = createLocalVue();
      //localVue.use(Vuetify);
      wrapper = mount(Comments, {
          localVue,
          sync: false,
          propsData: {
              comments
          }
      });
  });
  it('Should list all comments', async () => {
      expect(wrapper.findAll('.comment-list').length).toBe(comments.length)
  })
  it('Should iteratively list commentor names', async () => {
      expect(wrapper.findAll('.commentor-name').length).toBe(comments.length)
     expect(wrapper.find('.commentor-name').text()).toBe(comments[0].name)
  })

  it('Should iteratively list comments', async () => {
      expect(wrapper.findAll('.comment-text').length).toBe(comments.length)
      expect(wrapper.find('.comment-text').text()).toBe(comments[0].comment)
   })

})