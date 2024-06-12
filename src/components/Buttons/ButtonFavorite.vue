<template>
  <div
      :class="{active: favoriteStatus}"
      class="favorite"
      @click="favoriteController()"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M17.2673 10.5228C17.7163 9.72453 18.0908 9.00418 18.3217 8.45591C19.4431 5.79357 18.3342 2.73116 15.6237 1.48197C12.9131 0.232781 10.1912 1.52808 8.99665 4.02903C6.71231 2.46073 3.66508 2.69106 1.98463 5.13844C0.304172 7.58582 0.831574 10.7831 3.1332 12.5278C4.17779 13.3196 6.2437 14.4865 8.18872 15.5249M18.1699 12.7151C17.663 9.99003 15.3455 7.99706 12.4276 8.53874C9.5097 9.08042 7.62299 11.7144 8.01746 14.5764C8.33438 16.8758 10.0837 22.2708 10.7593 24.303C10.8514 24.5803 10.8975 24.7189 10.9888 24.8156C11.0683 24.8998 11.174 24.9609 11.2866 24.9877C11.4159 25.0184 11.559 24.989 11.8451 24.9302C13.9419 24.4994 19.4863 23.3177 21.6351 22.4426C24.3096 21.3534 25.6899 18.4035 24.656 15.6025C23.6222 12.8015 20.7821 11.7918 18.1699 12.7151Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<script>
import {ref} from "vue";
import {addFavorite, removeFavorite} from "../../API/favorite.js";

export default {
  name: "ButtonFavorite.vue",
  props: {
    inFavorite: 0,
    projectId: ref(Number)
  },
  data() {
    return {
      favoriteStatus: false
    }
  },

  components: {},

  methods: {
    favoriteController() {
      if (this.favoriteStatus === false) {
        addFavorite(this.projectId).then(result => {
          this.$emit('favoriteChanged', this.inFavorite === 0 ? 1 : 0)
          this.favoriteStatus = !this.favoriteStatus
        }).catch(e => {

        })
      } else {
        removeFavorite(this.projectId).then(result => {
          this.$emit('favoriteChanged', this.inFavorite === 0 ? 1 : 0)
          this.favoriteStatus = !this.favoriteStatus
        }).catch(e => {

        })
      }

    }
  },
  watch: {
    inFavorite: function(newVal, oldVal) {
      this.inFavorite === 0 ? this.favoriteStatus  = false : this.favoriteStatus = true
    }
  },

  mounted() {
    this.inFavorite === 0 ? this.favoriteStatus  = false : this.favoriteStatus = true
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

  &:hover {
    svg {
      path {
        stroke: #9A2929;
      }
    }
  }

  &.active {
    svg {
      path {
        fill: #984a5a;
      }
    }
    &:hover {
      svg {
        path {
          fill: #503232;
        }
      }
    }
  }
}
</style>