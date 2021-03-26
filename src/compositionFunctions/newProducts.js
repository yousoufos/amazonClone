import { computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
export default function () {
  const store = useStore()
  const products = computed(() => {
    return store.state.product.tab
  })

  const newProducts = computed(() => {
    return products.value.sort((a, b) => {
      if (moment(a) > moment(b)) {
        return 1
      } else {
        return -1
      }
    })
  })

  return { newProducts }
}
