<template>
  <div
      :class="{active: favoriteStatus}"
      class="favorite"
      @click="favoriteController()"
  >
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9932 3.13581C8.9938 0.7984 5.65975 0.169643 3.15469 2.31001C0.649644 4.45038 0.296968 8.02898 2.2642 10.5604C3.89982 12.6651 8.84977 17.1041 10.4721 18.5408C10.6536 18.7016 10.7444 18.7819 10.8502 18.8135C10.9426 18.8411 11.0437 18.8411 11.1361 18.8135C11.2419 18.7819 11.3327 18.7016 11.5142 18.5408C13.1365 17.1041 18.0865 12.6651 19.7221 10.5604C21.6893 8.02898 21.3797 4.42787 18.8316 2.31001C16.2835 0.192157 12.9925 0.7984 10.9932 3.13581Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>


  </div>
</template>

<script>
import {ref} from "vue";
import {addFavorite, removeFavorite} from "../../API/favorite.js";
import {favoriteProjects} from "../../Store/favoriteProjects.js";
import {projectsStore} from "../../Store/projectsStore.js";
import notice from "../Popups/Notice.vue";

export default {
  name: "ButtonFavorite.vue",
  props: {
    inFavorite: 0,
    projectId: ref(Number),
    project: {},
    favoritePage: false,
  },
  data() {
    return {
      favoriteStatus: false,
      notice: {
        show: false,
        color: 'green',
        errors: []
      }
    }

  },

  components: { notice },

  methods: {
    favoriteController() {
      if (this.inFavorite === 0) {
        addFavorite(this.projectId).then(result => {
          this.$emit('favoriteChanged', this.inFavorite === 0 ? 1 : 0)
          this.favoriteStatus = !this.favoriteStatus
          this.$props.project.favorite = 1

        }).catch(e => {

        })
      } else {
        removeFavorite(this.projectId).then(result => {
          this.$emit('favoriteChanged', this.inFavorite === 0 ? 1 : 0)
          this.favoriteStatus = !this.favoriteStatus
          this.$props.project.favorite = 0
          projectsStore.projects.find(item => item.id === projectId).favorite = 0
        }).catch(e => {

        })
      }

    }
  },
  watch: {
    inFavorite: function(newVal, oldVal) {
      // this.$props.inFavorite === 0 ? this.inFavorite  = false : this.inFavorite = true

    }
  },

  mounted() {
    if (this.$props.favoritePage) {
      this.favoriteStatus = true
    } else if (this.$props.project.favorite === 1) {
      this.favoriteStatus = true
    } else {
      this.favoriteStatus  = false
    }
    // this.$props.inFavorite === 0 ? this.inFavorite  = false : this.inFavorite = true

  }

}
</script>

<style scoped lang="scss">
.favorite {
  position: absolute;
  z-index: 9;
  cursor: pointer;


  svg {
    width: 100%;
    height: 100%;

    path {
      transition: .15s ease;
      stroke: #984a5a;
      fill: transparent;
    }
  }

  //&:hover {
  //  svg {
  //    path {
  //      stroke: #9A2929;
  //    }
  //  }
  //}

  &.active {
    svg {
      path {
        fill: #984a5a;
      }
    }
    //&:hover {
    //  svg {
    //    path {
    //      fill: #503232;
    //    }
    //  }
    //}
  }
}
</style>