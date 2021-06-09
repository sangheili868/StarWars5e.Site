<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Roll20Instructions from '@/components/Roll20Instructions.vue'
  import MyDialog from '@/components/MyDialog.vue'
  import { camelCase, map } from 'lodash'
  import { Roll20CharacterType } from '@/types/exportTypes'
  import { MonsterType } from '@/types/referenceTypes'
  import makeRoll20ID from '@/utilities/makeRoll20ID'

  const abilities = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma'
  ]

  @Component({
    components: {
      Roll20Instructions,
      MyDialog
    }
  })
  export default class MonsterRoll20 extends Vue {
    @Prop(Object) readonly monster!: MonsterType

    isOpen = false

    combineWithOther = (list: string[], other: string[], key: string): { [key: string]: string } => {
      const items = [
        ...(list && list.length) ? list : [],
        ...(other && other.length) ? other : []
      ]
      if (items.length) return { [key]: items.join(', ') }
      else return {}
    }

    get jsonData (): Roll20CharacterType {
      const m = this.monster
      const abilityScores = map(abilities, ability => {
        const mod = m[ability.toLowerCase() + 'Modifier' as 'charismaModifier']
        return {
          [ability.toLowerCase()]: m[ability.toLowerCase() as 'charisma'],
          [ability.toLowerCase() + '_base']: m[ability.toLowerCase() as 'charisma'].toString(),
          [ability.toLowerCase() + '_mod']: mod,
          ['npc_' + ability.toLowerCase().substring(0, 3) + '_negative']: mod > 0 ? 0 : 1
        }
      })

      let npcSkillsFlag = ''
      const skills = m.skills ? m.skills.map(skill => {
        const splitSkill = skill.replace(' +', ' ').replace('+', ' ').split(' ')
        const name = splitSkill[0].toLowerCase()
        const value = parseInt(splitSkill[1])
        npcSkillsFlag += value.toString()
        return {
          ['npc_' + name + '_base']: value.toString(),
          ['npc_' + name]: value,
          ['npc_' + name + '_flag']: '1'
        }
      }) : []

      let npcSavingFlag = ''
      const saves = m.savingThrows ? m.savingThrows.map(save => {
        const splitSave = save.split(' ')
        if (splitSave.length !== 2) return {}
        const name = splitSave[0].toLowerCase()
        const value = parseInt(splitSave[1])
        npcSavingFlag += value.toString()
        return {
          ['npc_' + name + '_save_base']: value.toString(),
          ['npc_' + name + '_save']: value,
          ['npc_' + name + '_save_flag']: 1
        }
      }) : []

      let reactionsFlag = {}
      let legendaryActionsCount = {}
      const behaviors = m.behaviors.map(behavior => {
        const name = behavior.name + (behavior.restrictions ? ' (' + behavior.restrictions + ')' : '')
        if (behavior.monsterBehaviorType === 'Trait') {
          const header = 'repeating_npctrait_' + makeRoll20ID() + '_'
          return {
            [header + 'name']: name,
            [header + 'desc']: behavior.description
          }
        } else if (
          behavior.monsterBehaviorType === 'Action' &&
          ['MeleeWeapon', 'RangedWeapon'].includes(behavior.attackType)
        ) {
          const header = 'repeating_npcaction_' + makeRoll20ID() + '_'
          return {
            [header + 'attack_crit']: '',
            [header + 'attack_crit2']: '',
            [header + 'attack_damage']: behavior.damageRoll,
            [header + 'attack_damagetype']: behavior.damageType.toLowerCase(),
            [header + 'attack_flag']: 'on',
            [header + 'attack_onhit']: behavior.damage + ' (' + behavior.damageRoll + ') ' + behavior.damageType.toLowerCase() + ' damage',
            [header + 'attack_range']: behavior.range ? behavior.range.split(' ')[1] || '' : '',
            [header + 'attack_target']: behavior.numberOfTargets,
            [header + 'attack_tohit']: behavior.attackBonus.toString(),
            [header + 'attack_tohitrange']: '+' + behavior.attackBonus + ', ' + behavior.range + ', ' + behavior.numberOfTargets,
            [header + 'attack_type']: behavior.attackType.split('Weapon')[0],
            [header + 'damage_flag']: '{{damage=1}} {{dmg1flag=1}} ',
            [header + 'name']: name,
            [header + 'description']: behavior.description,
            [header + 'npc_options-flag']: '0',
            [header + 'rollbase']: '@{wtype}&{template:npcatk} {{attack=1}} @{damage_flag} @{npc_name_flag} {{rname=[@{name}](~repeating_npcaction_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction_npc_crit)}} {{type=[Attack](~repeating_npcaction_npc_dmg)}} {{typec=[Attack](~repeating_npcaction_npc_crit)}} {{r1=[[@{d20}+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{show_desc}}} @{charname_output}',
            [header + 'show_desc']: ' '
          }
        } else if (behavior.monsterBehaviorType === 'Action') {
          const header = 'repeating_npcaction_' + makeRoll20ID() + '_'
          return {
            [header + 'name']: name,
            [header + 'description']: behavior.description,
            [header + 'npc_options-flag']: '0',
            [header + 'rollbase']: '@{wtype}&{template:npcatk} {{attack=1}} @{damage_flag} @{npc_name_flag} {{rname=[@{name}](~repeating_npcaction_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction_npc_crit)}} {{type=[Attack](~repeating_npcaction_npc_dmg)}} {{typec=[Attack](~repeating_npcaction_npc_crit)}} {{r1=[[@{d20}+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{show_desc}}} @{charname_output}'
          }
        } else if (behavior.monsterBehaviorType === 'Reaction') {
          reactionsFlag = { npcreactionsflag: '1' }
          const header = 'repeating_npcreaction_' + makeRoll20ID() + '_'
          return {
            [header + 'name']: name,
            [header + 'desc']: behavior.description
          }
        } else if (behavior.monsterBehaviorType === 'Legendary') {
          legendaryActionsCount = { npc_legendary_actions: 3 }
          const header = 'repeating_npcaction-l_' + makeRoll20ID() + '_'
          return {
            [header + 'name']: name,
            [header + 'description']: behavior.description,
            [header + 'npc_options-flag']: '0',
            [header + 'rollbase']: '@{wtype}&{template:npcatk} {{attack=1}} @{damage_flag} @{npc_name_flag} {{rname=[@{name}](~repeating_npcaction_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction_npc_crit)}} {{type=[Attack](~repeating_npcaction_npc_dmg)}} {{typec=[Attack](~repeating_npcaction_npc_crit)}} {{r1=[[@{d20}+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{show_desc}}} @{charname_output}'
          }
        }
      })

      const attribs: { [key: string]: string | number } = {
        npc: '1',
        version: '2.4',
        ac: m.armorClass,
        npc_ac: m.armorClass,
        npc_actype: m.armorType,
        npc_challenge: m.challengeRating,
        npc_hpformula: m.hitPointRoll,
        npc_languages: m.languages.join(', '),
        npc_name: m.name,
        npc_senses: m.senses && m.senses.length ? m.senses.join(', ') : '',
        npc_speed: m.speeds,
        npc_type: m.size + ' ' + m.types.join(', ') + ', ' + m.alignment,
        npc_xp: m.experiencePoints.toLocaleString(),
        'npc_options-flag': '0',
        npc_skills_flag: npcSkillsFlag,
        npc_saving_flag: npcSavingFlag,
        initiative_bonus: m.dexterityModifier,
        ...Object.assign({}, ...abilityScores, ...skills, ...saves, ...behaviors),
        ...this.combineWithOther(m.damageVulnerabilities, m.damageVulnerabilitiesOther, 'npc_vulnerabilities'),
        ...this.combineWithOther(m.damageResistances, m.damageResistancesOther, 'npc_resistances'),
        ...this.combineWithOther(m.damageImmunities, m.damageImmunitiesOther, 'npc_immunities'),
        ...this.combineWithOther(m.conditionsImmunities, m.conditionsImmunitiesOther, 'npc_conditionImmunities'),
        ...legendaryActionsCount,
        ...reactionsFlag
      }

      const attribsWithMax = [
        {
          name: 'hp',
          current: m.hitPoints.toString(),
          max: m.hitPoints.toString()
        }
      ]

      return {
        schema_version: 2,
        name: m.name,
        avatar: '',
        bio: '',
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
          camelCase(this.monster.name) + '_roll20.json'
        )
      } catch (e) {
        window.alert('Error exporting character. Please report to #website-bug-reports in Discord.\n\n' + e.name + ': ' + e.message)
        throw (e)
      }
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on", color="primary") Export to Roll20
    template(#title) Export Monster to Roll 20
    template(#text)
      Roll20Instructions
    template(#actions)
      v-btn.mt-3(color="primary", @click="saveToFile") Save file
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
