
import PageNester from '@/components/PageNester.vue'
import handbookRoutes from './Handbook/router'
import starshipRoutes from './Starships/router'
import monsterRoutes from './Monsters/router'
import hivesRoutes from './Hives/router'
import RulesPage from './RulesPage.vue'
import VariantRules from './VariantRules.vue'
import VariantRulesDetail from './VariantRulesDetail.vue'
import ExpandedContent from './ExpandedContent.vue'
import ExpandedContentDetail from './ExpandedContentDetail.vue'

export default {
  path: '/rules',
  components: {
    default: PageNester,
    navigation: PageNester
  },
  props: {
    default: false,
    navigation: {
      name: 'navigation'
    }
  },
  children: [
    {
      path: '',
      component: RulesPage
    },
    {
      path: '/rules/variantRules',
      component: VariantRules,
      meta: {
        title: 'Variant Rules'
      }
    },
    {
      path: '/rules/variantRules/:variantRuleName',
      component: VariantRulesDetail,
      props: true,
      meta: {
        title: 'Variant Rules'
      }
    },
    {
      path: '/rules/expandedContent',
      component: ExpandedContent,
      meta: {
        title: 'Expanded Content'
      }
    },
    {
      path: '/rules/expandedContent/:expandedContentName',
      component: ExpandedContentDetail,
      props: true,
      meta: {
        title: 'Expanded Content'
      }
    },
    handbookRoutes,
    starshipRoutes,
    monsterRoutes,
    hivesRoutes
  ]
}
