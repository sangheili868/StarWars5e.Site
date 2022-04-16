<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType, ManeuverType, ArchetypeType } from '@/types/characterTypes'
  import { RawClassType, SettingsType } from '@/types/rawCharacterTypes'
  import CharacterSheetExpansionFeatures from '@/pages/Tools/MyCharacters/CharacterSheet/CharacterSheetExpansionFeatures.vue'
  import CharacterSheetSuperiorityAddManeuver from '@/pages/Tools/MyCharacters/CharacterSheet/CharacterSheetSuperiorityAddManeuver.vue'
  import { namespace } from 'vuex-class'

  const maneuversModule = namespace('maneuvers')
  const maneuverRatios: { [myClass: string]: { [archetype: string]: number}} = {
    Fighter: {
      baseClass: 0.5,
      'Tactical Specialist': 1,
      'Fireteam Specialist': 1,
      'Fireteam Specialist (Companion)': 1
    },
    Scholar: {
      baseClass: 1
    },
    Scout: {
      baseClass: 0,
      'Deadeye Technique': 0.5
    }
  }

  @Component({
    components: {
      CharacterSheetExpansionFeatures,
      CharacterSheetSuperiorityAddManeuver
    }
  })
  export default class CharacterBuilderClassManeuvers extends Vue {
    @Prop(Object) readonly myClass!: RawClassType
    @Prop(Object) readonly classData!: ClassType
    @Prop(Object) readonly archetypeData: ArchetypeType | undefined
    @Prop(Object) readonly settings!: SettingsType
    @Prop(Array) readonly allManeuvers!: string[]

    @maneuversModule.State maneuvers!: ManeuverType[]
    @maneuversModule.Action fetchManeuvers!: () => void

    created () {
      this.fetchManeuvers()
    }

    get maneuversSelected (): string[] {
      const classManeuvers = (this.myClass).maneuvers || []
      const archetypeManeuvers = (this.isArchetypeSuperiority && this.myClass.archetype && this.myClass.archetype.maneuvers) || []
      return [ ...classManeuvers, ...archetypeManeuvers ]
    }

    get maneuversSelectedData () {
      return this.maneuvers.filter(({ name }) => this.maneuversSelected.includes(name))
    }

    get classSuperiority () {
      return maneuverRatios[this.classData.name] || { baseClass: 0 }
    }

    get isArchetypeSuperiority () {
      if (!this.classSuperiority || !this.archetypeData) return false
      return this.classSuperiority[this.archetypeData.name] > 0
    }

    get hasManeuvers () {
      return this.classSuperiority.baseClass > 0 || this.isArchetypeSuperiority
    }

    get numberManeuversKnown () {
      const classField = parseInt(this.classData.levelChanges[this.myClass.levels]['Maneuvers Known'])
      let archetypeField = 0
      if (this.isArchetypeSuperiority) {
        const leveledTable = this.archetypeData!.leveledTable
        if (leveledTable) {
          const maneuversKnownKeyValue = leveledTable[this.myClass.levels].find(({ key }) => key === 'Maneuvers Known')
          archetypeField = maneuversKnownKeyValue ? parseInt(maneuversKnownKeyValue.value) : 0
        }
      }
      archetypeField = isNaN(archetypeField) ? 0 : archetypeField
      return isNaN(classField) ? archetypeField : archetypeField || classField
    }

    handleUpdateManeuvers (newManeuvers: string[]) {
      this.$emit('updateManeuvers', { newManeuvers, isArchetype: this.isArchetypeSuperiority })
    }
  }
</script>

<template lang="pug">
.mt-4(
  v-if="hasManeuvers && numberManeuversKnown > 0"
)
  h3 Maneuvers
  div {{ maneuversSelected.length }} / {{ numberManeuversKnown }} Known
  CharacterSheetExpansionFeatures.text-left(
    :features="maneuversSelectedData",
    :class="$style.maneuversList"
  )
  CharacterSheetSuperiorityAddManeuver(
    :disabled="this.maneuversSelected.length >= this.numberManeuversKnown",
    v-bind="{ maneuversSelected, allManeuvers }",
    @updateManeuvers="handleUpdateManeuvers"
  )
</template>

<style lang="scss" module>
.maneuversList {
  max-height: 400px;
  overflow-y: scroll;
}
</style>
