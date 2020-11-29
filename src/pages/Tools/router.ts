import PageNester from '@/components/PageNester.vue'
import ToolsPage from './ToolsPage.vue'
import MyCharacters from './MyCharacters/MyCharacters.vue'
import Characters from './MyCharacters/Character.vue'
import CharacterPrint from './MyCharacters/CharacterPrint/CharacterPrint.vue'
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
      path: '/tools/mycharacters',
      component: MyCharacters,
      props: ({ query }: Route) => query,
      meta: {
        title: 'Character Creator'
      }
    },
    {
      path: '/tools/mycharacters/:characterId',
      component: Characters,
      props: true,
      meta: {
        title: 'Character Creator'
      }
    },
    {
      path: '/tools/mycharacters/print',
      component: CharacterPrint
    }
  ]
}
