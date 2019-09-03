import PageNester from '@/components/PageNester.vue'
import MonsterNavigation from './MonsterNavigation.vue'
import MonsterChapter from './MonsterChapter.vue'
import MonstersList from './MonstersList.vue'
import MonsterDetail from './MonsterDetail.vue'

export default {
  path: 'monsters',
  components: {
    default: PageNester,
    navigation: MonsterNavigation
  },
  children: [
    {
      path: 'monsters/:monsterName',
      component: MonsterDetail,
      props: true
    },
    {
      path: 'monsters',
      component: MonstersList,
      meta: {
        title: 'Monsters'
      }
    },
    {
      path: ':chapter',
      component: MonsterChapter,
      props: true
    },
    {
      path: '',
      component: MonstersList
    }
  ]
}
