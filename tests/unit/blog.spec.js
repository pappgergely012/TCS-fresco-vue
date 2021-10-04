import {
  mount,
  createLocalVue
} from "@vue/test-utils"
import Blog from '@/components/Blog.vue'
import VueRouter from "vue-router"
import routes from '@/router/routes'
import {blogs} from './dataProvider'
import Constants from '../../src/constants'

// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);

describe("Blog.vue", () => {
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

      wrapper = mount(Blog, {
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

  it("should render post with proper formatting ", async () => {
      expect(wrapper.find('#post-content').text()).toBe(blog.post.substring(0, 10) + '.....')
  })
  it("should render post writter's name ", async () => {
      expect(wrapper.find('#post-by').text()).toBe(`by:${blog.name}`)
  })

  it("should print proper comment count", async () => {
      expect(wrapper.find('#comment-count').text()).toBe('' + blog.comments.length)
  })
  it("should print proper post date in propper format", async () => {
      expect(wrapper.find('#post-date').text()).toBe((new Date(blog.time).getMonth() + 1) + '/' + new Date(blog.time).getFullYear())
  })
  it("should print proper avg rating in propper format", async () => {
      let avg=(blog.comments[0].rating+ blog.comments[1].rating)/2
      avg=Math.round(avg*100)/100
      expect(wrapper.find('#avg-rating').text()).toBe(`Avg Rating : ${avg}`)
  })
  it("should redirect to blog read page on clicking blog", async () => {
      wrapper.trigger('click')
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$route.fullPath).toBe(`/blog/${blog.id}`)
  })
  it("should render image when url is given ", async () => {
      wrapper.vm.$nextTick()
      let img=wrapper.find('#blog-img')
      expect(img.html()).toContain(blog.url)
  })

  it("should render default image when url is not given ", async () => {
      blog.url=''
      wrapper = mount(Blog, {
          localVue,
          router,
          propsData: {
              blog
          },
          sync: false
      })
      wrapper.vm.$nextTick()
      let img=wrapper.find('#blog-img')
      expect(img.attributes('src')).toContain(Constants.DEFAULT_IMG)
  })
  
})