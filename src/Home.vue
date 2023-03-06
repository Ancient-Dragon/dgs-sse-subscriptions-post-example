<template>
  <div> Home - Subscriptions active: {{ !isPaused }}

  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useStocks} from "./composables/UseStocks";
const { isPaused } = useStocks()
const router = useRouter();

setTimeout(() => {
  console.info('Changing route')
  router.push('/query')
}, 3000)

</script>