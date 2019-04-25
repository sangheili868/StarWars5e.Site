<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { MonsterType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'
  import Loading from '@/components/Loading.vue'

  const monsterModule = namespace('monsters')

  @Component({
    components: {
      VueMarkdown,
      Loading
    }
  })
  export default class ReferenceMonstersDetail extends Vue {
    @monsterModule.State monsters!: MonsterType[]
    @monsterModule.Action fetchMonsters!: () => void

    @Prop(String) readonly monsterName!: string

    created () {
      this.fetchMonsters()
    }

    get monster () {
      return this.monsters.find(({ name }: MonsterType) => name === this.monsterName)
    }

    get abilityScores () {
      return this.monster && [
        { score: 'STR', value: this.monster.strength, modifier: this.addPlus(this.monster.strengthModifier) },
        { score: 'DEX', value: this.monster.dexterity, modifier: this.addPlus(this.monster.dexterityModifier) },
        { score: 'CON', value: this.monster.constitution, modifier: this.addPlus(this.monster.constitutionModifier) },
        { score: 'INT', value: this.monster.intelligence, modifier: this.addPlus(this.monster.intelligenceModifier) },
        { score: 'WIS', value: this.monster.wisdom, modifier: this.addPlus(this.monster.wisdomModifier) },
        { score: 'CHA', value: this.monster.charisma, modifier: this.addPlus(this.monster.charismaModifier) }
      ]
    }

    behaviors (type: string) {
      return this.monster && this.monster.behaviors.filter(({ monsterBehaviorType }) => monsterBehaviorType === type)
    }

    addPlus (value: number) {
      return value >= 0 ? '+' + value : value.toString()
    }

    hasParsedOrOther (field: string) {
      return this.monster && (
        (this.monster as any)[field + 'Parsed'] ||
        (this.monster as any)[field + 'Other']
      )
    }

    joinParsedAndOther (field: string) {
      return [
        ...(this.monster && (this.monster as any)[field + 'Parsed']) || [],
        ...(this.monster && (this.monster as any)[field + 'Other']) || []
      ].join(', ')
    }
  }
</script>

<template lang="pug">
  div( v-if="monster" ).text-xs-left
    h1 {{ monster.name }}
    i {{ monster.size }} {{ monster.types.join(', ')}}, {{ monster.alignment }}
    hr.mt-2
    div #[strong Armor Class:] {{ monster.armorClass }} ({{ monster.armorType }})
    div #[strong Hit Points:] {{ monster.hitPoints }} ({{ monster.hitPointRoll }})
    div #[strong Speed:] {{ monster.speed }} ft.
    hr
    div(:class="$style.abilityScores").text-xs-center
      div(v-for="{ score, value, modifier } in abilityScores", :key="score").ma-2
        strong {{ score }}
        div {{ value }} ({{ modifier }})
    hr
    div(v-if="monster.savingThrows") #[strong Saving Throws:] {{ monster.savingThrows.join(', ') }}
    div(v-if="monster.skills") #[strong Skills:] {{ monster.skills.join(', ') }}
    div(v-if="hasParsedOrOther('damageVulnerabilities')") #[strong Damage Vulnerabilities:] {{ joinParsedAndOther('damageVulnerabilities') }}
    div(v-if="hasParsedOrOther('damageResistances')") #[strong Damage Resistances:] {{ joinParsedAndOther('damageResistances') }}
    div(v-if="hasParsedOrOther('damageImmunities')") #[strong Damage Immunities:] {{ joinParsedAndOther('damageImmunities') }}
    div(v-if="hasParsedOrOther('conditionImmunities')") #[strong Condition Immunities:] {{ joinParsedAndOther('conditionImmunities') }}
    div #[strong Senses:] {{ monster.senses.join(', ') }}
    div #[strong Languages:] {{ monster.languages.join(', ') }}
    div #[strong Challenge:] {{ monster.challengeRating }} ({{ monster.experiencePoints.toLocaleString() }} XP)
    hr
    p(v-for="{ name, description } in behaviors('Trait')", :key="name") #[strong {{ name }}] {{ description }}
    h3 Actions
    VueMarkdown(v-for="{ name, description } in behaviors('Action')", :key="name") **{{ name }}** {{ description }}
  Loading(v-else)
</template>

<style module lang="scss">
  .abilityScores {
    display: flex;
    justify-content: flex-start;
  }
</style>
