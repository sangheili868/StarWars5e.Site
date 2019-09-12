import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { WeaponPropertyType } from '@/types/lootTypes'
import _ from 'lodash'

@Module({ namespaced: true, name: 'weaponProperties' })
export default class WeaponProperties extends VuexModule {
  weaponProperties: WeaponPropertyType[] = []

  @MutationAction({ mutate: ['weaponProperties'] })
  async fetchWeaponProperties () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/WeaponProperty`)
    return {
      weaponProperties: results.data
    }
  }
}
