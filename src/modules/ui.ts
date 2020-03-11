import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'ui' })
export default class Ui extends VuexModule {
  isSideBarOpen: boolean | null = null
  isDarkSide: boolean | null = false
  isOffline: boolean | null = false

  @MutationAction({ mutate: ['isSideBarOpen'] })
  async updateSideBar (value: boolean) {
    return {
      isSideBarOpen: value
    }
  }

  @MutationAction({ mutate: ['isDarkSide'] })
  async toggleDarkSide (value: boolean) {
    return {
      isDarkSide: value
    }
  }

  @MutationAction({ mutate: ['isOffline'] })
  async setOffline (isOffline: boolean) {
    return { isOffline }
  }
}
