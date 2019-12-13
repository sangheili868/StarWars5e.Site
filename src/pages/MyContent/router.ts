import PageNester from '@/components/PageNester.vue'
import MyContentPage from './MyContentPage.vue'
import CharacterBuilder from './CharacterBuilder/CharacterBuilder.vue'
import CharacterEditor from './CharacterEditor.vue'
import CharacterSheet from './CharacterSheet/CharacterSheet.vue'
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
      path: '/myContent/CharacterBuilder',
      component: CharacterBuilder,
      props: ({ query }: Route) => query,
      meta: {
        title: 'Character Builder'
      }
    },
    {
      path: '/myContent/CharacterEditor',
      component: CharacterEditor,
      meta: {
        title: 'Character Editor'
      }
    },
    {
      path: '/myContent/CharacterSheet',
      component: CharacterSheet,
      meta: {
        title: 'Character Sheet'
      }
    }
  ]
}
