<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'
  import CardSet from '@/components/CardSet.vue'
  import BackButton from '@/components/BackButton.vue'

  const blobsModule = namespace('blobs')

  @Component({
    components: {
      Loading,
      BackButton,
      CardSet
    }
  })
  export default class CustomizationOptions extends Vue {
    created () {
    }

    get customizationOptions () {
      return [
        {
          name: 'Class Improvements',
          to: 'customizationOptions/classImprovements'
        },

        {
          name: 'Fighting Styles',
          to: 'customizationOptions/fightingStyles'
        },
        {
          name: 'Fighting Masteries',
          to: 'customizationOptions/fightingMasteries'
        },
        {
          name: 'Lightsaber Forms',
          to: 'customizationOptions/lightsaberForms'
        },
        {
          name: 'Multiclass Improvements',
          to: 'customizationOptions/multiclassImprovements'
        },
        {
          name: 'Splashclass Improvements',
          to: 'customizationOptions/splashclassImprovements'
        },
        {
          name: 'Weapon Focuses',
          to: 'customizationOptions/weaponFocuses'
        },
        {
          name: 'Weapon Supremacies',
          to: 'customizationOptions/weaponSupremacies'
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    BackButton
    h1.text-left Customization Options
    p.text-left
      | Various ways to futher customize your character.
    CardSet(:cards="customizationOptions")
      template(v-slot="{ card }")
        v-card-text(primary-title)
          h4 {{ card.name }}
</template>
