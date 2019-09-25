<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchBox from '@/components/SearchBox.vue'

  const uiModule = namespace('ui')

  @Component({
    components: {
      SearchBox
    }
  })
  export default class MainToolbar extends Vue {
    @uiModule.State isSideBarOpen!: boolean
    @uiModule.Action updateSideBar!: (value: boolean) => void

    get routes () {
      return [
        {
          to: '/',
          title: 'Home'
        },
        {
          to: '/rules',
          title: 'Rules',
          nested: [
            { to: '/handbook', title: 'Player\'s Handbook' },
            { to: '/monsters', title: 'Scum and Villainy' },
            { to: '/starships', title: 'Starships of the Galaxy' },
            { to: '/hives', title: 'Wretched Hives' }
           ]
        },
        {
          to: '/characters',
          title: 'Characters',
          nested: [
            { to: '/species', title: 'Species' },
            { to: '/classes', title: 'Classes' },
            { to: '/archetypes', title: 'Archetypes' },
            { to: '/backgrounds', title: 'Backgrounds' },
            { to: '/feats', title: 'Feats' },
            { to: '/forcePowers', title: 'Force Powers' },
            { to: '/techPowers', title: 'Tech Powers' },
            { to: '/additionalVariantRules', title: 'Additional Variant Rules' }
          ]
        },
        {
          to: '/loot',
          title: 'Loot',
          nested: [
            { to: '/armor', title: 'Armor' },
            { to: '/weapons', title: 'Weapons' },
            { to: '/adventuringGear', title: 'Adventuring Gear' },
            { to: '/enhancedItems', title: 'Enhanced Items' }
          ]
        },
        {
          to: '/starships',
          title: 'Starships',
          nested: [
            { to: '/deployments', title: 'Deployments' },
            { to: '/ventures', title: 'Ventures' },
            { to: '/modifications', title: 'Modifications' },
            { to: '/equipment', title: 'Equipment' },
            { to: '/weapons', title: 'Weapons' }
          ]
        },
        {
          to: '/assets',
          title: 'Assets'
        },
        {
          to: '/credits',
          title: 'Credits'
        }
      ]
    }

    get isPageWithNavigation () {
      return ['handbook', 'starships', 'monsters', 'hives'].some(page => this.$route.path.includes(page))
    }

    buildComponentProps (to: string, nested: { to: string, title: string }[]) {
      return nested && nested.length ? {
        is: 'v-menu',
        'open-on-hover': true,
        'offset-y': true,
        attach: true
      } : {
        is: 'v-btn',
        text: true,
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
  v-app-bar(app, clipped-left, :color="$vuetify.theme.dark && 'black'")
    v-app-bar-nav-icon(v-if="isPageWithNavigation", @click="handleSideIconClick").hidden-md-and-up
    v-toolbar-title
      router-link(to="/")
        v-img(:src="require('@/assets/sw5e-logo.png')", width="100px")
    v-spacer
    v-toolbar-items.hidden-md-and-down
      component(v-for="({ to, title, nested}) in routes", :key="title", v-bind="buildComponentProps(to, nested)")
        template(v-if="nested && nested.length", v-slot:activator="{ on }")
          v-btn(text, color="primary", v-on="on" :to="to") {{ title }}
            v-icon.pl-2 fa-caret-down
        v-list(v-for="nestedRoute in nested", :key="nestedRoute.title", dense)
          v-list-item(:to="to + nestedRoute.to")
            v-list-item-title {{ nestedRoute.title }}
        template(v-if="!nested || !nested.length") {{ title }}
      SearchBox
    v-toolbar-items.hidden-lg-and-up
      v-menu(bottom, left, offset-y, attach)
        template(v-slot:activator="{ on }")
          v-btn(icon, v-on="on")
            v-icon fa-ellipsis-v
        v-list
          v-list-item(v-for="{to, title} in routes", :key="title", :to="to")
            v-list-item-title {{ title }}
          v-list-item(to="/searchResults")
            v-icon.pr-2 fa-search
            v-list-item-title Search
</template>
