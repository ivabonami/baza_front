<template>
  <div class="stat">
    <inline-svg v-if="$props.data.icon" :src="$props.data.icon" />
    <span>{{ $props.data.data }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      icon: null,
      data: null,
    }
  },
  name: "ProjectStatsItem.vue",

}
</script>

<style scoped lang="scss">

.stat {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;

  svg {
    max-width: 15px;
    position: relative;
    top: -1px;
  }
  span {
    color: #1E1E1E;
    font-size: 14px;
    font-weight: 400;
  }
}

</style>