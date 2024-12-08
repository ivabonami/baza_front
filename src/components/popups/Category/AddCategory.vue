<template>
    <div class="edit-category">

        <input-text :placeholder="'название категории'"
                    @keydown.enter=""
                    @dataChanged="emit => categoryData.name = emit" />
        <input type="checkbox"
               id="allowShopfront"
               v-model="categoryData.allowShopfront"
               checked
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


import {reactive} from "vue";
import {addCategory} from "@/API/categoriesController.js";
import InputText from '@/components/Inputs/InputText.vue'
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {addNotice} from "@/js/notifications.js";


const categoryData = reactive({
    name: null,
    allowShopfront: true
})

const emits = defineEmits(['closePopup'])

const saveChanges = () => {
    if (!categoryData.name || categoryData.name === '') {
        addNotice({name: 'Название категории обязательно', type: 'danger'})
    } else {
        addCategory(categoryData).then(result => {
            addNotice({name: `Категория ${categoryData.name} изменена`, type: 'success'})
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