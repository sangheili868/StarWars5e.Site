<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import VueMarkdown from 'vue-markdown'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import { namespace } from 'vuex-class'
  import { FeatType } from '@/types/characterTypes'
  import { CompletedFeatureType } from '@/types/completeCharacterTypes'

  const featsModule = namespace('feats')

  @Component({
    components: {
      MyDialog,
      VueMarkdown,
      CharacterSheetExpansionFeatures
    }
  })
  export default class CharacterSheetCustomFeats extends Vue {
    @Prop(Number) readonly numCustomFeats!: number
    @Prop(Array) readonly combatFeatures!: CompletedFeatureType[]

    @featsModule.State feats!: FeatType[]
    isOpen = false
    selected = ''

    get filteredFeats () {
      const combatNames = this.combatFeatures.map(({ name }) => name)
      return this.feats.filter(({ name }) => !combatNames.includes(name)).map(({ name }) => name)
    }

    get selectedFeat () {
      return this.feats.find(({ name }) => name === this.selected)
    }

    addItem () {
      this.$emit('updateCharacter', { customFeats: { [this.numCustomFeats]: this.selected } })
      this.isOpen = false
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on", icon, @click="selected=''", color="primary")
        v-icon fa-plus
    template(#title) Add Feat
    template(#text)
      v-autocomplete(v-model="selected", :items="filteredFeats", label="Select feat")
      div(v-if="selectedFeat")
        VueMarkdown(:source="selectedFeat.text")
    template(#actions)
      v-btn(color="primary", :disabled="!selected", @click="addItem") Add
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
