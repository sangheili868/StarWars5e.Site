import PageNester from '@/components/PageNester.vue'
import HivesNavigation from './HivesNavigation.vue'
import HivesChapter from './HivesChapter.vue'

export default {
  path: 'hives',
  components: {
    default: PageNester,
    navigation: HivesNavigation
  },
  children: [
    {
      path: ':chapter',
      component: HivesChapter,
      props: true
    },
    {
      path: '',
      component: HivesChapter
    }
  ]
}
