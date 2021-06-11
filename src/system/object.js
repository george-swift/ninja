/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, btn1, btn2, text, targetScene) {
    super(scene);
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, btn1).setInteractive();
    this.text = this.scene.add.text(0, 0, text, { fontSize: '30px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      this.scene.scene.start(targetScene);
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(btn2);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(btn1);
    });

    this.scene.add.existing(this);
  }
}