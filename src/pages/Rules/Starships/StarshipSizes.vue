<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdownWithAnchors from '@/components/VueMarkdownWithAnchors.vue'
  import { StarshipSizeType } from '@/types.ts'
  import CardSet from '@/components/CardSet.vue'
  import Loading from '@/components/Loading.vue'

  const deploymentsModule = namespace('starshipSizes')
  const blobsModule = namespace('blobs')

  @Component({
    components: {
      VueMarkdownWithAnchors,
      Loading,
      CardSet
    }
  })
  export default class StarshipSizes extends Vue {
    @deploymentsModule.State starshipSizes!: StarshipSizeType[]
    @deploymentsModule.Action fetchStarshipSizes!: () => void
    @blobsModule.State starshipBlobs!: { [key: string]: string }
    @blobsModule.Action fetchStarshipBlob!: (chapter: string) => void
    mainBlob: string = ''
    variant: string = ''
    spaceStation: string = '## Variant: Space Stations'

    async created () {
      await this.fetchStarshipBlob('Starships')
      this.fetchStarshipSizes()
      const split = this.starshipBlobs['Starships'].split(this.spaceStation)
      this.mainBlob = split[0]
      this.variant = split[1]
    }

    get starshipSizesWithLinks () {
      return this.starshipSizes.map(starshipSize => ({
        ...starshipSize,
        to: `starshipSizes/${starshipSize.name}`
      }))
    }

    showSaves (saves: string[]) {
      if (saves.length === 3) {
        return `${saves.slice(0, 2).join(', ')} or ${saves[2]}`
      } else {
        return saves.join(' or ')
      }
    }
  }
</script>

<template lang="pug">
  div
    VueMarkdownWithAnchors(:source="mainBlob").text-xs-left
    Loading(v-if="!mainBlob || !starshipSizes.length")

    CardSet(:cards="starshipSizesWithLinks")
      template(v-slot="{ card }")
        v-card-text(primary-title)
            h3 {{ card.name }}
            p.ma-0 #[strong Hit Die:] 1d{{ card.hitDiceDieType }}
            p.ma-0 #[strong Save Options:] {{ showSaves(card.savingThrowOptions) }}
            p.ma-0 #[strong Strength at Tier 0:] {{ card.strength }}
            p.ma-0 #[strong Dexterity at Tier 0:] {{ card.dexterity }}
            p.ma-0 #[strong Constitution at Tier 0:] {{ card.constitution }}

    VueMarkdownWithAnchors(v-if="variant" :source="spaceStation").text-xs-left
    VueMarkdownWithAnchors(:source="variant.replace(/\ufffd/g, ' - ')").text-xs-left
</template>
