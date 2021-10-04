import {
  createLocalVue,
  mount
} from "@vue/test-utils"
import Footer from '@/components/Footer.vue'
import VueRouter from 'vue-router'
// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);


describe('Footer.vue', () => {
  let localVue
  let wrapper
  let router
  beforeEach(() => {
      localVue = createLocalVue()
      localVue.use(VueRouter)
      router = new VueRouter()
      wrapper = mount(Footer, {
          sync: false,
          localVue,
          router
      });
  
  });

  it('Add FAB button click should navigate to /add and should mount add component', async () => {
      wrapper.find('#btn-fab-add').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$route.fullPath).toBe('/add')
  })
  it('About link click should navigate to /about', async () => {
      wrapper.find('#btn-about').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$route.fullPath).toBe('/about')
  })
   
})