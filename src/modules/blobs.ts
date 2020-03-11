import safeFetch from '@/utilities/safeFetch'
import _ from 'lodash'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { VariantRuleBlobType } from '@/types/referenceTypes'

@Module({ namespaced: true, name: 'blobs' })
export default class Blobs extends VuexModule {
  handbookBlobs: { [blob: string]: string } = {}
  starshipBlobs: { [blob: string]: string } = {}
  variantRuleBlobs: VariantRuleBlobType[] = []
  monsterBlobs: { [blob: string]: string } = {}
  hivesBlobs: { [blob: string]: string } = {}
  creditsBlob: string = ''

  @MutationAction({ mutate: ['handbookBlobs'] })
  async fetchHandbookBlobs () {
    const results = await safeFetch('api/HandbookBlob')
    return {
      handbookBlobs: _(results.data).keyBy('chapterName')
    }
  }

  @MutationAction({ mutate: ['handbookBlobs'] })
  async fetchHandbookBlob (chapter: string) {
    const results = await safeFetch('api/PlayerHandbookRule/${chapter}.json')
    return {
      handbookBlobs: {
        ...this.state && (this.state as any).handbookBlobs,
        [results.data.chapterName]: results.data.contentMarkdown
      }
    }
  }

  @MutationAction({ mutate: ['starshipBlobs'] })
  async fetchStarshipBlob (chapter: string) {
    const results = await safeFetch('api/StarshipRule/${chapter}.json')
    return {
      starshipBlobs: {
        ...this.state && (this.state as any).starshipBlobs,
        [results.data.chapterName]: results.data.contentMarkdown
      }
    }
  }

  @MutationAction({ mutate: ['variantRuleBlobs'] })
  async fetchVariantRuleBlobs () {
    const results = await safeFetch('api/VariantRule')
    return {
      variantRuleBlobs: results.data.map((variantRuleBlob: VariantRuleBlobType) =>
        _.pick(variantRuleBlob, ['chapterName', 'contentMarkdown'])
      )
    }
  }

  @MutationAction({ mutate: ['monsterBlobs'] })
  async fetchMonsterBlobs (chapter: string) {
    const results = await safeFetch('api/MonsterChapters/${chapter}.json')
    return {
      monsterBlobs: {
        ...this.state && (this.state as any).monsterBlobs,
        [results.data.chapterName]: results.data.contentMarkdown
      }
    }
  }

  @MutationAction({ mutate: ['hivesBlobs'] })
  async fetchHivesBlob (chapter: string) {
    const results = await safeFetch('api/WretchedHivesRule/${chapter}.json')
    return {
      hivesBlobs: {
        ...this.state && (this.state as any).hivesBlobs,
        [results.data.chapterName]: results.data.contentMarkdown
      }
    }
  }

  @MutationAction({ mutate: ['creditsBlob'] })
  async fetchCreditsBlob () {
    const results = await safeFetch('api/Credit')
    return {
      creditsBlob: results.data
    }
  }
}
