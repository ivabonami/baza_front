<template>
  <div class="service-card box-shadow can-be-hovered"

       v-if="$props.name !== ''" :class="{
          deleted: this.toDelete,
          highlight: this.highlighted,
          editable: this.editable,

        }"
        v-on:mouseover="() => {
            this.highlighted = false

        }"
       v-on:keydown.enter=""
       v-on:click="() => {
             if ($props.clickable === true) {
               this.$router.push(`/project/${$props.projectId}`)
               this.highlight.id = $props.id

             }

            }">
    <div class="image">
      <img :src="$props.image" alt=""
           >
    </div>
    <div class="service-header"
         >
      <p  v-if="this.editable === false">
        {{ $props.name }}
      </p>
      <div class="" v-else>
        <input type="text" v-model="projectName" ref="projectName">
      </div>


    </div>
    <div class="service-description">
      <p v-if="this.editable === false">
        {{ $props.description }}
      </p>
      <div class="" v-else>
        <textarea v-model="projectDescription" ref="projectDescription"></textarea>

      </div>
    </div>

    <button class="btn btn-delete"
            v-if="$props.isOwner === true"
            v-on:click.stop
            v-on:click="() => {
              this.$emit('deleteService', $props.id)

            }">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
        <path d="M14.3066 10.5404C14.3066 11.9891 14.3153 13.4375 14.3039 14.8862C14.2936 16.1901 13.6839 17.1536 12.5161 17.7756C12.0391 18.0298 11.517 18.1295 10.9784 18.1303C8.71443 18.1341 6.45046 18.1469 4.18689 18.1264C2.73366 18.1133 1.69388 17.4252 1.0885 16.1337C0.912373 15.7578 0.853533 15.3464 0.853928 14.9299C0.854717 11.9041 0.859851 8.878 0.849189 5.85224C0.847214 5.26656 1.28595 4.90264 1.80919 4.96677C2.1575 5.00926 2.48526 5.32683 2.50777 5.6726C2.5133 5.75604 2.51014 5.83988 2.51014 5.92371C2.51014 8.87877 2.51922 11.8338 2.50501 14.7889C2.50027 15.7489 3.24584 16.5096 4.25087 16.5003C6.46823 16.4795 8.68639 16.4787 10.9042 16.5003C11.9171 16.5104 12.6615 15.7458 12.6563 14.7746C12.6397 11.7875 12.65 8.79996 12.6504 5.81284C12.6504 5.25729 13.0382 4.91461 13.6021 4.96831C13.9248 4.99883 14.2265 5.26424 14.281 5.57833C14.3027 5.70428 14.3054 5.83447 14.3054 5.96273C14.307 7.48875 14.3066 9.01437 14.3062 10.5404H14.3066Z" fill="#494A4E"/>
        <path d="M7.58574 4.10691C5.35494 4.10691 3.12415 4.10691 0.893745 4.10691C0.435265 4.10691 0.177395 3.92263 0.0316763 3.49418C-0.102195 3.10128 0.205828 2.58746 0.625212 2.51483C0.747237 2.49358 0.873605 2.48817 0.998394 2.48779C1.98525 2.48586 2.9725 2.48161 3.95936 2.49049C4.15918 2.49242 4.22276 2.43254 4.21723 2.23744C4.20459 1.78698 4.21052 1.33613 4.21447 0.885667C4.21921 0.358323 4.55764 0.00830615 5.09747 0.00560182C6.74894 -0.00212483 8.40081 -0.00135216 10.0523 0.00482915C10.6032 0.00676082 10.9424 0.35446 10.9471 0.89378C10.9507 1.34424 10.9554 1.79509 10.9448 2.24556C10.9404 2.42945 10.9989 2.49126 11.1908 2.4901C12.2041 2.48238 13.2174 2.48701 14.2307 2.48624C14.4732 2.48624 14.7003 2.5214 14.8855 2.69641C15.1627 2.95834 15.2306 3.26779 15.0821 3.62979C14.9621 3.92147 14.671 4.10613 14.3176 4.10652C12.0738 4.10729 9.82996 4.10691 7.58613 4.10691H7.58574ZM7.59995 1.64017C7.09329 1.64017 6.58624 1.64365 6.07958 1.63786C5.94334 1.63631 5.88766 1.6819 5.89319 1.81596C5.8999 1.97667 5.89635 2.13777 5.89438 2.29887C5.8928 2.42366 5.93979 2.48817 6.07958 2.48779C7.07987 2.48508 8.08055 2.48508 9.08083 2.48779C9.22063 2.48817 9.26762 2.42366 9.26604 2.29887C9.26406 2.14434 9.25893 1.98942 9.26801 1.83527C9.2771 1.68306 9.2147 1.63477 9.06109 1.63708C8.57417 1.64481 8.08687 1.63979 7.59995 1.63979V1.64017Z" fill="#494A4E"/>
        <path d="M8.42743 10.3022C8.42743 9.34373 8.42545 8.38485 8.42861 7.42636C8.4298 7.0493 8.68925 6.7186 9.03242 6.63979C9.46088 6.54127 9.83091 6.69001 10.0098 7.05587C10.0667 7.17254 10.09 7.31587 10.0904 7.44722C10.0955 9.34527 10.0904 11.2429 10.0959 13.141C10.0975 13.6822 9.70572 13.9975 9.26264 14.0044C8.78126 14.0118 8.42901 13.6359 8.42782 13.1205C8.42585 12.1813 8.42743 11.2418 8.42743 10.3026V10.3022Z" fill="#494A4E"/>
        <path d="M6.73258 10.3095C6.73258 11.268 6.73495 12.2268 6.731 13.1853C6.72982 13.5234 6.50986 13.8375 6.21842 13.9441C5.85511 14.0766 5.50207 13.9897 5.25289 13.7096C5.08979 13.5265 5.0661 13.3066 5.0661 13.0779C5.06689 11.2251 5.0661 9.37222 5.0665 7.51937C5.0665 7.48731 5.0665 7.45486 5.06729 7.42279C5.08269 6.93601 5.4227 6.60377 5.90013 6.60995C6.37559 6.61613 6.72863 6.95881 6.7314 7.434C6.73614 8.39249 6.73298 9.35136 6.73258 10.3099V10.3095Z" fill="#494A4E"/>
      </svg>
    </button>

    <button class="btn btn-edit"
            v-if="$props.isOwner === true"
            v-on:click.stop
            v-on:click="() => {
              this.$emit('editService', true)

            }">
      <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333.45 340.57" v-if="this.editable === false"><path d="M164.18,340.54c-40.51,0-81.01,.01-121.52,0C17.02,340.53,.01,323.57,0,298,0,216.97,0,135.95,0,54.92,.01,29.57,17.04,12.44,42.25,12.43c40.17-.02,80.34,.02,120.52-.03,6.75,0,12.09,2.5,15.41,8.38,3.11,5.51,2.91,11.23-.5,16.6-3.68,5.79-9.34,7.59-15.9,7.58-36.17-.04-72.34-.02-108.51-.01-4.17,0-8.34-.1-12.5,.04-5.62,.2-8.14,2.78-8.15,8.46-.03,82.02-.03,164.05,0,246.07,0,6.11,2.86,8.66,9.59,8.67,21.17,.04,42.34,.01,63.51,.01,59.51,0,119.02,0,178.52,0,9.42,0,11.44-2.02,11.44-11.43,0-42.01-.02-84.03,.02-126.04,0-8.24,5.37-14.96,12.73-16.3,8.41-1.53,15.53,2.21,18.5,9.99,.75,1.96,1.01,4.21,1.01,6.32,.06,43.51,.13,87.03,0,130.54-.07,21.68-17.74,39.12-39.73,39.2-41.34,.15-82.68,.04-124.02,.05Z"/><path d="M283.42,135.51c-3.29,3.08-7.26,6.59-11.01,10.33-21.11,21.05-42.24,42.07-63.16,63.31-3.96,4.02-8.47,6.09-13.78,7.29-26.6,5.97-53.16,12.06-79.74,18.1-11.76,2.68-19.57-4.91-16.92-16.48,6.35-27.7,12.64-55.42,19.19-83.07,.73-3.08,2.36-6.37,4.56-8.6,24.82-25.1,49.83-50.02,74.79-74.98,.46-.46,1.02-.83,1.2-.98,28.13,28.2,56.17,56.3,84.88,85.08Z"/><path d="M210.34,38.32c11.22-11.19,22.89-23.05,34.82-34.64,5.17-5.02,12.35-4.88,17.52,.25,22.34,22.17,44.59,44.42,66.76,66.75,5.3,5.34,5.35,12.49,.09,17.91-11.49,11.81-23.22,23.39-34.51,34.71-28.2-28.3-56.22-56.42-84.68-84.99Z"/></svg>
      <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 438.77" v-else><path d="M219.42,438.74c-63.17,0-126.34-.03-189.51,.03-12.01,.01-21.73-4.34-26.78-15.44-2.31-5.08-2.97-11.28-2.98-16.98C-.04,329.37,.02,252.37,.02,175.38c0-47.83-.09-95.66,.13-143.48,.03-5.53,.91-11.43,3-16.48C7.03,6.05,15.07,1.47,25,.31,27.8-.01,30.66,.04,33.49,.04,117.99,.03,202.49,.07,287,0c22.68-.02,41.57,8.13,57.47,24.34,23.27,23.74,46.86,47.19,70.55,70.52,15.75,15.51,23.93,34.04,23.94,56.13,.01,85.49-.04,170.98,.05,256.47,.01,12.04-3.47,22.26-14.72,27.8-4.71,2.32-10.53,3.32-15.85,3.33-63,.22-126,.14-189.01,.14ZM36.35,219.14c0,33.83,0,67.67,0,101.5,0,25.33,.12,50.67-.11,76-.04,4.75,1.56,6.03,6.02,5.87,7.82-.28,15.67-.08,23.5-.08q7.43,0,7.44-7.31c0-35.67-.03-71.33,.03-107,.01-7.37,.69-14.61,5.42-20.83,6.44-8.46,15.07-11.03,25.41-11.01,73.01,.18,146.02,.09,219.03,.1,5.83,0,11.67,.14,17.5,.16,5.96,.02,10.91,2.4,15.41,6.14,7.41,6.18,9.77,14.39,9.77,23.59,.01,36.83,.07,73.67-.07,110.5-.02,4.31,1.17,5.92,5.65,5.74,7.82-.32,15.66-.09,23.5-.09q7.7,0,7.7-7.49c0-81.33-.04-162.66,.05-244,.01-11.67-4.09-21.27-12.31-29.44-24.34-24.21-48.67-48.45-72.8-72.87-5.84-5.91-12.74-9.44-20.49-11.75-2.8-.84-4.17,.24-4.34,3.02-.1,1.66-.09,3.33-.09,5,0,35.17,.1,70.33-.11,105.5-.03,5.4-.39,11.28-2.53,16.09-5.13,11.53-14.81,16.03-27.42,15.98-53.01-.22-106.01-.09-159.02-.11-2.5,0-5.13,.22-7.46-.48-3.91-1.16-7.99-2.41-11.34-4.63-9.29-6.16-11.51-15.73-11.5-26.19,.03-36,.02-72,0-108,0-6.85-.02-6.86-6.99-6.86-7.67,0-15.34-.01-23,0-6.85,.01-6.87,.02-6.87,6.95,0,58.67,0,117.33,0,176Zm183.15,183.29c34.49,0,68.98,0,103.47,0,6.53,0,6.55-.03,6.55-6.69,0-32.15,0-64.31,0-96.46,0-6.81-.03-6.88-7.04-6.88-68.65,0-137.3-.01-205.95,0-7.03,0-7.11,.12-7.11,7.4,0,31.99,0,63.98,0,95.96,0,6.64,0,6.66,6.61,6.67,34.49,0,68.98,0,103.47,0Zm36.91-311.22c0-14.33,.06-28.66-.02-42.98-.05-8.05-4.02-11.99-12.02-12.01-16.5-.05-32.99-.06-49.49,.01-8.36,.03-12.27,3.85-12.29,12.25-.07,28.49-.07,56.98,0,85.47,.02,8.65,3.9,12.57,12.55,12.64,16.16,.12,32.33,.12,48.49,0,8.97-.07,12.76-4.02,12.78-12.88,.03-14.16,0-28.32,0-42.48Z"/></svg>


    </button>

    <div class="errors" ref="errors" v-if="this.errors.length > 0">
      <h3>Устраните ошибки:</h3>
      <div class="error" v-for="(error, index) of errors" >
        {{ index + 1 }}) {{ error }}

      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import config from "../../../assets/js/config.js";
import {highlight} from "../../../assets/js/productController.js";

export default {
  name: "ServicesCard.vue",
  props: ['name', 'image', 'description', 'id', 'isOwner', 'highlight', 'clickable', 'projectId', 'productId'],

  data() {
    return {
      highlight,
      highlighted: false,
      project: {
        name: '',
        description: '',
        image: '',

      },
      clickedProduct: 0,
      editable: false,
      toDelete: false,
      counter: 0,
      projectName: '',
      projectDescription: '',
      errors: []
    }
  },
  mounted() {
    this.projectName = this.$props.name
    this.projectDescription = this.$props.description
    highlight.id === this.$props.id ? this.highlighted = true : this.highlighted = false

  },
  methods: {
    checkForm () {
      this.errors = []

      if (this.projectName.length < 5) {
        this.errors.push('Название услуги должно быть не менее 5 символов')
        this.$refs.projectName.style.borderColor = 'red'
      } else {
        this.$refs.projectName.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.projectDescription.length < 30) {
        this.errors.push('Описание услуги не должно быть меньше 30 символов')
        this.$refs.projectDescription.style.borderColor = 'red'
      } else {
        this.$refs.projectDescription.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.errors.length > 0 ) {
        setTimeout(()=> {
          this.$refs.errors.scrollIntoView({ behavior: 'smooth', block: 'center'})
        }, 20)
      } else {
        this.editable = false
        this.$emit('changed', {
          id: this.$props.id,
          newName: this.projectName,
          newDescription: this.projectDescription
        })
      }

    }


  }
}
</script>

<style scoped lang="scss">

.errors {
  margin-top: 10px;
  background-color: #ffdada;
  border-radius: 5px;
  padding: 10px;
  font-size: 12px;

  h3 {
    font-size: 14px;
  }

  .error {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}


.service-card {
  width: 100%;
  margin-bottom: 5px;
  position: relative;
  border-radius: 20px;

  background-color: #ffffff;

  p {
    padding: 0 10px;
  }
  .service-description {
    padding-bottom: 20px;
  }

  &.editable {
    background-color: #e3eaff;
    box-sizing: content-box;
    border-color: #e3eaff;
  }

  input[type=text] {
    font-size: 14px;
    margin-top: 10px;
    padding: 5px 10px;
    font-weight: 600;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    width: 100%;
    box-sizing: border-box;
    font-family: "Montserrat", "Arial", Serif;
    margin-bottom: 10px;
  }

  textarea {
    background-color: #fff;
    font-size: 14px;
    border-radius: 5px;
    padding: 5px 10px;
    border: 1px solid #eaeaea;
    width: 100%;
    min-height: 150px;
    height: fit-content;
    box-sizing: border-box;
    resize: none;
    font-family: "Montserrat", "Arial", Serif;
  }

  &.can-be-hovered {
    cursor: pointer;
    transition: .3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: rgba(0, 0, 0, 0.09) 0 13px 22px;

    }
  }

  &.notNormal {
    background-color: transparent;
    box-shadow: none;
    cursor: default;
    text-align: left;
  }

  &.highlight {
    background-color: #fff2d6;
    box-sizing: content-box;
    box-shadow: 0 0 5px 5px #fff2d6;
  }

  .btn {
    padding: 0px;
    color: #d5d5d5;
    margin-top: 10px;
    position: absolute;
    left: 10px;
    top: 5px;
    background-color: rgba(0,0,0, 0.4);

    &.btn-edit {
      left: 40px;
    }

    svg {
      padding: 3px;
      width: 15px;
      height: 15px;
      path {
        fill: #ffffff;
        transition: .3s ease;
      }
    }

    &:hover {
      transform: none;
      color: #ffd1ce;

      svg {
        path {
          fill: #FFD1CEFF;
        }
      }
    }
  }

  .image {
    position: relative;
    background-color: #ffffff;
    border-radius: 20px;
    width: 100%;
    height: 160px;
    overflow: hidden;
    display: block;
    text-align: center;

    img {

      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      top: 50%;
      transform: translateY(-50%);

    }
  }
  .service-header {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;

    p {
      margin-top: 20px;
      margin-bottom: 10px;
      color: var(--secondary, #2B2B2B);
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 100% */
      word-break: break-word;
    }


    &.highlight {
      background-color: #0a58ca;
    }

  }
  .service-description {
    color: var(--secondary, #2B2B2B);
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-style: normal;
    word-break: break-all;
    font-weight: 300;
    line-height: normal;
  }

}
</style>