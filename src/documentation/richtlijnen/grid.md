## Breakpoints
SCSS variabele    | Waarde in pixels
------------------|------------
{{#each breakpoints }}
  {{@key}} | {{this}}
{{/each}}


Wanneer de breakpoints veranderen, moeten de waardes geupdate worden in `source/documentation/guidelines/guidelines.config.js` en `source/scss/settings/_global.scss`
