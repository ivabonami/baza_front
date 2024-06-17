<template>
  <a :href="$props.link.link"
     target="_blank"
     class="project-external"
     :class="color"
  >

    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="6" viewBox="0 0 7 6" fill="none">
      <circle cx="3.66675" cy="3" r="3" fill="#A8A8A8" />
    </svg>
    <span class="project-external_text">
      {{ $props.link.name }}
    </span>
  </a>
</template>

<script>
export default {
  name: "ProjectExternalLink.vue",
  props: {
    link: {
      link: null,
      name: null
    },

  },
  data() {
    return {
      linkColors: [{
          name: 'Зеркало',
          color: 'yellow'
        },{
          name: 'Onion',
          color: 'violet'
        },{
          name: 'Блокчейн',
          color: 'green'
        },{
          name: 'Канал',
          color: 'blue'
        },{
          name: 'Бот',
          color: 'blue'
        }],
      color: null,
    }
  },

  components: {},

  methods: {
    setColor () {
      this.linkColors.find(item => item.name === this.$props.link.name) ? this.color = this.linkColors.find(item => item.name === this.$props.link.name).color : null

    }

  },

  mounted() {
    this.setColor()
  }

}
</script>

<style scoped lang="scss">
.project-external {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #F2F5F7;
  border-radius: 30px;
  padding: 5px 10px;
  width: auto;
  box-sizing: border-box;
  transition: .3s ease;

  svg {

  }
  .project-external_text {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &:hover {
    background-color: #e8e8e8;
  }

  &.violet {
    svg {
      circle {
        fill: #8B4BDD;
      }
    }

    &:hover {
      background-color: rgba(139, 75, 221, .15);
    }
  }

  &.yellow {
    svg {
      circle {
        fill: #FFC700;
      }
    }

    &:hover {
      background-color: rgb(255, 199, 0, .15);
    }
  }

  &.green {
    svg {
      circle {
        fill: #B7DD4B;
      }
    }

    &:hover {
      background-color: rgb(183, 221, 75, .15);
    }
  }
  &.blue {
    svg {
      circle {
        fill: #4BBADD;
      }
    }

    &:hover {
      background-color: rgb(75, 186, 221, .15);
    }
  }
}
</style>