<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType, isCharacterEnhancedItem, isCharacterValidLootType } from '@/types/completeCharacterTypes'
  import { isCustomProficiency, RawCharacterType } from '@/types/rawCharacterTypes'
  import { Roll20CharacterType } from '@/types/exportTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import { saveAs } from 'file-saver'
  import { camelCase, map, mapValues, chain, snakeCase } from 'lodash'
  import { isEnhancedItem } from '@/types/lootTypes'
  import { CharacterValidationType } from '@/types/utilityTypes'
  import Roll20Instructions from '@/components/Roll20Instructions.vue'
  import FoundryVTTInstructions from '@/components/FoundryVTTInstructions.vue'
  import makeRoll20ID from '@/utilities/makeRoll20ID'
  import copy from 'copy-to-clipboard'

  @Component({
    components: {
      MyDialog,
      Roll20Instructions,
      FoundryVTTInstructions
    }
  })
  export default class CharacterExportToVTT extends Vue {
    @Prop(Object) readonly completeCharacter!: CompleteCharacterType;
    @Prop(Object) readonly rawCharacter!: RawCharacterType
    @Prop(Object) readonly characterValidation!: CharacterValidationType
    @Prop(Boolean) readonly isRoll20!: Boolean
    isOpen = false

    get label (): string {
      return this.isRoll20 ? 'Roll20' : 'Foundry VTT'
    }

    get jsonData (): Roll20CharacterType {
      const c = this.completeCharacter
      const r = this.rawCharacter

      const abilityScores = map(c.abilityScores, ({ value, modifier, savingThrow, skills }, ability) => ({
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
      }))

      const allPowers = [
        ...(c.forceCasting ? c.forceCasting.powersKnown : []),
        ...(c.techCasting ? c.techCasting.powersKnown : [])
      ]

      const powers = allPowers.map(power => {
        const levelText = power.level ? power.level : 'cantrip'
        const header = `repeating_power-${levelText}_${makeRoll20ID()}_`
        const ability = power.powerType === 'Force' ? ({
            Universal: 'power',
            Light: '@{wisdom_mod}+',
            Dark: '@{charisma_mod}+'
          } as { [key: string]: string })[power.forceAlignment] : '@{intelligence_mod}+'
        return {
          [header + 'powername']: power.name,
          [header + 'powerschool']: power.powerType === 'Force' ? 'force' : 'tech',
          [header + 'powercastingtime']: power.castingPeriodText,
          [header + 'powerrange']: power.range,
          [header + 'powerconcentration']: power.concentration ? '{{concentration=1}}' : '0',
          [header + 'powerduration']: power.duration,
          [header + 'power_ability']: ability,
          [header + 'rollcontent']: '@{wtype}&{template:power} {{level=@{powerschool} @{powerlevel}}} {{name=@{powername}}} {{castingtime=@{powercastingtime}}} {{range=@{powerrange}}} {{target=@{powertarget}}} {{duration=@{powerduration}}} {{description=@{powerdescription}}} {{athigherlevels=@{powerathigherlevels}}}  {{innate=@{innate}}} @{powerconcentration} @{charname_output}',
          [header + 'powerdescription']: power.description,
          [header + 'options-flag']: '0'
        }
      })

      const equipment = c.equipment.map(equipment => {
        const header = 'repeating_inventory_' + makeRoll20ID() + '_item'
        return {
          [header + 'name']: equipment.name,
          [header + 'weight']: !isCharacterEnhancedItem(equipment) && isCharacterValidLootType(equipment) ? equipment.weight : 0,
          [header + 'count']: equipment.quantity
        }
      })

      const languages = [ ...c.languages, ...c.customLanguages ].map(proficiency => {
        const header = 'repeating_proficiencies_' + makeRoll20ID() + '_'
        return {
          [header + 'name']: proficiency,
          [header + 'options-flag']: '0'
        }
      })

      const proficiencies = [ ...c.proficiencies, ...c.customProficiencies ].map(proficiency => {
        if (proficiency.type === 'tool') {
          const header = 'repeating_tool_' + makeRoll20ID() + '_'
          const proficiencyLevel = isCustomProficiency(proficiency) ? proficiency.proficiencyLevel : 'proficiency'
          return {
            [header + 'toolname']: proficiency.name,
            [header + 'toolattr']: 'QUERY',
            [header + 'toolbonus']: '?{Attribute?|Strength,@{strength_mod}|Dexterity,@{dexterity_mod}|Constitution,@{constitution_mod}|Intelligence,@{intelligence_mod}|Wisdom,@{wisdom_mod}|Charisma,@{charisma_mod}}+0+' +
              (proficiencyLevel === 'expertise' ? 2 * c.proficiencyBonus : c.proficiencyBonus),
            [header + 'toolbonus_display']: '?',
            [header + 'toolattr_base']: '?{Attribute?|Strength,@{strength_mod}|Dexterity,@{dexterity_mod}|Constitution,@{constitution_mod}|Intelligence,@{intelligence_mod}|Wisdom,@{wisdom_mod}|Charisma,@{charisma_mod}}',
            [header + 'toolbonus_base']: proficiencyLevel === 'expertise' ? '(@{pb}*2)' : '(@{pb})',
            [header + 'tool_mod']: '0',
            [header + 'options-flag']: '0'
          }
        } else {
          const header = 'repeating_proficiencies_' + makeRoll20ID() + '_'
          return {
            [header + 'name']: proficiency.name,
            [header + 'prof_type']: proficiency.type ? proficiency.type.toUpperCase() : 'OTHER',
            [header + 'options-flag']: '0'
          }
        }
      })

      const bgheader = 'repeating_traits_' + makeRoll20ID() + '_'
      const traits = [
        ...c.combatFeatures.map(combatFeature => {
          const header = 'repeating_traits_' + makeRoll20ID() + '_'
          return {
            [header + 'name']: combatFeature.name,
            [header + 'source']: 'Feat',
            [header + 'description']: combatFeature.text,
            [header + 'options-flag']: '0',
            [header + 'display_flag']: 'on'
          }
        }),
        ...c.backgroundFeature ? [{
          [bgheader + 'name']: c.backgroundFeature.name,
          [bgheader + 'source']: 'Background',
          [bgheader + 'description']: c.backgroundFeature.text,
          [bgheader + 'options-flag']: '0',
          [bgheader + 'display_flag']: 'on'
        }] : [],
        ...c.customFeatures.map(customFeature => {
          const header = 'repeating_traits_' + makeRoll20ID() + '_'
          return {
            [header + 'name']: customFeature.name,
            [header + 'source']: 'Other',
            [header + 'description']: customFeature.content,
            [header + 'options-flag']: '0',
            [header + 'display_flag']: 'on'
          }
        })
      ]

      const attacks = c.weapons.map(weapon => {
        const header = 'repeating_attack_' + makeRoll20ID() + '_'
        const hasDice = weapon.damageNumberOfDice && weapon.damageDieType
        const damage = hasDice ? weapon.damageNumberOfDice + 'd' + weapon.damageDieType : '1'
        const range = weapon.properties[0] !== null && (weapon.properties as string[]).find(property => property.includes('range'))
        const shortAbility = weapon.ability === 'Dexterity' ? 'DEX' : 'STR'
        const abilityModifier = c.abilityScores[weapon.ability].modifier
        const attackRollTemplate = `${abilityModifier}[${shortAbility}] + ${c.proficiencyBonus}[PROF]`
        const damageRollTemplate = `{{dmg1=[[${damage} + ${abilityModifier}[${shortAbility}]]]}} {{dmg1type=${weapon.damageType}}}`
        return {
          [header + 'atkname']: weapon.name,
          [header + 'options-flag']: '0',
          [header + 'atkbonus']: weapon.attackBonus,
          [header + 'atkattr_base']: '@{' + weapon.ability.toLowerCase() + '_mod}',
          [header + 'dmgtype']: weapon.damageType,
          [header + 'dmgbase']: damage,
          [header + 'dmgattr']: '@{' + weapon.ability.toLowerCase() + '_mod}',
          [header + 'atkrange']: range ? range.replace('Ammunition (range ', '').replace(')', '') : '',
          [header + 'atk_desc']: weapon.properties.join(', '),
          [header + 'saveeffect']: ' ',
          [header + 'atkdmgtype']: `${damage}+${abilityModifier} ${weapon.damageType}`,
          [header + 'rollbase_dmg']: '@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} ' +
            '@{dmgflag} ' + damageRollTemplate + '@{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} @{saveflag} {{desc=@{atk_desc}}} ' +
            '@{hldmg} {{powerlevel=@{powerlevel}}} {{innate=@{power_innate}}} {{globaldamage=[[0]]}} ' +
            '{{globaldamagetype=@{global_damage_mod_type}}} @{charname_output}',
          [header + 'rollbase_crit']: '@{wtype}&{template:dmg} {{crit=1}} {{rname=@{atkname}}} @{atkflag} ' +
            '{{range=@{atkrange}}} @{dmgflag}' + damageRollTemplate + '@{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} ' +
            '{{crit1=[[' + damage + ']]}} {{crit2=[[0]]}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} ' +
            '{{powerlevel=@{powerlevel}}} {{innate=@{power_innate}}}' + '{{globaldamage=[[0]]}} {{globaldamagecrit=[[0]]}}' +
            '{{globaldamagetype=@{global_damage_mod_type}}} @{charname_output}',
          [header + 'rollbase']: '@{wtype}&{template:atk} {{mod=@{atkbonus}}} {{rname=[@{atkname}](~repeating_attack_attack_dmg)}} ' +
            '{{rnamec=[@{atkname}](~repeating_attack_attack_crit)}} {{r1=[[@{d20}cs>@{atkcritrange} + ' +
            attackRollTemplate + ']]}} @{rtype}cs>@{atkcritrange} + ' + attackRollTemplate + ']]}} {{range=@{atkrange}}} ' +
            '{{desc=@{atk_desc}}} {{powerlevel=@{powerlevel}}} {{innate=@{power_innate}}} {{globalattack=@{global_attack_mod}}} ' +
            'ammo=@{ammo} @{charname_output}'
        }
      })

      const multiclass = Object.assign({},
        ...[1, 2, 3, 4].map(index => r.classes[index] && Object.assign({
            [`multiclass${index}`]: r.classes[index].name.toLowerCase(),
            [`multiclass${index}_flag`]: '1',
            [`multiclass${index}_lvl`]: r.classes[index].levels
          },
          r.classes[index].archetype && {
            [`multiclass${index}_subclass`]: r.classes[index].archetype!.name
          }
        ))
      )

      const attribs: { [key: string]: string | number } = {
        version: '2.4',
        'options-class-selection': '0',
        class: r.classes[0].name,
        subclass: r.classes[0].archetype ? r.classes[0].archetype.name : '',
        ...multiclass,
        class_display: r.classes
          .map(({ name, archetype, levels }) => (archetype ? archetype.name : '') + ' ' + name + ' ' + levels)
          .join(', '),
        base_level: r.classes[0].levels.toString(),
        level: c.currentLevel,
        pb: c.proficiencyBonus.toString(),
        ac: c.armorClass.toString(),
        initiative_bonus: c.initiative,
        speed: c.speed.base,
        race: c.species,
        race_display: c.species,
        experience: c.experiencePoints.current.toString(),
        background: c.background,
        alignment: c.alignment,
        ...Object.assign({}, ...abilityScores, ...powers, ...equipment, ...languages, ...attacks, ...traits, ...proficiencies),
        hitdietype: parseInt(c.hitPoints.hitDice[0].size.replace('d', '')),
        hitdie_final: '@{hitdietype}',
        personality_traits: c.characteristics['Personality Traits'],
        ideals: c.characteristics.Ideal,
        bonds: c.characteristics.Bond,
        flaws: c.characteristics.Flaw,
        hair: c.characteristics.Hair,
        'options-flag-personality': '0',
        'options-flag-ideals': '0',
        'options-flag-bonds': '0',
        'options-flag-flaws': '0',
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
        tech_power_points_expended: c.techCasting ? c.techCasting.maxPoints - c.techCasting.pointsUsed : 0
      }

      const attribsWithMax = [
        {
          name: 'hp',
          current: c.hitPoints.current.toString(),
          max: c.hitPoints.maximum.toString()
        },
        {
          name: 'hit_dice',
          current: c.hitPoints.hitDice.reduce((acc, { current }) => acc + current, 0),
          max: c.hitPoints.hitDice.map(({ size, maximum }) => maximum + size).join(' ')
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

    saveToFile () {
      try {
        saveAs(
          new Blob([JSON.stringify(this.jsonData, null, 2)], {
            type: 'text/plain;charset=utf-8;'
          }),
          camelCase(this.completeCharacter.name) + '_roll20.json'
        )
      } catch (e) {
        window.alert('Error exporting character. Please report to #website-bug-reports in Discord.\n\n' + e.name + ': ' + e.message)
        throw (e)
      }
    }

    copyCharacter () {
      copy(JSON.stringify(this.jsonData, null, 2))
      window.alert('Foundry VTT character data copied to clipboard!')
    }
  }
</script>

<template lang="pug">
  v-tooltip(v-if="characterValidation.code !== 0", top)
    template(v-slot:activator="{ on }")
      span(v-on="on")
        v-btn(disabled, :class="$style.button").mt-2 Export to {{label}}
    div {{ characterValidation.message }}
  MyDialog(v-else, v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(:class="$style.button", v-on="on").mt-2 Export to {{label}}
    template(#title) Export Character to {{label}}
    template(#text)
      Roll20Instructions(v-if="isRoll20")
      FoundryVTTInstructions(v-else)
    template(#actions)
      v-btn.mt-3(v-if="isRoll20", color="primary", @click="saveToFile") Save file
      v-btn.mt-3(v-else, color="primary", @click="copyCharacter") Copy file
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>

<style module lang="scss">
  .button {
    width: 100%;
  }
</style>
