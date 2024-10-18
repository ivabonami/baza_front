<template>

  <div class="links">
    <a v-if="$props.data" class="link"
       v-for="(link, index) in linksSorter($props.data)"
       v-show="index < $props.returnLinksCount"
       :class="{
        yellow: link.name === 'Зеркало',
        green: link.name === 'Зеркало VPN',
        red: link.name === 'Контакты',
        blue: link.name === 'Канал' || link.name === 'Бот',
        violet: link.name === 'Onion',
        purple: link.name === 'Блокчейн' || link.name === 'Blockchain',
     }"
       :href="link.link"
       target="_blank">

      {{ link.name }}

<!--      <div class="menu" @click.prevent v-if="$props.isEditable">-->
<!--        <svg @click="() => {-->
<!--            popup.show = true-->
<!--            popup.component = 'EditLink'-->
<!--            popup.link = link-->
<!--          }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">-->
<!--          <path d="M1.27237 12.5486C1.30565 12.2491 1.32229 12.0994 1.3676 11.9594C1.4078 11.8352 1.4646 11.7171 1.53646 11.6081C1.61745 11.4853 1.72399 11.3787 1.93707 11.1656L11.5027 1.60005C12.3027 0.799984 13.5999 0.799985 14.4 1.60005C15.2 2.40011 15.2 3.69727 14.4 4.49734L4.83436 14.0629C4.62127 14.276 4.51473 14.3826 4.39191 14.4635C4.28295 14.5354 4.16477 14.5922 4.04059 14.6324C3.90062 14.6777 3.75087 14.6943 3.45137 14.7276L1 15L1.27237 12.5486Z" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--        </svg>-->
<!--        <svg @click="$emit('deleteLink')"-->
<!--             xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">-->
<!--          <path d="M9.66667 3.8V3.24C9.66667 2.45593 9.66667 2.06389 9.52134 1.76441C9.39351 1.50099 9.18954 1.28681 8.93865 1.15259C8.65344 1 8.28007 1 7.53333 1H6.46667C5.71993 1 5.34656 1 5.06135 1.15259C4.81046 1.28681 4.60649 1.50099 4.47866 1.76441C4.33333 2.06389 4.33333 2.45593 4.33333 3.24V3.8M1 3.8H13M11.6667 3.8V11.64C11.6667 12.8161 11.6667 13.4042 11.4487 13.8534C11.2569 14.2485 10.951 14.5698 10.5746 14.7711C10.1468 15 9.58677 15 8.46667 15H5.53333C4.41323 15 3.85318 15 3.42535 14.7711C3.04903 14.5698 2.74307 14.2485 2.55132 13.8534C2.33333 13.4042 2.33333 12.8161 2.33333 11.64V3.8" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--        </svg>-->
<!--      </div>-->
    </a>



  </div>


</template>

<script>
import {linksSorter} from "@/API/projectsController.js";
import {popup} from "@/js/controllers/popupController.js";


export default {
  name: "ProjectLinkItem.vue",
  props: {
    data: {
      name: null,
      link: null
    },
    returnLinksCount: 9999,
    isEditable: false
  },
  data() {
    return {
      linksSorter,
      popup
    }
  },
  methods: {
    normalizeLinkName(data) {
      let link;

      if (data.link) {
        if (data.name === 'Зеркало' || data.name === 'Зеркало VPN') {
          data.link.match(/^(?:.*\:\/?\/)?(?<domain>[\w\-\.]*)/i) ? link = data.link.match(/^(?:.*\:\/?\/)?(?<domain>[\w\-\.]*)/i)[1].substring(0, data.link.lastIndexOf('.')) : link = this.$props.data.name

        } else {
          link = this.$props.data.name
        }
      }

      return link
    },
    projectLink() {
      return this.$props.data.link
    }

  },

  mounted() {

  }
}
</script>

<style scoped lang="scss">

.links {
  display: flex;
  gap: 5px!important;
  justify-content: start;

  .link-wrapper {
    display: flex;
    gap: 5px;
  }
}
.link {
  border-radius: 12px;
  background: #F2F5F7;
  padding: 4px 8px;
  white-space: nowrap;
  color: #1E1E1E;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: .3s ease;

  &.yellow { background-color: #FFF3D4FF}
  &.green { background-color: #EBFDC8FF}
  &.red { background-color: #FFD5D5FF}
  &.blue { background-color: #C1EBFFFF}
  &.violet { background-color: #E9D9FFFF}
  &.purple { background-color: #ffcee5
  }

  &:hover {
    &.yellow { background-color: #ffe4a1
    }
    &.green { background-color: #deff98
    }
    &.red { background-color: #ff8e8e
    }
    &.blue { background-color: #7fd7ff
    }
    &.violet { background-color: #b883ff
    }
    &.purple { background-color: #fc91b4
    }
  }
}

@media screen and (max-width: 500px){
  .link {
    font-size: 10px;
  }
}

</style>