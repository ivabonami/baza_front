<template>
    <div class="link" >
        <a :href="item.href"
           target="_blank"
           v-if="item.type === 'external'">
            <span class="icon" :class="item.style">
                <inline-svg :src="item.icon" class="link-icon" :class="item.style" />
            </span>
                <span class="text" :class="item.style">
                {{ item.title }}
            </span>
        </a>

        <router-link :to="item.href"
                     :class="item.style"
                     v-else-if="item.type === 'internal'">
            <span class="icon">
                <inline-svg :src="item.icon" class="link-icon" :class="item.style" />
            </span>
            <span class="text" :class="item.style">
                {{ item.title }}
            </span>
        </router-link>

    </div>
</template>
<script setup>
import {ref} from "vue";

const props = defineProps({
    item: ref(Object)
})
</script>
<style lang="scss" scoped>

</style>