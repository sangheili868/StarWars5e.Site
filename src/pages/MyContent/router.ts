import PageNester from '@/components/PageNester.vue'
import MyContentPage from './MyContentPage.vue'
import Characters from './Characters.vue'
import CharacterPrint from './CharacterSheet/CharacterPrint/CharacterPrint.vue'
import { Route } from 'vue-router'

export default {
  path: '/myContent',
  component: PageNester,
  children: [
    {
      path: '/myContent',
      component: MyContentPage,
      meta: {
        title: 'MyContent'
      }
    },
    {
      path: '/myContent/characters',
      component: Characters,
      props: ({ query }: Route) => query,
      meta: {
        title: 'Characters'
      }
    },
    {
      path: '/myContent/characters/print',
      component: CharacterPrint
    }
  ]
}
