<template>
<div>
  <div>
    <DefaultHeader>
      {{ popup.project.name }}
    </DefaultHeader>
    <div class="project-description">
      {{ popup.project.description }}
    </div>

  </div>

</div>
</template>

<script>
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {ref} from "vue";
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup, popup} from "@/js/controllers/popupController.js";
import inputText from "@/components/Inputs/InputText.vue";
import inputSelectOption from "@/components/Inputs/InputSelectOption.vue";


export default {
  components: {
    inputText,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    inputSelectOption
  },
  data() {
    return {
      popup,
      closePopup,
      loading: ref(false)
    }
  },
  methods: {


  },
  mounted() {

  },
  beforeUnmount() {

  }
}



</script>

<style scoped lang="scss">
.project-description {
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-word;
  color: #191B2A;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 154.183%; /* 21.586px */

}
.buttons-group {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
}
.h30 {
  height: 50px;
}
</style>