import axios from 'axios'
import _ from 'lodash'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'blobs' })
export default class Blobs extends VuexModule {
  handbookBlobs: { [blob: string]: string } = {}
  starshipBlobs: { [blob: string]: string } = {}
  variantRuleBlobs: any[] = []

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

  @MutationAction({ mutate: ['starshipBlobs'] })
  async fetchStarshipBlob (chapter: string) {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/StarshipRule/${chapter}.json`)
    return {
      starshipBlobs: {
        ...this.state && (this.state as any).starshipBlobs,
        [results.data.chapterName]: results.data.contentMarkdown
      }
    }
  }

  @MutationAction({ mutate: ['variantRuleBlobs'] })
  async fetchVariantRuleBlobs () {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/VariantRule`)
    return {
      variantRuleBlobs: _.map(results.data, (u:any) => {
        return {
          chapterName: u.chapterName,
          contentMarkdown: u.contentMarkdown
        }
      })
    }
  }
}
