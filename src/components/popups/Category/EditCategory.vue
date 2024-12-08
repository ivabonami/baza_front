<template>
    <div class="edit-category">

        <input-text :placeholder="'название категории'"
                    @keydown.enter=""
                    :input-data-prop="newData.name"
                    @dataChanged="emit => newData.name = emit" />
        <input type="checkbox"
               id="allowShopfront"
               v-model="newData.allowShopfront"
               style="margin-top: 10px;">
        <label for="allowShopfront">Может иметь витрину?</label>

        <button-black
                style="margin-top: 10px;"
                :type="'button'"
                @buttonPressed="saveChanges"
                :style="'filled'">
            <div class="button-content">
                Сохранить
            </div>
        </button-black>

    </div>
</template>

<script setup>


import {reactive, ref} from "vue";
import {editCategory} from "@/API/categoriesController.js";
import InputText from '@/components/Inputs/InputText.vue'
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {addNotice} from "@/js/notifications.js";

const props = defineProps({
    data: ref(null)
})

const newData = reactive({
    id: props.data.id,
    name: props.data.name,
    allowShopfront: props.data.allowShopfront
})

const emits = defineEmits(['closePopup'])

const saveChanges = () => {

    if (!newData.name || newData.name === '') {
        addNotice({name: 'Название категории обязательно', type: 'danger'})
    } else {
        editCategory(newData).then(result => {
            addNotice({name: `Категория ${newData.name} изменена`, type: 'success'})
            emits('closePopup')

        }).catch(err => addNotice({name: 'Произошла ошибка', type: 'danger'}))
    }

}

</script>

<style scoped lang="scss">
.edit-category {
  max-width: 300px;
}

</style>