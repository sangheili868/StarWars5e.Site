<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import LinkModal from '@/components/LinkModal.vue'
  import VueMarkdown from 'vue-markdown'

  @Component({
    components: {
      LinkModal,
      VueMarkdown
    }
  })
  export default class RollTable extends Vue {
    @Prop(Array) readonly items!: { text: string, roll: number, modalContent?: string }[]
    @Prop(String) readonly title!: string
    @Prop(Boolean) readonly isLeftAlign!: boolean
  }
</script>

<template lang="pug">
  table(v-if="items && items.length").table.text-center
    thead
      tr
        th.px-2.py-1 d{{ items.length }}
        th(:class="{ 'text-left': isLeftAlign }").px-2.py-1 {{ title }}
    tbody
      tr(v-for="{ text, roll, modalContent } in items", :key="roll").rows
        td.px-2.py-1 {{ roll }}
        td(:class="{ 'text-left': isLeftAlign }").px-2.py-1
          LinkModal(v-if="modalContent", :title="text", :link="text")
            VueMarkdown(:source="modalContent")
          template(v-else) {{ text }}
</template>
