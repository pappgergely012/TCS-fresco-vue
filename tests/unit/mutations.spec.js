import mutations from '@/store/mutations'
import {
    blogs
} from './dataProvider'
let state
describe('mutations.js', () => {
    beforeEach(() => {
        state = {
            blogs: [],
            searchText: '',
            bogCategories: [
                'Culture',
                'Tech',
                'Self',
                'Politics',
                'Design',
                'Health',
                'Comics',
                'Movies',
                'Food',
                'Fiction',
                'Music',
                'Social Media'
            ]
        }
    });
    test('Should load blogs received from actions to the store', async () => {
        expect(state.blogs.length).toBe(0)
        await mutations.loadBlogs(state, blogs)
        expect(state.blogs.length).toBe(blogs.length)
    })

    test('Should load blogs received from actions to the store', async () => {
        expect(state.blogs.length).toBe(0)
        await mutations.addBlog(state, blogs[0])
        expect(state.blogs.length).toBe(1)

    })
    test('Should update searchText', async () => {
        expect(state.searchText).toBe('')
        await mutations.searchText(state,'test')
        expect(state.searchText).toBe('test')
    })
    test('Should add comments to store', async () => {
        await mutations.addBlog(state, blogs[0])
        let len=blogs[0].comments.length
        expect(state.blogs[0].comments.length).toBe(len)
        let comment=blogs[1].comments[0]
        await mutations.addComment(state,{comment,id:blogs[0].id})
        expect(state.blogs[0].comments.length).toBe(len+1)

    })
})