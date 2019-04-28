import ReferencePage from './ReferencePage.vue'
import ReferenceSpecies from './ReferenceSpecies.vue'
import ReferenceSpeciesDetail from './ReferenceSpeciesDetail.vue'
import ReferenceArchetypes from './ReferenceArchetypes.vue'
import ReferenceArchetypeDetail from './ReferenceArchetypeDetail.vue'
import ReferenceBackgrounds from './ReferenceBackgrounds.vue'
import ReferenceBackgroundDetail from './ReferenceBackgroundDetail.vue'
import ReferenceFeats from './ReferenceFeats.vue'
import ReferenceArmor from './ReferenceArmor.vue'
import ReferenceWeapons from './ReferenceWeapons.vue'
import ReferenceGear from './ReferenceGear.vue'
import ReferenceForcePowers from './ReferenceForcePowers.vue'
import ReferenceTechPowers from './ReferenceTechPowers.vue'
import ReferenceMonsters from './ReferenceMonsters.vue'
import ReferenceMonsterDetail from './ReferenceMonsterDetail.vue'
import ReferenceStarshipEquipment from './ReferenceStarshipEquipment.vue'
import ReferenceStarshipModifications from './ReferenceStarshipModifications.vue'
import ReferenceStarshipWeapons from './ReferenceStarshipWeapons.vue'
import ReferenceVentures from './ReferenceVentures.vue'

export default [
  {
    path: '/reference',
    component: ReferencePage
  },
  {
    path: '/reference/species',
    component: ReferenceSpecies
  },
  {
    path: '/reference/species/:speciesName',
    component: ReferenceSpeciesDetail,
    props: true
  },
  {
    path: '/reference/archetypes',
    component: ReferenceArchetypes
  },
  {
    path: '/reference/archetypes/:archetypeName',
    component: ReferenceArchetypeDetail,
    props: true
  },
  {
    path: '/reference/backgrounds',
    component: ReferenceBackgrounds
  },
  {
    path: '/reference/backgrounds/:backgroundName',
    component: ReferenceBackgroundDetail,
    props: true
  },
  {
    path: '/reference/feats',
    component: ReferenceFeats
  },
  {
    path: '/reference/armor',
    component: ReferenceArmor
  },
  {
    path: '/reference/weapons',
    component: ReferenceWeapons
  },
  {
    path: '/reference/gear',
    component: ReferenceGear
  },
  {
    path: '/reference/monsters',
    component: ReferenceMonsters
  },
  {
    path: '/reference/monsters/:monsterName',
    component: ReferenceMonsterDetail,
    props: true
  },
  {
    path: '/reference/forcePowers',
    component: ReferenceForcePowers
  },
  {
    path: '/reference/techPowers',
    component: ReferenceTechPowers
  },
  {
    path: '/reference/starshipEquipment',
    component: ReferenceStarshipEquipment
  },
  {
    path: '/reference/starshipModifications',
    component: ReferenceStarshipModifications
  },
  {
    path: '/reference/starshipWeapons',
    component: ReferenceStarshipWeapons
  },
  {
    path: '/reference/ventures',
    component: ReferenceVentures
  }
]
