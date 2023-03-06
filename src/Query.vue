<template>
  <div>
    <h2>Stock Data</h2>
    <span>Stock Name: {{ stocks.name }} - Price: {{ stocks.price }}</span>
  </div>
  <button @click="pause">pause</button>
  <button @click="resume">resume</button>
  <div v-if="fetching">
    Loading...
  </div>

  <div v-else-if="error">
    Oh no... {{ error }}
  </div>

  <div v-else>
    <ul v-if="data">
      <li v-for="book of data.app.books">{{ book.title }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
import {useQuery, gql, useSubscription} from '@urql/vue'
import { GetBooksDocument } from './generated/graphql';
import {useLocalStorage} from "@vueuse/core";
import {useStocks} from "./composables/UseStocks";

gql`
  query GetBooks {
    app {
      books {
        title
      }
    }
  }
`


const newMessages = `
  subscription Stocks {
    stocks {
      name
      price
    }
  }
`;

export default defineComponent({
  setup() {
    const result = useQuery({
      query: GetBooksDocument
    });
    const stock = ref({})
    // const stocks = useLocalStorage('stocks', {});
    const { pause, resume, stocks } = useStocks();
    // const subscription = useSubscription({ query: newMessages, pause: true, }, (response, data) => {
    //   console.log(data);
    //   if (typeof data === 'object') {
    //     stock.value = data.stocks;
    //   }
    //   return data;
    // });
    //
    // const logResult = () => {
    //   console.log(subscription)
    // }

    return {
      fetching: result.fetching,
      data: result.data,
      error: result.error,
      stocks,
      pause,
      resume
    };
  }
})
</script>