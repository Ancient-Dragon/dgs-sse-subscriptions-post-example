<template>
  <RouterView />
</template>

<script lang="ts" setup>
import {createClient, provideClient, defaultExchanges, subscriptionExchange, useSubscription} from '@urql/vue';
import { createClient as createWSClient } from 'graphql-sse';
import {useRouter} from "vue-router";
import { onMounted } from 'vue'
import {useStocks} from "./composables/UseStocks";
// Note - you must allow your browser to let you use self-signed certificates.
const sseClient = createWSClient({
  url: 'https://localhost:8081/subscriptions',
  onMessage: (message) => {
    console.log(message);
  }
});

const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return {
          subscribe: (sink) => {
            console.info('Debugging Subscription: Subscribe', operation);
            const dispose = sseClient.subscribe(operation, sink);
            const callingSubscribe = () => {
              console.info('Debugging Subscription: unsubscribe');
              dispose();
            };
            return {
              unsubscribe: callingSubscribe,
            };
          },
        };
      },
    }),
  ],
});
provideClient(client);
</script>
