<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CharacterSheetSettingsPDF extends Vue {

  }
</script>

<template lang="pug">
  div(id="pdf", style="color:black;")
    p abc
    div(style='left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;')
      p 123
      div(style='position:absolute;left:0px;top:0px')
        p xyz
        img(:src="require('@/assets/CharacterSheetPage1.jpg')" width='612' height='792')
      .cls_003(style='position:absolute;left:266.50px;top:51.31px')
        span.cls_003 Class(es) & Level
      .cls_003(style='position:absolute;left:451.57px;top:51.31px')
        span.cls_003 Alignment
      .cls_003(style='position:absolute;left:266.50px;top:69.54px')
        span.cls_003 Species
      .cls_003(style='position:absolute;left:451.57px;top:69.54px')
        span.cls_003 Background
      .cls_003(style='position:absolute;left:266.50px;top:88.29px')
        span.cls_003 Experience Points
      .cls_003(style='position:absolute;left:363.76px;top:88.52px')
        span.cls_003 XP Next Level
      .cls_003(style='position:absolute;left:451.57px;top:88.49px')
        span.cls_003 Player’s Name
      .cls_005(style='position:absolute;left:58.21px;top:93.98px')
        span.cls_005 Character Name
      .cls_011(style='position:absolute;left:105.45px;top:122.32px')
        span.cls_011 STRENGTH
      .cls_006(style='position:absolute;left:268.99px;top:120.98px')
        span.cls_006 PROFICIENCY BONUS
      .cls_006(style='position:absolute;left:443.48px;top:121.10px')
        span.cls_006 INITIATIVE
      .cls_002(style='position:absolute;left:123.78px;top:138.60px')
        span.cls_002 ____
        span.cls_008 Saving Throw
      .cls_003(style='position:absolute;left:264.37px;top:147.73px')
        span.cls_003 Medium Armor Master (feat):
      .cls_002(style='position:absolute;left:123.78px;top:154.01px')
        span.cls_002 ____
      .cls_005(style='position:absolute;left:141.40px;top:153.53px')
        span.cls_005 Athletics
      .cls_006(style='position:absolute;left:268.99px;top:158.87px')
        span.cls_006 ARMOR CLASS
      .cls_010(style='position:absolute;left:327.36px;top:173.41px')
        span.cls_010 Ench.
      .cls_010(style='position:absolute;left:339.41px;top:173.41px')
        span.cls_010 ACMax Weight
      .cls_008(style='position:absolute;left:415.03px;top:166.54px')
        span.cls_008 HIT POINTS MAXIMUM
        span.cls_012  __________
      .cls_010(style='position:absolute;left:327.01px;top:176.76px')
        span.cls_010 Bonus
      .cls_010(style='position:absolute;left:348.43px;top:176.76px')
        span.cls_010 DEX
      .cls_011(style='position:absolute;left:105.61px;top:177.22px')
        span.cls_011 DEXTERITY
      .cls_002(style='position:absolute;left:123.94px;top:193.50px')
        span.cls_002 ____
        span.cls_008 Saving Throw
      .cls_002(style='position:absolute;left:124.00px;top:207.49px')
        span.cls_002 ____
        span.cls_005 Acrobatics
      .cls_003(style='position:absolute;left:451.99px;top:208.98px')
        span.cls_003 CURRENT HIT POINTS
      .cls_002(style='position:absolute;left:124.00px;top:220.55px')
        span.cls_002 ____
        span.cls_005 Sleight of Hand
      .cls_002(style='position:absolute;left:124.00px;top:233.61px')
        span.cls_002 ____
        span.cls_005 Stealth *
      .cls_003(style='position:absolute;left:262.95px;top:234.34px')
        span.cls_003 ARMOR, SHIELD, PROTECTIONS
      .cls_011(style='position:absolute;left:105.61px;top:249.23px')
        span.cls_011 CONSTITUTION
      .cls_003(style='position:absolute;left:448.05px;top:263.57px')
        span.cls_003 TEMPORARY HIT POINTS
      .cls_002(style='position:absolute;left:123.94px;top:265.51px')
        span.cls_002 ____
        span.cls_008 Saving Throw
      .cls_008(style='position:absolute;left:419.69px;top:289.35px')
        span.cls_008 HIT DICE MAXIMUM
        span.cls_012  __________
      .cls_011(style='position:absolute;left:105.61px;top:304.12px')
        span.cls_011 INTELLIGENCE
      .cls_002(style='position:absolute;left:123.94px;top:320.33px')
        span.cls_002 ____
        span.cls_008 Saving Throw
      .cls_003(style='position:absolute;left:461.04px;top:328.89px')
        span.cls_003 HIT DICE SPENT
      .cls_002(style='position:absolute;left:124.52px;top:334.60px')
        span.cls_002 ____
        span.cls_005 Investigation
      .cls_002(style='position:absolute;left:124.85px;top:347.45px')
        span.cls_002 ____
        span.cls_005 Lore
      .cls_002(style='position:absolute;left:406.63px;top:346.96px')
        span.cls_002 Successes
      .cls_002(style='position:absolute;left:495.43px;top:346.96px')
        span.cls_002 Failed
      .cls_002(style='position:absolute;left:124.40px;top:360.42px')
        span.cls_002 ____
        span.cls_005 Nature
      .cls_003(style='position:absolute;left:249.58px;top:360.96px')
        span.cls_003 ADVANTAGES, RESISTANCES, IMMUNITIES
      .cls_013(style='position:absolute;left:459.60px;top:360.41px')
        span.cls_013 DEATH SAVES
      .cls_002(style='position:absolute;left:124.40px;top:373.39px')
        span.cls_002 ____
        span.cls_005 Piloting
      .cls_002(style='position:absolute;left:124.40px;top:386.36px')
        span.cls_002 ____
        span.cls_005 Technology
      .cls_003(style='position:absolute;left:229.27px;top:387.88px')
        span.cls_003 Weapon
      .cls_003(style='position:absolute;left:330.66px;top:387.88px')
        span.cls_003 Attack
      .cls_003(style='position:absolute;left:376.67px;top:387.88px')
        span.cls_003 Damage/Type
      .cls_003(style='position:absolute;left:467.47px;top:387.88px')
        span.cls_003 Range
      .cls_003(style='position:absolute;left:527.88px;top:387.88px')
        span.cls_003 Weight
      .cls_011(style='position:absolute;left:105.61px;top:401.95px')
        span.cls_011 WISDOM
      .cls_002(style='position:absolute;left:123.94px;top:418.24px')
        span.cls_002 +5__
        span.cls_008 Saving Throw
      .cls_002(style='position:absolute;left:124.00px;top:432.23px')
        span.cls_002 ____
        span.cls_005 Animal Handling
      .cls_002(style='position:absolute;left:124.00px;top:445.29px')
        span.cls_002 ____
        span.cls_005 Insight
      .cls_002(style='position:absolute;left:124.00px;top:458.34px')
        span.cls_002 ____
        span.cls_005 Medicine
      .cls_002(style='position:absolute;left:124.00px;top:471.40px')
        span.cls_002 ____
        span.cls_005 Perception
      .cls_002(style='position:absolute;left:124.00px;top:484.46px')
        span.cls_002 ____
        span.cls_005 Survival
      .cls_011(style='position:absolute;left:105.61px;top:499.78px')
        span.cls_011 CHARISMA
      .cls_002(style='position:absolute;left:123.94px;top:516.06px')
        span.cls_002 ___
        span.cls_008 Saving Throw
      .cls_009(style='position:absolute;left:123.41px;top:530.05px')
        span.cls_009 ____
        span.cls_005 Deception
      .cls_009(style='position:absolute;left:123.41px;top:543.11px')
        span.cls_009 ____
        span.cls_005 Intimidation
      .cls_002(style='position:absolute;left:124.00px;top:556.17px')
        span.cls_002 ____
        span.cls_005 Performance
      .cls_002(style='position:absolute;left:124.00px;top:569.23px')
        span.cls_002 ____
        span.cls_005 Persuasion
      .cls_003(style='position:absolute;left:76.27px;top:588.22px')
        span.cls_003 Proficient
      .cls_003(style='position:absolute;left:117.85px;top:586.36px')
        span.cls_003.
          Expertise

        span.cls_004 |
        span.cls_005 *
        span.cls_002
        span.cls_003 Armor penalty
      .cls_003(style='position:absolute;left:353.75px;top:597.52px')
        span.cls_003 WEAPONS & AMMUNITIONS
      .cls_014(style='position:absolute;left:94.49px;top:617.83px')
        span.cls_014 PASSIVE WISDOM (PERCEPTION)
      .cls_014(style='position:absolute;left:94.49px;top:644.27px')
        span.cls_014 INSPIRATION
      .cls_015(style='position:absolute;left:120.75px;top:670.94px')
        span.cls_015 VISION
      .cls_015(style='position:absolute;left:122.09px;top:698.47px')
        span.cls_015 SPEED
      .cls_003(style='position:absolute;left:72.74px;top:706.84px')
        span.cls_003 base
      .cls_003(style='position:absolute;left:122.73px;top:706.84px')
        span.cls_003 hour
      .cls_003(style='position:absolute;left:173.63px;top:706.84px')
        span.cls_003 day
      .cls_017(style='position:absolute;left:59.14px;top:736.68px')
        span.cls_017 special movement
      .cls_003(style='position:absolute;left:306.14px;top:742.82px')
        span.cls_003 Refresh after short/long rest |
      .cls_003(style='position:absolute;left:399.47px;top:742.82px')
        span.cls_003 Refresh after long rest |
      .cls_003(style='position:absolute;left:478.34px;top:742.82px')
        span.cls_003 Use
      .cls_016(style='position:absolute;left:367.15px;top:752.51px')
        span.cls_016 COMBAT FEATURES
      .cls_015(style='position:absolute;left:99.07px;top:755.53px')
        span.cls_015 SENSES & MOVEMENT
      .cls_018(style='position:absolute;left:313.35px;top:758.10px')
        span.cls_018 Feats, abilities, and other features for quick reference in combat
    div(style='position:absolute;left:50%;margin-left:-306px;top:802px;width:612px;height:792px;border-style:outset;overflow:hidden')
      div(style='position:absolute;left:0px;top:0px')
        //- img(src='eb987ac6-6d3b-11ea-8b25-0cc47a792c0a_id_eb987ac6-6d3b-11ea-8b25-0cc47a792c0a_files/background2.jpg' width='612' height='792')
      .cls_019(style='position:absolute;left:228.22px;top:27.78px')
        span.cls_019 Place of Birth
      .cls_019(style='position:absolute;left:228.31px;top:81.72px')
        span.cls_019 Age
      .cls_019(style='position:absolute;left:390.32px;top:81.72px')
        span.cls_019 Gender
      .cls_019(style='position:absolute;left:228.31px;top:95.07px')
        span.cls_019 Height
      .cls_019(style='position:absolute;left:390.32px;top:95.07px')
        span.cls_019 Weight
      .cls_019(style='position:absolute;left:228.31px;top:108.43px')
        span.cls_019 Size
      .cls_019(style='position:absolute;left:390.32px;top:108.43px')
        span.cls_019 Hair
      .cls_019(style='position:absolute;left:228.31px;top:121.78px')
        span.cls_019 Eyes
      .cls_019(style='position:absolute;left:390.32px;top:121.78px')
        span.cls_019 Skin
      .cls_019(style='position:absolute;left:228.31px;top:135.13px')
        span.cls_019 Appearance
      .cls_019(style='position:absolute;left:105.16px;top:145.30px')
        span.cls_019 PROFICIENCIES
      .cls_019(style='position:absolute;left:228.31px;top:175.18px')
        span.cls_019 Personality traits
      .cls_019(style='position:absolute;left:228.31px;top:215.23px')
        span.cls_019 Ideals
      .cls_019(style='position:absolute;left:109.61px;top:219.72px')
        span.cls_019 LANGUAGES
      .cls_019(style='position:absolute;left:228.31px;top:255.28px')
        span.cls_019 Bonds
      .cls_019(style='position:absolute;left:228.31px;top:295.33px')
        span.cls_019 Flaws
      .cls_019(style='position:absolute;left:228.51px;top:335.26px')
        span.cls_019 Background Feature
      .cls_019(style='position:absolute;left:363.83px;top:509.25px')
        span.cls_019 CHARACTER DATA
      .cls_019(style='position:absolute;left:115.02px;top:755.31px')
        span.cls_019 FEATURES
      .cls_019(style='position:absolute;left:370.86px;top:757.31px')
        span.cls_019 BACKSTORY
    div(style='position:absolute;left:50%;margin-left:-306px;top:1604px;width:612px;height:792px;border-style:outset;overflow:hidden')
      div(style='position:absolute;left:0px;top:0px')
        //- img(src='eb987ac6-6d3b-11ea-8b25-0cc47a792c0a_id_eb987ac6-6d3b-11ea-8b25-0cc47a792c0a_files/background3.jpg' width='612' height='792')
      .cls_020(style='position:absolute;left:51.38px;top:25.29px')
        span.cls_020 Item
      .cls_020(style='position:absolute;left:230.67px;top:24.94px')
        span.cls_020 D
      .cls_020(style='position:absolute;left:258.71px;top:24.94px')
        span.cls_020 B
      .cls_020(style='position:absolute;left:283.55px;top:24.94px')
        span.cls_020 P
      .cls_021(style='position:absolute;left:403.02px;top:125.76px')
        span.cls_021 Weight: 50 pieces=1 lb.
      .cls_020(style='position:absolute;left:426.67px;top:137.05px')
        span.cls_020 CREDITS
      .cls_020(style='position:absolute;left:402.39px;top:247.82px')
        span.cls_020 GEMS AND TREASURE
      .cls_021(style='position:absolute;left:321.07px;top:266.00px')
        span.cls_021 Where
      .cls_021(style='position:absolute;left:441.55px;top:266.00px')
        span.cls_021 How much
      .cls_021(style='position:absolute;left:517.18px;top:266.00px')
        span.cls_021 When
      .cls_021(style='position:absolute;left:367.21px;top:358.11px')
        span.cls_021 Loaned, deposited or received values or goods
      .cls_020(style='position:absolute;left:419.53px;top:372.42px')
        span.cls_020 VALUABLES
      .cls_020(style='position:absolute;left:422.36px;top:652.34px')
        span.cls_020 STORAGE
      .cls_020(style='position:absolute;left:176.66px;top:667.79px')
        span.cls_020 Total Weight
      .cls_021(style='position:absolute;left:358.40px;top:678.69px')
        span.cls_021 Each size category above Medium x2, Tiny creatures ½
      .cls_023(style='position:absolute;left:130.57px;top:682.38px')
        span.cls_023 Total Weight on Character
      .cls_024(style='position:absolute;left:515.27px;top:691.15px')
        span.cls_024 PUSH, DRAG
      .cls_021(style='position:absolute;left:328.91px;top:691.83px')
        span.cls_021 ENCUMBERED HEAVILY ENCUMB. MAX CARRYING
      .cls_024(style='position:absolute;left:524.55px;top:695.87px')
        span.cls_024 LIFT
      .cls_020(style='position:absolute;left:54.73px;top:695.37px')
        span.cls_020 D - Donned
      .cls_020(style='position:absolute;left:54.73px;top:709.91px')
        span.cls_020 B - Backpack (max 30 lb.)
      .cls_025(style='position:absolute;left:329.15px;top:723.50px')
        span.cls_025 Strength x5 lb.
      .cls_025(style='position:absolute;left:388.19px;top:723.50px')
        span.cls_025 Strength x10 lb.
      .cls_025(style='position:absolute;left:447.24px;top:723.50px')
        span.cls_025 Strength x15 lb.
      .cls_025(style='position:absolute;left:509.74px;top:723.50px')
        span.cls_025 Strength x30 lb.
      .cls_020(style='position:absolute;left:54.73px;top:725.00px')
        span.cls_020 P - Belt Pouch (max 6 lb. per belt pouch)
      .cls_025(style='position:absolute;left:348.92px;top:742.49px')
        span.cls_025 Speed -10 ft.
      .cls_025(style='position:absolute;left:410.94px;top:742.49px')
        span.cls_025 Spd. -20ft. | Disadvantage on
      .cls_025(style='position:absolute;left:399.11px;top:749.47px')
        span.cls_025 Str, Dex, Con ability checks, ST, attacks
      .cls_020(style='position:absolute;left:153.20px;top:757.17px')
        span.cls_020 EQUIPMENT
      .cls_020(style='position:absolute;left:404.49px;top:759.06px')
        span.cls_020 CARRYING CAPACITY
    div(style='position:absolute;left:50%;margin-left:-306px;top:2406px;width:612px;height:792px;border-style:outset;overflow:hidden')
      div(style='position:absolute;left:0px;top:0px')
        //- img(src='eb987ac6-6d3b-11ea-8b25-0cc47a792c0a_id_eb987ac6-6d3b-11ea-8b25-0cc47a792c0a_files/background4.jpg' width='612' height='792')
      .cls_027(style='position:absolute;left:171.74px;top:29.15px')
        span.cls_027 TECH ATTACK MODIFIER: __________
      .cls_027(style='position:absolute;left:337.97px;top:28.86px')
        span.cls_027 TECH SAVE DC: __________
      .cls_028(style='position:absolute;left:82.25px;top:49.62px')
        span.cls_028 TECH POINTS
      .cls_027(style='position:absolute;left:164.42px;top:46.43px')
        span.cls_027 FORCE ATTACK MODIFIER: __________
      .cls_027(style='position:absolute;left:330.65px;top:46.20px')
        span.cls_027 FORCE SAVE DC: __________
      .cls_028(style='position:absolute;left:486.40px;top:49.68px')
        span.cls_028 FORCE POINTS
      .cls_027(style='position:absolute;left:226.88px;top:64.07px')
        span.cls_027 LIGHT SIDE: __________
      .cls_027(style='position:absolute;left:353.39px;top:63.53px')
        span.cls_027 LIGHT SIDE: __________
      .cls_027(style='position:absolute;left:226.86px;top:81.71px')
        span.cls_027 DARK SIDE: __________
      .cls_027(style='position:absolute;left:353.37px;top:80.87px')
        span.cls_027 DARK SIDE: __________
      .cls_028(style='position:absolute;left:83.85px;top:97.70px')
        span.cls_028 POINTS USED
      .cls_028(style='position:absolute;left:489.50px;top:98.19px')
        span.cls_028 POINTS USED
      .cls_027(style='position:absolute;left:225.55px;top:99.35px')
        span.cls_027 UNIVERSAL: __________
      .cls_027(style='position:absolute;left:352.05px;top:98.20px')
        span.cls_027 UNIVERSAL: __________
      .cls_026(style='position:absolute;left:160.16px;top:273.89px')
        span.cls_026 AT-WILL
      .cls_026(style='position:absolute;left:422.42px;top:273.89px')
        span.cls_026 1st LEVEL
      .cls_026(style='position:absolute;left:159.10px;top:411.65px')
        span.cls_026 2nd LEVEL
      .cls_026(style='position:absolute;left:422.42px;top:411.65px')
        span.cls_026 3rd LEVEL
      .cls_026(style='position:absolute;left:160.16px;top:535.12px')
        span.cls_026 4th LEVEL
      .cls_026(style='position:absolute;left:423.13px;top:535.12px')
        span.cls_026 5th LEVEL
      .cls_026(style='position:absolute;left:159.10px;top:645.26px')
        span.cls_026 6th LEVEL
      .cls_026(style='position:absolute;left:423.14px;top:645.26px')
        span.cls_026 7th LEVEL
      .cls_026(style='position:absolute;left:159.10px;top:755.40px')
        span.cls_026 8th LEVEL
      .cls_026(style='position:absolute;left:423.14px;top:755.40px')
        span.cls_026 9th LEVEL
</template>

<style module lang="scss">

</style>
