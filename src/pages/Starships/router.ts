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
      component: StarshipsPage,
      meta: {
        title: 'Starships'
      }
    },
    {
      path: '/starships/deployments',
      component: StarshipsDeployments,
      meta: {
        title: 'Starship Deployments'
      }
    },
    {
      path: '/starships/deployments/:deploymentName',
      component: StarshipsDeploymentDetails,
      props: true,
      meta: {
        title: 'Starship Deployments'
      }
    },
    {
      path: '/starships/equipment',
      component: StarshipsEquipment,
      meta: {
        title: 'Starship Equipment'
      }
    },
    {
      path: '/starships/modifications',
      component: StarshipsModifications,
      meta: {
        title: 'Starship Modifications'
      }
    },
    {
      path: '/starships/weapons',
      component: StarshipsWeapons,
      meta: {
        title: 'Starship Weapons'
      }
    },
    {
      path: '/starships/ventures',
      component: StarshipsVentures,
      meta: {
        title: 'Starship Ventures'
      }
    }
  ]
}
