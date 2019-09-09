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
      component: LootPage,
      meta: {
        title: 'Loot'
      }
    },
    {
      path: '/loot/armor',
      component: LootArmor,
      meta: {
        title: 'Armor'
      }
    },
    {
      path: '/loot/adventuringGear',
      component: LootGear,
      meta: {
        title: 'Adventuring Gear'
      }
    },
    {
      path: '/loot/weapons',
      component: LootWeapons,
      meta: {
        title: 'Weapons'
      }
    },
    {
      path: '/loot/enhancedItems',
      component: LootEnhancedItems,
      meta: {
        title: 'Enhanced Items'
      }
    }
  ]
}
