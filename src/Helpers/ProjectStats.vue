<template>
  <div
      :class="{rating: isRating}"
      class="stat"
  >
    <div class="stat_icon">
      <slot name="icon" />
    </div>
    <div class="stat_text">
      <slot name="text" />
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "ProjectStats.vue",
  props: {
    isRating: ref(false),
  },
}
</script>

<style scoped lang="scss">
.stat {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: nowrap;

  .stat_icon {
    width: auto;
    height: 12px;
    align-self: center;
    display: flex;

    svg {
      width: 12px;
      height: 12px;

      path {
        stroke-width: 1px;
        stroke: #A8A8A8;
      }
    }
  }
  .stat_text {
    color: #1E1E1E;

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &.rating {
    .stat_icon {
      svg {
        path {
          fill: #000000;
          stroke: transparent;
        }
      }
    }
    .stat_text {
      color: var(--gray, #000000);
    }
  }
}
</style>