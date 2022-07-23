# wiki-e2e-tests-FE

Wikipedia E2E Tests using Cypress

## Pre-requisites:

1. Install Node & npm from https://www.npmjs.com/get-npm

2. Install Visual Studio Code from https://code.visualstudio.com/download (Personal preference)

3. Install Github desktop from https://desktop.github.com/ (This is a personal preference, you can use github cli from terminal as well)

## Setup

1. clone project using Github "https://github.com/swvl/taas-dashboard-automation-BDD"

2. CD to your project directory in terminal

3. install dependancies by running the below command
   `npm install`

## Running Scripts

1. run `npx cypress run` in terminal to run all tests in headless mode

2. run `npm run cypress:open` to open cypress UI and pick a certain test to run

## Where to put what

This section aims to give a hint on the usage of each file/directory

1. `cypress/integration/tests/FE`: contains test files
2. `cypress/integration/pages`: contains page files
3. `cypress/integration/utilities`: contains helper functions not related to cypress
4. `cypress/plugins`: Able to import plugins in it and set cypress triggering events
5. `cypress/support`: Able to create custom commands in it and set logic for all cypress tests
6. `cypress.json`: contains cypress based configurations
