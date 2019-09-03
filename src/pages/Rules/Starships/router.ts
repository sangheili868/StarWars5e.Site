import PageNester from '@/components/PageNester.vue'
import StarshipNavigation from './StarshipNavigation.vue'
import StarshipChapter from './StarshipChapter.vue'
import StarshipDeployments from './StarshipDeployments.vue'
import StarshipDeploymentDetails from './StarshipDeploymentDetails.vue'
import StarshipSizes from './StarshipSizes.vue'
import StarshipSizeDetails from './StarshipSizeDetails.vue'
import StarshipModifications from './StarshipModifications.vue'
import StarshipCustomization from './StarshipCustomization.vue'

export default {
  path: 'starships',
  components: {
    default: PageNester,
    navigation: StarshipNavigation
  },
  children: [
    {
      path: 'starshipSizes/:sizeName',
      component: StarshipSizeDetails,
      props: true
    },
    {
      path: 'starshipSizes',
      component: StarshipSizes,
      meta: {
        title: 'Starship Sizes'
      }
    },
    {
      path: 'deployments/:deploymentName',
      component: StarshipDeploymentDetails,
      props: true,
      meta: {
        title: 'Starship Deployments'
      }
    },
    {
      path: 'deployments',
      component: StarshipDeployments,
      meta: {
        title: 'Starship Deployments'
      }
    },
    {
      path: 'modifications',
      component: StarshipModifications,
      meta: {
        title: 'Starship Modifications'
      }
    },
    {
      path: 'customization',
      component: StarshipCustomization,
      meta: {
        title: 'Starship Customization'
      }
    },
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
      },
      meta: {
        title: 'Starship Introduction'
      }
    }
  ]
}
