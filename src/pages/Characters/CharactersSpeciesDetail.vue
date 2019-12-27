<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { SpeciesType } from '@/types/characterTypes.ts'
  import VueMarkdown from 'vue-markdown'
  import Loading from '@/components/Loading.vue'
  import ImageWithLoading from '@/components/ImageWithLoading.vue'
  import CharactersSpeciesDetailHalfHuman from './CharactersSpeciesDetailHalfHuman.vue'
  import BackButton from '@/components/BackButton.vue'

  const speciesModule = namespace('species')

  @Component({
    components: {
      CharactersSpeciesDetailHalfHuman,
      VueMarkdown,
      Loading,
      BackButton,
      ImageWithLoading
    }
  })
  export default class CharactersSpeciesDetail extends Vue {
    @speciesModule.State species!: SpeciesType[]
    @speciesModule.Action fetchSpecies!: () => void
    @Prop(String) readonly speciesName!: string
    @Prop(Boolean) readonly isHidingBack!: boolean

    created () {
      this.fetchSpecies()
    }

    get title () {
        return this.$router.currentRoute.path.includes('handbook')
        ? this.speciesName + ' | Handbook' + Vue.prototype.$titleSuffix
        : this.speciesName + Vue.prototype.$titleSuffix
    }

    get speciesData () {
      return this.species.find(({ name }: SpeciesType) => name === this.speciesName)
    }
  }
</script>

<template lang="pug">
  div
    vue-headful(v-if="!isHidingBack", :title="title")
    BackButton(v-if="!isHidingBack")
    CharactersSpeciesDetailHalfHuman(v-if="speciesName === 'Half-Human'", v-bind="{ speciesData }")
    div(v-else-if="speciesData").text-left
      div(:class="$style.topSection")
        div(:class="$style.bioBlock").block
          h2 {{ speciesData.name }}
          hr

          h4 Visual Characteristics
          table(:class="$style.bioTable").table
            tbody
              tr(v-if="speciesData.skinColorOptions")
                td #[strong #[em Skin Color] ]
                td {{ speciesData.skinColorOptions }}
              tr(v-if="speciesData.hairColorOptions")
                td #[strong #[em Hair Color] ]
                td {{ speciesData.hairColorOptions }}
              tr(v-if="speciesData.eyeColorOptions")
                td #[strong #[em Eye Color] ]
                td {{ speciesData.eyeColorOptions }}
              tr(v-if="speciesData.colorScheme")
                td #[strong #[em Color Scheme] ]
                td {{ speciesData.colorScheme }}
              tr(v-if="speciesData.distinctions")
                td #[strong #[em Distinctions] ]
                td {{ speciesData.distinctions }}
          hr

          h4 Physical Characteristics
          table(:class="$style.bioTable").table
            tbody
              tr
                td #[strong #[em Height] ]
                td {{ speciesData.heightAverage }}
                td {{ speciesData.heightRollMod }}
              tr
                td #[strong #[em Weight] ]
                td {{ speciesData.weightAverage }}
                td {{ speciesData.weightRollMod }}
          hr

          h4 Sociocultural Characteristics
          table(:class="$style.bioTable").table
            tbody
              tr(v-if="speciesData.homeworld")
                td #[strong #[em Homeworld] ]
                td {{ speciesData.homeworld }}
              tr(v-if="speciesData.manufacturer")
                td #[strong #[em Manufacturer] ]
                td {{ speciesData.manufacturer}}
              tr(v-if="speciesData.language")
                td #[strong #[em Language] ]
                td {{ speciesData.language }}

        ImageWithLoading(:src="speciesData.imageUrls[0]", height="350", width="350", contain).ma-auto
      VueMarkdown(:source="speciesData.flavorText")

      h3 {{ speciesData.name }} Traits
      p As a {{ speciesData.name }}, you have the following special traits.
      div(v-for="trait in speciesData.traits", :key="trait.name")
        VueMarkdown(:source="'***' + trait.name + '.*** ' + trait.description")
    Loading(v-else)
</template>

<style module lang="scss">
  .topSection {
    display: flex;
    flex-wrap: wrap;

    .bioBlock {
      max-width: 350px;

      .bioTable {
        width: 100%;
        font-size: 12px;
      }
    }
  }
</style>
