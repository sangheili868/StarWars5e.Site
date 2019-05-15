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
              href: 'https://drive.google.com/file/d/1bVVk719__eeJC388VXV6KXqwRjUOQJ0m/view?usp=sharing',
              title: 'Player\'s Handbook'
            },
            {
              href: 'https://drive.google.com/file/d/1isFATl_y8hVuL2VRLpBdXhXqTAwT8mZI/view?usp=sharing',
              title: 'Monster Manual'
            },
            {
              href: 'https://drive.google.com/file/d/1zWAarhkSaQVT3NCYF_y1UYJnavP8aw3s/view?usp=sharing',
              title: 'Starships of the Galaxy'
            }
          ]
        },
        {
          category: 'Expanded Content',
          routes: [
            {
              href: 'https://drive.google.com/file/d/10g8huNKMRKwBY5ihGjw5s2K7T7mr8yRK/view?usp=sharing',
              title: 'Species'
            },
            {
              href: 'https://drive.google.com/file/d/1wGpbFNVNangoWlN5EChhNog6885htYZ5/view?usp=sharing',
              title: 'Archetypes'
            },
            {
              href: 'https://drive.google.com/file/d/1hBUbBLU29oSW9ZsdmflpCVVK1jfz_zYv/view?usp=sharing',
              title: 'Backgrounds'
            },
            {
              href: 'https://drive.google.com/file/d/1jYrER55Y06RXm_5r6cmpx2_fLG7jOhjZ/view?usp=sharing',
              title: 'Equipment'
            },
            {
              href: 'https://drive.google.com/file/d/1LKOMeXQRskz_G_vkVM-wLKy40aZ9rKI-/view?usp=sharing',
              title: 'Customization Options'
            },
            {
              href: 'https://drive.google.com/file/d/13BZPw6SCBU3vDcSASfwMQqUei3Z6gPaT/view?usp=sharing',
              title: 'Force Powers'
            },
            {
              href: 'https://drive.google.com/file/d/1opuktmH66l4hcH8CWrdlkOBV7XBZ_0LC/view?usp=sharing',
              title: 'Tech Powers'
            },
            {
              href: 'https://drive.google.com/file/d/105oCEYihrqQGDZ8iSDOkdX-rXrpmg_qd/view?usp=sharing',
              title: 'Variant Rules'
            }
          ]
        },
        {
          category: 'Special Equipment',
          routes: [
            {
              href: 'https://drive.google.com/file/d/1CZL0cX7P0gODBlg7WegWL2rGdtZOyjiZ/view?usp=sharing',
              title: 'Enhanced Items'
            },
            {
              href: 'https://drive.google.com/file/d/17bPkE-_JVNR4VvO6BpAxvQlJGG1wFKCN/view?usp=sharing',
              title: 'Cybernetic Augmentations'
            },
            {
              href: 'https://drive.google.com/file/d/1NDHDOMeFerAqCAbElQSg-CJYsSDhSPqz/view?usp=sharing',
              title: 'Droid Customization'
            },
            {
              href: 'https://drive.google.com/file/d/1yQ8NhlrZOVQ9defw4B3_--CwREicNFuG/view?usp=sharing',
              title: 'Modifiable Items'
            }
          ]
        },
        {
          category: 'Character Sheets',
          routes: [
            {
              href: 'https://drive.google.com/file/d/1vPDWtEOV9GwwY4kCp6VZ9IaFVt5vTtIw/view?usp=sharing',
              title: 'Character Sheet'
            },
            {
              href: 'https://drive.google.com/file/d/1EOmgTd4olVKqsnFJI8yQRB9DLvscCjOc/view?usp=sharing',
              title: 'Character Sheet: Form Fillable'
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
        },
        {
          category: 'Deployment and Starship Sheets',
          routes: [
            {
              href: 'https://drive.google.com/file/d/10zEr8Xag9HtoqoFpS-nrjEa24xXxqs-g/view?usp=sharing',
              title: 'Deployment Sheet',
              author: '/u/speedreeder',
              authorLink: 'https://www.reddit.com/u/papasmurf008'
            },
            {
              href: 'https://drive.google.com/file/d/1mJ4ynIKUxcophRf-D578XGAhsXpS1cIa/view?usp=sharing',
              title: 'Starship Sheet',
              author: '/u/speedreeder',
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
            v-btn(color="primary") {{ title }}
          div(v-if="author") courtesy of #[a(:href="`https://www.reddit.com${author}`", target="_blank") {{ author }}]
</template>

<style module lang="scss">
  .routes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
