<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { upperCase } from 'lodash'
  import { ArmorPropertyType } from '@/types/lootTypes'
  import LinkModal from '@/components/LinkModal.vue'
  import VueMarkdown from 'vue-markdown'

  interface ArmorPropertyModal extends ArmorPropertyType {
    text: string
  }
  const armorPropertiesModule = namespace('armorProperties')

  @Component({
    components: {
      LinkModal,
      VueMarkdown
    }
  })
  export default class LootArmorProperties extends Vue {
    @Prop(Array) readonly propertyList!: string[]

    @armorPropertiesModule.State armorProperties!: ArmorPropertyType[]
    @armorPropertiesModule.Action fetchArmorProperties!: () => void

    created () {
      this.fetchArmorProperties()
    }

    get propertyData () {
      return this.propertyList && this.propertyList.map((propertyString, index) => {
        const propertyName = upperCase(propertyString.split(' ')[0])
        const text = (index > 0 ? ', ' : ' ') + propertyString
        const propertyInfo = this.armorProperties.find(({ name }) => upperCase(name) === propertyName)
        return { ...propertyInfo, text } as ArmorPropertyModal
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
