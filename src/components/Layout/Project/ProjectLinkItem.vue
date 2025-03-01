<template>
  <div class="links-wrapper">
    <a v-if="props.link" class="link"
       :class="{
        green: props.link.name === 'Зеркало',
        yellow: props.link.name === 'Зеркало VPN',
        red: props.link.name === 'Контакты',
        blue: props.link.name === 'Канал' || props.link.name === 'Бот',
        violet: props.link.name === 'Onion',
        purple: props.link.name === 'Блокчейн' || props.link.name === 'Blockchain',
     }"
       :href="link.link"
       target="_blank">

      {{ normalizeLinkName(props.link.name) }}

      <div class="menu" @click.prevent v-if="props.isEditable">
        <svg @click="editLink(link)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1.27237 12.5486C1.30565 12.2491 1.32229 12.0994 1.3676 11.9594C1.4078 11.8352 1.4646 11.7171 1.53646 11.6081C1.61745 11.4853 1.72399 11.3787 1.93707 11.1656L11.5027 1.60005C12.3027 0.799984 13.5999 0.799985 14.4 1.60005C15.2 2.40011 15.2 3.69727 14.4 4.49734L4.83436 14.0629C4.62127 14.276 4.51473 14.3826 4.39191 14.4635C4.28295 14.5354 4.16477 14.5922 4.04059 14.6324C3.90062 14.6777 3.75087 14.6943 3.45137 14.7276L1 15L1.27237 12.5486Z" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </a>

    <Teleport to="body" v-if="popup.isVisible">
      <the-baza-popup
          :headline="'Редактор ссылок'"
          @closePopup="popup.isVisible = false"
      >
        <link-editor
            :link-to-edit="editableLink"
            @close-popup="popup.isVisible = false"
            @link-edited="emit => onLinkEdit(emit)"
            @link-deleted="emit => removeLink(emit)"
        />
      </the-baza-popup>
    </Teleport>

  </div>

</template>

<script setup>
import LinkEditor from "@/components/popups/Project/LinkEditor.vue";
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue"
import {reactive, ref, shallowRef} from "vue";
import {addNotice} from "@/js/notifications.js";

const props = defineProps({
  isEditable: ref(false),
    link: {}
})


let editableLink = ref(Object)

const popup = reactive({
  isVisible: false,
})

const editLink = (link) => {
    editableLink = link
    popup.isVisible = true
    popup.component = shallowRef(LinkEditor)
}

const onLinkEdit = (emit) => {
  addNotice({name: 'Ссылка отредактирована, не забудьте сохранить изменения', type: 'warning'})
    props.link.name = emit.name
    props.link.link = emit.link
  popup.isVisible = false
}

const emits = defineEmits('deleteLink')
const removeLink = (link) => {
  emits('deleteLink', link)
}

const normalizeLinkName = (data) => {
  let link;

  if (data.link) {
    if (data.name === 'Зеркало' || data.name === 'Зеркало VPN') {
      try {
        return data.link.match(/^(?:.*\:\/?\/)?(?<domain>[\w\-\.]*)/i)[1].substring(0, data.link.lastIndexOf('.')- 1)
      } catch (error) {
        return '123'
      }

    } else {
      link = props.link.name
    }
  }

  return link
}


</script>

<style scoped lang="scss">

.links {
  display: flex;
  gap: 5px!important;
  justify-content: start;

  .link-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
  }
}
.link {
  border-radius: 12px;
  background: #F2F5F7;
  padding: 4px 8px;
  white-space: nowrap;
  color: #1E1E1E;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: .3s ease;
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 5px;
  .menu {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &.yellow { background-color: #FFF3D4FF}
  &.green { background-color: #EBFDC8FF}
  &.red { background-color: #FFD5D5FF}
  &.blue { background-color: #C1EBFFFF}
  &.violet { background-color: #E9D9FFFF}
  &.purple { background-color: #ffcee5
  }

  &:hover {
    &.yellow { background-color: #ffe4a1
    }
    &.green { background-color: #deff98
    }
    &.red { background-color: #ff8e8e
    }
    &.blue { background-color: #7fd7ff
    }
    &.violet { background-color: #b883ff
    }
    &.purple { background-color: #fc91b4
    }
  }
}

@media screen and (max-width: 500px){
  .link {
    font-size: 10px;
  }
}

</style>