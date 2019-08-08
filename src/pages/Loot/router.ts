import PageNester from '@/components/PageNester.vue'
import LootPage from './LootPage.vue'
import LootArmor from './LootArmor.vue'
import LootGear from './LootGear.vue'
import LootWeapons from './LootWeapons.vue'
import LootEnhancedItems from './LootEnhancedItems.vue'

export default {
  path: '/loot',
  component: PageNester,
  children: [
    {
      path: '/loot',
      component: LootPage
    },
    {
      path: '/loot/armor',
      component: LootArmor
    },
    {
      path: '/loot/adventuringGear',
      component: LootGear
    },
    {
      path: '/loot/weapons',
      component: LootWeapons
    },
    {
      path: '/loot/enhancedItems',
      component: LootEnhancedItems
    }
  ]
}
