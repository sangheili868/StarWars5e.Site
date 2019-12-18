<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { upperCase } from 'lodash'
  import { WeaponPropertyType } from '@/types/lootTypes'
  import LinkModal from '@/components/LinkModal.vue'
  import VueMarkdown from 'vue-markdown'

  interface WeaponPropertyModal extends WeaponPropertyType {
    text: string
  }
  const weaponPropertiesModule = namespace('weaponProperties')

  @Component({
    components: {
      LinkModal,
      VueMarkdown
    }
  })
  export default class LootWeaponsProperties extends Vue {
    @Prop(Array) readonly propertyList!: string[]

    @weaponPropertiesModule.State weaponProperties!: WeaponPropertyType[]
    @weaponPropertiesModule.Action fetchWeaponProperties!: () => void

    created () {
      this.fetchWeaponProperties()
    }

    get propertyData () {
      return this.propertyList && this.propertyList.map((propertyString, index) => {
        const propertyName = upperCase(propertyString.split(' ')[0])
        const text = (index > 0 ? ', ' : ' ') + propertyString
        const propertyInfo = this.weaponProperties.find(({ name }) => upperCase(name) === propertyName)
        return { ...propertyInfo, text } as WeaponPropertyModal
      }).filter(({ content }) => content)
    }
  }
</script>

<template lang="pug">
  span
    LinkModal(
      v-for="({ name, content, text }) in propertyData",
      :key="name",
      :link="text"
    )
      VueMarkdown(:source="content.replace(/\ufffd/g, ' - ')")
</template>
