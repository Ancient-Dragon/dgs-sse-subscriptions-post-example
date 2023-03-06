import {useSubscription} from "@urql/vue";
import {useLocalStorage} from "@vueuse/core";
import {watch} from "vue";
import {UseSubscriptionResponse} from "@urql/vue/dist/types/useSubscription";
const newMessages = `
  subscription Stocks {
    stocks {
      name
      price
    }
  }
`;

let subscription: UseSubscriptionResponse<any, any>;
const useStocks = () => {
    const stocks = useLocalStorage('stocks', {});
    if (subscription === undefined) {
        subscription = useSubscription({ query: newMessages, pause: true, }, (response, data) => {
            console.log(data);
            if (typeof data === 'object') {
                stocks.value = data.stocks;
            }
            return data;
        });
    }

    watch(subscription.isPaused, () => {
        console.info('Debugging Subscription: is paused changed', subscription.isPaused);
    });

    const pause = () => {
        console.info('Debugging Subscription: pause', subscription.isPaused);
        subscription.pause();
    }
    const resume = () => {
        console.info('Debugging Subscription: resume');
        subscription.resume();
    }



    return {
        resume,
        pause,
        stocks,
        isPaused: subscription.isPaused
    }

}

export {useStocks};