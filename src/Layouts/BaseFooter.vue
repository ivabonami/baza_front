<template>

  <div class="wrapper">

  </div>

</template>

<script>
export default {
  name: "FooterView.vue"
}
</script>

<style scoped lang="scss">
.wrapper {
  border: 1px solid #eaeaea;
  margin-top: 20px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 30px;
  box-sizing: border-box;
  padding: 20px;
  .logo {
    display: flex;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .slogan {
      color: var(--secondary, #2B2B2B);
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      svg {
        position: relative;
        width: 80px;
        height: auto;
        margin-right: 10px;
      }
    }

    .links {
      display: flex;
      justify-content: end;

      a {
        color: var(--secondary, #2B2B2B);
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-left: 10px;
      }
    }
  }

  .friends {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;

    .friend {
      transition: .3s ease;
      opacity: .5;
      cursor: pointer;
      svg {
        width: 100%;
        path {
          fill: #6B6B6B;
        }
      }
      &:hover {
        opacity: 1;
      }

    }
  }
}


@media screen and (max-width: 900px)  {
  .wrapper {
    .top {
      flex-wrap: wrap;
      justify-content: center;
      .links {
        flex-wrap: wrap;
        a {
          display: block;
          width: 100%;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }

    .friends {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>