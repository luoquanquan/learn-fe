const isWebpSupport = (() => {
    let support = false;
    try {
        if (/data:image\/webp/gi.test(document.createElement('canvas').toDataURL('image/webp'))) {
            support = true;
        } else {
            support = false;
        }
    } catch (err) {
        support = false;
    }

    return support
})();

/*
检测当前环境是否支持 webp

webp 可以保障体验的前提下大幅节省流量, 但是兼容性堪忧(尤其是 Apple). 通过以上方法可以判断当前的环境是否兼容 webp 图片以优化
*/
