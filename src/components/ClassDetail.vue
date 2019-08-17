<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'
  import LevelTable from '@/components/LevelTable.vue'
  import ImageWithLoading from '@/components/ImageWithLoading.vue'

  @Component({
    components: {
      VueMarkdown,
      LevelTable,
      ImageWithLoading
    }
  })
  export default class ClassDetail extends Vue {
    @Prop(Object) readonly classData!: ClassType

    get isDark () {
      return this.$vuetify.dark
    }
  }
</script>

<template lang="pug">
  div(v-if="classData").text-xs-left
    h1 {{ classData.name }}
    ImageWithLoading(:src="classData.imageUrls[0]", :class="$style.portrait", height="350", width="350", contain).ma-2
    VueMarkdown(:source="classData.flavorText")
    p {{ classData.creatingText.replace(/\ufffd/g, '-') }}
    h4 Quick Build
    p {{ classData.quickBuildText }}

    LevelTable(:title="classData.name", :levels="classData.levelChanges")

    h2 Class Features
    p As a {{ classData.name }}, you gain the following class features.

    h4 Hit Points
    div #[strong Hit Dice:] 1d{{ classData.hitDiceDieType }} per {{ classData.name }} level
    div #[strong Hit Points at 1st Level:] {{ classData.hitPointsAtFirstLevel }}
    div.mb-2 #[strong Hit Points at Higher Levels:] {{ classData.hitPointsAtHigherLevels }}

    h4 Proficiencies
    div #[strong Armor:] {{ classData.armorProficiencies.join(', ') }}
    div #[strong Weapons:] {{ classData.weaponProficiencies.join(', ') }}
    div.mb-2 #[strong Tools:] {{ classData.toolProficiencies.join(', ') }}

    div #[strong Saving Throws:] {{ classData.savingThrows.join(', ') }}
    div.mb-2 #[strong Skills:] {{ classData.skillChoices }}

    h4 Equipment
    p You start with the following equipment, in addition to the equipment granted by your background
    VueMarkdown(:source="classData.equipmentLines.join('\\n')")

    h4.mt-2 Variant: Starting Wealth
    p.
      In lieu of the equipment granted by your class and background, you can elect to purchase your starting gear. If
      you do so, you receive no equipment from your class and background, and instead roll for your starting wealth
      using the criteria below:
    div(:class="$style.variantWealth")
      div.d-flex
        strong Class
        strong.text-xs-right Funds
      div(:class="[ $style.funds, { [$style.darkSide]: isDark } ]").d-flex
        div {{ classData.name }}
        div.text-xs-right {{ classData.startingWealthVariant }}
    br
    VueMarkdown(:source="classData.classFeatureText")
    VueMarkdown(v-if="classData.classFeatureText2", :source="classData.classFeatureText2")
</template>

<style module lang="scss">
  @import "@/assets/styles/colors.scss";

  .portrait {
    float: right;
    min-height: 350px;
    min-width: 350px;
  }

  .variantWealth {
    max-width: 500px;
  }

  .funds {
    background: $lightGrey;

    &.darkSide {
      background: $darkSideLightGrey;
    }
  }
</style>
