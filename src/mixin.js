import { ref, computed } from 'vue'
function isNumber(params) {
    var regex = /^[0-9]+./

    if (params.match) {
        if (!params.match(regex)) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
const pas = ref(6)
const productsLength = computed((params) => {
    return params.value.length
})
const numberRecords = computed(() => {
    return Math.ceil(productsLength.value / pas.value)
})
const start = ref(1)
const tab = computed((params) => {
    var indexStart = (start.value - 1) * pas.value

    var tableau = []

    for (var i = indexStart; i < indexStart + pas.value; i++) {
        if (typeof params[i] !== 'undefined') {
            tableau.push(params[i])
        }
    }

    return tableau
})

export { isNumber, tab, start, productsLength }
