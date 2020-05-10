import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArmorPropertyType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'armorProperties' })
export default class ArmorPropertys extends VuexModule {
  armorProperties: ArmorPropertyType[] = []
  cachedVersion: number = 0

  @MutationAction({ mutate: ['armorProperties', 'cachedVersion'] })
  async fetchArmorProperties () {
    const state = (this as any).state
    const { data: armorProperties, cachedVersion } = await fetchFromCache(state.armorProperties, state.cachedVersion, 'armorProperties', 'ArmorProperty')
    return { armorProperties, cachedVersion }
  }
}
