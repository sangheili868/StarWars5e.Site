<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import { Roll20CharacterType } from '@/types/exportTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import { saveAs } from 'file-saver'
  import { camelCase, map, mapValues, chain, snakeCase } from 'lodash'

  @Component({
    components: {
      MyDialog
    }
  })
  export default class CharacterSheetSettingsRoll20 extends Vue {
  @Prop(Object) readonly completeCharacter!: CompleteCharacterType;
  @Prop(Object) readonly rawCharacter!: RawCharacterType
  isOpen = false

  get jsonData (): Roll20CharacterType {
    const c = this.completeCharacter
    const r = this.rawCharacter

    const forcePowers = Object.assign({}, ...(c.forceCasting ? c.forceCasting.powersKnown.map(power => {
      const levelText = power.level ? power.level : 'cantrip'
      const header = `repeating_power-${levelText}_${this.makeId()}_`
      return {
        [header + 'powername']: power.name,
        [header + 'powerschool']: power.powerType === 'Force' ? 'force' : 'tech',
        [header + 'powercastingtime']: power.castingPeriodText,
        [header + 'powerrange']: power.range,
        [header + 'powerconcentration']: power.concentration ? '{{concentration=1}}' : '0',
        [header + 'powerduration']: power.duration,
        [header + 'power_ability']: ({
          Universal: 'power',
          Light: '@{wisdom_mod}+',
          Dark: '@{charisma_mod}+'
        } as { [key: string]: string })[power.forceAlignment],
        [header + 'rollcontent']: '@{wtype}&{template:power} {{level=@{powerschool} @{powerlevel}}} {{name=@{powername}}} {{castingtime=@{powercastingtime}}} {{range=@{powerrange}}} {{target=@{powertarget}}} {{duration=@{powerduration}}} {{description=@{powerdescription}}} {{athigherlevels=@{powerathigherlevels}}}  {{innate=@{innate}}} @{powerconcentration} @{charname_output}',
        [header + 'powerdescription']: power.description,
        [header + 'options-flag']: '0'
      }
    }) : []))

    const attribs: { [key: string]: string | number } = {
      version: '2.4',
      class: r.classes[0].name,
      subclass: r.classes[0].archetype ? r.classes[0].archetype.name : '',
      class_display: r.classes
        .map(({ name, archetype, levels }) => (archetype ? archetype.name : '') + ' ' + name + ' ' + levels)
        .join(', '),
      base_level: r.classes[0].levels.toString(),
      pb: c.proficiencyBonus.toString(),
      ac: c.armorClass.toString(),
      initiative_bonus: c.initiative,
      speed: c.speed.base,
      race: c.species,
      race_display: c.species,
      experience: c.experiencePoints.current.toString(),
      background: c.background,
      alignment: c.alignment,
      ...Object.assign({}, ...map(c.abilityScores, ({ value, modifier, savingThrow, skills }, ability) => ({
        [ability.toLowerCase()]: value,
        [ability.toLowerCase() + '_base']: value.toString(),
        [ability.toLowerCase() + '_mod']: modifier.toString(),
        [ability.toLowerCase() + '_save_bonus']: savingThrow.modifier,
        [ability.toLowerCase() + '_save_prof']: savingThrow.proficiency !== 'none' ? '(@{pb})' : 0,
        ...Object.assign({}, ...map(skills, ({ name, modifier, proficiency }) => ({
          [snakeCase(name) + '_bonus']: modifier,
          [snakeCase(name) + '_prof']: proficiency !== 'none' ? '(@{pb}*@{' + snakeCase(name) + '_type})' : 0,
          [snakeCase(name) + '_type']: ({
            proficient: 1,
            expertise: 2,
            none: 0
          } as { [key: string]: string | number })[proficiency]
        })))
      }))),
      hitdietype: parseInt(c.hitPoints.hitDice[0].size),
      hitdie_final: '@{hitdietype}',
      personality_traits: c.characteristics['Personality Traits'],
      ideals: c.characteristics.Ideal,
      bonds: c.characteristics.Bond,
      flaws: c.characteristics.Flaw,
      hair: c.characteristics.Hair,
      height: c.characteristics.Height,
      eyes: c.characteristics.Eyes,
      skin: c.characteristics.Skin,
      age: c.characteristics.Age,
      character_appearance: c.characteristics.Appearance,
      character_backstory: c.characteristics.Backstory,
      hp_temp: c.hitPoints.temporary.toString(),
      passive_wisdom: c.passivePerception.toString(),
      cr: c.credits,
      force_power_points_total: c.forceCasting ? c.forceCasting.maxPoints : 0,
      force_power_points_expended: c.forceCasting ? c.forceCasting.maxPoints - c.forceCasting.pointsUsed : 0,
      tech_power_points_total: c.techCasting ? c.techCasting.maxPoints : 0,
      tech_power_points_expended: c.techCasting ? c.techCasting.maxPoints - c.techCasting.pointsUsed : 0,
      ...forcePowers
    }
    const attribsWithMax = [
      {
        name: 'hp',
        current: c.hitPoints.current.toString(),
        max: c.hitPoints.maximum.toString()
      },
      {
        name: 'hit_dice',
        current: c.hitPoints.hitDice[0].current,
        max: c.hitPoints.hitDice[0].maximum
      }
    ]
    return {
      schema_version: 2,
      name: c.name,
      avatar: c.image || '',
      bio: c.characteristics.Backstory,
      exportedBy: 'www.sw5e.com',
      gmnotes: '',
      defaulttoken: '',
      tags: '[]',
      controlledby: '',
      inplayerjournals: '',
      attribs: [
        ...map(attribs, (current, name) => ({ name, current, max: '', id: '' })),
        ...attribsWithMax.map(({ name, current, max }) => ({ name, current, max, id: '' }))
      ],
      abilities: []
    }
  }

  makeId (): string {
    let result = '-M'
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (var i = 0; i < 18; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

  saveToFile () {
    saveAs(
      new Blob([JSON.stringify(this.jsonData, null, 2)], {
        type: 'text/plain;charset=utf-8;'
      }),
      camelCase(this.completeCharacter.name) + '_roll20.json'
    )
  }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on").ma-2 Export to Roll20
    template(#title) Export Character to Roll 20
    template(#text)
      h2.mt-3 Instructions
      div.caption You must be the GM of the campaign to import a character
      ol
        li Ensure that the Roll 20 Campaign is using the
          u.pl-1
            a(href="https://wiki.roll20.net/StarWars5E-Sheet", target="_blank") SW5E character sheet
        li Install #[strong Firefox] and the
          u.pl-1
            a(href="https://addons.mozilla.org/en-US/firefox/addon/roll20-enhancement-suite/", target="_blank") VTT Enhancement Suite
        li Click "Save File" below to download the character File
        li Go to the Roll 20 campaign and open the journal tab
        li At the top of the journal tab, under "Import Character", click "Browse"
        li Open the file you downloaded from this pop-up
        li Click the "Import Character" button that appears once the file is opened
    template(#actions)
      v-btn.mt-3(color="primary", @click="saveToFile") Save file
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>

<style module lang="scss">
</style>
