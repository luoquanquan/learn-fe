import Vue from 'vue'
import Skeleton from './skeleton.vue'
import SkeletonAbout from './skeleton-about.vue'

export default new Vue({
    components: {
        Skeleton,
        SkeletonAbout
    },
    template: `<div>
        <Skeleton id="Skeleton" style="display: none;"></Skeleton>
        <SkeletonAbout id="SkeletonAbout" style="display: none;"></SkeletonAbout>
    </div>`
})