<template>
  <div></div>
  <Query />
  <Mutation />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {createClient, provideClient, defaultExchanges, subscriptionExchange, useSubscription} from '@urql/vue';
import Query from './Query.vue'
import Mutation from './Mutation.vue'
import { createClient as createWSClient } from 'graphql-sse';

const sseClient = createWSClient({
  url: 'http://localhost:8081/subscriptions',
});


const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return {
          subscribe: (sink) => {
            const dispose = sseClient.subscribe(operation, sink);
            return {
              unsubscribe: dispose,
            };
          },
        };
      },
    }),
  ],
});

export default defineComponent({
  components: { Query, Mutation },
  setup() {
    provideClient(client);
  }
})
</script>
