# Setup
Setup is easy. Clone the project and install the node and bower packages.

    npm install && bower install --dev

# Gulp Usage
Gulp has three main targets.

## develop
- Compiles all required files
- Sets up watches on the app scripts and styles directories and recompiles and reloads on script and style changes
- Opens the application in a browser

## test
- Compiles all required files and copies dependencies to test/scripts directory
- Sets up watches on the test spec directory and recompiles and reloads on spec changes
- Opens the test application in a browser

## deploy
- Compiles all required files
- Copies all required files to dist folder

## deploy:serve
- Opens up the production version of the app in a browser
