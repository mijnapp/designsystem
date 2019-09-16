# Mijn App Design System

## 1 Setup environment
You can run this application within a Docker container or on your local machine. 
We recommend Docker for simplicity and isolation of other projects with contradicting runtime environments. This project uses Node JS version 10.16.

### 1.1 Clone this repository on your machine
Clone this repository on your local machine.

### 1.2 Setup and run your development environment
You can choose to use Docker (see 1.2.1) or local install (see 1.2.2).

#### 1.2.1 Docker install
This step assumes you have installed and configured [Docker](https://docs.docker.com) on your machine. 
Docker is a platform for developers and sysadmins to develop, deploy, and run applications with containers. 
The use of Linux containers to deploy applications is called containerization. 
Containers are not new, but their use for easily deploying applications is.

In case of Windows host, please check the following blog for how to fix file system issue: https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c

1. Navigate to project root in your terminal.
1. Run `docker-compose up -d`. This will will setup the Docker container. This step can take some time. 
The option -d (detached mode) ensures that the container runs in the background.
1. Run `docker exec -it mijnappdesignsystem /bin/bash`. With this command you will enter the container. You can now execute terminal commands.
1. Run `yarn`, which will install project dependencies.
1. Run `yarn theme:build`, which will build assets used in the Design System itself (our theme for Fractal).
1. Run `yarn start`, which will start development mode. This will watch for assets changes (SCSS, JS or Handlebars templates) and rebuild if needed.
1. Open your browser and go to `http://localhost:3001`.

#### 1.2.2 Design System: Local install
This step assumes you have installed NodeJS and Yarn locally.

1. Navigate to project root in your terminal.
1. Run `yarn`, which will install project dependencies.
1. Run `yarn theme:build`, which will build assets used in the Design System itself (our theme for Fractal).
1. Run `yarn start`, which will watch for changes in component assets and start up a server that serves our Fractal instance.
1. Open your browser and go to `http://localhost:3001`.

## 2 Tools
- The Design System runs on [Fractal](https://www.fractal.build). The components consist of [Handlebars](http://handlebarsjs.com/) templates.
- [Docker](https://docs.docker.com) can be used to run your environment in a container.
- We use lint tools to make sure the code is according to code quality rules.

## 3 Git Workflow & Guidelines
- We create a feature branch per component with naming convention feature/[component name].
- We create a pull request and do a code review before merging with develop branch.

## 4 Folder structure

```bash
                             .
                             |-- build/                          # Component assets during development.
                             |-- node_modules/
                             |-- public/                         # General static assets are needed for the build, but are not created with build tool (Webpack).
|-- src/
|    |-- components/
|         |-- 00-inhoud
|         |-- 01-componenten
|         |-- 02-templates
|         |-- 03-patronen
|         |-- ...
|    |-- documentation/
|    |-- fonts/
|    |-- img/
|    |-- js/
|    |-- scss/
|         |-- styles.scss
|         |-- ...
|-- theme/
|    |-- scss/
|    |-- views/
|-- .eslintrc.json
|-- .gitignore
|-- constants.js
|-- docker-compose.yml
|-- fractal.js
|-- package.json
|-- README.md
|-- robots.txt
|-- webpack.common.js
|-- webpack.development.js
|-- webpack.production.js
|-- webpack.theme.js
|-- ...
```

## 5 Gotchas

### 5.1 Sass/SCSS

- URL-resolution: make sure the URLs in all *.scss files are relative to the entry files (webpackConfig.entry).

### 5.2 Theme vs Component builds

We have different webpack configuration files for building the code used in components and for building
the code that is used by the Fractal theme.

### 5.3 JavaScript

The source code is written is ES5.

### 5.4 Linting

To apply linting rules you can run `yarn lint:fix`. We encourage you to run this rules before each push, in case your IDE does not handle this.

## 6 Utility

### 6.1 Generating boilerplate code for component

Instead of manually creating all files for a new component you can use the command `yarn generate [component-name]`. This command will generate all needed files with some code for you.
