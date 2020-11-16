<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import VueMarkdown from 'vue-markdown'
  import { namespace } from 'vuex-class'
  import { ReferenceTableType } from '@/types/utilityTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import { PowerType } from '@/types/characterTypes'

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
    power!: PowerType | undefined

    created () {
      this.fetchReferenceTables()
      this.fetchPowers()
    }

    get hash () {
      return decodeURI(this.$route.hash).substring(1)
    }

    get content () {
      this.power = this.powers.find(({ name }) => name.toLowerCase() === this.hash.toLowerCase())
      if (this.power) {
        var data = this.hash && this.power
        return data && data.description
      }

      var tableData = this.referenceTables.find(({ name }) => name === this.hash)
      var data1 = this.hash && tableData
      return data1 && data1.content
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
    template(#title) {{ hash }}
    template(#text)
      div(v-if="power")
        p #[strong Level:] {{(power.level || 'At-will').toString()}}
        p #[strong Casting Period:] {{power.castingPeriodText}}
        p #[strong Range:] {{power.range}}
        p #[strong Duration:] {{power.duration}}
        p #[strong Concentration:] {{power.concentration}}
        VueMarkdown(:source="content")
      VueMarkdown(v-if="!power", :source="content")
    template(#actions)
      v-spacer
      v-btn(color="primary", text, :to="route") Close
</template>
