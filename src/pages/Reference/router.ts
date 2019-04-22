import ReferenceSpecies from './ReferenceSpecies.vue'
import ReferenceArchetypes from './ReferenceArchetypes.vue'
import ReferenceBackgrounds from './ReferenceBackgrounds.vue'
import ReferenceEquipment from './ReferenceEquipment.vue'
import ReferenceMonsters from './ReferenceMonsters.vue'
import ReferenceForcePowers from './ReferenceForcePowers.vue'
import ReferenceTechPowers from './ReferenceTechPowers.vue'

export default [
  {
    path: '/reference/species',
    component: ReferenceSpecies
  },
  {
    path: '/reference/archetypes',
    component: ReferenceArchetypes
  },
  {
    path: '/reference/backgrounds',
    component: ReferenceBackgrounds
  },
  {
    path: '/reference/equipment',
    component: ReferenceEquipment
  },
  {
    path: '/reference/monsters',
    component: ReferenceMonsters
  },
  {
    path: '/reference/forcePowers',
    component: ReferenceForcePowers
  },
  {
    path: '/reference/techPowers',
    component: ReferenceTechPowers
  }
]
