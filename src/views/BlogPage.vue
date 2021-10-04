<template>
  <div>
    <blog-content />
  </div>
</template>

<script>
  import BlogContent from '@/components/BlogContent';

  export default {
    name: 'BlogView',
    components: {
      'blog-content': BlogContent
    }
  }
</script>