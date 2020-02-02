import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ArmorPropertyType } from '@/types/lootTypes'
import _ from 'lodash'

@Module({ namespaced: true, name: 'ArmorProperties' })
export default class ArmorProperties extends VuexModule {
  armorProperties: ArmorPropertyType[] = []

  @MutationAction({ mutate: ['armorProperties'] })
  async fetchArmorProperties () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/ArmorProperty`)
    return {
      armorProperties: results.data
    }
  }
}
