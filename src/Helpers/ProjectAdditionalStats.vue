<template>
  <div class="additional-stat">
    <div class="additional-stat_heading">
      <div class="additional-stat_icon">
        <slot name="icon" />
      </div>
        <div class="additional-stat_header">
          <slot name="header" />
        </div>
    </div>
    <div class="additional-stat_helper">
      <slot name="helper"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectAdditionalStats.vue",
  data() {
    return {}
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.additional-stat {
  margin-bottom: -10px;

  .additional-stat_heading {
    display: flex;
    gap: 8px;

    .additional-stat_header {
      color: var(--gray, #A8A8A8);
      font-family: "PT Sans Caption";
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 125% */
    }
    .additional-stat_icon {
      width: 10px;
      height: 10px;
    }
  }
  .additional-stat_helper {
    color: var(--gray, #A8A8A8);
    font-family: "PT Sans Caption";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
  }
}

@media screen and (max-width: 768px){
  .additional-stat {
    display: flex;
    align-items: end;
    gap: 5px;

    .additional-stat_heading {
      order: 2;
      .additional-stat_header {
        font-size: 12px;
      }
    }
    .additional-stat_helper {
      order: 1;
      line-height: 1.6;
      font-size: 10px;
      display: none;
    }
  }
}
</style>