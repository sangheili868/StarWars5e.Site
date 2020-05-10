import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArmorPropertyType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'armorProperties' })
export default class ArmorProperties extends VuexModule {
  armorProperties: ArmorPropertyType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['armorProperties', 'cachedVersion'] })
  async fetchArmorProperties () {
    const { data: armorProperties, cachedVersion } = await fetchFromCache(this, 'armorProperties', 'armorProperty')
    return { armorProperties, cachedVersion }
  }
}
