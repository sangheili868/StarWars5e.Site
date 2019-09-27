<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompletedFeatureType } from '@/types/completeCharacterTypes'
  import { PowerType } from '@/types/characterTypes'
  import VueMarkdown from 'vue-markdown'
  import CheckList from '@/components/CheckList.vue'

  @Component({
    components: {
      CheckList,
      VueMarkdown
    }
  })
  export default class CharacterSheetExpansionFeatures extends Vue {
    @Prop(Array) readonly features!: CompletedFeatureType[] | PowerType[]
  }
</script>

<template lang="pug">
  v-expansion-panels(accordion, multiple)
    v-expansion-panel(v-for="feature in features", :key="feature.name").powerPanel
      v-expansion-panel-header.pa-3
        h4 {{ feature.name }}
      v-expansion-panel-content.ma-2.caption
        CheckList(v-if="feature.usage", v-bind="feature.usage", title="Uses")
        div(v-if="feature.castingPeriodText") #[strong Casting Time:] {{ feature.castingPeriodText }}
        div(v-if="feature.range") #[strong Range:] {{ feature.range }}
        div(v-if="feature.duration") #[strong Duration:] {{ feature.duration }} {{ feature.concentration && '(Concentration)' }}
        br(v-if="feature.castingPeriodText || feature.range || feature.duration")
        VueMarkdown {{ feature.description }}
</template>

<style lang="scss">
  .powerPanel .v-expansion-panel-header {
    min-height: 0;
  }
</style>
