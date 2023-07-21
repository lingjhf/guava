import { createStore } from 'solid-js/store'
const [store, setStore] = createStore({ visible: false, drawer: false })

export {
  store, setStore
}