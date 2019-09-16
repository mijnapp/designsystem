'use strict';

const mandelbrot = require('@frctl/mandelbrot');
const layouts = require('handlebars-layouts');

const {
  COMPONENTS_PATH, DOCUMENTATION_PATH, STATIC_PATH,
  BUILD_PATH, THEME_STATIC_PATH, FRACTAL_STATUS,
} = require('./constants');

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

// This port is set dynamically, if not set via configuration. Make sure this port is the same as the container port,
// in case of Docker usage.
fractal.web.set('server.port', 3001);

// Refresh browser after change.
// When using Docker, make sure the host and container have the same port, otherwise the syncing mechanism will not work.
fractal.web.set('server.sync', true);

/* Set the title of the project */
fractal.set('project.title', 'MijnApp Design System');

fractal.docs.set('indexLabel', 'Introductie');

/* Tell Fractal where the components will live */
fractal.components.set('path', COMPONENTS_PATH);

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', DOCUMENTATION_PATH);

fractal.web.set('static.path', STATIC_PATH);

fractal.web.set('builder.dest', BUILD_PATH); // destination for the static export

fractal.components.set('statuses', FRACTAL_STATUS);

const myCustomisedTheme = mandelbrot({
  styles: [
    'default',
    `/css/fractal-styles.css`,
  ],
  'nav': ['docs', 'components'],
});

// Specify a directory to hold the theme override templates
myCustomisedTheme.addStatic(THEME_STATIC_PATH);
fractal.web.theme(myCustomisedTheme);

const handlebars = fractal.components.engine().handlebars;
layouts.register(handlebars);
