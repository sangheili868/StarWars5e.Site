<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { SpeciesType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'
  import Loading from '@/components/Loading.vue'

  const speciesModule = namespace('species')

  @Component({
    components: {
      VueMarkdown,
      Loading
    }
  })
  export default class ReferenceSpeciesDetail extends Vue {
    @speciesModule.State species!: SpeciesType[]
    @speciesModule.Action fetchSpecies!: () => void

    @Prop(String) readonly speciesName!: string

    created () {
      this.fetchSpecies()
    }

    get speciesData () {
      return this.species.find(({ name }: SpeciesType) => name === this.speciesName)
    }
  }
</script>

<template lang="pug">
  div( v-if="speciesData" ).text-xs-left
    h1 {{ speciesData.name }}

    h4 Visual Characteristics
    div(v-if="speciesData.skinColorOptions") #[strong Skin Color:] {{ speciesData.skinColorOptions }}
    div(v-if="speciesData.hairColorOptions") #[strong Hair Color:] {{ speciesData.hairColorOptions }}
    div(v-if="speciesData.eyeColorOptions") #[strong Eye Color:] {{ speciesData.eyeColorOptions }}
    div(v-if="speciesData.colorScheme") #[strong Color Scheme:] {{ speciesData.colorScheme }}
    div(v-if="speciesData.distinctions") #[strong Distinctions:] {{ speciesData.distinctions }}
    br
    h4 Physical Characteristics
    div #[strong Height:] {{ speciesData.heightAverage }} {{ speciesData.heightRollMod }}
    div #[strong Weight:] {{ speciesData.weightAverage }} {{ speciesData.weightRollMod }}
    br
    h4 Sociocultural Characteristics
    div(v-if="speciesData.homeworld") #[strong Homeworld:] {{ speciesData.homeworld }}
    div(v-if="speciesData.manufacturer") #[strong Manufacturer:] {{ speciesData.manufacturer}}
    div(v-if="speciesData.language") #[strong Language:] {{ speciesData.language }}
    br
    VueMarkdown {{ speciesData.flavorText }}

    h3 {{ speciesData.name }} Traits
    div(v-for="trait in speciesData.traits", :key="trait.name")
      div #[strong {{trait.name}}] {{ trait.description }}
  Loading(v-else)
</template>
