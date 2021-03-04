import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default function () {
  const store = useStore()
  const orders = computed(() => {
    return store.state.order.orders
  })

  const percentage = computed(() => {
    const tab = []
    const count = orders.value.length
    let countPending = 0
    orders.value.forEach((element) => {
      if (element.deliveryStatus === 'Pending') {
        countPending++
      }
    })
    tab.push(
      ((countPending / count) * 100).toFixed(2),
      (100 - (countPending / count) * 100).toFixed(2)
    )

    return tab
  })

  const labels = ref(['Pending', 'Delivered'])

  return { labels, percentage }
}
