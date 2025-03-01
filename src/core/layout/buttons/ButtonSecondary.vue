<template>
    <button class="btn btn-primary">
        <span class="button-icon">
            <slot name="icon"/>
        </span>
        <span class="text">
            <slot name="text"/>
        </span>
    </button>
</template>

<script setup>

</script>

<style scoped lang="scss">
.btn-primary {
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: var(--Mustard, #EAECEE);
  border: none;
  cursor: pointer;
  transition: .2s ease;

  span.text {
    color: var(--Lapis, #333);
    text-align: center;
    font-family: "SF Pro Display";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
  }

  &:hover {
    background: var(--Mustard, #d0d4d5);
  }
}
</style>