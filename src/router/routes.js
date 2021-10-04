import Home from '@/views/Home';
import About from '@/views/About';
import BlogView from '@/views/BlogPage';
import Add from '@/components/Add';

// import AddComment from '@/components/AddComment';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/add',
    component: Add
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/blog/:id',
    name: 'blog-page',
    component: BlogView,
    props: true
  }
]