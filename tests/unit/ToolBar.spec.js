import {
  shallowMount,
  createLocalVue,
  mount
} from "@vue/test-utils"
import ToolBar from '@/components/ToolBar.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from '@/router/routes'
// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);


describe('Toolbar.vue', () => {
  let localVue
  let wrapper
  let router
  let mutations
  let actions
  let store
  beforeEach(() => {
      localVue = createLocalVue()
      localVue.use(VueRouter)
      localVue.use(Vuex)
      mutations={
          searchText(state,payload){
              state.searchText=payload
          },
      }
      actions={
          searchText(context,payload){
              context.commit('searchText',payload)
          }
      }
      store = new Vuex.Store({
          state: {
              searchText:''
          },
          mutations,
          actions
      })
      router = new VueRouter({routes})
      
      wrapper = mount(ToolBar, {
          sync: false,
          localVue,
          router,
          store
      });
  
  });

  it('Search text should update the store', async () => {
      let input=wrapper.find('#search-input')
      input.element.value = "test"
      input.trigger('input')
      expect(wrapper.vm.$store.state.searchText).toBe('test')
  })
  it('Search bar should only be visible on home page', async () => {
      wrapper.vm.$router.push('/add')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('#search-input').exists()).toBe(false)
      wrapper.vm.$router.push('/')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('#search-input').exists()).toBe(true)
  })

  it('Tool bar title click should redirect to home', async () => {
      wrapper.vm.$router.push('/add')
      wrapper.find('#btn-home').trigger('click');
      expect(wrapper.vm.$route.fullPath).toBe('/')
  })
  it('ToolBar back button should only be visible on pages other than home page', async () => {
      wrapper.vm.$router.push('/')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('#btn-back').exists()).toBe(false)
      wrapper.vm.$router.push('/add')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('#btn-back').exists()).toBe(true)
  })
})