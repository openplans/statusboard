# Statusboard

Statusboard is a simple dashboard for tracking progress on planning projects. Check out [this simple demo](http://openplans.github.com/statusboard/).

## Features
* pulls data from a Google spreadsheet
* present overall and year-by-year progress on targets
* categorize issues by topic
* responsive layout (works on small screens)
* easy to embed into larger project websites

## Making Changes
The project follows the Yeoman workflow. You can learn more about it at [yeoman.io](http://yeoman.io). This means that changes you make will need to be built before they can be deployed.

## Build

### One Time Setup
* Install [node](http://nodejs.org/) and [npm](https://npmjs.org/)
* Install the tools `npm install -g yo grunt-cli bower`
* Install dependencies `npm install && bower install`

### Subsequent Builds
* `grunt`

## Deploy to GitHub Pages
Did you build first? No? See above.

* You deploy to GitHub pages by making a `gh-pages` branch and pushing your `dist` directory to it. `git subtree push --prefix dist origin gh-pages`

Statusboard is an open source project from [OpenPlans](http://openplans.org).
