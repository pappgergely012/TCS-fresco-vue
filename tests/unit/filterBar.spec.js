import {
    mount,
    createLocalVue,
    shallowMount
} from "@vue/test-utils"
import VueRouter from "vue-router"
import FilterBar from '@/components/FilterBar.vue'
import Vuex from 'vuex'
import routes from '@/router/routes'
// avoids "[Vuetify] Unable to locate target [data-app]" error
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.append(app);

describe("FilterBar.vue", () => {
    let localVue
    let wrapper
    let router
    let getters
    let store
    beforeEach(() => {
        localVue = createLocalVue();
        router = new VueRouter({
            routes
        })
        localVue.use(VueRouter)
        localVue.use(Vuex)
        getters = {
            getBlogCategories: () => {
                return ['Music', 'Tech', 'Health', 'Food']
            }
        }
        store = new Vuex.Store({
            getters,
        })
        wrapper = mount(FilterBar, {
            localVue,
            router,
            store,
            sync: false
        })
    });

    it("should update url when sort by recent to old selected", async () => {
        wrapper.vm.sortTime=true
        wrapper.vm.sort(0)
        expect(wrapper.vm.$route.fullPath).toBe('/?sortBy=time&asc=true')
    })

    it("should update url when sort by  old to recent selected", async () => {
        wrapper.vm.sortTime=false
        wrapper.vm.sort(0)
        expect(wrapper.vm.$route.fullPath).toBe('/?sortBy=time&asc=false')
    })

    it("should update url when sort by  low to high rating is selected", async () => {
        wrapper.vm.sortRate=true
        wrapper.vm.sort(1)
        expect(wrapper.vm.$route.fullPath).toBe('/?sortBy=rating&asc=true')
    })

    it("should update url when sort by  high to low rating is selected", async () => {
        wrapper.vm.sortRate=false
        wrapper.vm.sort(1)
        expect(wrapper.vm.$route.fullPath).toBe('/?sortBy=rating&asc=false')
    })
    it("should update url when category is selected", async () => {
        wrapper.vm.selectedCat='Music'
        wrapper.vm.filter()
        expect(wrapper.vm.$route.fullPath).toBe('/?category=Music')
    })
    it("should update url when both category and sort by  low to high rating are selected", async () => {
        wrapper.vm.selectedCat='Music'
        wrapper.vm.filter()
        wrapper.vm.sortRate=false
        wrapper.vm.sort(1)
        expect(wrapper.vm.$route.fullPath).toBe('/?sortBy=rating&asc=false&category=Music')
    })

    it("should update url when both sort by  low to high time  and category are selected", async () => {
        wrapper.vm.sortTime=true
        wrapper.vm.sort(0)
        wrapper.vm.selectedCat='Tech'
        wrapper.vm.filter()
        expect(wrapper.vm.$route.fullPath).toBe('/?sortBy=time&asc=true&category=Tech')
    })

})