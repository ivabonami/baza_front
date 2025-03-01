<template>
    <div class="search-box">
        <input type="search" placeholder="Поиск по базе...">
        <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M16 16L11.0001 11M12.6667 6.83333C12.6667 10.055 10.055 12.6667 6.83333 12.6667C3.61167 12.6667 1 10.055 1 6.83333C1 3.61167 3.61167 1 6.83333 1C10.055 1 12.6667 3.61167 12.6667 6.83333Z" stroke="#9299A2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.search-box {
  min-width: 270px;
  display: flex;
  position: relative;

  .icon {
    position: absolute;
    right: 8px;
    top: 50%;
    cursor: pointer;
    translate: 0 -50%;

    svg {
      path {
        stroke: #9299A2;
        transition: .3s ease;
      }
    }

    &:hover {
      svg {
        path {
          stroke: #333;
        }
      }
    }
  }
}
input {
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  background: var(--Light, #F6F7F8);
  padding: 10px;
  border: none;
  color: #333;
  font-family: "SF Pro Display";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9299A2;
  }
}
</style>