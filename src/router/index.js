import Vue from 'vue'
import Router from 'vue-router'
import viewport from '@/components/viewport.vue'
import Text from '@/components/text.vue'
import ReferenceLineText from '@/components/test/referenceLineText.vue'
import StackScrollMouseWheel from '@/components/test/StackScrollMouseWheel.vue'
import Layout from '@/components/layout/layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // path: '/',
      path: '/viewport',
      name: 'viewport',
      component: viewport
    },
    {
      path: '/Text',
      // path: '/',
      name: 'Text',
      component: Text
    },
    {
      // path: '/',
      path: '/Layout',
      name: 'Layout',
      component: Layout
    },
    {
      // path: '/',
      path: '/ReferenceLineText',
      name: 'ReferenceLineText',
      component: ReferenceLineText
    },
    {
      path: '/',
      // path: '/StackScrollMouseWheel',
      name: 'StackScrollMouseWheel',
      component: StackScrollMouseWheel
    },
  ]
})
