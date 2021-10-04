<template>
  <div>
    <div  v-for="(comment, index) in comments" :key="index" class="comment-list">
      <span class="commentor-name">{{ comment.name }}</span>
      <span class="comment-text">{{ comment.comment }}</span>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Comments',
    props: [ 'comments' ]
  }
</script>