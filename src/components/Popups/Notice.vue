<template>
  <div class="notice"
       :class="{
        show: $props.notice.show === true },
        notice.color"
       v-if="$props.notice.text">

    <div class="timer"></div>

    <ul>
      <li v-for="error of $props.notice.text">{{ error }}</li>
    </ul>


    <div class="close" @click="closeNotice()">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>

</template>

<script>
export default {
  name: "Notice.vue",
  props: {
    notice: {
      show: false,
      color: null,
      text: {}
    }
  },
  data() {
    return {}
  },
  components: {},

  methods: {
    closeNotice() {
      this.$emit('closeNotice', false)
    }
  },

  mounted() {
    window.addEventListener('keydown', (e) => {
      e.key === 'Escape' ?  this.closeNotice() : null
    })

    setTimeout(() => {
      this.$props.notice.show = false
    }, 5000)
  }

}
</script>

<style scoped lang="scss">
.timer {
  width: 100%;
  height: 5px;
  background-color: #4b0f1b;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  animation: toLeft 5s ease-in;
}
@keyframes toLeft {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }

}
.notice {
  overflow: hidden;
  position: fixed;
  z-index: 52;
  bottom: 10px;
  left: 50%;
  padding: 10px;
  transform: translateX(-50%);
  background-color: #984a5a;
  color: #fff;
  border-radius: 10px;

  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 20px;

  visibility: hidden;
  opacity: 0;
  scale: 0;
  transition: .15s;

  &.red {
    background-color: rgba(154, 41, 41, 0.7);
  }

  &.green {
    background-color: rgba(46, 126, 54, .7);
  }

  &.yellow {
    background-color: rgba(145, 136, 33, 0.7);
  }

  ul {
    list-style: none;
  }

  span {
    width: 100%;
    display: block;
  }

  svg {
    path {
      stroke: #fff;
    }
  }

  &.show {
    visibility: visible;
    opacity: 1;
    scale: 1;
  }
}
.close {
  cursor: pointer;
  margin-top: 2px;
}
</style>