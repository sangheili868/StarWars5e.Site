import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'ui' })
export default class Ui extends VuexModule {
  isSideBarOpen: boolean | null = null
  isDarkSide: boolean | null = false
  hiddenNewManagementAlert: boolean | null = false

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

  @MutationAction({ mutate: ['hiddenNewManagementAlert'] })
  async toggleNewManagementAlert () {
    return {
      hiddenNewManagementAlert: !this.hiddenNewManagementAlert
    }
  }
}
