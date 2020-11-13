<script lang="ts">
  import VueMarkdown from 'vue-markdown'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { RawClassType, RawFeatType, RawASIType } from '@/types/rawCharacterTypes'
  import { FeatType } from '@/types/characterTypes'
  import { namespace } from 'vuex-class'
  import MySelect from '@/components/MySelect.vue'

  const featModule = namespace('feats')

  @Component({
    components: {
      VueMarkdown,
      MySelect
    }
  })
  export default class CharacterBuilderClassASI extends Vue {
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Number) readonly index!: number

    @featModule.State feats!: FeatType[]
    @featModule.Action fetchFeats!: () => void

    asiOptions = [
      'Strength',
      'Dexterity',
      'Constitution',
      'Intelligence',
      'Wisdom',
      'Charisma'
    ]

    created () {
      this.fetchFeats()
    }

    get asi () {
      return this.myClass.abilityScoreImprovements[this.index]
    }

    get selectedAbilityScores () {
      if (!this.isASI(this.asi) || this.asi.abilitiesIncreased.length === 0) return []
      const first = this.asi.abilitiesIncreased[0]
      return first.value === 2 ? [ first.name, first.name ] : this.asi.abilitiesIncreased.map(({ name }) => name)
    }

    get featOptions () {
      return this.feats.map(({ name }) => name)
    }

    get featText () {
      if (!this.isFeat(this.asi)) return ''
      const asiName = this.asi.name
      const featData = this.feats.find(({ name }) => name === asiName)
      return featData ? featData.text : ''
    }

    isASI (asi: RawFeatType | RawASIType): asi is RawASIType {
      return asi && asi.type === 'Ability Score Improvement'
    }

    isFeat (asi: RawFeatType | RawASIType): asi is RawFeatType {
      return asi && asi.type === 'Feat'
    }

    handleChangeType (type: string) {
      const asi = type === 'Feat' ? { type, name: '' } : { type, abilitiesIncreased: [] }
      this.$emit('updateASI', asi)
    }

    handleUpdateASI (name: string, index: 0 | 1) {
      if (!this.isASI(this.asi)) return
      const otherAbility = this.asi.abilitiesIncreased[index ? 0 : 1]
      let abilitiesIncreased = this.asi.abilitiesIncreased
      if (otherAbility && name === otherAbility.name) abilitiesIncreased = [{ name, value: 2 }]
      else abilitiesIncreased[index] = { name, value: 1 }
      this.$emit('updateASI', { type: 'Ability Score Improvement', abilitiesIncreased })
    }

    handleUpdateFeat (name: string) {
      this.$emit('updateASI', { type: 'Feat', name })
    }
  }
</script>

<template lang="pug">
  div
    div.d-flex.flex-wrap
      MySelect(
        :value="asi && asi.type",
        :items="['Ability Score Improvement', 'Feat']",
        placeholder="Choose an option",
        dense,
        hide-details,
        @input="handleChangeType"
      ).mx-2
      template(v-if="asi && asi.type === 'Ability Score Improvement'")
        MySelect(
          :value="selectedAbilityScores[0]",
          :items="asiOptions",
          dense,
          filled,
          hide-details,
          placeholder="Choose an ability score to increase",
          @input="newAbility => handleUpdateASI(newAbility, 0)"
        ).mx-2
          template(v-slot:selection="data")
            span {{ data && data.item }} +1
        MySelect(
          :value="selectedAbilityScores[1]",
          :items="asiOptions",
          dense,
          filled,
          hide-details,
          placeholder="Choose an ability score to increase",
          @input="newAbility => handleUpdateASI(newAbility, 1)"
        ).mx-2
          template(v-slot:selection="data")
            span {{ data && data.item }} +1
      template(v-else-if="asi && asi.type === 'Feat'")
        v-autocomplete(
          :value="asi.name",
          :items="featOptions",
          dense,
          filled,
          hide-details,
          placeholder="Choose a feat",
          @input="handleUpdateFeat"
        ).mx-2
    VueMarkdown(:source="featText").caption
</template>
