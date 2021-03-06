/* eslint-disable import/no-unresolved */
import './style.css';
import Phaser from 'phaser';
import config from './config/config.js';
import GameScene from './scenes/gameScene.js';
import GameOverScene from './scenes/gameOverScene.js';
import BootScene from './scenes/bootScene.js';
import TitleScene from './scenes/titleScene.js';
import PreloaderScene from './scenes/preloaderScene.js';
import OptionsScene from './scenes/optionsScene.js';
import CreditsScene from './scenes/creditsScene.js';
import LeaderBoardScene from './scenes/leaderboardScene.js';
import Model from './system/model.js';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();