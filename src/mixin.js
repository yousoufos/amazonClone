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

export { isNumber }
