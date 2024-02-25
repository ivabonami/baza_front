<template>
  <h1>Добавить услуг в проект:</h1>

  <form class="add-project">
    <div class="left">
      <label for="">
        <span>Название услуги</span>
        <input type="text" placeholder="Мой проект">
      </label>
      <label for="">
        <span>Фото услуги</span>
        <input type="file">
        <span class="helper">
          230х170px \ png, webp, jpg, jpeg
        </span>
      </label>

      <button class="btn btn-filled">
        Добавить услугу
      </button>

    </div>
    <div class="right">
      <label for="">
        <span>Описание услуги</span>
        <textarea name="" id="" cols="30" rows="10" placeholder="Мой проект короче такой крутой">

        </textarea>
      </label>
    </div>


  </form>
</template>

<script>
export default {
  name: "AddService.vue"
}
</script>

<style scoped>
.btn {
  margin-top: 20px;
}

</style>