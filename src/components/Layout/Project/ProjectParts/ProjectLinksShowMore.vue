<template>
  <div class="show-more"
       @click.prevent
       @click="() => popup.isVisible = true"
       >
    ...

    <Teleport to="body" v-if="popup.isVisible">
      <the-baza-popup
          :headline="projectName"
          @closePopup="popup.isVisible = false"
      >
        <project-links :project-links="links" :show-count="999" :isEditable="false" />
      </the-baza-popup>
    </Teleport>
  </div>
</template>
<script setup>
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue";
import {reactive, ref} from "vue";
import ProjectLinks from "@/components/Layout/Project/ProjectParts/ProjectLinks.vue";

const props = defineProps({
  projectName: ref(String),
  links: ref(Object)
})
const popup = reactive({
  isVisible: false
})

</script>
<style lang="scss" scoped>

.show-more {
  border-radius: 12px;
  background: #F2F5F7;
  padding: 4px 8px;
  white-space: nowrap;
  color: #1E1E1E;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: 0.3s ease;
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 5px;
  z-index: 1;
}
</style>