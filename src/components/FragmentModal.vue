<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import VueMarkdown from 'vue-markdown'
  import { namespace } from 'vuex-class'
  import { ReferenceTableType } from '@/types/utilityTypes'
  import MyDialog from '@/components/MyDialog.vue'

  const referenceTableModules = namespace('referenceTables')

  @Component({
    components: {
      VueMarkdown,
      MyDialog
    }
  })
  export default class FragmentModal extends Vue {
    @Prop(String) readonly title!: string
    @referenceTableModules.State referenceTables!: ReferenceTableType[]
    @referenceTableModules.Action fetchReferenceTables!: () => void

    created () {
      this.fetchReferenceTables()
    }

    get hash () {
      return decodeURI(this.$route.hash).substring(1)
    }

    get content () {
      const data = this.hash && this.referenceTables.find(({ name }) => name === this.hash)
      return data && data.content
    }

    get hasContent () {
      return (this.hash !== '') && (this.content !== '')
    }

    get route () {
      return ({
        ...this.$route,
        matched: [],
        hash: ''
      })
    }
  }
</script>

<template lang="pug">
  MyDialog(v-if="content", :value="hasContent")
    template(#title) {{ hash }}
    template(#text)
      VueMarkdown(:source="content")
    template(#actions)
      v-spacer
      v-btn(color="primary", text, :to="route") Close
</template>
