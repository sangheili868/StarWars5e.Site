<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Roll20Instructions from '@/components/Roll20Instructions.vue'
  import MyDialog from '@/components/MyDialog.vue'
  import { camelCase, map, mapValues, chain, snakeCase, groupBy } from 'lodash'
  import { Roll20CharacterType } from '@/types/exportTypes'
  import { MonsterType, SkillsType } from '@/types/referenceTypes.ts'
  import { namespace } from 'vuex-class'

  const skillsModule = namespace('skills')

  @Component({
    components: {
      Roll20Instructions,
      MyDialog
    }
  })
  export default class MonsterRoll20 extends Vue {
    @Prop(Object) readonly monster!: MonsterType

    @skillsModule.State skills!: SkillsType
    @skillsModule.Action fetchSkills!: () => void
    isOpen = false

    created () {
      this.fetchSkills()
    }

    get jsonData (): Roll20CharacterType {
      const m = this.monster
      const abilities = groupBy(this.skills, 'baseAttribute')
      const abilityScores = map(abilities, (skillList, ability) => ({
        [ability.toLowerCase()]: m[ability.toLowerCase() as 'charisma'],
        [ability.toLowerCase() + '_base']: m[ability.toLowerCase() as 'charisma'].toString(),
        [ability.toLowerCase() + '_mod']: m[ability.toLowerCase() + 'Modifier' as 'charismaModifier']
      }))
      const attribs: { [key: string]: string | number } = {
        ac: m.armorClass,
        ...Object.assign({}, ...abilityScores)
      }
      const attribsWithMax = [
        {
          name: 'hp',
          current: m.hitPoints,
          max: m.hitPoints
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
          ...map(attribs, (current, name) => ({ name, current, max: '', id: '' }))
        ],
        abilities: []
      }
    }

    saveToFile () {
      window.alert(JSON.stringify(this.jsonData, null, 2))
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
      v-btn(v-on="on", color="primary").d-none Export to Roll20
    template(#title) Export Monster to Roll 20
    template(#text)
      Roll20Instructions
    template(#actions)
      v-btn.mt-3(color="primary", @click="saveToFile") Save file
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>
