<template>
  <div class="links-input-wrapper">
    <div class="link-input">
      <div class="select-box">
        <select :value="names[0]" >
          <option v-for="name of names" @change="link.name = name" :value="name">{{name}}</option>
        </select>
      </div>

      <div class="text-input-wrapper">
        <input-text :placeholder="'https://exapmle.com'"
                    @keydown.enter="checkField()"
                    :input-data-prop="this.linkText"
                    @dataChanged="emit => link.link = emit" />
      </div>
    </div>

    <button-advanced @buttonPressed="checkField()" style="height: 40px;">
      <div class="button-content">
        вставить ссылку в проект
      </div>
    </button-advanced>
  </div>
</template>

<script>
import inputText from "@/components/Inputs/InputText.vue";
import ButtonAdvanced from '@/components/Buttons/ButtonAdvanced.vue'
import {addNotice} from "@/js/notifications.js";

export default {
  name: "InputLinks.vue",
  data() {
    return {
      names: ['Зеркало', 'Зеркало VPN', 'Контакты','Onion', 'Блокчейн', 'Бот', 'Канал'],
      link: {
        name: 'Зеркало',
        link: null,
      },
      linkText: null
    }
  },

  components: {
    inputText,
    ButtonAdvanced
  },

  methods: {
    checkField() {
      if (this.link.link < 10 ) {
        addNotice({name: 'Что-то ссылка коротковата', type: 'warning'})
      } else {
        if (/^(?:(?:(?:https?|ftp|http):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(this.link.link) === false) {
          addNotice({name: 'Ссылка не валидна, начните с http:// ', type: 'danger'})
        } else {
          this.$emit('dataChanged', {name: this.link.name, link: this.link.link})
          this.linkText === '' ? this.linkText = null : this.linkText = ''
        }
      }

    },
  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.links-input-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  gap: 20px;
  .select-box {
    border: 1px solid #B3B4C9;
    border-radius: 20px;
    height: 40px;
    box-sizing: border-box;
    width: 200px;
  }
  select {
    width: 100%;
    height: 100%;
    border-color: transparent;
    border-right: 10px solid transparent;
  }

  .link-input {
    display: flex;
    gap: 20px;
    width: 60%;
    align-items: stretch;

    .text-input-wrapper {
      height: 40px;
    }
  }
}
@media screen and (max-width: 500px) {
  .links-input-wrapper {
    .link-input {
      width: 100%;
    }
    .button-content {
      width: 100%;
    }
  }
}
</style>