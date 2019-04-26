<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import VueMarkdown from 'vue-markdown'
  import { StarshipSizeType } from '@/types.ts'
  import Loading from '@/components/Loading.vue'

  const deploymentsModule = namespace('starshipSizes')
  const blobsModule = namespace('blobs')

  @Component({
    components: {
      VueMarkdown,
      Loading
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
    VueMarkdown(:source="mainBlob").text-xs-left
    Loading(v-if="!mainBlob || !starshipSizes.length")

    v-container(grid-list-lg, fluid)
      v-layout(row, wrap, justify-center)
        v-flex(v-for="starshipSize in starshipSizes", :key="starshipSize.name", d-flex).xs12.sm6.md4
          v-card(:to="`starshipSizes/${starshipSize.name}`", hover, exact).ma-2
            v-card-text(primary-title)
              h3 {{ starshipSize.name }}
              p.ma-0 #[strong Hit Die:] 1d{{ starshipSize.hitDiceDieType }}
              p.ma-0 #[strong Save Options:] {{ showSaves(starshipSize.savingThrowOptions) }}
              p.ma-0 #[strong Strength at Tier 0:] {{ starshipSize.strength }}
              p.ma-0 #[strong Dexterity at Tier 0:] {{ starshipSize.dexterity }}
              p.ma-0 #[strong Constitution at Tier 0:] {{ starshipSize.constitution }}

    VueMarkdown(v-if="variant").text-xs-left {{spaceStation}}
    VueMarkdown(:source="variant.replace(/\ufffd/g, ' - ')").text-xs-left
</template>
