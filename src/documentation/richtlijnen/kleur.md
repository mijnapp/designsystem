<div class="fr-swatches">
  {{#each colors}}
  <div class="fr-swatch">
    <div class="fr-color" style="background-color: {{ hex }}"></div>
    <div>
      <b>{{ name }}</b> <br>
      {{ variable }} <br>
      <code class="fr-color-hex">{{ hex }}</code>
    </div>
  </div>
  {{/each}}
</div>


Wanneer de kleuren veranderen, moeten de waardes geupdate worden in `source/documentation/guidelines/guidelines.config.js` en `source/scss/settings/_colors.scss`
