<template>
  <div class="popup"
       v-if="modal.show === true"
       :class="{show: modal.show}">

    <div class="popup_header">
      Ссылки на проект
    </div>

    <div class="popup_links_categories">

      <div v-for="links of spreadLinks"
           class="popup_links_categories_category">

        <div class="popup_links_categories_category_name" v-if="links.links.length > 0">

          <div class="popup_links_categories_category_icon">
          <svg v-show="links.name === 'Клирнет'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 8H15M1 8C1 11.866 4.13401 15 8 15M1 8C1 4.13401 4.13401 1 8 1M15 8C15 11.866 11.866 15 8 15M15 8C15 4.13401 11.866 1 8 1M8 1C9.7509 2.91685 10.7459 5.40442 10.8 8C10.7459 10.5956 9.7509 13.0832 8 15M8 1C6.2491 2.91685 5.25407 5.40442 5.2 8C5.25407 10.5956 6.2491 13.0832 8 15" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-show="links.name === 'Onion'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1C10.1 2.4 10.7459 5.40442 10.8 8C10.7459 10.5956 10.1 13.6 8 15M8 1C5.9 2.4 5.25407 5.40442 5.2 8C5.25407 10.5956 5.9 13.6 8 15M8 1C4.13401 1 1 4.13401 1 8M8 1C11.866 1 15 4.13401 15 8M8 15C11.866 15 15 11.866 15 8M8 15C4.13401 15 1 11.866 1 8M15 8C13.6 10.1 10.5956 10.7459 8 10.8C5.40442 10.7459 2.4 10.1 1 8M15 8C13.6 5.9 10.5956 5.25407 8 5.2C5.40442 5.25407 2.4 5.9 1 8" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-show="links.name === 'Блокчейн'" xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
            <path d="M1 7.75011L7 9.25L13 7.75M1 7.75011L7 1M1 7.75011L7 6.25006M13 7.75L7 1M13 7.75L7 6.25006M7 1V6.25006M2.125 10.75L7.00009 16L11.875 10.75L7 11.875L2.125 10.75Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

            <svg v-show="links.name === 'Контакты'" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.0497 5C15.0264 5.19057 15.924 5.66826 16.6277 6.37194C17.3314 7.07561 17.8091 7.97326 17.9997 8.95M14.0497 1C16.0789 1.22544 17.9713 2.13417 19.4159 3.57701C20.8606 5.01984 21.7717 6.91101 21.9997 8.94M10.2266 12.8631C9.02506 11.6615 8.07627 10.3028 7.38028 8.85323C7.32041 8.72854 7.29048 8.66619 7.26748 8.5873C7.18576 8.30695 7.24446 7.96269 7.41447 7.72526C7.46231 7.65845 7.51947 7.60129 7.63378 7.48698C7.98338 7.13737 8.15819 6.96257 8.27247 6.78679C8.70347 6.1239 8.70347 5.26932 8.27247 4.60643C8.15819 4.43065 7.98338 4.25585 7.63378 3.90624L7.43891 3.71137C6.90747 3.17993 6.64174 2.91421 6.35636 2.76987C5.7888 2.4828 5.11854 2.4828 4.55098 2.76987C4.2656 2.91421 3.99987 3.17993 3.46843 3.71137L3.3108 3.86901C2.78117 4.39863 2.51636 4.66344 2.31411 5.02348C2.08969 5.42298 1.92833 6.04347 1.9297 6.5017C1.93092 6.91464 2.01103 7.19687 2.17124 7.76131C3.03221 10.7947 4.65668 13.6571 7.04466 16.045C9.43264 18.433 12.295 20.0575 15.3284 20.9185C15.8928 21.0787 16.1751 21.1588 16.588 21.16C17.0462 21.1614 17.6667 21 18.0662 20.7756C18.4263 20.5733 18.6911 20.3085 19.2207 19.7789L19.3783 19.6213C19.9098 19.0898 20.1755 18.8241 20.3198 18.5387C20.6069 17.9712 20.6069 17.3009 20.3198 16.7333C20.1755 16.448 19.9098 16.1822 19.3783 15.6508L19.1835 15.4559C18.8339 15.1063 18.6591 14.9315 18.4833 14.8172C17.8204 14.3862 16.9658 14.3862 16.3029 14.8172C16.1271 14.9315 15.9523 15.1063 15.6027 15.4559C15.4884 15.5702 15.4313 15.6274 15.3644 15.6752C15.127 15.8453 14.7828 15.904 14.5024 15.8222C14.4235 15.7992 14.3612 15.7693 14.2365 15.7094C12.7869 15.0134 11.4282 14.0646 10.2266 12.8631Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <svg v-show="links.name === 'Другое'" xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M15 8.13876L9.09347 2.11514C8.68991 1.70359 8.48814 1.49781 8.25266 1.35066C8.0439 1.22019 7.81629 1.12404 7.57821 1.06575C7.30967 1 7.02431 1 6.4536 1L3.33333 1M1 6.31441L1 7.88059C1 8.2686 1 8.46261 1.04298 8.64518C1.08109 8.80705 1.14394 8.9618 1.22923 9.10374C1.32542 9.26383 1.45994 9.40101 1.72898 9.67538L7.79565 15.8623C8.41167 16.4905 8.71969 16.8047 9.07486 16.9224C9.38729 17.0259 9.72383 17.0259 10.0362 16.9224C10.3914 16.8047 10.6994 16.4905 11.3155 15.8623L13.2401 13.8995C13.8561 13.2713 14.1641 12.9572 14.2795 12.595C14.381 12.2763 14.381 11.9331 14.2795 11.6145C14.1641 11.2523 13.8561 10.9382 13.2401 10.3099L7.56231 4.51961C7.29328 4.24524 7.15876 4.10806 7.00178 4.00995C6.8626 3.92297 6.71086 3.85888 6.55214 3.82002C6.37311 3.77618 6.18288 3.77618 5.8024 3.77618H3.48889C2.6177 3.77618 2.1821 3.77618 1.84935 3.94909C1.55665 4.10118 1.31868 4.34387 1.16955 4.64237C1 4.98172 1 5.42595 1 6.31441Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-show="links.name === 'Телеграм'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.91282 9.08718L14.5563 1.44372M7.00569 9.326L8.91882 14.2455C9.08736 14.6789 9.17163 14.8956 9.29305 14.9588C9.39831 15.0137 9.5237 15.0137 9.62903 14.959C9.75052 14.8959 9.83505 14.6793 10.0041 14.2461L14.8015 1.9527C14.9541 1.56166 15.0304 1.36614 14.9887 1.2412C14.9524 1.1327 14.8673 1.04756 14.7588 1.01131C14.6339 0.969573 14.4383 1.04587 14.0473 1.19847L1.75388 5.99591C1.3207 6.16495 1.10411 6.24948 1.04099 6.37098C0.986268 6.4763 0.986342 6.60169 1.04118 6.70695C1.10445 6.82837 1.32114 6.91264 1.75452 7.08118L6.674 8.99431C6.76197 9.02852 6.80596 9.04563 6.843 9.07205C6.87583 9.09546 6.90454 9.12417 6.92795 9.157C6.95437 9.19404 6.97148 9.23803 7.00569 9.326Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </div>

          {{ links.name }}
        </div>

        <div class="popup_links_categories_category_links">
          <div
              v-for="link of links.links"
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
  emits: ['closeModal'],
  props: {
    modal: {
      show: true
    },
    data: {}
  },

  data() {
    return {
      spreadLinks: {
        clearnet: {
          name: 'Клирнет',
          links: []
        },
        contacts: {
          name: 'Контакты',
          links: []
        },
        telegram: {
          name: 'Телеграм',
          links: []
        },
        onion: {
          name: 'Onion',
          links: []
        },
        blockchain: {
          name: 'Блокчейн',
          links: []
        },
        other: {
          name: 'Другое',
          links: []
        }
      }
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

      let yellowLinks = [], greenLinks = [];

      for (let link of links) {
        if (link.name === 'Зеркало') {
          yellowLinks.push(link)
        } else if (link.name === 'Зеркало VPN') {
          greenLinks.push(link)
        } else if (link.name === 'Контакты') {
          this.spreadLinks.contacts.links.push(link)
        } else if (link.name === 'Канал' || link.name === 'Бот') {
          this.spreadLinks.telegram.links.push(link)
        } else if (link.name === 'Onion') {
          this.spreadLinks.onion.links.push(link)
        } else if (link.name === 'Блокчейн') {
          this.spreadLinks.blockchain.links.push(link)
        } else {
          this.spreadLinks.other.links.push(link)
        }
      }

      for (let link of yellowLinks) {
        this.spreadLinks.clearnet.links.push(link)
      }

      for (let link of greenLinks) {
        this.spreadLinks.clearnet.links.push(link)
      }

      console.log(this.spreadLinks)




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
          position: relative;
          top: 2px;
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
    width: 70%;
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
