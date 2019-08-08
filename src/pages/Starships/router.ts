import PageNester from '@/components/PageNester.vue'
import StarshipsDeployments from './StarshipsDeployments.vue'
import StarshipsDeploymentDetails from './StarshipsDeploymentDetails.vue'
import StarshipsPage from './StarshipsPage.vue'
import StarshipsEquipment from './StarshipsEquipment.vue'
import StarshipsModifications from './StarshipsModifications.vue'
import StarshipsWeapons from './StarshipsWeapons.vue'
import StarshipsVentures from './StarshipsVentures.vue'

export default {
  path: '/starships',
  component: PageNester,
  children: [
    {
      path: '/starships',
      component: StarshipsPage
    },
    {
      path: '/starships/deployments',
      component: StarshipsDeployments
    },
    {
      path: '/starships/deployments/:deploymentName',
      component: StarshipsDeploymentDetails,
      props: true
    },
    {
      path: '/starships/equipment',
      component: StarshipsEquipment
    },
    {
      path: '/starships/modifications',
      component: StarshipsModifications
    },
    {
      path: '/starships/weapons',
      component: StarshipsWeapons
    },
    {
      path: '/starships/ventures',
      component: StarshipsVentures
    }
  ]
}
