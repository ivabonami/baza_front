<template>
  <div class="project-description-wrapper">
    <div class="left">

      <div class="project-links">
        <h3 class="services">
          Ссылки на проект
        </h3>

        <div class="this-project-links">
          <div class="this-project-link" v-for="link of this.$props.project.links">
            <a :href="link.link" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M0.742943 8.0844C0.742943 6.8414 0.734787 5.59839 0.747837 4.35539C0.751371 3.9996 0.785353 3.63796 0.856581 3.29027C1.03547 2.41702 1.85595 1.65407 2.72373 1.57727C3.36315 1.52058 4.008 1.52588 4.65069 1.51024C4.95871 1.5027 5.267 1.50243 5.57475 1.51388C5.92953 1.52728 6.20574 1.75432 6.31122 2.09614C6.40637 2.40501 6.29817 2.76274 6.04316 2.97471C5.87271 3.11657 5.6718 3.15902 5.45812 3.1593C4.80103 3.1593 4.14421 3.15651 3.48712 3.16293C3.29328 3.16488 3.09591 3.17438 2.90696 3.21376C2.59704 3.27827 2.38798 3.52737 2.37547 3.85327C2.35454 4.40175 2.3453 4.95106 2.34448 5.50009C2.34149 7.56246 2.34285 9.62482 2.3453 11.6872C2.3453 11.9056 2.35672 12.1245 2.37493 12.3423C2.40538 12.7085 2.66066 12.983 3.01979 12.9947C3.74403 13.0184 4.46881 13.0265 5.19332 13.0282C7.01018 13.0321 8.8273 13.0299 10.6442 13.0274C10.8521 13.0271 11.0606 13.0148 11.2684 12.9992C11.6294 12.9718 11.9042 12.7048 11.9181 12.3348C11.9407 11.7397 11.942 11.1437 11.9496 10.5483C11.9529 10.2878 11.9434 10.0267 11.951 9.76641C11.9611 9.41789 12.1057 9.14756 12.4227 8.99704C12.7296 8.85126 13.0156 8.90655 13.2736 9.11991C13.4615 9.27546 13.5534 9.48882 13.5523 9.73178C13.5485 10.6115 13.5612 11.4923 13.5207 12.3703C13.4737 13.3868 12.9536 14.0953 12.047 14.4924C11.6973 14.6454 11.3159 14.6667 10.9391 14.6694C10.0376 14.6767 9.13587 14.6798 8.2341 14.6789C6.57574 14.6773 4.91738 14.6759 3.25903 14.665C2.7656 14.6616 2.28277 14.5843 1.85785 14.2941C1.27036 13.8931 0.866368 13.3547 0.803568 12.6199C0.74974 11.9815 0.747293 11.3375 0.739953 10.6961C0.730166 9.82561 0.737506 8.95487 0.737506 8.0844H0.742943Z" fill="white"/>
                <path d="M11.6108 2.32875C10.9026 2.32875 10.2275 2.3321 9.5525 2.32735C9.16592 2.32484 8.87828 2.08942 8.77797 1.71018C8.65155 1.23152 8.98812 0.723258 9.46986 0.702593C9.97661 0.68081 10.4844 0.689747 10.9917 0.688909C11.8122 0.687513 12.6324 0.690584 13.4526 0.687513C13.7481 0.686395 14.0051 0.759842 14.1943 1.01509C14.3161 1.17986 14.3604 1.36696 14.3607 1.56412C14.3636 2.9004 14.3655 4.23668 14.3607 5.57268C14.3587 6.12115 13.9752 6.48141 13.4624 6.43644C13.0853 6.40321 12.7694 6.07228 12.7629 5.67377C12.7523 5.00829 12.7578 4.34224 12.7561 3.67676C12.7561 3.63096 12.7561 3.58516 12.7561 3.50194C12.6822 3.5765 12.6292 3.62928 12.5767 3.6829C11.2361 5.05744 9.89559 6.43253 8.55477 7.80679C8.27258 8.09611 7.93166 8.17123 7.6144 8.0168C7.10819 7.77049 6.98912 7.11366 7.38277 6.69532C7.74816 6.30714 8.12387 5.9293 8.49496 5.54699C9.49677 4.51567 10.4989 3.48434 11.5007 2.45302C11.5317 2.42118 11.5599 2.38656 11.6105 2.32931L11.6108 2.32875Z" fill="white"/>
              </svg>

              {{ link.name }}

            </a>
          </div>
        </div>
      </div>

      <h3 class="services">
        Описание проекта
      </h3>

      <div class="about-description">
        <div class="" >
          {{ this.$props.project.description }}
        </div>
<!--        <textarea placeholder="описание проекта *"-->
<!--                  v-else-->
<!--                  required-->
<!--                  v-model="project.description">-->
<!--                    </textarea>-->


      </div>









    </div>
  </div>
</template>

<script>
import config from "../../../assets/js/config.js";
import {ref} from "vue";

export default {
  name: "projectDescriptionTab.vue",
  props: ['project', 'isAdmin'],
  data() {
    return {
      api: config.api.url,

      reviews: ref(Object),

      isAdmin: this.$props.isAdmin,

      username: localStorage.getItem('username'),


    }
  },
  components: {},
  methods: {


  },
  mounted() {
    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true
    }

  },
}
</script>

<style scoped lang="scss">
.project-description-wrapper {
  flex-basis: 100%;
  .project-links {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .this-project-links {


    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: start;


    .this-project-link {
      border-radius: 5px;
      background: #0a58ca;
      padding: 10px 15px;
      width: auto;
      margin-top: 10px;
      margin-right: 10px;

      a {
        color: var(--neutral, #FFF);
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        text-decoration: none;
        transition: .3s ;

        &:hover {
          opacity: .8;
        }
      }
    }
  }
  .left {
    h3 {
      color: #000;

      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .about-description {
      color: var(--secondary, #000000);
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 20px;
      margin-top: 10px;
      word-break: break-all;
    }



  }

}
@media screen and (max-width: 768px){
  .project-description-wrapper {
    .this-project-links {
      .this-project-link {
        padding: 10px;
        a {
          font-size: 12px;
          svg {
            position: relative;
            top: 2px;
          }
        }
      }
    }
  }
}
</style>