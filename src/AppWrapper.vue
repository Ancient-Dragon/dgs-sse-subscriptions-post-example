<template>
  <div>
    App Wrapper - Subscriptions active: {{ !isPaused }}
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {useStocks} from "./composables/UseStocks";
const {resume, isPaused} = useStocks();

onMounted(() => {
  resume();
})
</script>

<style scoped>

</style>