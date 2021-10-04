<template>
  <v-form v-on:submit.prevent="submit" v-model="valid" ref="form">
    <v-text-field v-model="formData.name" placeholder="Name" />

    <v-textarea v-model="formData.comment" placeholder="Comment" />

    <v-rating
      v-model="formData.rating"
      background-color="green lighten-3"
      color="green"
      large
    ></v-rating>

    <v-btn @click="submit">Submit</v-btn>
  </v-form>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'AddComment',
    data: () => ({
      valid: false,
      formData: {
        name: '',
        comment: '',
        rating: 0
      }
    }),
    watch: {
      formData: {
        handler(){
          this.validate();
        },
        deep: true
      }
    },
    methods: {
      submit() {
        if (this.valid) {
          const { name, comment, rating } = this.formData;

          this.addComment({ postId: '', comment: {name, comment, rating}});
          this.formData = {
            name: '',
            comment: '',
            rating: 0
          }
        }
      },
      validate() {
        const { name, comment } = this.formData;

        if (!name || !comment) {
          return this.valid = false;
        }

        if (comment.length < 10) {
          return this.valid = false;
        }

        this.valid = true;
      },
      ...mapActions({
        addComment: 'addComment'
      })
    }
  }
</script>