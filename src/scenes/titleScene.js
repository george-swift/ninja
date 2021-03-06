/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import Button from '../system/object.js';
import config from '../config/config.js';
import { randomTip } from '../helpers/reusables.js';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.info = this.add.text(180, 80, `📜 \u00A0 ${randomTip()}`, {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'Mate SC',
    });

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game',
    );

    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options',
    );

    this.leaderBoardButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Rankings',
      'LeaderBoard',
    );

    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits',
    );

    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.3, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height,
      ),
    );
  }

  static centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
