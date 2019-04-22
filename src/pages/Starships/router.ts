import StarshipPage from './StarshipPage.vue'
import StarshipNavigation from './StarshipNavigation.vue'
import StarshipChapter from './StarshipChapter.vue'

export default {
  path: '/starships',
  components: {
    default: StarshipPage,
    navigation: StarshipNavigation
  },
  children: [
    {
      path: ':chapter',
      component: StarshipChapter,
      props: true
    },
    {
      path: '',
      component: StarshipChapter,
      props: {
        chapter: 'introduction'
      }
    }
  ]
}
