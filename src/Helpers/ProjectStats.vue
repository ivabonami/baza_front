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
    height: 14px;
    align-self: center;
    display: flex;
    align-items: center;

    svg {
      width: 10px;
      height: 10px;

      path {
        stroke-width: 1px;
        stroke: #A8A8A8;
      }
    }
  }
  .stat_text {
    color: var(--gray, #A8A8A8);
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    position: relative;
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
@media screen and (max-width: 768px){
  .stat {
    gap: 2px;
    align-items: start;
    .stat_icon {
      height: 12px;
      width: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 2px;

    }
    .stat_text {
      line-height: 1;
      font-size: 12px;
      position: relative;
      top: 2px;
      max-width: 55px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &.rating {

      .stat-text {
        font-size: 12px;
      }
    }

  }
}

</style>