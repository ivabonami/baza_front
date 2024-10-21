<template>
  <div class="project-links-wrapper">

    <div class="project-links-items">
      <project-links-item
          :is-editable="props.isEditable"
          :link="link"

          @editLink="emit => editLink(emit)"
          @removeLink="emit => removeLink(emit)"

          v-for="(link, index) of props.projectLinks"
          v-show="index < props.showCount"
      >

        {{ link.name === 'Зеркало' || link.name === 'Зеркало VPN' ? normalizeLinkName(link) : link.name }}

      </project-links-item>

      <project-links-show-more
          :project-name="projectName"
          :links="props.projectLinks"
          v-if="props.projectLinks.length > props.showCount"/>
    </div>



    <Teleport to="body" v-if="popup.isVisible">
      <the-baza-popup
          :headline="'Редактор ссылок'"
          @closePopup="popup.isVisible = false;"
      >
        <link-editor
            :link-to-edit="editableLink"

            @edit-aborted="emit => editableLink.name = emit.name "
            @link-edited="emit => onLinkEdit(emit, editableLink)" />
      </the-baza-popup>
    </Teleport>


  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import ProjectLinksItem from "@/components/Layout/Project/ProjectParts/ProjectLinksItem.vue";
import {addNotice} from "@/js/notifications.js";
import LinkEditor from "@/components/popups/controllers/LinkEditor.vue";
import ProjectLinksShowMore from "@/components/Layout/Project/ProjectParts/ProjectLinksShowMore.vue";
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue";

const props = defineProps({
  projectLinks: ref(Array),
  isEditable: true,
  showCount: ref(9999),
  projectName: ref(String)
})

const normalizeLinkName = (link) => {

  try {
    const newName = link.link.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i, '')[1]
    return newName.substring(0, newName.lastIndexOf('.'))
  } catch (error) {
    return link.name
  }

}

let editableLink = ref(Object)

const popup = reactive({
  isVisible: false
})

const editLink = (link) => {
  editableLink = link
  popup.isVisible = true
}

const onLinkEdit = (newLink, oldLink) => {
  editableLink = newLink
  props.projectLinks.find(item => item === oldLink).name = newLink.name
  props.projectLinks.find(item => item === oldLink).link = newLink.link
  addNotice({name: 'Ссылка отредактирована, не забудьте сохранить изменения', type: 'warning'})
  popup.isVisible = false
}

const removeLink = (link) => {
  try {
    props.projectLinks.splice(props.projectLinks.findIndex(item => item === link), 1)
  } catch (error) {
    addNotice({name: 'Не могу удалить ссылку', type: 'danger'})
  }
}

</script>

<style scoped lang="scss">
.project-links-wrapper {
  width: 100%;


  .project-links-items {
    display: flex;
    overflow: hidden;
    gap: 5px;
  }
}

@media screen  and (max-width: 500px){
  .project-links-wrapper {
    .project-links-items {
      flex-wrap: wrap;
    }
  }
}
</style>