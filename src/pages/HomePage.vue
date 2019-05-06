<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { State, Action } from 'vuex-class'
  import RoutesList from '@/components/RoutesList.vue'

  @Component({
    components: {
      RoutesList
    }
  })
  export default class HomePage extends Vue {
    get socialLinks () {
      return [
        {
          href: 'https://www.reddit.com/r/sw5e',
          icon: 'fab fa-reddit',
          title: 'Reddit'
        },
        {
          href: 'https://discord.gg/zYcPYTu',
          icon: 'fab fa-discord',
          title: 'Discord'
        },
        {
          href: 'https://twitter.com/Galiphile',
          icon: 'fab fa-twitter',
          title: 'Twitter'
        },
        {
          href: 'https://www.patreon.com/sw5e',
          icon: 'fab fa-patreon',
          title: 'Patreon'
        }
      ]
    }
    get categories () {
      return [
        {
          category: 'Books',
          routes: [
            {
              href: 'https://drive.google.com/file/d/1bVVk719__eeJC388VXV6KXqwRjUOQJ0m/view?usp=sharing',
              title: 'Player\' Handbook'
            },
            {
              href: '',
              title: 'Monster Manual'
            },
            {
              href: '',
              title: 'Starships of the Galaxy'
            }
          ]
        },
        {
          category: 'Expanded Content',
          routes: [
            {
              href: '',
              title: 'Species'
            },
            {
              href: '',
              title: 'Archetypes'
            },
            {
              href: '',
              title: 'Backgroudns'
            },
            {
              href: '',
              title: 'Equipment'
            },
            {
              href: '',
              title: 'Customization Options'
            },
            {
              href: '',
              title: 'Force Powers'
            },
            {
              href: '',
              title: 'Tech Powers'
            },
            {
              href: '',
              title: 'Variant Rules'
            }
          ]
        },
        {
          category: 'Special Equipment',
          routes: [
            {
              href: '',
              title: 'Enhanced Items'
            },
            {
              href: '',
              title: 'Cybernetic Augmentations'
            },
            {
              href: '',
              title: 'Droid Customization'
            },
            {
              href: '',
              title: 'Modifiable Items'
            }
          ]
        },
        {
          category: 'Character Sheets',
          routes: [
            {
              href: '',
              title: 'Character Sheet'
            },
            {
              href: '',
              title: 'Character Sheet: Form Fillable'
            },
            {
              href: '',
              title: 'Pre-generated Characters',
              author: '/u/papasmurf008'
            },
            {
              href: '',
              title: 'More Pre-generated Characters (level 5)',
              author: '/u/cpthogie'
            }
          ]
        },
        {
          category: 'Deployment and Starship Sheets',
          routes: [
            {
              href: '',
              title: 'Deployment Sheet',
              author: '/u/speedreeder'
            },
            {
              href: '',
              title: 'Starship Sheet',
              author: '/u/speedreeder'
            }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Star Wars 5e
    div(:class="$style.routes").mb-5
      a(v-for="{ href, icon, title, author } in socialLinks", :key="title", :href="href", target="_blank")
        v-btn
          v-icon(:color="title").mr-3 {{ icon }}
          | {{ title }}
    div(v-for="{ category, routes } in categories", :key="category").mb-5
      h3 {{ category }}
      div(:class="$style.routes")
        div(v-for="{ href, title, author } in routes", :key="title" )
          a(:href="href", target="_blank")
            v-btn(color="primary") {{ title }}
          div(v-if="author") courtesy of {{ author}}
</template>

<style module lang="scss">
  .routes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
