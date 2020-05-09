import fetchFromCache from '@/utilities/fetchFromCache'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArmorPropertyType } from '@/types/lootTypes'

@Module({ namespaced: true, name: 'armorProperties' })
export default class ArmorPropertys extends VuexModule {
  armorProperties: ArmorPropertyType[] = []

  @MutationAction({ mutate: ['armorProperties'] })
  async fetchArmorPropertys () {
    return {
      armorProperties: await fetchFromCache((this as any).state.armorPropertie, 'ArmorProperty')
    }
  }
}
