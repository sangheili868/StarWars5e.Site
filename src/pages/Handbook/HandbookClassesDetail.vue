<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { ClassType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'

  const classesModule = namespace('classes')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class HandbookClassesDetail extends Vue {
    @classesModule.State classes!: ClassType[]
    @classesModule.Action fetchClasses!: () => void

    @Prop(String) readonly className!: string

    created () {
      this.fetchClasses()
    }

    get classData () {
      return this.classes.find(({ name }) => name === this.className)
    }
  }
</script>

<template lang="pug">
  div( v-if="classData" ).text-xs-left
    h1 {{ classData.name }}
    VueMarkdown(:source="classData.flavorText")
    p {{ classData.creatingText }}
    h4 Quick Build
    p {{ classData.quickBuildText }}
    h2 Class Features
    p As a {{ classData.name }}, you gain the following class features.

    h4 Hit Points
    div #[strong Hit Dice:] 1d{{ classData.hitDiceDieType }} per {{ classData.name }} level
    div #[strong Hit Points at 1st Level:] {{ classData.hitPointsAtFirstLevel }}
    div #[strong Hit Points at Higher Levels:] {{ classData.hitPointsAtHigherLevels }}

    h4 Proficiencies
    div #[strong Armor:] {{ classData.armorProficiencies.join(', ') }}
    div #[strong Weapons:] {{ classData.weaponProficiencies.join(', ') }}
    div #[strong Tools:] {{ classData.toolProficiencies.join(', ') }}
    div #[strong Saving Throws:] {{ classData.savingThrows.join(', ') }}
    div #[strong Skills:] {{ classData.skillChoices }}

    h4 Equipment
    p You start with the following equipment, in addition to the equipment granted by your background
    div(v-for="equipmentLine in classData.equipmentLines")
      VueMarkdown(:source="equipmentLine")
    br
    h4 Variant: Starting Wealth
    p.
      In lieu of the equipment granted by your class and background, you can elect to purchase your starting gear. If
      you do so, you receive no equipment from your class and background, and instead roll for your starting wealth
      using the criteria below:
    div {{ classData.name }}: {{ classData.startingWealthVariant }}
    br
    VueMarkdown(:source="classData.classFeatureText")
    VueMarkdown(v-if="classData.classFeatureText2", :source="classData.classFeatureText2")
</template>
