<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { AbilitiesIncreasedType } from '@/types/characterTypes'
  import pluralize from 'pluralize'
  import { RawSpeciesType } from '@/types/rawCharacterTypes'
  import { pickBy, chain } from 'lodash'
  import MySelect from '@/components/MySelect.vue'

  @Component({
    components: {
      MySelect
    }
  })
  export default class CharacterBuilderSpeciesAbilities extends Vue {
    @Prop(Object) readonly currentSpecies!: RawSpeciesType
    @Prop(Array) readonly abilitiesIncreased!: AbilitiesIncreasedType[][]

    abilities = [ 'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma' ]

    get abilitiesIncreasedOptions () {
      // Hardcoded because human is the only race with this option.
      // Otherwise, we will need to construct a string describing the abilityScoreImprovement array
      return [
        { text: 'Any one increases by 2, and any two increase by 1', value: 0 },
        { text: 'Any four increase by 1', value: 1 }
      ]
    }

    get improvementOptions () {
      return this.abilitiesIncreased[this.currentSpecies.abilityScoreImprovementSelectedOption].map(abilityOption => {
        let max = this.getMaxAbilities(abilityOption)
        let choiceList = this.abilities
        if (abilityOption.abilities.length > 1) {
          choiceList = abilityOption.abilities
          max = 1
        }
        const usedAbilities = Object.keys(this.getOtherImprovements(abilityOption.amount))
        const selectedImprovements = this.getImprovementsByAmount(abilityOption.amount, max > 1)
        const isAtMax = max > 1 && selectedImprovements.length >= max
        const choices = choiceList.map(choice => ({
          text: choice,
          disabled: usedAbilities.includes(choice) || (isAtMax && !selectedImprovements.includes(choice))
        }))
        return {
          ...abilityOption,
          max,
          choices,
          label: `Choose ${max} ability ${pluralize('score', max)} to increase by ${abilityOption.amount}`
        }
      }).filter(({ max }) => max)
    }

    getMaxAbilities (abilityOption: AbilitiesIncreasedType) {
      switch (abilityOption.abilities[0]) {
        case 'Any one':
          return 1
        case 'Any two':
          return 2
        case 'Any four':
          return 4
        default:
          return 0
      }
    }

    getImprovementsByAmount (amount: number, isMultiple: boolean) {
      const abilitiesList = chain(this.currentSpecies.abilityScoreImprovement)
        .pickBy(increase => increase === amount)
        .keys()
        .value()
      return isMultiple ? abilitiesList : abilitiesList[0]
    }

    getOtherImprovements (amount: number) {
      return pickBy(this.currentSpecies.abilityScoreImprovement, increase => increase !== amount)
    }

    handleChangeOption (option: string) {
      this.$emit('replaceCharacterProperty', {
        path: 'species',
        property: {
          ...this.currentSpecies,
          abilityScoreImprovementSelectedOption: option,
          abilityScoreImprovement: {}
        }
      })
    }

    handleChangeAbility (amount: number, ability: string | string[]) {
      const newImprovements = Array.isArray(ability)
        ? chain(ability).keyBy().mapValues(ability => amount).value()
        : { [ability]: amount }
      this.$emit('replaceCharacterProperty', {
        path: 'species.abilityScoreImprovement',
        property: {
          ...this.getOtherImprovements(amount),
          ...newImprovements
        }
      })
    }
  }
</script>

<template lang="pug">
  div
    MySelect(
      v-if="abilitiesIncreased.length > 1",
      :value="currentSpecies.abilityScoreImprovementSelectedOption"
      :items="abilitiesIncreasedOptions",
      label="Choose an option",
      @change="handleChangeOption"
    )
    MySelect(
      v-for="({amount, max, label, choices}, index) in improvementOptions",
      :value="getImprovementsByAmount(amount, max > 1)"
      :key="index",
      :multiple="max > 1",
      :items="choices",
      :rules="[items => !Array.isArray(items) || items.length <= max || 'Too many ability scores selected']"
      v-bind="{ label }"
      @change="ability => handleChangeAbility(amount, ability)"
    )
</template>
