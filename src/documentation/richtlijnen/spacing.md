SCSS variabele    | Waarde in pixels
------------------|------------
{{#each spacing-units }}
  {{@key}} | {{this}}
{{/each}}

Wanneer de spacings veranderen, moeten de waardes geupdate worden in `source/documentation/guidelines/guidelines.config.js` en `source/scss/settings/_global.scss`
