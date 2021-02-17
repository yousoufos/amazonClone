import { ref, provide, inject } from 'vue'

const createCurrency = (config) => ({
  locale: ref(config.locale),
  $t (key) {
    return Number(key).toLocaleString('us-US', {
      minimumFractionDigits: config.options.minimumFractionDigits,
      maximumFractionDigits: config.options.maximumFractionDigits,
      style: 'currency',
      currency: this.locale.value,
      currencyDisplay: 'symbol'
    })
  }
})

const currencySymbol = Symbol()

export function provideCurrency (currencyConfig) {
  const currency = createCurrency(currencyConfig)
  provide(currencySymbol, currency)
}

export function useCurrency () {
  const currency = inject(currencySymbol)
  if (!currency) throw new Error('No currency provided!!!')

  return currency
}
