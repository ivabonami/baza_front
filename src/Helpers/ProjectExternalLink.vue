<template>
  <div class="link" >
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

    <span class="edit"
          v-tippy="{content: 'Удалить ссылку', theme: 'light'}"
          @click="$emit('removeLink', $props.link.link)"
          v-if="$props.edit">
      <svg xmlns="http://www.w3.org/2000/svg"  width="10" height="11" viewBox="0 0 10 11" fill="none">
        <path d="M6.77778 2.8V2.44C6.77778 1.93595 6.77778 1.68393 6.68089 1.49141C6.59567 1.32206 6.45969 1.18438 6.29244 1.09809C6.10229 1 5.85338 1 5.35556 1H4.64444C4.14662 1 3.89771 1 3.70756 1.09809C3.54031 1.18438 3.40433 1.32206 3.31911 1.49141C3.22222 1.68393 3.22222 1.93595 3.22222 2.44V2.8M1 2.8H9M8.11111 2.8V7.84C8.11111 8.59607 8.11111 8.97411 7.96579 9.26289C7.83796 9.51691 7.63398 9.72343 7.3831 9.85286C7.09788 10 6.72451 10 5.97778 10H4.02222C3.27549 10 2.90212 10 2.6169 9.85286C2.36602 9.72343 2.16204 9.51691 2.03421 9.26289C1.88889 8.97411 1.88889 8.59607 1.88889 7.84V2.8" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </div>

</template>

<script>
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

export default {
  name: "ProjectExternalLink.vue",
  props: {
    link: {
      link: null,
      name: null
    },
    edit: false

  },
  directives: {
    tippy: directive,
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
  watch: {
    link: function (newVal) {
      this.setColor()
    }
  },

  mounted() {
    this.setColor()
  }

}
</script>

<style scoped lang="scss">
.link {
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
  }
}
.project-external {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #F2F5F7;
  border-radius: 30px;
  padding: 5px;
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

@media screen and (max-width: 768px){
  .project-external {
    padding: 2px;

    .project-external_text {
      font-size: 11px;
    }

  }
}
</style>