Function.prototype.customBind = function(context = {}, ...args) {
    const self = this

    return function F(...rest) {
        if (this instanceof F) {
            return new self(...args, ...rest)
        }
        return self.apply(context, [...args, ...rest])
    }
}