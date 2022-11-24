<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompletedFeatureType } from '@/types/completeCharacterTypes'
  import { FeatureType, FightingStyleType, PowerType } from '@/types/characterTypes'
  import VueMarkdown from 'vue-markdown'
  import CheckList from '@/components/CheckList.vue'
  import ConfirmDelete from '@/components/ConfirmDelete.vue'
  import { namespace } from 'vuex-class'
  import CharacterSheetChooseFightingStyle from './CharacterSheetChooseFightingStyle.vue'

  const fightingStyleModule = namespace('fightingStyles')

  @Component({
    components: {
      CheckList,
      VueMarkdown,
      ConfirmDelete,
      CharacterSheetChooseFightingStyle
    }
  })
  export default class CharacterSheetExpansionFeatures extends Vue {
    @Prop(Array) readonly features!: CompletedFeatureType[] | PowerType[]
    @Prop(Array) readonly featureConfigs!: CompletedFeatureType[] | PowerType[]
    @Prop(Boolean) readonly isShowingLevel!: boolean

    @fightingStyleModule.State fightingStyles!: FightingStyleType[]
    @fightingStyleModule.Action fetchFightingStyles!: () => void

    created () {
      this.fetchFightingStyles()
    }

    getFightingStyle (key: string) {
      var fs = this.fightingStyles.find(f => (f as any).rowKey === key)
      if (fs) {
        return fs
      }
      return undefined
    }

    isFeatureConfigured (f: CompletedFeatureType | PowerType) : boolean {
      return f && f.config && f.config.data
    }
  }
</script>

<template lang="pug">
  v-expansion-panels(accordion, multiple)
    v-expansion-panel(v-for="(feature, index) in features", :key="feature.name + index").powerPanel
      v-expansion-panel-header.pa-3
        slot(v-bind="{ feature }")
          h4.d-inline {{ feature.name }}
          span(v-if="feature.metadata && feature.metadata.fightingStyles && !isFeatureConfigured(feature)").op-40.mr-3.text-right Choice Needed
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
        div(v-if="feature.metadata && feature.metadata.fightingStyles")
          p(v-if="feature.config && feature.config.data")
            strong
              u Chosen Style
            strong : {{ getFightingStyle(feature.config.data).name }}
            VueMarkdown(:source="getFightingStyle(feature.config.data).description")
          CharacterSheetChooseFightingStyle(:feature="feature", @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)")
        div(v-if="feature.customIndex > -1").d-flex.justify-end
          ConfirmDelete(
            label="Feature",
            :item="feature.name",
            @delete="$emit('deleteFeature', feature)"
          )
        // pre {{ JSON.stringify(feature, null, 4) }}
</template>

<style lang="scss">
  .powerPanel .v-expansion-panel-header {
    min-height: 0 !important;
  }
</style>
