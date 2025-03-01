<template>
  <div class="header wrapper">
    <div class="logo">
      <router-link to="/" >
        <img :src="logotype" alt="">
      </router-link>
    </div>
    <div class="search">
      <the-search />
    </div>
    <div class="menu">
      <menu-header />
    </div>

    <div class="auth">
      <header-auth />
    </div>

  </div>
</template>

<script setup>
import MenuHeader from "@/components/Layout/TemplateParts/HeaderParts/MenuHeader.vue";
import logotype from '@/assets/logo-black.svg'
import TheSearch from "@/components/Layout/TemplateParts/HeaderParts/TheSearch.vue";
import HeaderAuth from "@/components/Layout/TemplateParts/HeaderParts/HeaderAuth.vue";



</script>

<style scoped lang="scss">
.header {
  display: flex;
  border-radius: 10px;
  background: #FFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 98%;

  .logo {
    height: 100%;
    display: flex;
    align-items: center;

    a {
      height: 100%;

      position: relative;
      width: 100%;
      display: flex;

      img {
        height: 100%;
        max-height: 50px;
        width: auto;
      }
    }

  }
  .search {
    margin-right: auto;

  }
  .menu {

  }
  .auth {

  }
}

@media screen and (max-width: 500px){
  .header {
    flex-wrap: nowrap;
    width: 95%;
    .logo {
      width: 40%;
      a {
        img {
          width: 100%;
        }
      }
    }
    .search {
      width: 15%;
    }
  }
}

</style>