<template>
  <a v-if="$props.data.name" class="link"
     :class="{
        yellow: $props.data.name === 'Зеркало',
        green: $props.data.name === 'Зеркало VPN',
        red: $props.data.name === 'Контакты',
        blue: $props.data.name === 'Канал' || $props.data.name === 'Бот',
        violet: $props.data.name === 'Onion',
        purple: $props.data.name === 'Блокчейн' || $props.data.name === 'Blockchain',
     }"
     :href="projectLink()"
     target="_blank">
    {{ normalizeLinkName($props.data) }}
  </a>
</template>

<script>
export default {
  name: "ProjectLinkItem.vue",
  props: {
    data: {
      name: null,
      link: null
    }
  },
  methods: {
    normalizeLinkName(data) {
      let link;

      if (data.name) {
        if (data.name === 'Зеркало' || data.name === 'Зеркало VPN') {
          link = data.link.match(/^(?:.*\:\/?\/)?(?<domain>[\w\-\.]*)/i)[1].substring(0, data.link.lastIndexOf('.'))


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