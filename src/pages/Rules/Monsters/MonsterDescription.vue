<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { MonsterType } from "@/types/referenceTypes.ts";
import VueMarkdown from "vue-markdown";
import Loading from "@/components/Loading.vue";
import _ from "lodash";

@Component({
  components: {
    VueMarkdown,
    Loading
  }
})
export default class MonsterDescription extends Vue {
  @Prop(Object) readonly monster!: MonsterType;
  @Prop(Boolean) readonly isAtDetail!: boolean;

  get abilityScores() {
    return (
      this.monster && [
        {
          score: "STR",
          value: this.monster.strength,
          modifier: this.addPlus(this.monster.strengthModifier)
        },
        {
          score: "DEX",
          value: this.monster.dexterity,
          modifier: this.addPlus(this.monster.dexterityModifier)
        },
        {
          score: "CON",
          value: this.monster.constitution,
          modifier: this.addPlus(this.monster.constitutionModifier)
        },
        {
          score: "INT",
          value: this.monster.intelligence,
          modifier: this.addPlus(this.monster.intelligenceModifier)
        },
        {
          score: "WIS",
          value: this.monster.wisdom,
          modifier: this.addPlus(this.monster.wisdomModifier)
        },
        {
          score: "CHA",
          value: this.monster.charisma,
          modifier: this.addPlus(this.monster.charismaModifier)
        }
      ]
    );
  }

  get isDark() {
    return this.$vuetify.theme.dark;
  }

  behaviors(type: string) {
    return (
      this.monster &&
      this.monster.behaviors.filter(
        ({ monsterBehaviorType }) => monsterBehaviorType === type
      )
    );
  }

  addPlus(value: number) {
    return value >= 0 ? "+" + value : value.toString();
  }

  hasListOrOther(field: string) {
    return (
      this.monster &&
      ((this.monster as any)[field].length ||
        (this.monster as any)[field + "Other"])
    );
  }

  joinWithOther(field: string) {
    return [
      ...((this.monster && (this.monster as any)[field]) || []),
      ...((this.monster && (this.monster as any)[field + "Other"]) || [])
    ].join(", ");
  }
}
</script>

<template lang="pug">
  div( v-if="monster" ).text-left
    h1 {{ monster.name }}
      a(:href="`/rules/monsters/monsters/${monster.name}`", target="_blank")
        v-btn(v-if="!isAtDetail", text, icon, color="secondary")
          v-icon fa-external-link-alt
    i {{ monster.size }} {{ monster.types.join(', ')}}, {{ monster.alignment }}
    hr
    div(:class="[ $style.sectionFlavorText, { [$style.darkSide]: isDark } ]") {{monster.sectionText}}
    div(:class="[ $style.monsterFlavorText, { [$style.darkSide]: isDark } ]") {{monster.flavorText}}
    hr.mt-2
    div #[strong Armor Class] {{ monster.armorClass }} ({{ monster.armorType }})
    div #[strong Hit Points] {{ monster.hitPoints }} ({{ monster.hitPointRoll }})
    div #[strong Speed] {{ monster.speeds }}
    hr
    div(:class="$style.abilityScores").text-center
      div(v-for="{ score, value, modifier } in abilityScores", :key="score").ma-2
        strong {{ score }}
        div {{ value }} ({{ modifier }})
    hr
    div(v-if="monster.savingThrows") #[strong Saving Throws] {{ monster.savingThrows.join(', ') }}
    div(v-if="monster.skills") #[strong Skills] {{ monster.skills.join(', ') }}
    div(v-if="hasListOrOther('damageVulnerabilities')") #[strong Damage Vulnerabilities] {{ joinWithOther('damageVulnerabilities') }}
    div(v-if="hasListOrOther('damageResistances')") #[strong Damage Resistances] {{ joinWithOther('damageResistances') }}
    div(v-if="hasListOrOther('damageImmunities')") #[strong Damage Immunities] {{ joinWithOther('damageImmunities') }}
    div(v-if="hasListOrOther('conditionImmunities')") #[strong Condition Immunities] {{ joinWithOther('conditionImmunities') }}
    div(v-if="monster.senses && monster.senses.length") #[strong Senses] {{ monster.senses.join(', ').replace(/\ufffd/g, '-') }}
    div(v-if="monster.languages && monster.languages.length") #[strong Languages] {{ monster.languages.join(', ').replace(/\ufffd/g, '-') }}
    div #[strong Challenge] {{ monster.challengeRating }} ({{ monster.experiencePoints.toLocaleString() }} XP)
    hr
    div(v-if="behaviors('Trait').length")
      h3 Traits
      p(v-for="{ name, description, restrictions } in behaviors('Trait')", :key="name")
        strong {{ name }}
        span(v-if="restrictions")  ({{ restrictions }})
        span . {{ description }}
    div(v-if="behaviors('Action').length")
      h3 Actions
      p(v-for="{ name, description, restrictions } in behaviors('Action')", :key="name")
        strong {{ name }}
        span(v-if="restrictions")  ({{ restrictions }})
        span . {{ description }}
    div(v-if="behaviors('Reaction').length")
      h3 Reactions
      p(v-for="{ name, description, restrictions } in behaviors('Reaction')", :key="name")
        strong {{ name }}
        span(v-if="restrictions")  ({{ restrictions }})
        span . {{ description }}
    div(v-if="behaviors('Legendary').length")
      h3 Legendary Actions
      p The {{ monster.name }} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The {{ monster.name }} regains spent legendary actions at the start of their turn.
      p(v-for="{name, description, restrictions} in behaviors('Legendary')", :key="name")
        strong {{name}}
        span(v-if="restrictions")  ({{ restrictions }})
        span . {{ description }}
  Loading(v-else)
</template>

<style module lang="scss">
.abilityScores {
  display: flex;
  justify-content: flex-start;
}

.sectionFlavorText {
  display: flex;
  margin-left: 48px;
  margin-right: 48px;
  margin-top: 12px;
  margin-bottom: 12px;
  justify-content: flex-start;
  font-style: italic;

  border-top: 1px black solid;

  &.darkSide {
    border-top: 1px white solid;
  }
}

.monsterFlavorText {
  display: flex;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 12px;
  margin-bottom: 12px;
  justify-content: flex-start;
  font-style: italic;

  border-bottom: 1px black solid;

  &.darkSide {
    border-bottom: 1px white solid;
  }
}
</style>
