import getters from '@/store/getters'
import {blogs} from './dataProvider'

const state={
    blogs,
    searchText:'test',
    blogCategories:[
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
test('getter getBlogs should return all blogs',async()=>{
    expect(getters.getBlogs(state).length).toBe(blogs.length)
})

test('getter should get searchText',async()=>{
    expect(getters.searchText(state)).toBe('test')
})


test('getter should return all categories', async()=>{
    expect(getters.getBlogCategories(state).length).toBe(state.blogCategories.length)
})
