<template>
  <div class="project-menu" v-if="canEdit" ref="adminMenuDiv">
    <div class="toggle" @click="toggleDropdown">
      <button-primary
          :type="'button'"
          @buttonPressed=""
          :style="'filled'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M0.299474 13.3368C0.912343 14.4005 2.27148 14.766 3.33517 14.1531C3.3359 14.1527 3.33659 14.1523 3.33732 14.1518L3.66702 13.9614C4.28941 14.4939 5.0048 14.9069 5.77719 15.1795V15.5596C5.77719 16.7872 6.77239 17.7824 8 17.7824C9.22761 17.7824 10.2228 16.7872 10.2228 15.5596V15.1795C10.9953 14.9064 11.7107 14.493 12.333 13.9599L12.6642 14.1511C13.7281 14.7649 15.0882 14.4 15.702 13.3361C16.3158 12.2721 15.9509 10.912 14.887 10.2982L14.558 10.1086C14.7061 9.30275 14.7061 8.4767 14.558 7.67087L14.887 7.4812C15.9509 6.86739 16.3158 5.50731 15.702 4.44335C15.0882 3.37943 13.7281 3.01451 12.6642 3.62831L12.3345 3.81874C11.7115 3.2869 10.9956 2.87471 10.2228 2.6029V2.22281C10.2228 0.995191 9.22761 0 8 0C6.77239 0 5.77719 0.995191 5.77719 2.22281V2.6029C5.0047 2.876 4.28927 3.28944 3.66702 3.8225L3.33583 3.6306C2.27187 3.01676 0.911787 3.38169 0.297981 4.44561C-0.315826 5.50953 0.0490611 6.86965 1.11302 7.48346L1.442 7.67312C1.2939 8.47892 1.2939 9.30497 1.442 10.1108L1.11302 10.3005C0.0520133 10.9159 -0.311693 12.2734 0.299474 13.3368ZM8 5.92749C9.63682 5.92749 10.9637 7.2544 10.9637 8.89122C10.9637 10.528 9.63682 11.8549 8 11.8549C6.36318 11.8549 5.03627 10.528 5.03627 8.89122C5.03627 7.2544 6.36318 5.92749 8 5.92749Z" fill="#fff"/>
          </svg>
      </button-primary>
    </div>

    <div class="project-menu-dropdown" v-if="adminMenu.show">
      <ProjectMenuControllerItems
          :placeholder-id="placeholderId"
          :placeholder-menu="placeholderMenu"
          :advanced-menu="advancedMenu"
          @closeDropdown="adminMenu.show = false"
          :project="project" />
    </div>
  </div>

</template>

<script setup>
import {userStore} from "@/Stores/userStore";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import {reactive, ref} from "vue";
import ProjectMenuControllerItems from "@/components/Layout/Project/ProjectControllers/ProjectMenuControllerItems.vue";


const props = defineProps({
  project: {
    name: ref(String),
    id: ref(Number)
  },
  placeholderId: ref(null),
  placeholderMenu: ref(false),
  advancedMenu: ref(false)
})

let adminMenu = reactive({
  show: false
})

const canEdit = () => {
  if (userStore.role === 'admin') {
    return true
  }
}

const adminMenuDiv = ref(null)
const emits = defineEmits(['closeMenu'])

const toggleDropdown = () => {

  if (!adminMenu.show) {
    adminMenu.show = true
    window.addEventListener('click', closeByClickOutside)
    window.addEventListener('keydown', closeByEsc)
  } else {
    closeDropdown()
  }
}

const closeDropdown = () => {
  window.removeEventListener('click', closeByClickOutside)
  window.removeEventListener('keydown', closeByEsc)
  adminMenu.show = false
}

const closeByClickOutside = (e) => {
  if (adminMenuDiv.value && !adminMenuDiv.value.contains(e.target)) {
    closeDropdown()
  }
}

const closeByEsc = (e) => {
  if (e.key === 'Escape') {
    closeDropdown()
  }
}





</script>
<style lang="scss" scoped>
.project-menu {
  position: absolute;
  right: 5px;
  bottom: 5px;
  z-index: 5;

  .project-menu-dropdown {
    position: absolute;
    right: 0;
    bottom: 40px;
  }

  .toggle {

  }
}
</style>
