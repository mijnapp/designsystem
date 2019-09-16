/**
 * Directories
 */

// Core directories
const SOURCE_PATH = `${__dirname}/src`;
const THEME_PATH = `${__dirname}/theme`;

// Fractal directories
const COMPONENTS_PATH = `${SOURCE_PATH}/components`;
const DOCUMENTATION_PATH = `${SOURCE_PATH}/documentation`;
const STATIC_PATH = `${__dirname}/static`;
const BUILD_PATH = `${__dirname}/build`;
const TEMP_PATH = `${__dirname}/tmp`;

// Fractal theme directories
const THEME_VIEWS_PATH = `${THEME_PATH}/views`;
const THEME_BUILD_PATH = `${THEME_PATH}/build`;
const THEME_STATIC_PATH = THEME_BUILD_PATH;

/**
 * Statuses for fractal components
 */
const FRACTAL_STATUS = {
  ready: {
    id: 'ready',
    label: 'Ready',
    description: 'Component requirements en design afgestemd met stakeholders en ontwikkelteam.',
    color: '#e86e01',
  },
  inprogress: {
    id: 'inprogress',
    label: 'In progress',
    description: 'Uitwerking design en bouwen en testen van component volgens requirements.',
    color: '#edbf07',
  },
  review: {
    id: 'review',
    label: 'Review',
    description: '',
    color: '#1261a3',
  },
  done: {
    id: 'done',
    label: 'Done',
    description: 'Voldoet aan DoD, geaccepteerd door PO en checkin in design system.',
    color: '#227b3c',
  },
  integratietest: {
    id: 'integratietest',
    label: 'Integratie test',
    description: 'Functioneert het component geïntegreerd in een feature.',
    color: '#9a6f1e',
  },
  live: {
    id: 'live',
    label: 'Live',
    description: 'Component live geintegreerd in een feature.',
    color: '#227b3c',
  },
};

module.exports = {
  SOURCE_PATH,
  THEME_PATH,
  COMPONENTS_PATH,
  DOCUMENTATION_PATH,
  STATIC_PATH,
  BUILD_PATH,
  THEME_VIEWS_PATH,
  THEME_BUILD_PATH,
  THEME_STATIC_PATH,
  TEMP_PATH,
  FRACTAL_STATUS,
};
