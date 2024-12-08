<template>
    <div class="edit-category">

        <p>
            Вы собираетесь удалить категорию {{ data.name }}, уверены?
        </p>

        <button-black
                style="margin-top: 10px;"
                :type="'button'"
                @buttonPressed="saveChanges"
                :style="'filled'">
            <div class="button-content">
                Да, удаляем
            </div>
        </button-black>

    </div>
</template>

<script setup>


import {reactive, ref} from "vue";
import {deleteCategory} from "@/API/categoriesController.js";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {addNotice} from "@/js/notifications.js";

const props = defineProps({
    data: ref(null)
})

const emits = defineEmits(['closePopup'])

const saveChanges = () => {

    deleteCategory(props.data.id).then(result => {
        addNotice({name: `Категория ${props.data.name} удалена`, type: 'success'})
        emits('closePopup')

    }).catch(err => addNotice({name: 'Произошла ошибка', type: 'danger'}))

}

</script>

<style scoped lang="scss">
.edit-category {
  max-width: 300px;
}

</style>