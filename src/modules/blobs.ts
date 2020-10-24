import axios from 'axios'
import { fetchBlobFromCache, fetchBlobsFromCache } from '@/utilities/fetchFromCache'
import _ from 'lodash'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { VariantRuleBlobType, ExpandedContentBlobType } from '@/types/referenceTypes'

@Module({ namespaced: true, name: 'blobs' })
export default class Blobs extends VuexModule {
  handbookBlobs: { [blob: string]: string } = {}
  starshipBlobs: { [blob: string]: string } = {}
  variantRuleBlobs: VariantRuleBlobType[] = []
  expandedContentBlobs: ExpandedContentBlobType[] = []
  monsterBlobs: { [blob: string]: string } = {}
  hivesBlobs: { [blob: string]: string } = {}
  creditsBlob: string = ''
  cachedVersions: { [dataName: string]: number } = {
    handbookBlobs: 0,
    starshipBlobs: 0,
    variantRulesBlobs: 0,
    monsterBlobs: 0,
    hivesBlobs: 0,
    creditsBlob: 0
  }

  @MutationAction({ mutate: ['handbookBlobs', 'cachedVersions'] })
  async fetchHandbookBlob (chapter: string) {
    const { blobs: handbookBlobs, cachedVersions } = await fetchBlobFromCache(this, 'handbookBlobs', chapter, 'player-handbook-rules', 'PlayerHandbookRule')
    return { handbookBlobs, cachedVersions }
  }

  @MutationAction({ mutate: ['starshipBlobs', 'cachedVersions'] })
  async fetchStarshipBlob (chapter: string) {
    const { blobs: starshipBlobs, cachedVersions } = await fetchBlobFromCache(this, 'starshipBlobs', chapter, 'starships-rules', 'StarshipRule')
    return { starshipBlobs, cachedVersions }
  }

  @MutationAction({ mutate: ['variantRuleBlobs', 'cachedVersions'] })
  async fetchVariantRuleBlobs () {
    const { data, cachedVersions } = await fetchBlobsFromCache(this, 'variantRuleBlobs', 'variant-rules', 'VariantRule')
    return {
      variantRuleBlobs: data.map((variantRuleBlob: VariantRuleBlobType) =>
        _.pick(variantRuleBlob, ['chapterName', 'contentMarkdown'])
      ),
      cachedVersions
    }
  }

  @MutationAction({ mutate: ['expandedContentBlobs', 'cachedVersions'] })
  async fetchExpandedContentBlobs () {
    const { data, cachedVersions } = await fetchBlobsFromCache(this, 'expandedContentBlobs', 'expanded-content', 'ExpandedContent')
    return {
      expandedContentBlobs: data.map((expandedContentBlob: ExpandedContentBlobType) =>
        _.pick(expandedContentBlob, ['chapterName', 'contentMarkdown'])
      ),
      cachedVersions
    }
  }

  @MutationAction({ mutate: ['hivesBlobs', 'cachedVersions'] })
  async fetchHivesBlob (chapter: string) {
    const { blobs: hivesBlobs, cachedVersions } = await fetchBlobFromCache(this, 'hivesBlobs', chapter, 'wretched-hives-rules', 'WretchedHivesRule')
    return { hivesBlobs, cachedVersions }
  }

  @MutationAction({ mutate: ['creditsBlob', 'cachedVersions'] })
  async fetchCreditsBlob () {
    const { data: creditsBlob, cachedVersions } = await fetchBlobsFromCache(this, 'creditsBlob', 'credits', 'Credit')
    return { creditsBlob, cachedVersions }
  }
}
