import { computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default function () {
  const store = useStore()
  const orders = computed(() => {
    return store.state.order.orders
  })

  const findElem = (array, elem) => {
    return array.find((params) => {
      return params.date === elem.date
    })
  }
  const groupByDate = computed(() => {
    const result = []
    orders.value.forEach((element) => {
      if (typeof findElem(result, element) !== 'undefined') {
        findElem(result, element).total + element.total
      } else {
        result.push(element)
      }
    })

    return result
  })
  const labels = computed(() => {
    return groupByDate.value
      .sort((a, b) => {
        if (moment(a.date) > moment(b.date)) {
          return 1
        } else {
          return -1
        }
      })
      .map((order) => {
        return order.date
      })
  })

  return { labels, groupByDate }
}
