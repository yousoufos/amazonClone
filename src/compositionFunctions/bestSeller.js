import { computed } from 'vue'
import { useStore } from 'vuex'

export default function () {
  const store = useStore()
  const orders = computed(() => {
    return store.state.order.orders
  })
  const findElem = (array, elem) => {
    return array.find((params) => {
      return params.productId === elem.productId
    })
  }
  const bestSeller = computed(() => {
    const result = []
    // c'est ici que ca se passe si on veut limiter la recherche à deux dates
    const items = orders.value.map((order) => {
      return order.items
    })

    items.forEach((element) => {
      element.forEach((params) => {
        if (typeof findElem(result, params) !== 'undefined') {
          findElem(result, params).qte += params.qte
          findElem(result, params).total += params.price * params.qte
        } else {
          result.push({ ...params, total: params.price })
        }
      })
    })
    result
      .sort((a, b) => {
        return b.total - a.total
      })
      .map((items) => items.total)
    return result
  })

  return { bestSeller }
}
