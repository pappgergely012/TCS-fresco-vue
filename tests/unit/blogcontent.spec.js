import {
  mount,
  createLocalVue
} from "@vue/test-utils"
import BlogContent from '@/components/BlogContent.vue'
import VueRouter from "vue-router"
import routes from '@/router/routes'
import {blogs} from './dataProvider'
import Constants from '../../src/constants'

// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);

describe("BlogContent.vue", () => {
  let localVue
  let wrapper
  let router
  let blog
  let idx
  beforeEach(() => {
     idx=Math.floor((Math.random() * (blogs.length-1)) + 0)
      blog = blogs[idx]
      localVue = createLocalVue();
      router = new VueRouter({
          routes
      })
      localVue.use(VueRouter)

      wrapper = mount(BlogContent, {
          localVue,
          router,
          propsData: {
              blog
          },
          sync: false
      })

  });

  it("should render title ", async () => {
      expect(wrapper.find('.headline').text()).toBe(blog.title)
  })
  it("should render blog post completely ", async () => {
      expect(wrapper.find('#post-content').text()).toBe(blog.post)
  })
  it("should render blog post time in proper format", async () => {
      let format=`Posted on : ${new Date(blog.time).getDate()+'/'+(new Date(blog.time).getMonth()+1)+'/'+new Date(blog.time).getFullYear()}`
      expect(wrapper.find('#post-date').text()).toBe(format)
  })
  it("should list categories to which post belongs ", async () => {
      expect(wrapper.findAll('.categories').length).toBe(blog.categories.length)
      expect(wrapper.find('.categories').text()).toBe(blog.categories[0])
  })
  it("should render image when url is given ", async () => {
      wrapper.vm.$nextTick()
      let img=wrapper.find('#blog-img')
      expect(img.html()).toContain(blog.url)
  })

  it("should render default image when url is not given ", async () => {
      blog.url=''
      wrapper = mount(BlogContent, {
          localVue,
          router,
          propsData: {
              blog
          },
          sync: false
      })
      wrapper.vm.$nextTick()
      let img=wrapper.find('#blog-img')
      expect(img.html()).toContain(Constants.DEFAULT_IMG)
  })    
})