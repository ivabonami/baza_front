<template>
    <div class="header-top-links wrapper">
        <div class="links">
            <default-header-links-item
                    v-for="link of headerLinks.left"
                    :key="link.title"
                    :item="link"
            />

        </div>
        <div class="links">
            <default-header-links-item
                    v-for="link of headerLinks.right"
                    :key="link.title"
                    :item="link"
            />
        </div>
    </div>
</template>
<script setup>
import {headerLinks} from "@/core/template/header/stores/headerLinks.js";
import DefaultHeaderLinksItem from "@/core/template/header/DefaultHeaderLinksItem.vue";


</script>
