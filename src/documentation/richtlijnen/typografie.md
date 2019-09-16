## Fonts
Font              | Implementatie
------------------|------------
TheSans | Body tekst
TheMix | Headers

## Font-sizes
Voor de tekst gebruiken we een [modulaire schaal](https://www.modularscale.com/?18&px&1.10) van **1.10** met een basis van **18px**.

SCSS variabele    | Font-size
------------------|------------
{{#each typografie }}
  {{@key}} | {{this}}
{{/each}}

## Font-weights
SCSS variabele    | Font-weight
------------------|------------
{{#each font-weights }}
  {{@key}} | {{this}}
{{/each}}


Wanneer de typografie veranderd, moeten de waardes geupdate worden in `source/documentation/guidelines/guidelines.config.js` en `source/scss/settings/_typography.scss`
