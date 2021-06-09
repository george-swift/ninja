import Phaser from 'phaser';
import Ninja from '../assets/images/ninja2D.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', Ninja);
  }

  create() {
    this.scene.start('Preloader');
  }
}