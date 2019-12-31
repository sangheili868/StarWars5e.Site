<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class AssetsPage extends Vue {
    get categories () {
      return [
        {
          category: 'Source Books',
          routes: [
            {
              href: 'https://drive.google.com/file/d/1eFTWbzZEYnpizz13wjNU_9uXuJ3f9hki/view?usp=sharing',
              title: 'Player\'s Handbook'
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
          ]
        },
        {
          category: 'Expanded Content',
          routes: [
            {
              href: 'https://drive.google.com/file/d/1rh3-yHcKwQh9iDGsl3VwWsdFoEmlqTQM/view?usp=sharing',
              title: 'Species'
            },
            {
              href: 'https://drive.google.com/file/d/1b5srpCjqHV9ZICSHnXbfTUcmhsIg6OGo/view?usp=sharing',
              title: 'Archetypes'
            },
            {
              href: 'https://drive.google.com/file/d/11gtMu3mxVVcA29hHP3NKT8N3L2lpCp2W/view?usp=sharing',
              title: 'Backgrounds'
            }
          ]
        },
        {
          category: 'Character Sheets',
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
          category: 'Other',
          routes: [
            {
              href: 'https://www.reddit.com/r/sw5e/comments/cb1i87/printing_a_star_wars_5e_story/',
              title: 'Printing Instructions'
            },
            {
              href: 'https://www.reddit.com/r/sw5e/comments/9v487b/10_pregenerated_level_1_player_characters_1_for/',
              title: 'Pre-generated Characters',
              author: '/u/papasmurf008',
              authorLink: 'https://www.reddit.com/u/papasmurf008'
            },
            {
              href: 'https://drive.google.com/drive/folders/1TsJZYSlY_wwTKPxv1a34fGxJNZJWE0a2',
              title: 'More Pre-generated Characters (level 5)',
              author: '/u/cpthogie',
              authorLink: 'https://www.reddit.com/u/papasmurf008'
            }
          ]
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    div(v-for="{ category, routes } in categories", :key="category").mb-5
      h3 {{ category }}
      div(:class="$style.routes")
        div(v-for="{ href, title, author } in routes", :key="title" )
          a(:href="href", target="_blank")
            v-btn(color="primary").mx-2.mt-2 {{ title }}
          div(v-if="author") courtesy of #[a(:href="`https://www.reddit.com${author}`", target="_blank") {{ author }}]
</template>

<style module lang="scss">
  .routes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
