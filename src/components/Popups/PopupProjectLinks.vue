<template>
  <div class="popup"
       v-if="modal.show === true"
       :class="{show: modal.show}">

    <div class="popup_header">
      Ссылки на проект
    </div>

    <div class="popup_links_categories">

      <div v-for="category of links"
           v-show="category.links.length > 0"
           class="popup_links_categories_category">

        <div class="popup_links_categories_category_name">

          <div class="popup_links_categories_category_icon">
          <svg v-show="category.linksCategoryName === 'Клирнет'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 8H15M1 8C1 11.866 4.13401 15 8 15M1 8C1 4.13401 4.13401 1 8 1M15 8C15 11.866 11.866 15 8 15M15 8C15 4.13401 11.866 1 8 1M8 1C9.7509 2.91685 10.7459 5.40442 10.8 8C10.7459 10.5956 9.7509 13.0832 8 15M8 1C6.2491 2.91685 5.25407 5.40442 5.2 8C5.25407 10.5956 6.2491 13.0832 8 15" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-show="category.linksCategoryName === 'Даркнет'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1C10.1 2.4 10.7459 5.40442 10.8 8C10.7459 10.5956 10.1 13.6 8 15M8 1C5.9 2.4 5.25407 5.40442 5.2 8C5.25407 10.5956 5.9 13.6 8 15M8 1C4.13401 1 1 4.13401 1 8M8 1C11.866 1 15 4.13401 15 8M8 15C11.866 15 15 11.866 15 8M8 15C4.13401 15 1 11.866 1 8M15 8C13.6 10.1 10.5956 10.7459 8 10.8C5.40442 10.7459 2.4 10.1 1 8M15 8C13.6 5.9 10.5956 5.25407 8 5.2C5.40442 5.25407 2.4 5.9 1 8" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-show="category.linksCategoryName === 'Блокчейн'" xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
            <path d="M1 7.75011L7 9.25L13 7.75M1 7.75011L7 1M1 7.75011L7 6.25006M13 7.75L7 1M13 7.75L7 6.25006M7 1V6.25006M2.125 10.75L7.00009 16L11.875 10.75L7 11.875L2.125 10.75Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-show="category.linksCategoryName === 'Другое'" xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M15 8.13876L9.09347 2.11514C8.68991 1.70359 8.48814 1.49781 8.25266 1.35066C8.0439 1.22019 7.81629 1.12404 7.57821 1.06575C7.30967 1 7.02431 1 6.4536 1L3.33333 1M1 6.31441L1 7.88059C1 8.2686 1 8.46261 1.04298 8.64518C1.08109 8.80705 1.14394 8.9618 1.22923 9.10374C1.32542 9.26383 1.45994 9.40101 1.72898 9.67538L7.79565 15.8623C8.41167 16.4905 8.71969 16.8047 9.07486 16.9224C9.38729 17.0259 9.72383 17.0259 10.0362 16.9224C10.3914 16.8047 10.6994 16.4905 11.3155 15.8623L13.2401 13.8995C13.8561 13.2713 14.1641 12.9572 14.2795 12.595C14.381 12.2763 14.381 11.9331 14.2795 11.6145C14.1641 11.2523 13.8561 10.9382 13.2401 10.3099L7.56231 4.51961C7.29328 4.24524 7.15876 4.10806 7.00178 4.00995C6.8626 3.92297 6.71086 3.85888 6.55214 3.82002C6.37311 3.77618 6.18288 3.77618 5.8024 3.77618H3.48889C2.6177 3.77618 2.1821 3.77618 1.84935 3.94909C1.55665 4.10118 1.31868 4.34387 1.16955 4.64237C1 4.98172 1 5.42595 1 6.31441Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-show="category.linksCategoryName === 'Боты' || category.linksCategoryName === 'Каналы'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.91282 9.08718L14.5563 1.44372M7.00569 9.326L8.91882 14.2455C9.08736 14.6789 9.17163 14.8956 9.29305 14.9588C9.39831 15.0137 9.5237 15.0137 9.62903 14.959C9.75052 14.8959 9.83505 14.6793 10.0041 14.2461L14.8015 1.9527C14.9541 1.56166 15.0304 1.36614 14.9887 1.2412C14.9524 1.1327 14.8673 1.04756 14.7588 1.01131C14.6339 0.969573 14.4383 1.04587 14.0473 1.19847L1.75388 5.99591C1.3207 6.16495 1.10411 6.24948 1.04099 6.37098C0.986268 6.4763 0.986342 6.60169 1.04118 6.70695C1.10445 6.82837 1.32114 6.91264 1.75452 7.08118L6.674 8.99431C6.76197 9.02852 6.80596 9.04563 6.843 9.07205C6.87583 9.09546 6.90454 9.12417 6.92795 9.157C6.95437 9.19404 6.97148 9.23803 7.00569 9.326Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </div>

          {{ category.linksCategoryName }}
        </div>

        <div class="popup_links_categories_category_links">
          <div
              v-for="link of category.links"
              class="popup_links_categories_category_links_link">

            <project-external-link
                :link="link"
            />

          </div>
        </div>

      </div>

    </div>


    <div class="popup_close" @click="closeModal()">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>

  <div class="backdrop"
       @click="closeModal()"
       :class="{show: modal.show}"></div>
</template>

<script>
import ButtonPrimary from "../Buttons/ButtonPrimary.vue";
import ButtonSecondaryGray from "../Buttons/ButtonSecondaryGray.vue";
import projectExternalLink from "../../Helpers/ProjectExternalLink.vue";

export default {
  name: "Popup.vue",
  props: {
    modal: {
      show: true
    },
    data: {}
  },

  data() {
    return {
      links: [{
        linksCategory: 'Зеркало',
        linksCategoryName: 'Клирнет',
        links: []
      },{
        linksCategory: 'Onion',
        linksCategoryName: 'Даркнет',
        links: []
      },{
        linksCategory: 'Блокчейн',
        linksCategoryName: 'Блокчейн',
        links: []
      },{
        linksCategory: 'Бот',
        linksCategoryName: 'Боты',
        links: []
      },{
        linksCategory: 'Канал',
        linksCategoryName: 'Каналы',
        links: []
      },{
        linksCategory: 'Другое',
        linksCategoryName: 'Другое',
        links: []
      }]
    }
  },
  components: {
    ButtonPrimary,
    ButtonSecondaryGray,
    projectExternalLink
  },
  mounted() {



    this.$nextTick(() => {

      this.linksSpread(this.$props.data)
    });

  },
  watch: {
    data: function(newVal, oldVal) {
      newVal !== oldVal ? this.linksSpread(this.$props.data) : null
    }
  },
  updated() {
    if (this.$props.modal.show === true) {
      document.body.style.overflow = 'hidden hidden'
      window.addEventListener('keydown', (e) => {
        e.key === 'Escape' ? this.closeModal() : null
      })

    } else {
      document.body.style.overflow = 'hidden scroll'
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', true)

      document.body.style.overflow = 'hidden scroll'
    },

    linksSpread (links) {

      try {
        for (let link of links) {
          if (this.links.find(item => item.linksCategory === link.name)) {

            this.links.find(item => item.linksCategory === link.name).links.push(link)

          } else {
            this.links.find(item => item.linksCategory === 'Другое').links.push(link)
          }

        }
      } catch (e) {

      }


    }
  }
}
</script>

<style scoped lang="scss">

.popup {
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  background: #FFF;
  padding: 15px;
  position: fixed;
  z-index: 51;
  width: 300px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  scale: 0;
  transition: .15s ease;

  visibility: hidden;
  opacity: 0;

  &.show {
    scale: 1;
    visibility: visible;
    opacity: 1;
  }

  .popup_icon {
    margin-bottom: 20px;
  }

  .popup_header {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
  }
  .popup_links_categories {
    .popup_links_categories_category {


      .popup_links_categories_category_name {
        color: #000;
        font-family: "PT Sans Caption";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        gap: 5px;
        align-items: center;
        margin-bottom: 6px;

        .popup_links_categories_category_icon {
          svg {
            width: 14px;

            path {
              stroke-width: 1px;
            }
          }
        }
      }

      .popup_links_categories_category_links {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        margin-bottom: 14px;
        .popup_links_categories_category_links_link {

        }
      }
    }

  }
  .popup_buttons {
    display: flex;
    width: 100%;
    gap: 10px;
  }
  .popup_close {
    position: absolute;
    right: 14px;
    top: 14px;
    cursor: pointer;
  }
}
.backdrop {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  height: 100%;
  width: 100%;
  z-index: 50;

  background: rgba(217, 217, 217, 0.60);
  backdrop-filter: blur(3px);

  visibility: hidden;
  opacity: 0;


  &.show {
    visibility: visible;
    opacity: 1;
  }
}
@media screen and (max-width: 768px){
  .popup {
    width: 90%;
    flex-wrap: wrap;
    max-height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 10px;
    .popup_body {
      width: 100%;
      .popup_image {
        width: 140px;
      }
      .popup_header {
        font-size: 14px;
      }
      .popup_text {
        font-size: 12px;
      }
    }
  }
}
</style>
