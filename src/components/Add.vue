<template>
  <v-container d-flex justify-center>
    <v-card width="500">
      <v-form v-on:submit.prevent="submit" v-model="valid" ref="form">
        <div class="pa-5">

          <v-text-field v-model="formData.title" placeholder="Title" />

          <v-textarea v-model="formData.post" placeholder="Post" />

          <v-select
            v-model="formData.categories"
            :items="items"
            :menu-props="{ closeOnContentClick: true }"        
            attach
            multiple
            placeholder="Select a category"
          ></v-select>

          <v-text-field v-model="formData.name" placeholder="Name" />

          <v-text-field v-model="formData.url" placeholder="Image url" />
        </div>
        <div class="pl-10 pb-10">
          <v-btn class="mr-5 primary" type="submit">Submit</v-btn>
          <v-btn class="error" @click="discard">Discard</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';
  import { v4 as uuidv4 } from 'uuid';


  export default {
    name: 'Add',
    data: () => ({
      valid: false,
      isDialogOpen: false,
      formData: {
        title: '',
        post: '',
        categories: [],
        name: '',
        url: '',
        comments: [],
        time: new Date().toISOString(),
        status: "ACTIVE"
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
    computed: {
      isHome() {
        return this.$route.path === '/'
      },
      items() {
        return this.$store.state.blogCategories
      }
    },
    methods: {
      submit() {
        if (this.valid === true) {
          const { name, title, post, categories, url, time } = this.formData;
          const id = uuidv4();
          const cats = categories.map(i => i);

          this.addBlog({ name, title, post, cats, url, id, time });
          
          this.isDialogOpen = true;
          this.formData = {
            title: '',
            post: '',
            categories: [],
            name: '',
            url: '',
            comments: [],
            time: new Date().toISOString(),
            status: "ACTIVE"
          }
        }
      }, 
      discard() {
        this.formData = {
          title: '',
          post: '',
          categories: [],
          name: '',
          url: '',
          comments: [],
          time: new Date().toISOString(),
          status: "ACTIVE"
        }
      },
      validate() {
        const { title, name, url, categories, post } = this.formData;

        if (!title || !name || categories.length < 1 || !post) {
          return this.valid = false;
        }

        if(post.length < 10) {
          return this.valid = false;
        }

        if (url && !url.includes('https')){
          return this.valid = false;
        }

        this.valid = true;
      },
      ...mapActions({
        addBlog: 'addBlog'
      })
    }
  }
</script>