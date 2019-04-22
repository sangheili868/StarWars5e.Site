import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'ui' })
export default class Ui extends VuexModule {
  isSideBarOpen: boolean | null = null

  @MutationAction({ mutate: ['isSideBarOpen'] })
  async updateSideBar (value: boolean) {
    return {
      isSideBarOpen: value
    }
  }
}
