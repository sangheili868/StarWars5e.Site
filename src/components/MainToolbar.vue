<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const uiModule = namespace('ui')

  @Component
  export default class MainToolbar extends Vue {
    @uiModule.State isSideBarOpen!: boolean
    @uiModule.Action updateSideBar!: (value: boolean) => void

    get routes () {
      return [
        {
          to: '/',
          title: 'Home',
          nested: []
        },
        {
          to: '/handbook',
          title: 'Handbook',
          nested: []
        },
        {
          to: '/starships',
          title: 'Starships',
          nested: []
        },
        {
          to: '/reference',
          title: 'Reference',
          nested: [
            {
              to: '/species',
              title: 'Species'
            },
            {
              to: '/forcePowers',
              title: 'Force Powers'
            },
            {
              to: '/techPowers',
              title: 'Tech Powers'
            }
          ]
        },
        {
          to: '/credits',
          title: 'Credits',
          nested: []
        }
      ]
    }

    get isPageWithNavigation () {
      return ['handbook', 'starships'].some(page => this.$route.path.includes(page))
    }

    buildComponentProps (to: string, nested: { to: string, title: string }[]) {
      return nested.length ? {
        is: 'v-menu',
        'open-on-hover': true,
        'offset-y': true,
        attach: true
      } : {
        is: 'v-btn',
        flat: true,
        color: 'primary',
        to
      }
    }

    handleSideIconClick () {
      this.updateSideBar(true)
    }
  }
</script>

<template lang="pug">
  v-toolbar(app, clipped-left)
    v-toolbar-side-icon(v-if="isPageWithNavigation", @click="handleSideIconClick").hidden-md-and-up
    v-toolbar-title
      v-img(:src="require('@/assets/sw5e-logo.png')", width="100px")
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      component(v-for="({ to, title, nested}) in routes", :key="title", v-bind="buildComponentProps(to, nested)")
        template(v-if="nested.length", v-slot:activator="{ on }")
          v-btn(flat, color="primary", v-on="on" :to="to") {{ title }}
            v-icon.pl-2 fa-caret-down
        v-list(v-for="nestedRoute in nested", :key="nestedRoute.title")
          v-list-tile(:to="to + nestedRoute.to")
            v-list-tile-title {{ nestedRoute.title }}
        template(v-if="!nested.length") {{ title }}
    v-toolbar-items.hidden-md-and-up
      v-menu(open-on-hover, bottom, left, offset-y, attach)
        template(v-slot:activator="{ on }")
          v-btn(icon, v-on="on")
            v-icon(color="primary") fa-ellipsis-v
        v-list
          v-list-tile(v-for="{to, title} in routes", :key="title", :to="to")
            v-list-tile-title {{ title }}
</template>
