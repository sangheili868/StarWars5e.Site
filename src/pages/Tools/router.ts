import PageNester from '@/components/PageNester.vue'
import ToolsPage from './ToolsPage.vue'
import Characters from './Characters.vue'
import CharacterPrint from './CharacterSheet/CharacterPrint/CharacterPrint.vue'
import { Route } from 'vue-router'

export default {
  path: '/tools',
  component: PageNester,
  children: [
    {
      path: '/tools',
      component: ToolsPage,
      meta: {
        title: 'Tools'
      }
    },
    {
      path: '/tools/characters',
      component: Characters,
      props: ({ query }: Route) => query,
      meta: {
        title: 'Character Creator'
      }
    },
    {
      path: '/tools/characters/print',
      component: CharacterPrint
    }
  ]
}
