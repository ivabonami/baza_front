<template>
<h1>Добавить ваш ахуительный проект:</h1>

  <form class="add-project">
    <div class="left">
      <label for="">
        <span>Имя проекта</span>
        <input type="text" placeholder="Мой проект">
      </label>
      <label for="">
        <span>Аватар</span>
        <input type="file">
        <span class="helper">110x110px \ png, webp, jpg, jpeg </span>
      </label>
      <label for="">
        <span>Баннер</span>
        <input type="file">
        <span class="helper">1060x220px \ png, webp, jpg, jpeg </span>
      </label>

    </div>
    <div class="right">
      <label for="">
        <span>Описание проекта</span>
        <textarea name="" id="" cols="30" rows="10" placeholder="Мой проект короче такой крутой">

        </textarea>
      </label>
    </div>
    <div class="bottom">
      <div class="top-head">
        <div class="links">
          Ссылки на проект
        </div>
        <div class="add" v-on:click="addAnotherOneLink()">
          +
        </div>
      </div>
      <div class="added-project-links">
        <div class="project-link always">
          <input type="text" placeholder="Название">
          <input type="text" placeholder="Ссылка">
          <span class="important">Обязательно</span>
        </div>


      </div>

    </div>

    <button class="btn-filled btn">
      Добавить проект
    </button>
  </form>
</template>

<script>
export default {
  name: "AddProject.vue",
  data () {
    return {

    }
  },

  methods: {
    addAnotherOneLink () {
      const wrapper = document.querySelector('.added-project-links')

      if (wrapper.childNodes.length < 12) {
        const newInput = document.createElement('label')
        newInput.classList.add('project-link')
        newInput.innerHTML = `<input type="text" placeholder="Название">
        <input type="text" placeholder="Ссылка">
        <span class="delete" title="Удалить ссылку">Удалить</span>`
        wrapper.appendChild(newInput)


        const deleteButtons = document.querySelectorAll('.delete')
        for (let button of deleteButtons) {
          button.addEventListener('click', (e) => {
            e.target.parentNode.remove()
            console.log()
          })

        }
      }

    },
  },
}
</script>

<style scoped lang="scss">



</style>