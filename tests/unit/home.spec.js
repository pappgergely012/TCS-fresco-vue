import {  createLocalVue, shallowMount } from "@vue/test-utils"
import FilterBar from '@/components/FilterBar.vue'
import Blogs from '@/components/Blogs.vue'
import Home from '@/views/Home.vue'
// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);

describe("Home.vue", () => {
    let localVue
    let wrapper
    beforeEach(() => {

      localVue = createLocalVue();
     
      wrapper = shallowMount(Home, { localVue,sync: false })
    });

  it("Home Should render FilterBar component ", async() => {
    expect(wrapper.find(FilterBar).exists()).toBe(true)
  })
  it("Home Should render Blogs component  ", async() => {
    expect(wrapper.find(Blogs).exists()).toBe(true)
  })
})