import {
  shallowMount,
  createLocalVue,
  mount
} from "@vue/test-utils"
import Vuex from 'vuex'
import Add from '@/components/Add.vue'
//import Vuetify from 'vuetify'

// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);


describe('Add Form Validation', () => {
  let localVue
  let wrapper
  let store
  let mutations
  let actions
  beforeEach(() => {
    mutations = {
        addBlog: (state, payload) => {
          state.notes.push(payload)
        }
      },
      actions = {
        addBlog(context, payload) {
          context.commit('addBlog', payload)
        }
      }
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      state: {
        blogs: [{
          title: 'tyasdg'
        }]
      },
      mutations,
      actions
    })
    wrapper = mount(Add, {

      localVue,
      store,
      sync: false
    });
  });

  it('Form Should validate for title', async () => {
    wrapper.setData({
      formData: {
        title: '',
        post: 'post',
        categories: ['Culture'],
        name: 'me',
        url: '',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(false)
  }),


  it('Form Should validate for Post', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: '',
        categories: ['Culture'],
        name: 'me',
        url: '',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(false)
  })

  it('Form Should validate for Categories', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'POST',
        categories: [],
        name: 'me',
        url: '',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(false)
  })

  it('Form Should validate for person name', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'POST',
        categories: ['Culture'],
        name: '',
        url: '',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(false)
  })


  it('Form Should validate for the validity of URL', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'POST',
        categories: ['Culture'],
        name: 'me',
        url: 'invalid_url',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(false)
  })

  it('Form Should only accept https URL', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'POST',
        categories: ['Culture'],
        name: 'me',
        url: 'http://test.com',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(false)
  })

  it('Form Should allow add post if every feild is valid(url given)', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'That said, we are undeniably embarking on an “Asian decade” (maybe even two)—a period that largely coincides with our current G-Zero era of world politics, which is defined principally by its lack of global leadership. What that means in practice is that there is no country (or group of countries) leading global responses to global problems such as climate change or the next pandemic. So, as advanced industrial economies continue to struggle to balance democracy’s dynamism with the toll globalization has taken on large segments of their societies, China’s state-capitalist approach looks set to continue barreling on',
        categories: ['Culture'],
        name: 'me',
        url: 'https://asjhj.com',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(true)
  })


  it('Form Should allow add post if every feild is valid(url not given)', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'That said, we are undeniably embarking on an “Asian decade” (maybe even two)—a period that largely coincides with our current G-Zero era of world politics, which is defined principally by its lack of global leadership. What that means in practice is that there is no country (or group of countries) leading global responses to global problems such as climate change or the next pandemic. So, as advanced industrial economies continue to struggle to balance democracy’s dynamism with the toll globalization has taken on large segments of their societies, China’s state-capitalist approach looks set to continue barreling on',
        categories: ['Culture'],
        name: 'me',
        url: '',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(true)
  })

})

describe('Add.vue Functionalities', () => {
  let localVue
  let wrapper
  let store
  let mutations
  let actions
  beforeEach(() => {
    mutations = {
      addBlog: (state, payload) => {
        state.blogs.push(payload)
      }
    }
    actions = {
      addBlog(context, payload) {
        context.commit('addBlog', payload)
      }
    }
    localVue = createLocalVue();
    localVue.use(Vuex);
    //localVue.use(Vuetify);
    store = new Vuex.Store({
      state: {
        blogs: []
      },
      mutations,
      actions
    })
    wrapper = mount(Add, {
      store,
      localVue,
      sync: false
    });
  });

  it('Add button click should submit form data to the store if form data is valid', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'That said, we are undeniably embarking on an “Asian decade” (maybe even two)—a period that largely coincides with our current G-Zero era of world politics, which is defined principally by its lack of global leadership. What that means in practice is that there is no country (or group of countries) leading global responses to global problems such as climate change or the next pandemic. So, as advanced industrial economies continue to struggle to balance democracy’s dynamism with the toll globalization has taken on large segments of their societies, China’s state-capitalist approach looks set to continue barreling on',
        categories: ['Culture'],
        name: 'me',
        url: 'https://asjhj.com',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$store.state.blogs.length).toBe(0)
    wrapper.vm.submit();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$store.state.blogs.length).toBe(1)
  })

  it('Add button click should show success dialog if form data is valid', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'That said, we are undeniably embarking on an “Asian decade” (maybe even two)—a period that largely coincides with our current G-Zero era of world politics, which is defined principally by its lack of global leadership. What that means in practice is that there is no country (or group of countries) leading global responses to global problems such as climate change or the next pandemic. So, as advanced industrial economies continue to struggle to balance democracy’s dynamism with the toll globalization has taken on large segments of their societies, China’s state-capitalist approach looks set to continue barreling on',
        categories: ['Culture'],
        name: 'me',
        url: 'https://asjhj.com',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    }) 

    await wrapper.vm.$nextTick();
    wrapper.vm.submit();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isDialogOpen).toBe(true)
  })

  it('Add button click should clear form data', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'POST',
        categories: ['Culture'],
        name: 'me',
        url: 'https://asjhj.com',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })

    await wrapper.vm.$nextTick();
    wrapper.vm.submit();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(false)
  })


  it('Discard button click should clear form data', async () => {
    wrapper.setData({
      formData: {
        title: 'title',
        post: 'POST',
        categories: ['Culture'],
        name: 'me',
        url: 'https://asjhj.com',
        time: new Date().toISOString(),
        status: "ACTIVE"
      }
    })

    await wrapper.vm.$nextTick();

    wrapper.vm.discard();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.form.value).toBe(false)

  })
})