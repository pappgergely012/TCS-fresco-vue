import {
  mount,
  createLocalVue,
  shallowMount
} from "@vue/test-utils"
import VueRouter from "vue-router"
import Blogs from "@/components/Blogs.vue"
import Blog from "@/components/Blog.vue"
import ToolBar from '@/components/ToolBar.vue'
import FilterBar from '@/components/FilterBar.vue'
import Vuex from 'vuex'
import routes from '@/router/routes'

jest.mock('axios')

// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);

describe("Blogs.vue", () => {
  let localVue
  let wrapper
  let router
  let store
  let getters
  let mutations
  let actions
  let itemPerPage
  let idx
  let idx1
  let blogs = [{
      "id": 6,
      "title": "title9",
      "post": "post....1",
      "name": "me5",
      "url": "http://asdasd.com",
      "categories": [
        "Culture",
        "Tech",
        "Politics",
      ],
      "comments": [{
          "name": "4 3hj",
          "comment": "S 3ZaJTd78apTd ",
          "time": "2019-01-11T02:53:57.534Z",
          "rating": 1
        },
        {
          "name": "  cIo",
          "comment": "YpMk4MGy Jxh",
          "time": "2019-01-10T19:20:39.647Z",
          "rating": 2
        }
      ],
      "time": "2019-01-11T06:40:18.056Z"
    },
    {
      "id": 7,
      "title": "title1",
      "post": "post....1",
      "name": "me4",
      "url": "http://asdasd.com",
      "categories": [
        "Politics",
        "Health",
        "Culture"
      ],
      "comments": [{
          "name": "xZSKe",
          "comment": "Py6 Kz EtPqPIS3",
          "time": "2019-01-11T02:35:36.345Z",
          "rating": 5
        },
        {
          "name": "jlZyt",
          "comment": "5aEM8AB 2GX6",
          "time": "2019-01-11T05:41:52.798Z",
          "rating": 4
        }
      ],
      "time": "2019-01-11T00:14:57.514Z"
    },
    {
      "id": 8,
      "title": "title2",
      "post": "post....3",
      "name": "me3",
      "url": "http://asdasd.com",
      "categories": [
        "Culture",
        "Health"
      ],
      "comments": [{
          "name": " SKzP",
          "comment": "Mza6ud  H p5PZV",
          "time": "2019-01-11T05:42:49.519Z",
          "rating": 1
        },
        {
          "name": "t h l",
          "comment": " s54IQcnH4bH",
          "time": "2019-01-11T03:57:47.140Z",
          "rating": 1
        }
      ],
      "time": "2019-01-11T08:27:16.713Z"
    },
    {
      "id": 9,
      "title": "title3",
      "post": "post....4",
      "name": "me2",
      "url": "http://asdasd.com",
      "categories": [
        "Culture",
        "Tech",
        "Self",
        "Politics",
      ],
      "comments": [{
          "name": "E1f I",
          "comment": "PIX2NcF1KjOiLVZ",
          "time": "2019-01-11T08:08:16.014Z",
          "rating": 3
        },
        {
          "name": " oiiH",
          "comment": " NFy0d6myV0j",
          "time": "2019-01-11T12:41:44.549Z",
          "rating": 1
        }
      ],
      "time": "2019-01-11T01:38:07.021Z"
    },
    {
      "id": 10,
      "title": "title4",
      "post": "post....5",
      "name": "me1",
      "url": "http://asdasd.com",
      "categories": [
        "Self",
        "Politics",
        "Design",
        "Health"
      ],
      "comments": [{
          "name": "mLH6s",
          "comment": "Gxcz2q 76 VX4z2",
          "time": "2019-01-10T19:12:23.945Z",
          "rating": 2
        },
        {
          "name": "HW8UE",
          "comment": "UZuHsUIXpNSv",
          "time": "2019-01-10T20:29:38.914Z",
          "rating": 3
        }
      ],
      "time": "2019-01-11T11:16:33.629Z"
    },
  ]
  beforeEach(() => {
    itemPerPage = (Math.floor(Math.random() * 3) + 1) >= blogs.length ? blogs.length : Math.floor(Math.random() * 3) + 1
    localVue = createLocalVue();
    router = new VueRouter({
      routes
    })
    localVue.use(VueRouter)
    localVue.use(Vuex);
    getters = {
      getBlogs: (state) => {
        return state.blogs;
      },
      searchText(state) {
        return state.searchText
      }
    }
    mutations = {
      searchText(state, payload) {
        state.searchText = payload
      },
    }
    store = new Vuex.Store({
      state: {
        blogs,
        searchText: ''
      },
      getters,
      mutations
    })

    idx = Math.round(Math.random() * 3)
    idx1 = Math.round((Math.random() * (blogs.length - 3)) + 2)
    wrapper = shallowMount(Blogs, {
      localVue,
      router,
      store,
      sync: false
    })
  });

  it("should paginate properly and render <Blog/> based on itemPerPage", async () => {
    wrapper.setData({
      itemPerPage,
      page: 1
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll(Blog).length).toBe(wrapper.vm.itemPerPage)
  })
  it("Pagination Shold display pagination buttons based on 'itemsPerPage' attribute", async () => {
    wrapper.setData({
      itemPerPage,
      page: 1
    })
    let pageLen=Math.ceil(blogs.length/itemPerPage).toString()
    await wrapper.vm.$nextTick()
    let pager=wrapper.find('#el-pager')
    expect(pager.attributes('length')).toBe(pageLen)
    
  })
    it("Should paginate properly based on search text", async () => {
    wrapper.setData({
      itemPerPage:blogs.length,
      page: 1
    })
    wrapper.vm.$store.commit('searchText','title9')
    await wrapper.vm.$nextTick()
    let pager=wrapper.find('#el-pager')
    expect(pager.attributes('length')).toBe('1')
  })

  it("Should search based on title", async () => {
    let idx = Math.floor(Math.random() * (blogs.length - 1))
    wrapper.setData({
      itemPerPage: blogs.length - 1,
      page: 1
    })
    wrapper.vm.$store.commit('searchText', blogs[idx].title)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll(Blog).length).toBe(1)
  })
  it("Should search based on post text", async () => {
    wrapper.setData({
      itemPerPage: blogs.length - 1,
      page: 1
    })
    wrapper.vm.$store.commit('searchText', blogs[0].post)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll(Blog).length).toBe(2)
  })
  it("Should search based on author name", async () => {
    let idx = Math.floor(Math.random() * (blogs.length - 1))
    wrapper.setData({
      itemPerPage: blogs.length - 1,
      page: 1
    })
    wrapper.vm.$store.commit('searchText', blogs[idx].name)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll(Blog).length).toBe(1)
  })
  it("Should filter on given category", async () => {
    let idx = Math.floor(Math.random() * (blogs.length - 1))
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })

    await wrapper.vm.$nextTick()
    router.push("/?category=" + blogs[idx].categories[0])
    expect(wrapper.vm.blogs[0].categories.includes(blogs[idx].categories[0])).toBe(true)

  })

  it("Should sort recent to old based on time", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?sortBy=time&asc=true")
    let blgs = wrapper.vm.filterBlogs()
    expect(blgs[idx].time >= blogs[idx1].time).toBe(true)
  })

  it("Should sort old to recent based on time", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?sortBy=time&asc=false")
    let blgs = wrapper.vm.filterBlogs()
    let res=blgs[idx].time <= blogs[idx1].time
    expect(res).toBe(true)
  })

  it("Should sort low to high based on Average rating", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?sortBy=rating&asc=true")
    let blgs = wrapper.vm.filterBlogs()
    let rt = (blgs[idx].comments[0].rating + blgs[idx].comments[1].rating) / 2;
    let rt1 = (blgs[idx1].comments[0].rating + blgs[idx1].comments[1].rating) / 2;
    expect(rt <= rt1).toBe(true)
  })

  it("Should sort high to low based on Average rating", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?sortBy=rating&asc=false")
    let blgs = wrapper.vm.filterBlogs()
    let rt =Math.round((blgs[idx].comments[0].rating + blgs[idx].comments[1].rating) / 2);
    let rt1 =Math.round((blgs[idx1].comments[0].rating + blgs[idx1].comments[1].rating) / 2)
    expect(rt >= rt1).toBe(true)
  })
  it("Should sort recent to old based on time within the selected category", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?sortBy=time&asc=true&category=Tech")
    let blgs = wrapper.vm.filterBlogs()
    expect(blgs.length).toBe(2)
    let res=blgs[0].time>=blgs[1].time
    expect(res).toBe(true)
  })

  it("Should sort old to recent based on time within the selected category", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?sortBy=time&asc=false&category=Culture")
    let blgs = wrapper.vm.filterBlogs()

    expect(blgs.length).toBe(4)
    expect(blgs[1].time <= blogs[2].time).toBe(true)
  })

  it("Should sort low to high based on time within the selected category", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?sortBy=rating&asc=true&category=Politics")
    let blgs = wrapper.vm.filterBlogs()
    expect(blgs.length).toBe(4)
    let rt = (blgs[0].comments[0].rating + blgs[0].comments[1].rating) / 2;
    let rt1 = (blgs[0].comments[0].rating + blgs[0].comments[1].rating) / 2;
    expect(rt <= rt1).toBe(true)
  })
  it("Should sort high to low based on time within the selected category", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?sortBy=rating&asc=true&category=Health")
    let blgs = wrapper.vm.filterBlogs()
    expect(blgs.length).toBe(3)
    let rt = (blgs[0].comments[0].rating + blgs[0].comments[1].rating) / 2;
    let rt1 = (blgs[0].comments[0].rating + blgs[0].comments[1].rating) / 2;
    expect(rt >= rt1).toBe(true)
  })

  it("Should change pagination accoring to  the selected category", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?category=Health")
    let blgs = wrapper.vm.filterBlogs()
    expect(blgs.length).toBe(3)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll(Blog).length).toBe(3)
  })
  it("category=None should remove category filter", async () => {
    wrapper.setData({
      itemPerPage: blogs.length,
      page: 1
    })
    wrapper.vm.$router.push("/?category=Health")
    let blgs = wrapper.vm.filterBlogs()
    expect(blgs.length).toBe(3)
    wrapper.vm.$router.push("/?category=None")
    blgs = wrapper.vm.filterBlogs()
    expect(blgs.length).toBe(5)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll(Blog).length).toBe(5)
  })

})