<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class AssetsPage extends Vue {
    get categories () {
      return [
        {
          category: 'Source Books',
          subText: 'All four source books are linked here as PDFs, including a print friendly version of the Player\'s Handbook.',
          routes: [
            {
              href: 'https://drive.google.com/file/d/1W1S-fqkMyyeU1PaB3H4pAxYUric_u1eX/view?usp=sharing',
              title: 'Player\'s Handbook'
            },
            {
              href: 'https://drive.google.com/file/d/1JINdHzbcb4kv5QrDnirHbZXV-ZEjIaEk/view?usp=sharing',
              title: 'Player\'s Handbook (Print Friendly)'
            },
            {
              href: 'https://drive.google.com/file/d/18NDEJLTtfkVt4kqqj204KJpub0l7A9MX/view?usp=sharing',
              title: 'Scum & Villainy'
            },
            {
              href: 'https://drive.google.com/file/d/1XXE50huqr93gT-sujqjcQ-Eq8OE7-HfD/view?usp=sharing',
              title: 'Starships of the Galaxy'
            },
            {
              href: 'https://drive.google.com/file/d/1-SJrGjriK2qgGaQSzcqEGiuRwLPvgqOS/view?usp=sharing',
              title: 'Wretched Hives'
            }
          ],
          bottomLink: {
            text: 'Older Versions',
            href: 'https://drive.google.com/drive/folders/1GwhBxObXuRiKo100dFgAZo2NpicHWyU5?usp=sharing'
          }
        },
        {
          category: 'Expanded Content',
          subText: 'This includes GMBinder links to three of the expanded content documents for character options.',
          routes: [
            {
              href: 'https://www.gmbinder.com/share/-LM7Sz_VhFOf0IYKXHQG',
              title: 'Species'
            },
            {
              href: 'https://www.gmbinder.com/share/-LM7VwslAMiI0A6oG6pf',
              title: 'Archetypes'
            },
            {
              href: 'https://www.gmbinder.com/share/-LM7YKv2CF9ziIA3Bg0q',
              title: 'Backgrounds'
            }
          ]
        },
        {
          category: 'Sponsored Content',
          subText: 'Sponsored content is content created by members of the moderation team that hasn\'t been officially adopted, but should still be considered for use.',
          routes: [
            {
              href: 'https://www.gmbinder.com/share/-M-qA_FYgTwJjU8yFjjx',
              title: 'Fisto\'s Codex'
            },
            {
              href: 'https://www.gmbinder.com/share/-M7y5JXBmMCskhJPFhUp',
              title: 'Drake\'s Shipyard'
            },
            {
              href: 'https://www.gmbinder.com/share/-MA24CpxiSf9qM8z_TY4',
              title: 'Bob\'s Galactic Strongholds'
            },
            {
              href: 'https://www.gmbinder.com/share/-MDp2nOeGD6JJLxNM_lT',
              title: 'Hugehuman\'s Tech Powers'
            },
            {
              href: 'https://www.gmbinder.com/share/-MDosNzOCLn0_ColYfBf',
              title: 'Hugehuman\'s Force Powers'
            },
            {
              href: 'https://www.gmbinder.com/share/-M815p5BfQ0wbdKY7zqN',
              title: 'Heresy\'s Species'
            }
          ]
        },
        {
          category: 'Character Sheets',
          subText: 'This includes the official character sheet as well as as form-fillable version.',
          routes: [
            {
              href: 'https://drive.google.com/file/d/16b0luhTq6xBuQUUf8jm6vnLAImnmjuAF/view?usp=sharing',
              title: 'Character Sheet'
            },
            {
              href: 'https://drive.google.com/file/d/17mCKw43pbeATDFWraKAOmSgyI8vcUCtK/view?usp=sharing',
              title: 'Character Sheet: Form Fillable'
            }
          ]
        },
        {
          category: 'Deployment and Starship Sheets',
          subText: 'As with character sheets, these are the official sheets for use in deployments and starships.',
          routes: [
            {
              href: 'https://drive.google.com/file/d/11zxAf6O7FHrXMP5kZQgBuAyY_6Sgck6f/view?usp=sharing',
              title: 'Deployment Sheet',
              author: '/u/speedreeder',
              authorLink: 'https://www.reddit.com/u/speedreeder'
            },
            {
              href: 'https://drive.google.com/file/d/1Oh9v-kWR7Vd0YNFZE5ESKt1VutzQQSl-/view?usp=sharing',
              title: 'Deployment Sheet: Form Fillable'
            },
            {
              href: 'https://drive.google.com/file/d/1cPleUQKg-F1S1s142R9XB1LYht5w_UUQ/view?usp=sharing',
              title: 'Starship Sheet',
              author: '/u/speedreeder',
              authorLink: 'https://www.reddit.com/u/speedreeder'
            },
            {
              href: 'https://drive.google.com/file/d/1viykv2MazM26WRMJZ4fNAixhoeYWLR7N/view?usp=sharing',
              title: 'Starship Sheet: Form Fillable'
            }
          ]
        },
        {
          category: 'Podcasts and other media',
          subText: 'This includes links to any officially sponsored media related to Star Wars 5e, including Dungeon Jedi Masters—a podcast and more elucidating the Star Wars 5e experience.',
          routes: [
            {
              href: 'https://dungeonjedimasters.com/',
              title: 'Dungeon Jedi Masters'
            }
          ]
        },
        {
          category: 'Other',
          subText: 'This includes links to a teespring store where you can get some Star Wars 5e swag and a guide to printing the Player\'s Handbook (no other book is endorsed for printing yet).',
          routes: [
            {
              href: 'https://teespring.com/stores/sw5e',
              title: 'Merchandise'
            },
            {
              href: 'https://www.reddit.com/r/sw5e/comments/cb1i87/printing_a_star_wars_5e_story/',
              title: 'Printing Instructions'
            }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div(:class="$style.assets")
    div(v-for="{ category, subText, routes, bottomLink } in categories", :key="category").mb-5
      h1(:class="$style.assetTitle") {{ category }}
      div.mb-5 {{ subText }}
      div.d-flex.flex-wrap.justify-center
        div(v-for="{ href, title, author } in routes", :key="title" )
          a(:href="href", target="_blank")
            v-btn(color="primary").mx-2.mt-2 {{ title }}
          div(v-if="author") courtesy of #[a(:href="`https://www.reddit.com${author}`", target="_blank") {{ author }}]
      div(v-if="bottomLink").mt-4
        a(:href="bottomLink.href", target="_blank") {{bottomLink.text}}
</template>

<style module lang="scss">
  @import "src/assets/styles/colors.scss";

  .assets {
    max-width: 1185px;
    margin: auto;

    .assetTitle {
      border-bottom: 2px solid $secondary;
      margin-top: 60px;
      margin-bottom: 5px;
    }
  }
</style>
