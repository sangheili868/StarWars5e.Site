import axios from 'axios'
import _ from 'lodash'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'handbookBlobs' })
export default class HandbookBlobs extends VuexModule {
  handbookBlobs: { [blob: string]: string } = {}

  @MutationAction({ mutate: ['handbookBlobs'] })
  async fetchHandbookBlobs () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/HandbookBlob`)
    return {
      handbookBlobs: _(results.data).keyBy('chapterName')
    }
  }

  @MutationAction({ mutate: ['handbookBlobs'] })
  async fetchHandbookBlob (chapter: string) {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/PlayerHandbookRule/${chapter}.json`)
    return {
      handbookBlobs: {
        ...this.state && (this.state as any).handbookBlobs,
        [results.data.chapterName]: results.data.contentMarkdown
      }
    }
  }
}
