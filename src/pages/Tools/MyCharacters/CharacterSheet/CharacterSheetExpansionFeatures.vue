<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompletedFeatureType } from '@/types/completeCharacterTypes'
  import { FightingStyleType, PowerType } from '@/types/characterTypes'
  import VueMarkdown from 'vue-markdown'
  import CheckList from '@/components/CheckList.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import { namespace } from 'vuex-class'

  const fightingStyleModule = namespace('fightingStyles')

  @Component({
    components: {
      CheckList,
      VueMarkdown,
      ConfirmDelete
    }
  })
  export default class CharacterSheetExpansionFeatures extends Vue {
    @Prop(Array) readonly features!: CompletedFeatureType[] | PowerType[]
    @Prop(Boolean) readonly isShowingLevel!: boolean

    @fightingStyleModule.State fightingStyles!: FightingStyleType[]
    @fightingStyleModule.Action fetchFightingStyles!: () => void

    created () {
      console.log('Creating CharSheetExpansionFeatures')
      this.fetchFightingStyles()
    }
    chooseFightingStyle () {
      console.log(this.fightingStyles)
    }
    featureHasFightingStyle (feature: CompletedFeatureType | PowerType) : boolean {
      return [
        'Class-Fighter-Fighting Style-1'
      ].indexOf((feature as any).rowKey) > -1
    }
  }
</script>

<template lang="pug">
  v-expansion-panels(accordion, multiple)
    v-expansion-panel(v-for="(feature, index) in features", :key="feature.name + index").powerPanel
      v-expansion-panel-header.pa-3
        slot(v-bind="{ feature }")
          h4 {{ feature.name }}
      v-expansion-panel-content.ma-2.text-caption
        CheckList(
          v-if="feature.usage",
          :current="feature.usage.used",
          :maximum="feature.usage.maximum",
          title="Uses",
          @changeSelected="count => $emit('updateCharacter', { currentStats: { featuresTimesUsed: { [feature.name]: count } } })"
        )
        div(v-if="isShowingLevel") #[strong Level:] {{ feature.level }}
        div(v-if="feature.forceAlignment") #[strong Alignment:] {{ feature.forceAlignment }}
        div(v-if="feature.type") #[strong Type:] {{ feature.type}}
        div(v-if="feature.castingPeriodText") #[strong Casting Time:] {{ feature.castingPeriodText }}
        div(v-if="feature.range") #[strong Range:] {{ feature.range }}
        div(v-if="feature.duration") #[strong Duration:] {{ feature.duration }} {{ feature.concentration ? '(Concentration)' : ''}}
        div(v-if="feature.prerequisite") #[strong Prerequisite:] {{ feature.prerequisite }}
        br(v-if="feature.castingPeriodText || feature.range || feature.duration")
        VueMarkdown {{ feature.description || feature.text }}
        div(v-if="featureHasFightingStyle(feature)")
          v-btn(color="primary" @click="chooseFightingStyle()")
            v-icon fa-plus mr-2
            template Choose Fighting Style
        div(v-if="feature.customIndex > -1").d-flex.justify-end
          ConfirmDelete(
            label="Feature",
            :item="feature.name",
            @delete="$emit('deleteFeature', feature)"
          )
</template>

<style lang="scss">
  .powerPanel .v-expansion-panel-header {
    min-height: 0 !important;
  }
</style>
