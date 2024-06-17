<template>
  <div class="project-avatar-overlay"
       @click="this.$router.push(`/project/${$props.projectId}`)">

    <div class="project-avatar-overlay_item payed left top"
         :class="{active: $props.isPayed }"
         v-tippy="{content: tippyPayedContent, theme: 'light'}"
         @click.stop
         v-show="userInfo.role === 'admin'"
         @click="$emit('projectChangePayedStatus', !$props.isPayed)">
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 15C1 17.2091 2.79086 19 5 19H9C11.2091 19 13 17.2091 13 15C13 12.7909 11.2091 11 9 11H5C2.79086 11 1 9.20914 1 7C1 4.79086 2.79086 3 5 3H9C11.2091 3 13 4.79086 13 7M7 1V21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>

    <div class="project-avatar-overlay_item payed left top"
         :class="{active: $props.isPayed }"
         v-tippy="{content: 'Спонсорский проект', theme: 'light'}"
         v-show="$props.isPayed && userInfo.role !== 'admin'"
         @click="this.$router.push(`/project/${$props.projectId}`)">
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 15C1 17.2091 2.79086 19 5 19H9C11.2091 19 13 17.2091 13 15C13 12.7909 11.2091 11 9 11H5C2.79086 11 1 9.20914 1 7C1 4.79086 2.79086 3 5 3H9C11.2091 3 13 4.79086 13 7M7 1V21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>

    <div class="project-avatar-overlay_item right top"
         v-show="userInfo.token !== null"
         @click.stop
         @click="$emit('pressed', true)">
      <button-favorite
          :inFavorite="$props.inFavorite"
          :project-id="$props.projectId"
      />
    </div>

    <div class="project-avatar-overlay_item owner left bottom"
         v-show="$props.projectOwner === userInfo.username"
         v-tippy="{content: 'Это ваш проект', theme: 'light'}"
         @click="$emit('pressed', true)">
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 5.5H17.7056C18.1342 5.5 18.3485 5.5 18.4776 5.59027C18.5903 5.6691 18.6655 5.79086 18.6856 5.92692C18.7086 6.08273 18.6128 6.27442 18.4211 6.65777L17.1688 9.16232C17.1068 9.28641 17.0758 9.34845 17.0626 9.41367C17.051 9.47145 17.0496 9.53083 17.0586 9.58908C17.0688 9.65483 17.097 9.71822 17.1533 9.845L18.5 12.8751C18.6667 13.25 18.75 13.4374 18.7227 13.5888C18.6988 13.721 18.6227 13.8381 18.5116 13.9136C18.3844 14 18.1793 14 17.769 14H10.1C9.53995 14 9.25992 14 9.04601 13.891C8.85785 13.7951 8.70487 13.6422 8.60899 13.454C8.5 13.2401 8.5 12.9601 8.5 12.4V10M1 20L1 2.5M1 10H9.9C10.4601 10 10.7401 10 10.954 9.89101C11.1422 9.79513 11.2951 9.64215 11.391 9.45399C11.5 9.24008 11.5 8.96005 11.5 8.4V3.1C11.5 2.53995 11.5 2.25992 11.391 2.04601C11.2951 1.85785 11.1422 1.70487 10.954 1.60899C10.7401 1.5 10.4601 1.5 9.9 1.5L2.6 1.5C2.03995 1.5 1.75992 1.5 1.54601 1.60899C1.35785 1.70487 1.20487 1.85785 1.10899 2.04601C1 2.25992 1 2.53995 1 3.1V10Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div class="project-avatar-overlay_item delete right bottom"
         @click.stop
         v-show="userInfo.role === 'admin'"
         v-tippy="{content: 'Удалить проект', theme: 'light'}"
         @click="$emit('deleteProject', true)">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1H13M1 4H19M17 4L16.2987 14.5193C16.1935 16.0975 16.1409 16.8867 15.8 17.485C15.4999 18.0118 15.0472 18.4353 14.5017 18.6997C13.882 19 13.0911 19 11.5093 19H8.49065C6.90891 19 6.11803 19 5.49834 18.6997C4.95276 18.4353 4.50009 18.0118 4.19998 17.485C3.85911 16.8867 3.8065 16.0975 3.70129 14.5193L3 4M8 8.5V13.5M12 8.5V13.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
  </div>




</template>

<script>
import buttonFavorite from "../components/Buttons/ButtonFavorite.vue";
import { directive } from 'vue-tippy'
import 'tippy.js/themes/light.css'
import {userInfo} from "../Store/userInfo.js";


export default {
  name: "ProjectAvatarOverlay.vue",
  props: {
    projectId: null,
    inFavorite: 0,
    projectOwner: null,
    isPayed: false,
    projectName: null
  },
  data() {
    return {
      modal: {
        show: false,
      },
      tippyPayedContent: 'Выделить проект',
      userInfo,
    }
  },

  directives: {
    tippy: directive
  },

  components: {
    buttonFavorite,

  },

  methods: {

  },

  mounted() {
    this.$props.isPayed ? this.tippyPayedContent = 'Убрать выделение проект' : this.tippyPayedContent = 'Выделить проект'
  }

}
</script>

<style scoped lang="scss">
.project-avatar-overlay {
  width: 100%;
  height: 100%;
  position: absolute;


  .project-avatar-overlay_item {
    color: #984a5a;
    position: absolute;
    width: 25px;
    height: 25px;

    svg {
      transition: .15s ease;
      path {
        stroke-width: 1px;
        stroke: #984a5a;
        position: relative;
        transition: .15s ease;
      }
    }

    &.owner {
      svg {
        path {
          stroke-width: 2px;
          stroke: #f8e182;
        }
      }

    }

    &.payed, &.delete {
      svg {
        background-color: rgba(255,255,255, .5);
        width: 20px;
        margin-top: 2px;
        border-radius: 10px;
        height: 20px;
        padding: 3px;
        box-sizing: border-box;

        path {
          stroke: black;
        }

        &:hover {
          background-color: rgb(255, 220, 80);
        }
      }

    }

    &.payed.active {
      svg {
        background-color: #ffdc50;
      }
    }
    &.delete {
      &:hover {
        svg {
          background-color: rgb(218, 101, 101);
        }

      }
    }

    &.left {
      left: 5px;
    }
    &.right {
      right: 5px;
    }
    &.top {
      top: 5px;
    }
    &.bottom {
      bottom: 5px;
    }

  }
}
</style>