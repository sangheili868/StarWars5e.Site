import PageNester from '@/components/PageNester.vue'
import CitiesNavigation from './CitiesNavigation.vue'
import CitiesChapter from './CitiesChapter.vue'

export default {
  path: 'cities',
  components: {
    default: PageNester,
    navigation: CitiesNavigation
  },
  children: [
    {
      path: ':chapter',
      component: CitiesChapter,
      props: true
    },
    {
      path: '',
      component: CitiesChapter
    }
  ]
}
