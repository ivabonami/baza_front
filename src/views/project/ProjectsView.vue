<template v-cloak>
  <div class="wrapper" ref="wrapper">
    <div class="project">
      <div class="project-banner">
        <img :src="api + project.bannerFilePath"
             alt=""
             v-if="project.bannerFilePath !== null">

        <img src="/src/assets/images/banner.webp"
             alt=""
             v-else>



      </div>
      <div class="project-header">
        <div class="left">
          <div class="avatar">
            <img :src="api + project.avatarFilePath"
                 alt=""
                 v-if="project.avatarFilePath !== ''">

            <img src="/src/assets/images/avatar.webp"
                 alt=""
                 v-else>
            <div class="favorite"
                 v-if="project.favorite === 0"
                 v-on:click="() => {
               addFavorite(project.id)
               this.isFavourite = true
             }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#00192E" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278M7 5a4 4 0 0 0-4 4c0 3.552 2.218 6.296 4.621 8.22A21.5 21.5 0 0 0 12 19.91a21.6 21.6 0 0 0 4.377-2.69C18.78 15.294 21 12.551 21 9a4 4 0 0 0-4-4c-1.957 0-3.652 1.396-4.02 3.2a1 1 0 0 1-1.96 0C10.652 6.396 8.957 5 7 5" clip-rule="evenodd"></path><path fill="white" fill-rule="evenodd" d="M12 22c-.285-.018-.512-.123-.764-.24l-.084-.038a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568q.3-.418.666-.78A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278m0-17.959A7.18 7.18 0 0 1 17 2a7 7 0 0 1 7 7c0 4.897-3.061 8.41-5.75 10.562a24.6 24.6 0 0 1-4.989 3.07c-.566.258-.92.368-1.261.368h-.032l-.033-.002c-.484-.032-.881-.218-1.12-.33l-.077-.036a24.5 24.5 0 0 1-4.991-3.07C3.056 17.408 0 13.895 0 9a7 7 0 0 1 7-7c1.918 0 3.701.776 5 2.041M3 9a4 4 0 0 1 4-4c1.957 0 3.652 1.396 4.02 3.2a1 1 0 0 0 1.96 0C13.348 6.396 15.043 5 17 5a4 4 0 0 1 4 4c0 3.552-2.22 6.295-4.625 8.22A21.6 21.6 0 0 1 12 19.91a21.5 21.5 0 0 1-4.377-2.69C5.217 15.295 3 12.551 3 9" clip-rule="evenodd"></path></svg>
            </div>

            <div class="favorite"
                 v-else
                 v-on:click="() => {
               deleteFavorite(project.id)
               this.isFavourite = false
             }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#F8104B" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278" clip-rule="evenodd"></path></svg>
            </div>
          </div>
          <div class="name">
            <input type="text" v-if="isEditable === false"
                   v-model="projectName" v-on:keydown.enter="checkAndUpdateProject()">
            <span v-else>
              {{ project.name }}

            </span>


          </div>
        </div>


        <div class="rating">
          <div class="stars">
            <div class="project-rating"
                 v-if="project.ratingAvg !== null"
                 :class="{
                        goodGreen: project.ratingAvg === 5,
                        green: project.ratingAvg >= 4 && project.ratingAvg < 5,
                        yellow: project.ratingAvg > 3 && project.ratingAvg < 4,
                        orange: project.ratingAvg > 2 && project.ratingAvg <= 3,
                        red: project.ratingAvg > 1 && project.ratingAvg <= 2,
                        badRed: project.ratingAvg >= 0 && project.ratingAvg <= 1,
                          }">
              {{ project.ratingAvg }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M8.93325 0.7084L10.1489 4.61808C10.2802 5.04057 10.6571 5.32648 11.0822 5.32648H15.0168C15.9674 5.32648 16.3627 6.59722 15.5936 7.18118L12.4105 9.59732C12.0665 9.85835 11.9227 10.3211 12.054 10.7436L13.2697 14.6533C13.5635 15.5978 12.5287 16.3833 11.7597 15.7996L8.57651 13.3835C8.23253 13.1224 7.7669 13.1224 7.42292 13.3835L4.23977 15.7996C3.47071 16.3833 2.43593 15.5978 2.72972 14.6533L3.94542 10.7436C4.07671 10.3211 3.93294 9.85835 3.58896 9.59732L0.406373 7.18088C-0.362688 6.59722 0.0326187 5.32618 0.983169 5.32618H4.91752C5.3426 5.32618 5.71947 5.04028 5.85077 4.61778L7.06675 0.7084C7.36053 -0.236133 8.63947 -0.236133 8.93325 0.7084Z"/>
              </svg>
            </div>

            <div class="project-rating-no" v-else>
              У проекта нет оценок


            </div>

          </div>


        </div>
      </div>

      <div class="project-body">
        <div class="tabs-links">
          <button
              v-on:click="this.$router.go(-1)"
              class="back">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.52 137.91"><path d="M26.75,68.29c14.02,13.92,26.77,26.57,39.5,39.23,3.54,3.52,7.15,6.98,10.53,10.65,4.87,5.29,4.82,11.95,.1,16.49-4.67,4.49-11.53,4.36-16.53-.62C41.46,115.25,22.61,96.41,3.83,77.51c-4.97-5-5.17-11.48-.22-16.49C22.7,41.7,41.91,22.5,61.2,3.38c4.71-4.67,11.74-4.38,16.15,.11,4.28,4.36,4.32,11.35-.42,16.15-14.74,14.95-29.61,29.77-44.5,44.57-1.41,1.4-3.26,2.36-5.69,4.08Z"/></svg>
          </button>

          <button
              v-if="this.products.length > 0"
              v-on:click="switchTabs('services')"
              class="fresh" ref="services"
              :class="{
                active: this.tab === 'services'
          }">
            Витрина
          </button>

          <button
              v-on:click="switchTabs('description')"
              class="recommended" ref="description"
          :class="{
                active: this.tab === 'description'
          }">
            Описание
          </button>
          <button
              v-on:click="switchTabs('testimonials')"
              class="recommended" ref="description"
          :class="{
                active: this.tab === 'testimonials'
          }">
            Отзывы
          </button>


        </div>
        <div class="tabs-body">
          <div class="tab-content">
            <div class="flex"
                 v-if="this.tab === 'description'">

              <project-description-tab
                    v-bind:isAdmin="this.isAdmin"
                    v-bind:project="this.project">

              </project-description-tab>

            </div>
            <div class="flex"
                 v-if="this.tab === 'testimonials'">

              <project-reviews
                  v-bind:isAdmin="this.isAdmin"
                  v-bind:project="this.project">

              </project-reviews>

            </div>


            <div class="flex"

                 v-if="this.tab === 'services' && this.products.length > 0 ">
              <div class="cards-wrapper" ref="service">
                <services-card
                    v-for="(item, index) in products"
                    v-bind:name="item.name"
                    v-bind:image="`${api}${item.avatarFilePath}`"
                    v-bind:description="item.description"
                    v-bind:id="item.id"
                    v-bind:isOwner="this.canEdit"
                    v-bind:highlight="item.highlighted"


                    v-on:high="emit => {
                      console.log('ha: ', emit)
                    }"



                    v-on:updated="(emit) => {
                      deleteProduct(emit)

                    }"
                    v-on:changed="(emit) => {
                      updateProduct(emit.id, emit.newDescription, emit.newName)
                      console.log(emit)

                    }"
                >
                  {{ item.name }}
                </services-card>
              </div>






              <div class="addService" v-if="this.tab === 'addService'">

                <div class="add-project form-wrapper">
                  <div class="left">
                    <div class="input-wrapper">
                      <input
                          type="text"
                          placeholder="Название проекта"
                          v-model="productName"
                          v-on:input="(e) => {
                            productName.length <= 5 ? e.target.classList.add('bad') : e.target.classList.add('ok')
                            productName.length > 5 ? e.target.classList.remove('bad') : e.target.classList.remove('ok')
                          }"

                          minlength="5" maxlength="30"
                          required>
                      <span class="help">
                        Введите название проекта, которое коротко и ясно отражает его суть. От 5 до 30 символов.
                      </span>
                    </div>


                    <div class="input-wrapper">
                      <div class="fake-input">
                        <span class="name">Фото</span>
                        <input type="file"
                               v-on:change="uploadPhoto($event)"
                               accept="image/*">
                      </div>
                      <span class="help">
                        Загрузите аватар проекта, размеры 245х180px, форматы: jpeg, jpg, gif. webp
                      </span>
                    </div>


                  </div>
                  <div class="right">
                    <textarea placeholder="описание проекта *" required v-model="productDescription"></textarea>
                    <span class="help">
                      Предоставьте подробное описание услуги, включая ее цель, описание, что бы пользователь точно понимал что он покупает.
                    </span>
                  </div>




                  <button class="btn-filled btn disabled"

                          v-on:click="() => {
                            previewBeforeUpload()
                            console.log($emit.changeModal)
                            this.showModal = true
                          }">
                    Добавить проект
                  </button>
                </div>



              </div>

            </div>

            <div class="flex"
                 v-if="this.tab === 'addService'">

              <div class="services">

              </div>

              <add-service
                  v-bind:projectId="project.id"
                  v-on:added="() => {
                    this.tab = 'services'
                    this.getProducts()
                    this.highlightProject()
                  }"

              >

              </add-service>
            </div>
          </div>

        </div>


      </div>

    </div>
    <div class="fixed-menu">
      <div class="buttons">



        <div v-if="this.isAdmin === true && this.tab !== 'addService'" class="canEdit"
             v-on:mouseover="this.editAddShow = true"
             v-on:mouseleave="this.editAddShow = false">
          <span v-if="this.isAdmin === true"
                class="icon-wrapper"
                :class="{active: this.editAddShow}"
                v-on:click="() => {
                  this.editAddShow = false
                  switchTabs('addService')
                }">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                <path opacity="0.3" d="M7.69655 17V0H10.3034V17H7.69655ZM0 9.70283V7.33727H18V9.70283H0Z" fill="black"/>
              </svg>
              <span v-if="this.editAddShow === true">Добавить услугу</span>
          </span>

        </div>
      </div>
    </div>
  </div>

</template>
<script>
import servicesCard from "./ServicesCard.vue";
import { ref } from 'vue'
import AddService from "../addItems/AddService.vue";
import config from '../../assets/js/config.js'
import projectDescriptionTab from "./project_parts/projectDescriptionTab.vue";
import projectReviews from "./project_parts/projectReviews.vue";


export default {

  name: "ProjectsView.vue",
  components: { AddService, servicesCard, projectDescriptionTab, projectReviews  },
  emits: ['updated', 'high'],

  data() {
    return {
      api: config.api.url,
      

      services: {},
      tab: '',
      favorite: false,
      project: {},

      productName: '',
      productPhoto: '',

      editMode: false,
      isOwner: false,

      projectName: '',
      projectDescription: '',
      projectCategory: '',
      dataStars: 0,
      starsRating: ref(null),

      reviews: {},
      reviewsLength: 0,

      isProjectReviewed: false,
      username: '',

      isAdmin: false,
      showNotReviewed: false,
      notReviewedMessageShow: false,
      allReviewed: true,
      clickedReviewIndex: 0,


      highlighted: '',
      products: [],

      isFavourite: false,

      editTextShow: false,
      editAddShow: false
    }
  },
  props: ['selectedId', 'highlight', 'tab'],
  setup() {
    const el = ref(null);
    const starOne = ref(null);
    console.log(config)

    return {
      el
    }
  },
  methods: {

    updateProduct(id, description, name) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


      fetch(`${config.api.url}products/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          name: name,
          description: description,

        })
      })
          .then((response) => response.json())
          .then(response => {
            this.getProducts()
          })
          .catch((error) => {console.error(error)});
    },
    highlightProject() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      const projectId = window.location.pathname.replace('/project/', '');

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`${config.api.url}products?projectId=${projectId}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            this.highlighted = result.products[result.products.length - 1]
          })
          .catch((error) => console.error(error));
    },
    deleteProduct(id) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


      fetch(`${config.api.url}products/${id}`, {
        method: "DELETE",
        headers: myHeaders
      })
          .then((response) => response.json())
          .then(response => {
            this.getProducts()
            this.$refs.service.scrollIntoView({behavior: "smooth", block: "center"})
          })
          .catch((error) => {console.error(error)});
    },
    addFavorite(projectId) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`http://62.113.96.171:3000/user/project/${projectId}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(
            {
              status: 'favorite'
            }
        )
      })
          .then((response) => response.json())
          .then(() => { this.getProjectFullInfo() })
          .catch((error) => {console.error(error)});
    },

    deleteFavorite(projectId) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`http://62.113.96.171:3000/user/project/${projectId}`, {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify(
            {
              status: 'favorite'
            }
        )
      })
          .then((response) => response.json())
          .then(() => { this.getProjectFullInfo() })
          .catch((error) => {console.error(error)});
    },
    getProducts(emit) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      const projectId = window.location.pathname.replace('/project/', '');

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`${config.api.url}products?projectId=${projectId}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            this.products = result.products
            console.log(result.products)

            if(this.products.length <= 0) {
              this.switchTabs('description')
            } else {
              this.switchTabs('services')
            }

            for (let product of this.products) {
              if (parseInt(this.$route.query.highlight) === product.id) {
                product.highlighted = true

              }
            }
            console.log(this.products)
          })
          .catch((error) => console.error(error));
    },

    getProjectFullInfo() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const projectId = window.location.pathname.replace('/project/', '');
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`${config.api.url}projects/` + projectId, {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            this.project = result.project
            result.project.userData.username === localStorage.getItem('username')  || localStorage.getItem('username') === 'admin' ? this.canEdit = true : this.canEdit = false

            this.projectDescription = this.project.description
            this.projectName = this.project.name
          })
          .catch((error) => console.error(error));


    },
    switchTabs(tab) {
      this.tab = tab

    },

    uploadPhoto(e){
      this.projectBanner = e.target;
      const image = e.target.files[0]

      console.log(image)
      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "image/webp");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const formData = new FormData();
      formData.append("image-upload", image );

      console.log(formData)
      fetch("${config.api.url}image-upload", {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
      })
          .then((response) => response.json())
          .then((result) => this.productPhoto = result.filePath)
          .catch((error) => console.error(error));
    },
    checkAndUpdateProject () {
      const project = {
        name: this.projectName,
        description: this.projectDescription,
      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


      if (this.projectName.length < 5) {
        this.errors.push('Название услуги должно быть не менее 5 символов')
        this.$refs.projectName.style.borderColor = 'red'
      } else {
        this.$refs.projectName.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.projectDescription.length < 5) {
        this.errors.push('Название услуги должно быть не менее 5 символов')
        this.$refs.projectDescription.style.borderColor = 'red'
      } else {
        this.$refs.projectDescription.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.projectDescription.length < 5 && this.projectName.length < 5 ) {
        setTimeout(()=> {
          this.$refs.errors.scrollIntoView({ behavior: 'smooth', block: 'center'})
        }, 20)
      } else {
        this.editable = false

        fetch(`${config.api.url}projects/${this.project.id}`, {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then(() => this.getProjectFullInfo())
            .catch((error) => {console.error(error)});
      }


      console.log(project)


    },





  },
  mounted(emits) {
    setTimeout(() => {
      this.$refs.wrapper.scrollIntoView({behavior: 'smooth', block: 'start'})
    },20)

    this.getProducts()


    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true
    }
    this.getProjectFullInfo()

    this.username = localStorage.getItem('username');

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })


  },
}
</script>

<style scoped lang="scss">

.fixed-menu {
  position: sticky;
  max-width: 100%;
  bottom: 0;
  align-items: center;
  justify-content: end;
  display: flex;
  padding-bottom: 10px;

  .canEdit {

    .icon-wrapper {
      transition: all 0.5s ease;
      display: flex;
      overflow: hidden;
      flex-wrap: nowrap;
      align-items: center;
      background-color: rgb(0, 115, 236);
      color: #ffffff;
      cursor: pointer;
      border-radius: 999px;
      padding: 10px;
      opacity: 1;

      width: 20px;
      height: 20px;
      position: relative;

      span {
        margin-right: -140px;
        white-space: nowrap;
      }


      &.active{
        width: 150px;
        font-size: 14px;
        span {
          margin-right: 0;
        }
      }
      svg {
        background-color: rgb(0, 115, 236);
        border-right: 10px solid rgb(0, 115, 236);
        border-radius: 5px;

        width: 20px;
        height: 20px;
        position: absolute;
        top: 10px;
        right: -5px;
        opacity: 1;

        margin-right: 5px;

        path {
          opacity: 1;
          fill: #ffffff;
        }
      }
    }

    &:hover {
      opacity: 1;
    }
  }
}
.wrapper {
  position: relative;
}
.addService {
  width: 100%;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
}
[v-cloak] {
  display: block;
  padding: 50px 0;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #333;
    animation: spinner .6s linear infinite;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  & > div {
    display: none;
  }
}

input[type='text'] {
  border-radius: 5px;
  border: 1px solid var(--new-dark, rgb(0, 115, 236));
  background: var(--neutral, #FFF);
  color: #000;
  padding: 0px 5px;
  width: 100%;
  box-sizing: border-box;

  font-family: 'Gilroy-Regular', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &.bad {
    background-color: #fff3f3;
    border: 1px solid #984a5a;
    &.ok {
      background-color: #ffffff;
    }
  }

  &::placeholder {
    opacity: .3;
  }
}
.reviewTextError {
  background-color: #ffd6d6;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 14px;
  padding: 10px;

}
textarea {
  border-radius: 5px;
  border: 1px solid var(--new-dark, rgb(0, 115, 236));
  background: var(--neutral, #FFF);
  padding: 10px 15px;

  font-family: 'Gilroy-Regular', sans-serif;
  font-size: 14px;
  font-style: normal;
  height: 280px;
  font-weight: 400;
  line-height: normal;
  resize: none;

  box-sizing: border-box;

  width: 100%;

  &::placeholder {
    opacity: .3;
  }
}


.set-rating {
  svg {
    opacity: .3;
    transition: .3s ease;
    path {
      cursor: pointer;
    }

    &.active {
      opacity: 1!important;
    }
  }
}

.flex {
  width: 100%;
  box-sizing: border-box;
}



.tabs-links {
  margin-bottom: 20px;
}

.services {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  .project {
    width: 30%;

  }
}

.content {
  padding: 0;
}

.project {
  width: 100%;


  .project-banner {
    width: 100%;
    height: 220px;
    overflow: hidden;
    border-radius: 20px;
    position: relative;



    img {
      width: 100%;
      min-height: 100%;
    }
  }

  .project-header {
    display: flex;
    width: 100%;
    align-items: flex-end;

    position: relative;
    margin-top: -30px;
    flex-basis: border-box;
    flex-grow: 1;
    flex-shrink: 1;

    .left {

      width: 100%;
      display: flex;
      padding-left: 20px;
      align-items: end;

      .avatar {
        position: relative;
        background-color: #ffffff;
        border-radius: 15px;
        width: 110px;
        height: 110px;
        overflow: hidden;
        text-align: center;
        margin: 0;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        img {
          display: inline-block;
          height: 100%;
          border-radius: 15px;
        }
      }

      .name {
        margin-left: 10px;
      }
    }

    .rating {
      width: 10%;
      justify-content: end;
      display: flex;
      align-items: center;

      .stars {
        margin-right: 20px;

        font-family: 'Gilroy-Regular', sans-serif;
        font-size: 13px;
        font-style: normal;
        font-weight: 200;
        line-height: normal;
        color: #3e4b5b;

        .project-rating {
          display: flex;
          justify-content: end;
          padding: 5px 15px;
          color: #fff;
          font-weight: 700;
          border-radius: 5px;
          font-size: 14px;
          text-align: end;

          svg {
            width: 10px;
            height: 10px;
            margin-right: 0;

            path {
              fill: #fff;
            }
          }

          &.goodGreen {
            background-color: #0fd067;
          }

          &.green {
            background-color: #56d790;
          }

          &.yellow {
            background-color: yellow;
          }

          &.orange {
            background-color: orange;
          }

          &.red {
            background-color: orangered;
          }

          &.badRed {
            background-color: red;
          }

          span {
            background-color: rgb(0, 115, 236);
            padding: 5px 15px;
            color: #fff;
            font-weight: 700;
            border-radius: 5px;
          }
        }
      }
    }
  }

  .project-body {
    padding-left: 30px;
    margin-top: 40px;
  }

  .recommend-project {
    svg {
      width: 22px;
      height: 22px;

      path {
        fill: #0a58ca;
      }
    }
  }

}

.name {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  top: -5px;
  word-break: break-all;

  text-shadow: 0 0 5px #f4f6f9, 0 0 10px #f4f6f9, 0 0 15px #f4f6f9, 0 0 25px #f4f6f9, 0 0 35px #f4f6f9;
  padding: 5px 5px 0px 5px;
  border-radius: 5px;

  color: var(--secondary, #2B2B2B);
  font-family: 'Gilroy-Bold', sans-serif;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 100%;

  input {
    width: 100%;
  }

  .verified {
    width: 17px;
    height: 17px;

  }
}

.tabs-body {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  .tab-content {
    width: 100%;
  }


}

.favorite {
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 400px;
  padding: 5px;
  transition: .3s ease;

}

.notReviews {
  svg {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    flex-basis: 100%;

    path {
      fill: #c8b56b;
    }
  }
  span {
    color: #c8b56b;
    flex-basis: 100%;
  }
}



.cards-wrapper {
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

</style>../../assets/js/config.js