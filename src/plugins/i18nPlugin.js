import { ref, provide, inject } from 'vue'

const createI18n = (config) => ({
    locale: ref(config.locale),
    messages: config.messages,
    $t(key) {
        const str = key.toString().split('')

        if (str[0] === '0') {
            if (str.length >= 5) {
                return '0.' + str[2] + str[3] + str[4] + ' TND'
            }
        }
        if (str[0] !== '0' && str.length > 0 && !str.includes('.')) {
            if (str.length <= 3) {
                var result = ''
                for (var i = 0; i < str.length; i++) {
                    result = result + str[i]
                }
                result = result + '.000 TND'

                return result
            } else {
                var result = ''
                for (var i = 0; i < str.length - 3; i++) {
                    result = result + str[i]
                }
                result = result + '.000 TND'

                return result
            }
        }
    },
})

const i18nSymbol = Symbol()

export function provideI18n(i18nConfig) {
    const i18n = createI18n(i18nConfig)
    provide(i18nSymbol, i18n)
}

export function useI18n() {
    const i18n = inject(i18nSymbol)
    if (!i18n) throw new Error('No i18n provided!!!')

    return i18n
}
