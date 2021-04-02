import { computed } from 'vue'
import { useStore } from 'vuex'
export default function () {
  const store = useStore()
  const products = computed(() => {
    return store.state.product.tab
  })

  const labels = computed(() => {
    return products.value
      .sort((a, b) => {
        return b.stock - a.stock
      })
      .map((product) => product.title.slice(0, 20) + '...')
  })

  return { labels, products }
}
