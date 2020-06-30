<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { upperCase } from 'lodash'
  import LinkModal from '@/components/LinkModal.vue'
  import VueMarkdown from 'vue-markdown'
  import { PowerType } from '@/types/characterTypes'

  interface PowerModal extends PowerType {
    text: string
  }
  const powersModule = namespace('powers')

  @Component({
    components: {
      LinkModal,
      VueMarkdown
    }
  })
  export default class MonsterPower extends Vue {
    @Prop(Array) readonly powerList!: string[]

    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void

    created () {
      this.fetchPowers()
    }

    get powerData () {
      return this.powerList && this.powerList.map((powerString, index) => {
        const propertyName = upperCase(powerString.split(' ')[0])
        const text = (index > 0 ? ', ' : ' ') + powerString
        const powerInfo = this.powers.find(({ name }) => upperCase(name) === propertyName)
        return { ...powerInfo, text } as PowerModal
      }).filter(({ description }) => description)
    }
  }
</script>

<template lang="pug">
  span
    LinkModal(
      v-for="({ name, description, text }) in powerData",
      :key="name",
      :link="text"
    )
      VueMarkdown(:source="description.replace(/\ufffd/g, ' - ')")
</template>
