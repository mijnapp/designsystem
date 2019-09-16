const fs = require('fs');
const handlebars = require('handlebars');

const componentName = process.argv.slice(2)[0];
const configurations = {
  componentsPath: 'src/components/01-componenten',
  templatesPath: './boilerplate',
};

const filesToGenerate = [
  // Configuration file
  {
    name: 'Configuration file',
    templateFileName: 'config-file.hbs',
    outputFileName: `${componentName}.config.js`,
    data: {
      componentName,
    },
  },
  // Handlebars file
  {
    name: 'Handlebars file',
    templateFileName: 'handlebars-file.hbs',
    outputFileName: `${componentName}.hbs`,
    data: {
      componentName,
    },
  },
  // SCSS (style) file
  {
    name: 'SCSS (styling) file',
    templateFileName: 'scss-file.hbs',
    outputFileName: `_${componentName}.scss`,
    data: {
      componentName,
    },
  },
  // Readme file
  {
    name: 'Readme file',
    templateFileName: 'readme-file.hbs',
    outputFileName: `readme.md`,
    data: {
      componentName: toCamelCase(componentName),
    },
  },
  // JS file
  {
    name: 'JS file',
    templateFileName: 'js-file.hbs',
    outputFileName: `${componentName}.js`,
    data: {
      componentName: toCamelCase(componentName),
    },
  },
];

// First make sure the component with that name does not exist! If you don't do this test, the component will be overwritten.
if (fs.existsSync(`${configurations.componentsPath}/${componentName}`)) {
  /* eslint-disable-next-line */
  console.error(`Component with name ${componentName} already exists!`);

} else {
  generateFolder();

  filesToGenerate.forEach(
    ({ name, templateFileName, outputFileName, data }) => {
      return createFile(name, templateFileName, outputFileName, data);
    });
}

function generateFolder () {
  fs.mkdir(`${configurations.componentsPath}/${componentName}`,
    { recursive: true }, error => {
      if (error) {
        /* eslint-disable-next-line */
        console.log(error.message);
      }
    });
}

/**
 * Create file.
 *
 * @param {string} name
 * @param {string} templateFilename
 * @param {string} outputFilename
 * @param {Object} data
 */
function createFile (name, templateFilename, outputFilename, data = {}) {
  const source = fs.readFileSync(
    `${configurations.templatesPath}/${templateFilename}`, 'utf8');
  const template = handlebars.compile(source, { strict: true });
  const contents = template(data);

  fs.writeFile(
    `${configurations.componentsPath}/${componentName}/${outputFilename}`,
    contents, error => {
      if (error) {
        /* eslint-disable-next-line */
        return console.error(
          `Failed to store ${name} template: ${error.message}.`);
      }

      /* eslint-disable-next-line */
      console.log(`Saved ${name} template!`);
    });
}

/**
 * String to camelcase.
 *
 * @param {string} string
 * @return {string}
 */
function toCamelCase (string) {
  var nameSplit = string.split('-');
  var nameCamelCased = '';

  for (var i = 0; i < nameSplit.length; i++) {
    nameCamelCased += capitalize(nameSplit[i]);
  }

  return nameCamelCased;
}

/**
 * Capitalize first letter of string.
 *
 * @param {string} string
 * @return {string}
 */
function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
