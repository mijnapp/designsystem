## Richtlijnen en code conventies voor front-end ontwikkelaars

Het merendeel van het werk van ontwikkelaars bestaat uit het lezen van code: 10% schrijven en 90% lezen. Daarom is het belangrijk dat de code niet alleen simpel en afgebakend is, maar ook makkelijk te lezen.

Om te zorgen dat alle code er hetzelfde uit ziet, gebruiken we `.editorconfig` voor coding styles en `eslint` voor JavaScript. De configuratiebestanden kunnen door je editor worden gebruikt. We controleren ook voor het builden van de JavaScript of code voldoet aan de `eslint` configuratie.

This Design System is built with [Fractal](https://fractal.build) and uses the [handlebars](https://handlebarsjs.com/) template engine.
When getting started with this Design System update the **name** and **author** of the project in `package.json` and `fractal.js`.


### Eerste setup

Om dependencies te installeren, [installeer yarn](https://yarnpkg.com/en/docs/install), en run dan:

```bash
yarn
```

### Na de eerste keer

Om te werken aan componenten, heb je twee Node-processen nodig:

* de Fractal-server: serveert onze componenten in een overzichtelijke interface, via een lokale server
* Webpack: bouwt assets (CSS, JavaScript, afbeeldingen), met `--watch` worden de mappen in de gaten gehouden en opnieuw gebouwd bij wijzigingen


### Theme

Het thema is een aangepaste versie van [Mandelbrot](https://github.com/frctl/mandelbrot), het default theme van Fractal. De bestanden die betrekking hebben op het theme zitten in de map`theme`.


### Een component toevoegen

1. Maak een map met de naam van het component in `src/components`.
2. Maak de volgende bestanden:
  * `componentName.hbs` - een handelbars template met de HTML structuur van het component
  * `componentName.config.js` - een configuratieebstand voor het instellen van naam, label, context (data/state) en varianten van het component
  * `componentName.scss` (optioneel)- een scss file met de styles voor het component
  * `componentName.js` (optioneel) - een JavaScript file voor de functionaliteit van het component
  * `README.md` - uitleg bij het component in Markdown

#### Gotchas

* Componenten kunnen worden gegroepeerd door ze in mappen te plaatsen. Zo zitten alle componente in de map 'componenten', die ook zo wordt weergegeven in de navigatie.
* Om een component te verbergen uit de sidebar, laat de map of het `.hbs` bestand met `_` beginnen
* Een component kan worden ingevoegd in een ander component met [handlebars partials](https://handlebarsjs.com/partials.html).
  * Bijvoorbeeld: `\{{> button}}` (context moet worden toegevoegd) of `\{{render '@button'}}` (gebruikt context van het component)
* Er kan een _status_ worden toegevoegd aan het component in het configbestand
