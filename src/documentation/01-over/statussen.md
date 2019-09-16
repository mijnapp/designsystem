Naam              | Omschrijving
------------------|------------
{{#each statuses }}
  <div class="Status Status--tag"><label class="Status-label" style="background-color: {{ color }}; border-color: {{ color }};">{{ label }}</label></div> | {{ description }}
{{/each}}
