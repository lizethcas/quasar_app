import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      counter: 1
    }
  },
  getters: {
    times2: (state) => state.counter * 2
  },
  actions: {
    increment (val = 1) {
      this.counter += val
    }
  }
})
