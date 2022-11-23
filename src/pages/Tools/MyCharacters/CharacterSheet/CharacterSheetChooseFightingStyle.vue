<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import MySelect from '@/components/MySelect.vue'
  import { FightingStyleType } from '@/types/characterTypes'
  import { range } from 'lodash'
  import { namespace } from 'vuex-class'

  const fightingStylesModule = namespace('fightingStyles')

  @Component({
    components: {
      MyDialog,
      MySelect
    }
  })
  export default class CharacterSheetChooseFightingStyle extends Vue {
    @Prop(String) readonly featureName!: string

    @fightingStylesModule.State fightingStyles!: FightingStyleType[]
    @fightingStylesModule.Action fetchFightingStyles!: () => void

    isOpen = false
    chosenFightingStyle = ''
    range = range

    get fightingStyleChoices () {
      const currentFightingStyleList = this.fightingStyles.map(({ name }) => name)
      return this.fightingStyles.map(({ name }) => name).filter(name => !currentFightingStyleList.includes(name))
    }

    get fightingStyleData () {
      return this.fightingStyles.find(({ name }) => name === this.chosenFightingStyle)
    }

    handleSelect () {
      // this.$emit('updateCharacter', { customFeats: { [this.numCustomFeats]: this.selected } })
      this.isOpen = false
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen", wide)
    template(v-slot:activator="{ on }")
      v-btn(color="primary", v-on="on", @click="chosenFightingStyle=''").mt-3 Choose Fighting Style
    template(#title) Choose Fighting Style
    template(#text)
      MySelect(v-model="chosenFightingStyle", :items="fightingStyleChoices", label="Choose a fighting style")
      h4(v-for="(fightingStyle, index) in fightingStyles", :key="fightingStyle.name + index") {{ fightingStyle.name }}
    template(#actions)
      v-btn(color="primary", :disabled="!chosenFightingStyle", @click="handleSelect") Choose Fighting Style
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Cancel
</template>
