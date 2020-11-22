<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import VueMarkdown from 'vue-markdown'
  import { namespace } from 'vuex-class'
  import { ReferenceTableType } from '@/types/utilityTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import { PowerType } from '@/types/characterTypes'
  import { startCase } from 'lodash'

  const referenceTableModules = namespace('referenceTables')
  const powersModule = namespace('powers')

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
    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void
    startCase = startCase

    created () {
      this.fetchReferenceTables()
      this.fetchPowers()
    }

    get hash () {
      return decodeURI(this.$route.hash).substring(1)
    }

    get power () {
      return this.powers.find(({ name }) => name.toLowerCase() === this.hash.toLowerCase())
    }

    get content () {
      if (!this.hash) return ''
      const tableData = this.referenceTables.find(({ name }) => name === this.hash)
      return this.power ? this.power.description : tableData ? tableData.content : ''
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

    onCloseCallBack () {
      this.$router.push({
        ...this.$route,
        hash: ''
      })
    }
  }
</script>

<template lang="pug">
  MyDialog(v-if="content", :value="hasContent" :onClose="onCloseCallBack")
    template(#title) {{ startCase(hash) }}
    template(#text)
      div(v-if="power").mt-3
        div #[strong Level:] {{ (power.level || 'At-will').toString() }}
        div #[strong Casting Period:] {{ power.castingPeriodText }}
        div #[strong Range:] {{ power.range }}
        div #[strong Duration:] {{ power.duration }}
        div #[strong Concentration:] {{ power.concentration }}
        br
        VueMarkdown(:source="content")
      VueMarkdown(v-else, :source="content")
    template(#actions)
      v-spacer
      v-btn(color="primary", text, :to="route") Close
</template>
