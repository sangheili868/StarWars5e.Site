<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { PowerType } from '@/types'
  import VueMarkdown from 'vue-markdown'

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class CharacterSheetCastingPower extends Vue {
    @Prop(Object) readonly power!: PowerType
  }
</script>

<template lang="pug">
  v-expansion-panel-content(class="powerPanel")
    template(v-slot:header)
      h4 {{ power.name }}
    div.ma-2.caption
      div(v-if="power.castingPeriodText") Casting Time: {{ power.castingPeriodText }}
      div(v-if="power.range") Range: {{ power.range }}
      div(v-if="power.duration") Duration: {{ power.duration }} {{ power.concentration && '(Concentration)' }}
      br(v-if="power.castingPeriodText || power.range || power.duration")
      VueMarkdown {{ power.description }}
</template>

<style lang="scss">
  .powerPanel .v-expansion-panel__header {
    min-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
