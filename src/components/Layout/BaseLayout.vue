<template>
  <main class="main wrapper">
    <section>
      <slot name="main" />
    </section>
    <footer>
      <slot name="footer" />
    </footer>
  </main>
</template>

<script setup>

</script>

<style scoped lang="scss">
main {
  width: 100%;
  max-width: 1280px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  min-height: calc(70vh);
}
header, footer, section {

}


footer {

}
</style>