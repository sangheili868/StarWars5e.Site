import StarshipPage from './StarshipPage.vue'
import StarshipNavigation from './StarshipNavigation.vue'
import StarshipChapter from './StarshipChapter.vue'
import StarshipDeployments from './StarshipDeployments.vue'
import StarshipDeploymentDetails from './StarshipDeploymentDetails.vue'

export default {
  path: '/starships',
  components: {
    default: StarshipPage,
    navigation: StarshipNavigation
  },
  children: [
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
