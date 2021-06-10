# Ninja 2d

![](./ninja2d.gif)

## Live Link
[Click here](https://ninja2d.netlify.app/) to start your quest 🥷🏼

## Objectives:
- Implementing a creative game with Phaser
- Working with APIs
- Using ES6+, Async functions and Promises
- Functional programming
- Principles of Object-oriented design
- Code organization with ES6 modules in Javascript
- Using Webpack for bundling Javascript modules
- DOM manipulation
- Test driven development

## Features
Ninja 2d is a platform game created with the Phaser 3 library. On first visit, the game boots, initializing all assets. The menu appears next with three selections, `Play, Options and Credit`. Background music can be turned on and off as desired by checking the `Music enabled` option. The credits scene acknowledges the developer of Ninja 2d. To play, select `Play`. The ninja has to collect fallen stars amidst moving platforms. A level is complete when there are no more stars and a new level starts immediately. The scoring system is simple: 1 fallen star represents 5 `kata`. Users face the daunting task of accumulating `kata` as more obstacles appear with each level. Navigate the course with cursor `up, down, left and right` keys. Press the `up` arrow key twice to double jump from any platform. After each game, users can upload their achievements and see how they compare with the top ten ninjas in this exciting 2d world. 

## Prerequisites
- Internet Connection
- Chrome and Firefox. Internet Explorer is not supported and only partial support is available on Safari
- Support available for screen sizes equal to and larger than iPad Mini(landscape)
- An Integrated Development Environment
- Node Package Manager [(NPM)](https://docs.npmjs.com/about-npm)

## Tools/Built With
- JavaScript ES6+
- Phaser 3.55
- Webpack
- Bootstrap
- HTML5/CSS3
- NPM

## Getting Started
Ninja 2d is deployed to Netlify and a unique identifier was allocated from the Leaderboard API backend after creating the game. However, to manage locally, follow these steps:
- Clone this project by running `git clone https://github.com/george-swift/ninja.git` in a desired directory
- `cd` into the directory of the cloned project and run `npm install` to install required dependencies
- Automation scripts are included in the package file to ease development. Each build stage was tested using the Jest test framework. Run `npm test` to get a verbose report of individual test executions.
- If all tests pass, run `npm start` to fire up a local server with live reloading.
- If not already redirected, visit `http://localhost:8080/` in your browser to access Ninja 2d from your server.
- To terminate the server, enter `Ctrl + C` in your terminal

## Authors

👤 &nbsp; **Ubong George**
- LinkedIn: [Ubong George](https://www.linkedin.com/in/ubong-itok)
- Twitter: [@\_\_pragmaticdev](https://twitter.com/__pragmaticdev)
- GitHub: [@george-swift](https://github.com/george-swift)

## Acknowledgments

- Phaser [library](http://phaser.io/)
- Background music by [FoxSynergy](https://opengameart.org/content/8-bit-ninja)
- Platforms from [Game Art](https://www.gameart2d.com/)
- Ninja [spritesheet](https://untamed.wild-refuge.net/images/rpgxp/)

## Show your support

Leave a :star:️ &nbsp; if you like this project!

## License

Available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).