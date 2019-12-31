<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { TweaksType } from '@/types/rawCharacterTypes'
  import { map, startCase, set, get, parseInt as _parseInt, isEmpty, chain } from 'lodash'
  import { SkillType } from '@/types/lookupTypes'

  const skillsModule = namespace('skills')

  @Component
  export default class CharacterSheetSettingsTweaks extends Vue {
    @Prop(Object) readonly tweaks!: TweaksType

    @skillsModule.State skills!: SkillType[]
    @skillsModule.Action fetchSkills!: () => void

    get = get
    isEmpty = isEmpty

    get tweaksList () {
      return [
        {
          category: 'Combat',
          subtweaks: [
            { name: 'Hit Point Maximum', path: 'hitPoints.maximum' },
            { name: 'To Hit', path: 'weapon.toHit' },
            { name: 'Damage Bonus', path: 'weapon.damage' },
            { name: 'Unarmed Damage Dice', path: 'unarmed.damageDice', type: 'dice' },
            { name: 'Unarmed To Hit', path: 'unarmed.toHit' },
            { name: 'Unarmed Damage Bonus', path: 'unarmed.damage' }
          ]
        },
        ...chain(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'])
          .keyBy()
          .map(ability => {
            const skillList = this.skills
              .filter(({ baseAttribute }) => ability === baseAttribute)
              .map(({ name }) => name)
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
          .value(),
        {
          category: 'Powers',
          subtweaks: [
            { name: 'Max Superiority Dice', path: 'superiority.maxDice' },
            { name: 'Max Force Points', path: 'forceCasting.maxPoints' },
            { name: 'Max Tech Points', path: 'techCasting.maxPoints' }
          ]
        }
      ]
    }

    get diceSizes () {
      return [4, 6, 8, 10, 12].map(value => ({ text: 'd' + value, value }))
    }

    updateTweak (newValue: string, tweakType: string, path: string) {
      let tweaks = { ...this.tweaks }
      let sanitizedValue: number | null = _parseInt(newValue)
      if (isNaN(sanitizedValue)) sanitizedValue = null
      set(tweaks, `${path}.${tweakType}`, sanitizedValue)

      if (tweakType !== 'dieSize') {
        const otherTweakType = tweakType === 'override' ? 'bonus' : 'override'
        set(tweaks, `${path}.${otherTweakType}`, null)
      }

      this.$emit('replaceCharacterProperty', { path: 'tweaks', property: tweaks })
    }
  }
</script>

<template lang="pug">
  div.pt-5
    h2 Tweak Values
    div.caption Set a bonus to add a positive or negative number to the calculated value. Set an override to ignore the calculated value.
    div(v-for="({ category, subtweaks }) in tweaksList", :key="category")
      h3 {{ category }}
      v-container
        v-row(v-for="({ name, path, type }) in subtweaks", :key="category + name").d-flex
          v-col(cols="4").pa-0.d-flex.align-center
            h5 {{ name }}
          v-col(v-if="type === 'dice'", cols="8").pa-0
            v-select(
              :value="get(tweaks, path + '.dieSize')"
              outlined,
              :items="diceSizes",
              hide-details,
              clearable,
              label="Dice Size",
              @input="newValue => updateTweak(newValue, 'dieSize', path)"
            ).pa-1
          template(v-else)
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
    v-btn(
      v-if="!isEmpty(tweaks)"
      color="red",
      @click="$emit('replaceCharacterProperty', { path: 'tweaks', property: {} })"
    ).white--text Clear All Tweaks
</template>
