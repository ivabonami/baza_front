<template>
  <div class="projects">
    <project-card
        v-bind:projectId="2"
    >

    </project-card>
    <project-card
        v-bind:projectId="3"
    >

    </project-card>

  </div>
</template>

<script>
// import { router } from "../assets/js/router.js";
import projectCard from "../views/project/ProjectCard.vue";



export default {
  name: "ShopsRow.vue",
  components: { projectCard },


  data () {
    return {

    }
  },

  mounted() {

  },
  methods: {
    async getShops(count) {
      const response = fetch('./assets/response.json').then( res => {
        console.log(res)
        // res.json()
      })
      // console.log(response)
    },

    showDropdownMenu (el) {
      const ddMenu = el.target.parentElement.childNodes[1];
      console.log(el.target)

      if (ddMenu.classList[1] === 'hidden') {
        ddMenu.classList.remove('hidden')
        ddMenu.classList.add('show')
      } else {
        ddMenu.classList.add('hidden')
        ddMenu.classList.remove('show')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.projects {

}
</style>