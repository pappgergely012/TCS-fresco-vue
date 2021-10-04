import { mount, createLocalVue, shallowMount } from "@vue/test-utils"
import App from "@/App.vue"
import VueRouter from "vue-router"
import Add from "@/components/Add.vue"
import About from "@/views/About.vue"
import BlogContent from "@/components/BlogContent.vue"
import AddComment from "@/components/AddComment.vue"
import Home from '@/views/Home.vue'
import Vuex from 'vuex'
import routes from '@/router/routes'
import {blogs} from './dataProvider'
// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);

describe("App", () => {
    let localVue
    let wrapper
    let router 
    let store
    let actions
    let getters
    beforeEach(() => {

      localVue = createLocalVue();
      router= new VueRouter({ routes })
      localVue.use(VueRouter)
      localVue.use(Vuex);
      actions={
          loadBlogs:jest.fn()
      }
      getters={
        getBlogs:()=>blogs ,
        getBlogById:()=>(id)=>blogs[0]
      }
      store = new Vuex.Store({
        state: {
          blogs
        },
        actions,
        getters
      })

      wrapper = mount(App, { localVue, router, store, sync: false })
    });

  it("Should render Add component on rounting /add", async() => {
    wrapper.vm.$router.push("/add")
    await wrapper.vm.$nextTick();
    expect(wrapper.find(Add).exists()).toBe(true)
  })

  it("Should render AddComment component on rounting /blog/:id", async() => {
    wrapper.vm.$router.push(`/blog/${blogs[0].id}`)
    await wrapper.vm.$nextTick();
    expect(wrapper.find(AddComment).exists()).toBe(true)
  })

  it("Should render BlogContent component on rounting /blog/:id", async() => {
    wrapper.vm.$router.push(`/blog/${blogs[0].id}`)
    await wrapper.vm.$nextTick();
    expect(wrapper.find(BlogContent).exists()).toBe(true)
  })
  it("should render about view on /about navigation",async()=>{
    wrapper.vm.$router.push(`/about`)
    await wrapper.vm.$nextTick();
    expect(wrapper.find(About).exists()).toBe(true)
  })
  it("should render Home on / navigation",async()=>{
    wrapper.vm.$router.push(`/`)
    await wrapper.vm.$nextTick();
    expect(wrapper.find(Home).exists()).toBe(true)
  })
})