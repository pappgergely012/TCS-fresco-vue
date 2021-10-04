import actions from '@/store/actions'
import {
    blogs
} from './dataProvider'

describe('actions.js', () => {

    jest.mock('axios')

    it('should load data from server', async() => {
        let count = 0
        let data
        let mockCommit = (state, payload) => {
            data = payload
            count += 1
        }
       await actions.loadBlogs({commit: mockCommit})

       expect(count).toBe(1)
         expect(data.length).toBe(2)
    })

    it('should update searchText', async() => {
        let count = 0
        let data
        let mockCommit = (state, payload) => {
            data = payload
            count += 1
        }
       await actions.searchText({commit:mockCommit},'test')
       expect(count).toBe(1)
         expect(data).toBe('test')
    })

    it('should add comment', async() => {
        let comment={
            name:'test',
            comment:'test',
            rating:1
        }
        let count = 0
        let data
        let mockCommit = (state, payload) => {
            data = payload
            count += 1
        }
       await actions.addComment({commit:mockCommit},{comment,id:1})
       expect(count).toBe(1)
    })


    it('should add new blog', async() => {
        let count = 0
        let data
        let mockCommit = (state, payload) => {
            data = payload
            count += 1
        }
       await actions.addBlog({commit:mockCommit},blogs[0])
       expect(count).toBe(1)
    })
})