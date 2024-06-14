((root, undefined) => {
    const jQuery = function () {
        return new jQuery.fn.init()
    }

    jQuery.fn = jQuery.prototype = {
        init: function () {
            this.name = 'quanquan'
            return this
        },
        css() {
            console.log(`当前时间 ${Date.now()}: 代码走到了这里 我是 Css method`)
        }
    }

    jQuery.fn.init.prototype = jQuery.fn

    /**
     * 1. 定义一些变量 var
     * 2. 查看是否是深拷贝 if
     * 3. 参数校验 if => target 参数必须是可拓展类型: 对象 or 函数
     * 4. 查看是否是拓展 jQ 插件 if
     * 5. 处理多个参数(对象) for
     * 6. 处理循环引用 if
     * 7. 深拷贝 if
     * 8. 浅拷贝 else if
     */
    jQuery.extend = jQuery.fn.extend = function () {
        let i = 1
        let target = arguments[0]
        let length = arguments.length
        let name
        let options
        let src
        let copy
        let clone
        let copyIsArray
        let deep = false

        if (typeof target === 'boolean') {
            i = 2
            deep = target
            target = arguments[1]
        }

        if (typeof target !== 'object' && typeof target !== 'function') {
            target = {}
        }

        if (i === length) {
            target = this
            i--
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name]
                    copy = options[name]

                    if (target === copy) {
                        continue
                    }

                    if (deep && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false
                            clone = src && Array.isArray(src) ? src : []
                        } else {
                            clone = src && typeof jQuery.isPlainObject(src) ? src : {}
                        }

                        target[name] = jQuery.extend(deep, clone, copy)
                    } else if (copy !== undefined) {
                        target[name] = copy
                    }
                }
            }
        }

        return target
    }


    jQuery.extend({
        isPlainObject(obj) {
            return obj && Object.prototype.toString.call(obj) === '[object Object]'
        }
    })

    root.$ = root.jQuery = jQuery
})(window)
