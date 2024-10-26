<template>
  <div class="dropdown" ref="dropdown" :data-dropdown="selector">
    <slot />
  </div>
</template>

<script setup>

import {onMounted} from "vue";

const emits = defineEmits(['closeDropdown'])

const props = defineProps({
  selector: null
})

function clickOutside(e) {
  if (!e.target.dataset.dropdown || e.target.dataset.dropdown !== props.selector) {
    closeDropDown()
  }
}

function closeByEsc(e) {
  if (e.key === 'Escape') {
    emits('closeDropdown')
    removeEventListener('mousedown', clickOutside)
    removeEventListener('keydown', closeByEsc)
  }
}

function closeDropDown() {
  emits('closeDropdown')
  removeEventListener('mousedown', clickOutside)
  removeEventListener('keydown', closeByEsc)
}

onMounted(() => {

  addEventListener('mousedown', clickOutside)
  addEventListener('keydown', closeByEsc)
})
</script>

<style scoped lang="scss">
.dropdown {
  position: absolute;
  box-sizing: border-box;
  right: 10px;
  top: 45px;
  min-width: 180px;
  width: fit-content;
  background-color: #FFFFFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  padding: 10px;
  border-radius: 20px;
  z-index: 15;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  max-height: 300px;


}

@media screen and (max-width: 500px){
  .dropdown {
    right: 0;
    min-width: 80px;
    max-width: 220px;
  }
}

</style>