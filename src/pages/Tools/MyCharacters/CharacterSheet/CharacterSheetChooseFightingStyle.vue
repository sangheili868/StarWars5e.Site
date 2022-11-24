<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import MySelect from '@/components/MySelect.vue'
  import { FightingStyleType } from '@/types/characterTypes'
  import { range } from 'lodash'
  import { namespace } from 'vuex-class'
  import VueMarkdown from 'vue-markdown'
  import { CompleteCharacterType, CompletedFeatureType } from '@/types/completeCharacterTypes'
  import { e } from 'mathjs'

  const fightingStylesModule = namespace('fightingStyles')

  interface FightingStyleOption {
    selected: boolean,
    name: string,
    description: string,
    rowKey: string
  }

  @Component({
    components: {
      MyDialog,
      MySelect,
      VueMarkdown
    }
  })
  export default class CharacterSheetChooseFightingStyle extends Vue {
    @Prop(Object) readonly feature: CompletedFeatureType
    @Prop(Boolean) readonly hidden: boolean

    @fightingStylesModule.State fightingStyles!: FightingStyleType[]
    @fightingStylesModule.Action fetchFightingStyles!: () => void

    fightingStyleOptions: FightingStyleOption[] = []

    created () {
      this.fetchFightingStyles()
      this.fightingStyleOptions = this.fightingStyles.map(fs => ({
        ...fs,
        rowKey: (fs as any).rowKey,
        selected: this.feature.config && this.feature.config.data === (fs as any).rowKey
      } as FightingStyleOption))
    }

    isOpen = false

    select (fs: any) {
      this.isOpen = false
      setTimeout(() => {
      this.$emit('saveFeatureConfig', {
          data: fs.rowKey,
          featureRowKey: (this.feature as any).rowKey,
          configType: 'FightingStyleType',
          localId: this.feature.config && this.feature.config.localId ? this.feature.config.localId : undefined
        })
      }, 500)
    }

    finish () {
      // this.$emit('updateCharacter', { customFeats: { [this.numCustomFeats]: this.selected } })
      this.isOpen = false
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen", wide)
    template(v-slot:activator="{ on }")
      div
        v-btn(v-if="!feature.config || !feature.config.data", color="primary", v-on="on").mt-3 Choose Fighting Style
      div
        a(v-if="feature.config && feature.config.data", v-on="on").mt-3 Change Fighting Style
    template(#title) Choose Fighting Style
    template(#text)
      v-expansion-panels(accordion, multiple).mt-5
        v-expansion-panel(v-for="(fightingStyle, index) in fightingStyleOptions", :key="fightingStyle.name + index").powerPanel
          v-expansion-panel-header
            v-btn(
              x-small,
              color="primary",
              @click.stop="select(fightingStyle)"
            ).flex-none.mr-5 Select
            h4 {{ fightingStyle.name }}
          v-expansion-panel-content
            VueMarkdown {{ fightingStyle.description }}
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>

<style lang="scss" module>
  .checkbox {
    flex: none !important;
    margin-top: 0 !important;
  }
</style>
