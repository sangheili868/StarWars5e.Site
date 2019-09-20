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
  export default class CharacterSheetExpansionFeature extends Vue {
    @Prop(Object) readonly feature!: CompletedFeatureType | PowerType
  }
</script>

<template lang="pug">
  v-expansion-panel-content(class="powerPanel")
    template(v-slot:header)
      h4 {{ feature.name }}
    div.ma-2.caption
      CheckList(v-if="feature.usage", v-bind="feature.usage", title="Uses")
      div(v-if="feature.castingPeriodText") #[strong Casting Time:] {{ feature.castingPeriodText }}
      div(v-if="feature.range") #[strong Range:] {{ feature.range }}
      div(v-if="feature.duration") #[strong Duration:] {{ feature.duration }} {{ feature.concentration && '(Concentration)' }}
      br(v-if="feature.castingPeriodText || feature.range || feature.duration")
      VueMarkdown {{ feature.description }}
</template>

<style lang="scss">
  .powerPanel .v-expansion-panel__header {
    min-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
