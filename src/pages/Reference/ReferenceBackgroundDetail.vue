<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { BackgroundType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'

  const backgroundModule = namespace('backgrounds')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class ReferenceBackgroundsDetail extends Vue {
    @backgroundModule.State backgrounds!: BackgroundType[]
    @backgroundModule.Action fetchBackgrounds!: () => void

    @Prop(String) readonly backgroundName!: string

    created () {
      this.fetchBackgrounds()
    }

    get backgroundData () {
      return this.backgrounds.find(({ name }: BackgroundType) => name === this.backgroundName)
    }
  }
</script>

<template lang="pug">
  div( v-if="backgroundData" ).text-xs-left
    h1 {{ backgroundData.name }}
    VueMarkdown {{ backgroundData.flavorText }}
    div #[strong Skill Proficiencies:] {{ backgroundData.skillProficiencies }}
    div #[strong Tool Proficiencies:] {{ backgroundData.toolProficiencies }}
    div #[strong Languages:] {{ backgroundData.languages }}
    div #[strong Equipment:] {{ backgroundData.equipment }}
    br
    h3 Feature: {{ backgroundData.featureName }}
    p {{ backgroundData.featureText }}
    br
    h3 Background Feat
    p As a further embodiment of the experience and training of your background, you can choose from the following feats:
    p {{ backgroundData.featOptions }}
    br
    h4 Suggested Characteristics
    p {{ backgroundData.suggestedCharacteristics }}
    div #[strong Personality Trait:] {{ backgroundData.personalityTraitOptions }}
    div #[strong Ideal:] {{ backgroundData.idealOptions }}
    div #[strong Bond:] {{ backgroundData.bondOptions }}
    div #[strong Flaw:] {{ backgroundData.flawOptions }}
</template>
