<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { BackgroundType, FeatType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'
  import RollTable from '@/components/RollTable.vue'
  import Loading from '@/components/Loading.vue'

  const backgroundModule = namespace('backgrounds')
  const featModule = namespace('feats')

  @Component({
    components: {
      RollTable,
      VueMarkdown,
      Loading
    }
  })
  export default class CharactersBackgroundsDetail extends Vue {
    @backgroundModule.State backgrounds!: BackgroundType[]
    @backgroundModule.Action fetchBackgrounds!: () => void
    @featModule.State feats!: FeatType[]
    @featModule.Action fetchFeats!: () => void

    @Prop(String) readonly backgroundName!: string

    created () {
      this.fetchBackgrounds()
      this.fetchFeats()
    }

    get background () {
      return this.backgrounds.find(({ name }: BackgroundType) => name === this.backgroundName)
    }

    get featsWithModals () {
      return this.background && this.background.featOptions.map(({ roll, name }) => {
        const feat = this.feats.find(feat => feat.name === name)
        return {
          roll,
          text: name,
          modalContent: feat && feat.text
        }
      })
    }

    mapToText (options: { name: string, roll: number, description: string }[]) {
      return options && options.map(({ name, roll, description }) => ({
        text: (name && description) ? `${name}. ${description}` : (name || description),
        roll
      }))
    }
  }
</script>

<template lang="pug">
  div( v-if="background" ).text-xs-left
    h1 {{ background.name }}
    VueMarkdown(:source="background.flavorText.replace(/\ufffd/g, '-')")
    div #[strong Skill Proficiencies:] {{ background.skillProficiencies }}
    div(v-if="background.toolProficiencies") #[strong Tool Proficiencies:] {{ background.toolProficiencies }}
    div(v-if="background.languages") #[strong Languages:] {{ background.languages }}
    div.mb-2 #[strong Equipment:] {{ background.equipment }}

    h4 {{ background.flavorName }}
    RollTable(:title="background.flavorName", :items="mapToText(background.flavorOptions)").mb-2
    h3 Feature: {{ background.featureName }}
    VueMarkdown(:source="background.featureText")

    h3 Background Feat
    p As a further embodiment of the experience and training of your background, you can choose from the following feats:
    RollTable.mb-2(title="Feat", :items="featsWithModals")

    h4 Suggested Characteristics
    p {{ background.suggestedCharacteristics }}
    RollTable(title="Personality Trait", :items="mapToText(background.personalityTraitOptions)", isLeftAlign)
    RollTable(title="Ideal", :items="mapToText(background.idealOptions)", isLeftAlign)
    RollTable(title="Bond", :items="mapToText(background.bondOptions)", isLeftAlign)
    RollTable(title="Flaw", :items="mapToText(background.flawOptions)", isLeftAlign)
  Loading(v-else)
</template>
