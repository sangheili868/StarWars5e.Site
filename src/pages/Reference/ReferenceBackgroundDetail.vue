<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { BackgroundType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'
  import RollTable from '@/components/RollTable.vue'
  import Loading from '@/components/Loading.vue'

  const backgroundModule = namespace('backgrounds')

  @Component({
    components: {
      RollTable,
      VueMarkdown,
      Loading
    }
  })
  export default class ReferenceBackgroundsDetail extends Vue {
    @backgroundModule.State backgrounds!: BackgroundType[]
    @backgroundModule.Action fetchBackgrounds!: () => void

    @Prop(String) readonly backgroundName!: string

    created () {
      this.fetchBackgrounds()
    }

    get background () {
      return this.backgrounds.find(({ name }: BackgroundType) => name === this.backgroundName)
    }
  }
</script>

<template lang="pug">
  div( v-if="background" ).text-xs-left
    h1 {{ background.name }}
    VueMarkdown {{ background.flavorText }}
    div #[strong Skill Proficiencies:] {{ background.skillProficiencies }}
    div(v-if="background.toolProficiencies") #[strong Tool Proficiencies:] {{ background.toolProficiencies }}
    div(v-if="background.languages") #[strong Languages:] {{ background.languages }}
    div.mb-2 #[strong Equipment:] {{ background.equipment }}

    h4 {{ background.flavorName }}
    RollTable(:title="background.flavorName", :items="background.flavorOptions").mb-2
    h3 Feature: {{ background.featureName }}
    VueMarkdown {{ background.featureText }}

    h3 Background Feat
    p As a further embodiment of the experience and training of your background, you can choose from the following feats:
    RollTable.mb-2(title="Feat", :items="background.featOptions")

    h4 Suggested Characteristics
    p {{ background.suggestedCharacteristics }}
    RollTable(title="Personality Trait", :items="background.personalityTraitOptions", isLeftAlign)
    RollTable(title="Ideal", :items="background.idealOptions", isLeftAlign)
    RollTable(title="Bond", :items="background.bondOptions", isLeftAlign)
    RollTable(title="Flaw", :items="background.flawOptions", isLeftAlign)
  Loading(v-else)
</template>
