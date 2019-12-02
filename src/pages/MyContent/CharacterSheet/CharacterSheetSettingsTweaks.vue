<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { TweaksType } from '@/types/rawCharacterTypes'
  import { skills } from '@/test/gameData.json'
  import { map, startCase, set, get, parseInt as _parseInt } from 'lodash'

  @Component
  export default class CharacterSheetSettingsTweaks extends Vue {
    @Prop(Object) readonly tweaks!: TweaksType

    get = get
    baseTweaks = [
      {
        category: 'General Stats',
        subtweaks: [
          { name: 'Initiative Modifier', path: 'initiative' },
          { name: 'Proficiency Bonus', path: 'proficiencyBonus' },
          { name: 'Armor Class', path: 'armorClass' },
          { name: 'Hit Point Maximum', path: 'hitPoints.maximum' },
          { name: 'Passive Perception', path: 'passivePerception' },
          { name: 'Vision', path: 'vision' },
          { name: 'Speed', path: 'speed.base' }
        ]
      },
      {
        category: 'Weapons',
        subtweaks: [
          { name: 'To Hit', path: 'weapon.toHit' },
          { name: 'Damage Bonus', path: 'weapon.damage' }
        ]
      }
    ]

    get abilityScoreTweaks () {
      return map(skills, (skillList: string[], ability) => {
        const basePath = `abilityScores.${ability}`
        return {
          category: ability,
          subtweaks: [
            { name: 'Ability Score', path: `${basePath}.score` },
            { name: 'Saving Throw Modifier', path: `${basePath}.savingThrowModifier` },
            ...skillList.map(skill => ({
              name: skill,
              path: `${basePath}.skills.${skill}`
            }))
          ]
        }
      })
    }

    get castingTweaks () {
      return ['tech', 'force'].map(castingType => ({
        category: startCase(castingType) + ' Casting',
        subtweaks: [
          { name: 'Max Points', path: castingType + 'Casting.maxPoints' },
          { name: 'Attack Modifier', path: castingType + 'Casting.attackModifier' },
          { name: 'Save DC', path: castingType + 'Casting.saveDC' },
          { name: 'Max Power Level', path: castingType + 'Casting.maxPowerLevel' }
        ]
      }))
    }

    get tweaksList () {
      const hitDice = {
        category: 'Hit Dice Maximum',
        subtweaks: ['d6', 'd8', 'd10', 'd12'].map(hitDie => ({
          name: `${hitDie}s`,
          path: `hitPoints.hitDie.${hitDie}`
        }))
      }
      return [
        ...this.abilityScoreTweaks,
        ...this.baseTweaks,
        hitDice,
        ...this.castingTweaks,
        {
          category: 'Superiority',
          subtweaks: [
            { name: 'Max Dice', path: 'superiority.maxDice' },
            { name: 'Maneuver Save DC', path: 'superiority.maneuverSaveDC' }
          ]
        }
      ]
    }

    updateTweak (newValue: string, tweakType: string, path: string) {
      let tweaks = { ...this.tweaks }
      let sanitizedValue: number | null = _parseInt(newValue)
      if (isNaN(sanitizedValue)) sanitizedValue = null
      set(tweaks, `${path}.${tweakType}`, sanitizedValue)
      this.$emit('replaceCharacterProperty', { path: 'tweaks', property: tweaks })
    }
  }
</script>

<template lang="pug">
  div.pt-5
    h2 Tweak Values
    div {{ tweaks }}
    div(v-for="({ category, subtweaks }) in tweaksList", :key="category")
      h3 {{ category }}
      v-container
        v-row(v-for="({ name, path }) in subtweaks", :key="category + name").d-flex
          v-col(cols="4").pa-0.d-flex.align-center
            h5 {{ name }}
          v-col(cols="4").pa-0
            v-text-field(
              :value="get(tweaks, path + '.bonus')"
              outlined,
              type="number",
              hide-details,
              clearable,
              label="Bonus",
              @input="newValue => updateTweak(newValue, 'bonus', path)"
            ).pa-1
          v-col(cols="4").pa-0
            v-text-field(
              :value="get(tweaks, path + '.override')"
              outlined,
              type="number",
              hide-details,
              clearable,
              label="Override",
              @input="newValue => updateTweak(newValue, 'override', path)"
            ).pa-1
</template>

<style module lang="scss">

</style>
