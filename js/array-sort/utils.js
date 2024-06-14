const randomNum = (min = 0, max = min) => {
    if (max === min) {
        return parseInt(Math.random() * (min + 1))
    } else {
        return parseInt(Math.random() * (max - min + 1) + min)
    }
}

exports.createRandomArr = (len, min, max) => {
    const ret = new Array(len)

    for (let i = 0; i < len; i++) {
        ret[i] = randomNum(min, max)
    }

    return ret
}

exports.swap = (array, initPos, targetPos) => {
    const temp = array[targetPos]
    array[targetPos] = array[initPos]
    array[initPos] = temp
}

