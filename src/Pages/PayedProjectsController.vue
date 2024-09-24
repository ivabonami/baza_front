<template>
  <h1>Редактор заглушек (в разработке)</h1>

  <div class="projects">
    <div class="project-dropdown-box" @click="addProject()">
      <div class="drop-placeholder">
        <div class="project-dropdown-box-dropper">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 7V15M7 11H15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          Добавить проект в заглушку
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {addNotice} from "@/js/notifications.js";

export default {
  name: "PayedProjectsController",
  data() {
    return {}
  },

  components: {},

  methods: {
    addProject() {
      addNotice({name: 'Окно добавления в процессе', type: 'warning'})
    }
  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.projects {
  display: flex;
  margin-top: 30px;
  justify-content: space-between;

  .drop-placeholder {
    border-radius: 13px;
    border: 2px dashed #B3B4C9;
    height: 100%;
    display: flex;

    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .project-dropdown-box {
    padding: 20px;
    width: 23%;
    height: 300px;
    border-radius: 20px;
    background: radial-gradient(175.11% 210.61% at 131.64% -20.57%, rgba(242, 242, 248, 0.50) 0%, rgba(233, 233, 242, 0.50) 31.1%);
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;

    .project-dropdown-box-dropper {
      color: #B3B4C9;
      text-align: center;
      font-size: 33px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      svg {
        display: block;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 30px;
        path {
          stroke: #7c7c7c;
        }
      }
    }
  }
}

</style>