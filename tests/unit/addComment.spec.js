import {
  createLocalVue,
  mount
} from "@vue/test-utils"
import Vuex from 'vuex'
import AddComment from '@/components/AddComment.vue'
import {
  blogs
} from './dataProvider'
//import Vuetify from 'vuetify'

// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);


describe('AddComment Form Validation', () => {
  let localVue
  let wrapper
  let store
  let actions
  beforeEach(() => {
      actions = {
          addComment: jest.fn()
      }
      localVue = createLocalVue();
      localVue.use(Vuex);
      //localVue.use(Vuetify);
      store = new Vuex.Store({
          state: {
              blogs
          },
          actions
      })
      wrapper = mount(AddComment, {
          store,
          localVue,
          sync: false,
          propsData: {
              blogId: blogs[0].id
          }
      });
  });
  it('AddComment Form Should validate for name', async () => {
      wrapper.setData({
          formData: {
              name: '',
              comment: 'ajksdas daskdnas dkasdn asdkasnd',
              rating: 0
          }
      })
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$refs.form.value).toBe(false)
  })

  it('AddComment Form Should accept comments with atleast 10 chars long', async () => {
      wrapper.setData({
          formData: {
              name: 'me',
              comment: 'ajks',
              rating: 0
          }
      })
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$refs.form.value).toBe(false)
  })


  it('AddForm Add button click should submit comment to store via actions', async () => {
      wrapper.setData({
          formData: {
              name: 'me',
              comment: 'ajksasdasda asasd as d as das',
              rating: 0
          }
      })
      await wrapper.vm.$nextTick();
      wrapper.vm.submit();
      expect(actions.addComment).toHaveBeenCalledTimes(1);
  })

  it('AddForm Add button click should clear form data', async () => {
      wrapper.setData({
          formData: {
              name: 'me',
              comment: 'ajksasdasda asasd as d as das',
              rating: 5
          }
      })
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$refs.form.value).toBe(true)
      wrapper.vm.submit();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$refs.form.value).toBe(false)
      expect(wrapper.vm.formData.rating).toBe(0)
  })

})