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
      component: StarshipSizes
    },
    {
      path: 'deployments/:deploymentName',
      component: StarshipDeploymentDetails,
      props: true
    },
    {
      path: 'deployments',
      component: StarshipDeployments
    },
    {
      path: 'modifications',
      component: StarshipModifications
    },
    {
      path: 'customization',
      component: StarshipCustomization
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
      }
    }
  ]
}
