<template>
  <div class="project-menu-items">
    <div class="menu-item" v-if="advancedMenu && userStore.role === 'admin'">
      <button-black
          title="Изменить заглушку"
          @button-pressed="popup.isVisible = true; PopupData.component = PlaceholderEdit; PopupData.data = placeholder; PopupData.headline = 'Изменить заглушку'"
          :type="'button'"
          :style="'filled'">
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3.99998H5.8C4.11984 3.99998 3.27976 3.99998 2.63803 4.32696C2.07354 4.61458 1.6146 5.07353 1.32698 5.63801C1 6.27975 1 7.11983 1 8.79998V17.2C1 18.8801 1 19.7202 1.32698 20.362C1.6146 20.9264 2.07354 21.3854 2.63803 21.673C3.27976 22 4.11984 22 5.8 22H14.2C15.8802 22 16.7202 22 17.362 21.673C17.9265 21.3854 18.3854 20.9264 18.673 20.362C19 19.7202 19 18.8801 19 17.2V13M6.99997 16H8.67452C9.1637 16 9.40829 16 9.63846 15.9447C9.84254 15.8957 10.0376 15.8149 10.2166 15.7053C10.4184 15.5816 10.5914 15.4086 10.9373 15.0627L20.5 5.49998C21.3284 4.67156 21.3284 3.32841 20.5 2.49998C19.6716 1.67156 18.3284 1.67155 17.5 2.49998L7.93723 12.0627C7.59133 12.4086 7.41838 12.5816 7.29469 12.7834C7.18504 12.9624 7.10423 13.1574 7.05523 13.3615C6.99997 13.5917 6.99997 13.8363 6.99997 14.3255V16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button-black>
    </div>

    <div class="menu-item" v-if="advancedMenu && userStore.role === 'admin'">
      <button-black
          title="Удалить заглушку"
          @button-pressed="popup.isVisible = true; PopupData.component = PlaceholderDelete; PopupData.data = placeholder; PopupData.headline = 'Удалить'"
          :type="'button'"
          :style="'filled'">
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>



      </button-black>
    </div>

    <div class="menu-item" v-if="!project.placeholderId && !project.position && userStore.role === 'admin'">
      <button-black
          title="Залинковать проект к заглушке"
          @button-pressed="popup.isVisible = true; PopupData.component = AssignPlaceholderToProject; PopupData.data = {project: project}"
          :type="'button'"
          :style="'filled'">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.99999 12C9.42944 12.5741 9.97734 13.0491 10.6065 13.3929C11.2357 13.7367 11.9315 13.9411 12.6466 13.9923C13.3618 14.0435 14.0796 13.9403 14.7513 13.6897C15.4231 13.4392 16.0331 13.047 16.54 12.54L19.54 9.53997C20.4508 8.59695 20.9547 7.33394 20.9434 6.02296C20.932 4.71198 20.4061 3.45791 19.4791 2.53087C18.552 1.60383 17.298 1.07799 15.987 1.0666C14.676 1.0552 13.413 1.55918 12.47 2.46997L10.75 4.17997M13 9.99996C12.5705 9.42584 12.0226 8.95078 11.3934 8.60703C10.7642 8.26327 10.0685 8.05885 9.35334 8.00763C8.63819 7.95641 7.9204 8.0596 7.24864 8.31018C6.57688 8.56077 5.96687 8.9529 5.45999 9.45996L2.45999 12.46C1.5492 13.403 1.04522 14.666 1.05662 15.977C1.06801 17.288 1.59385 18.542 2.52089 19.4691C3.44793 20.3961 4.702 20.9219 6.01298 20.9333C7.32396 20.9447 8.58697 20.4408 9.52999 19.53L11.24 17.82" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </button-black>
    </div>

    <div class="menu-item" v-if="!project.type && userStore.role === 'admin'">
      <button-black
          title="Залинковать проект"
          @button-pressed="popup.isVisible = true; PopupData.component = SearchProject; PopupData.data = placeholder; PopupData.headline = 'Залинковать'"
          :type="'button'"
          :style="'filled'">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.7076 17.3639L10.2933 18.7781C8.34072 20.7308 5.1749 20.7308 3.22228 18.7781C1.26966 16.8255 1.26966 13.6597 3.22228 11.7071L4.63649 10.2929M17.3644 11.7071L18.7786 10.2929C20.7312 8.34024 20.7312 5.17441 18.7786 3.22179C16.826 1.26917 13.6602 1.26917 11.7076 3.22179L10.2933 4.636M7.50045 14.4999L14.5005 7.49994" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </button-black>
    </div>
    <div class="menu-item" v-if="placeholderMenu && userStore.role === 'admin'">
      <button-black
          title="Убрать проект из заглушки"
          @button-pressed="popup.isVisible = true; PopupData.component = RemoveProjectFromPlaceholder; PopupData.data = project; PopupData.headline = 'Разлинковать'"
          :type="'button'"
          :style="'filled'">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3V1M14 19V21M3 8H1M19 14H21M3.91421 3.91421L2.5 2.5M18.0858 18.0858L19.5 19.5M11 16.6569L8.87868 18.7782C7.31658 20.3403 4.78392 20.3403 3.22183 18.7782C1.65973 17.2161 1.65973 14.6834 3.22183 13.1213L5.34315 11M16.6569 11L18.7782 8.87868C20.3403 7.31658 20.3403 4.78392 18.7782 3.22183C17.2161 1.65973 14.6834 1.65973 13.1213 3.22183L11 5.34315" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </button-black>
    </div>
    <div class="menu-item" v-if="userStore.role === 'admin' && project.type">
      <button-black
          title="Закрепить проект"
          @buttonPressed="pinUnpinProject(project); emits('closeDropdown')"
          :type="'button'"
          :style="'filled'">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M7.3767 14.6163L1.71985 20.2732M10.6944 5.64181L9.1335 7.2027C9.00618 7.33003 8.94252 7.39369 8.86999 7.44427C8.80561 7.48917 8.73616 7.52634 8.66309 7.555C8.58077 7.58729 8.49249 7.60495 8.31592 7.64026L4.65145 8.37315C3.69915 8.56361 3.223 8.65884 3.00024 8.9099C2.80617 9.12861 2.71755 9.4213 2.75771 9.71092C2.8038 10.0434 3.14715 10.3867 3.83387 11.0735L10.9196 18.1592C11.6063 18.8459 11.9497 19.1893 12.2821 19.2354C12.5718 19.2755 12.8645 19.1869 13.0832 18.9928C13.3342 18.7701 13.4294 18.2939 13.6199 17.3416L14.3528 13.6771C14.3881 13.5006 14.4058 13.4123 14.4381 13.33C14.4667 13.2569 14.5039 13.1875 14.5488 13.1231C14.5994 13.0505 14.663 12.9869 14.7904 12.8596L16.3512 11.2987C16.4326 11.2173 16.4734 11.1766 16.5181 11.141C16.5578 11.1095 16.5999 11.081 16.644 11.0558C16.6936 11.0274 16.7465 11.0048 16.8523 10.9594L19.3467 9.8904C20.0744 9.57853 20.4383 9.42259 20.6035 9.17061C20.7481 8.95025 20.7998 8.68175 20.7474 8.42348C20.6875 8.12813 20.4076 7.84822 19.8478 7.28839L14.7047 2.14526C14.1448 1.58543 13.8649 1.30552 13.5696 1.24565C13.3113 1.19329 13.0428 1.245 12.8225 1.38953C12.5705 1.55481 12.4145 1.91866 12.1027 2.64636L11.0337 5.14071C10.9883 5.24653 10.9656 5.29944 10.9373 5.34905C10.9121 5.39313 10.8836 5.43522 10.852 5.47496C10.8165 5.51971 10.7758 5.56041 10.6944 5.64181Z"
              stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </button-black>
    </div>
    <div class="menu-item"  v-if="project.type">
      <button-black
          title="Редактировать проект"
          @buttonPressed="router.push(`/project/${project.id}/edit`); emits('closeDropdown')"
          :type="'button'"
          :style="'filled'">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M19 17L17.9999 18.094C17.4695 18.6741 16.7502 19 16.0002 19C15.2501 19 14.5308 18.6741 14.0004 18.094C13.4693 17.5151 12.75 17.1901 12.0002 17.1901C11.2504 17.1901 10.5312 17.5151 10 18.094M1.00003 19H2.67457C3.16376 19 3.40835 19 3.63852 18.9447C3.84259 18.8957 4.03768 18.8149 4.21663 18.7053C4.41846 18.5816 4.59141 18.4086 4.93732 18.0627L17.5001 5.49998C18.3285 4.67156 18.3285 3.32841 17.5001 2.49998C16.6716 1.67156 15.3285 1.67156 14.5001 2.49998L1.93729 15.0627C1.59139 15.4086 1.41843 15.5816 1.29475 15.7834C1.18509 15.9624 1.10428 16.1574 1.05529 16.3615C1.00003 16.5917 1.00003 16.8363 1.00003 17.3255V19Z"
              stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button-black>
    </div>
    <div class="menu-item" v-if="project.type">
      <button-black
          title="Удалить проект"
          @button-pressed="popup.isVisible = true; PopupData.component = ProjectDelete; PopupData.data = project; PopupData.headline = 'Удалить проект'"
          :type="'button'"
          :style="'filled'">
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5"
              stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </button-black>

    </div>

    <Teleport to="body" v-if="popup.isVisible">
      <the-baza-popup
          :headline="PopupData.headline"
          @close-popup="popup.isVisible = false">

        <component :is="PopupData.component" :data="PopupData.data" @close-popup="popup.isVisible = false" />
      </the-baza-popup>
    </Teleport>
  </div>
</template>
<script setup>
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue";
import {reactive, ref} from "vue";
import { useRouter } from "vue-router";
import {pinUnpinProject} from "@/API/projectsController.js";
import {userStore} from "@/Stores/userStore.js";

import AssignPlaceholderToProject from '@/components/popups/controllers/AssignPlaceholderToProject.vue'
import RemoveProjectFromPlaceholder from '@/components/popups/controllers/RemoveProjectFromPlaceholder.vue'
import SearchProject from '@/components/Blocks/SearchProject.vue'
import ProjectDelete from '@/components/popups/controllers/ProjectDelete.vue'
import PlaceholderEdit from '@/components/popups/controllers/placeholders/PlaceholderEdit.vue'
import PlaceholderDelete from '@/components/popups/controllers/placeholders/PlaceholderDelete.vue'

const router = useRouter()
const props = defineProps({
  project: null,
  advancedMenu: ref(Boolean),
  placeholder: ref(null),
  placeholderMenu: ref(Boolean)
})

const PopupData = {
  data: null,
  component: null,
  headline: 'Выполните действие'
}

const emits = defineEmits(['closeDropdown'])

const popup = reactive({
  isVisible: false
})

</script>
<style lang="scss" scoped>
.project-menu-items {
  transition: .3s ease;
  width: 100%;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;

  svg {
    path {
      stroke: #FFFFFF;
      stroke-width: 2px;
    }
  }

}
</style>