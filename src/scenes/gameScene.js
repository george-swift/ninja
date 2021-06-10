/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import { defyPhysics, reverseMotion } from '../helpers/phaserTricks.js';
import { randomInt, storeKata } from '../helpers/reusables.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.score = 0;
    this.gameOver = false;
  }

  create() {
    this.add.image(400, 300, 'background');
    this.addPlatform();
    this.addmovingPlatforms();
    this.createNinja();
    this.addCursor();
    this.createStars();

    this.scoreText = this.add.text(16, 16, 'Kata: 0', {
      backgroundColor: '#eef1ef',
      fontSize: '28px',
      fill: '#18983f',
      fontFamily: 'Mate SC',
    });
  }

  addPlatform() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(7, 0.85).refreshBody();
    this.platforms.create(50, 265, 'higherGroundLeft').setScale(1.7, 1).refreshBody();
    this.platforms.create(750, 250, 'higherGround');
  }

  addmovingPlatforms() {
    this.movingPlatform = this.physics.add.image(425, 0, 'ground');
    this.movingPlatform2 = this.physics.add.image(430, 400, 'ground').setScale(2, 1).refreshBody();
    defyPhysics(this.movingPlatform, this.movingPlatform2);
    this.movingPlatform.setVelocityY(100);
    this.movingPlatform2.setVelocityX(100);
  }

  createNinja() {
    this.ninja = this.physics.add.sprite(100, 455, 'ninja');
    this.ninja.setCollideWorldBounds(true);
    this.ninja.setBounceY(0.2);
    this.physics.add.collider(this.ninja, this.platforms);
    this.physics.add.collider(this.ninja, this.movingPlatform, () => {
      this.movingPlatform.setPushable(false);
    });
    this.physics.add.collider(this.ninja, this.movingPlatform2, () => {
      this.movingPlatform2.setPushable(false);
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('ninja', { start: 7, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'ninja', frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('ninja', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  addCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createStars() {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: randomInt(10, 15),
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      child.setCollideWorldBounds(true);
      child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.stars, this.movingPlatform);
    this.physics.add.collider(this.stars, this.movingPlatform2);
    this.physics.add.overlap(this.ninja, this.stars, this.collectStars, null, this);
  }

  collectStars(ninja, star) {
    star.disableBody(true, true);
    this.score += 5;
    this.scoreText.setText(`Kata: ${this.score}`);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => child.enableBody(true, child.x, 0, true, true));

      const x = (this.ninja.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      this.bombs = this.physics.add.group().create(x, 16, 'bomb');
      this.bombs.setBounce(0.85);
      this.bombs.setCollideWorldBounds(true);
      this.bombs.setVelocity(Phaser.Math.Between(-200, 200), 20);
      this.bombs.allowGravity = false;
      this.physics.add.collider(this.bombs, this.platforms);
      this.physics.add.collider(this.bombs, this.movingPlatform);
      this.physics.add.collider(this.bombs, this.movingPlatform2);
      this.physics.add.collider(this.ninja, this.bombs, this.damage, null, this);
    }
  }

  damage() {
    this.gameOver = true;
    storeKata(this.score);
    this.score = 0;
    this.physics.pause();
    this.ninja.setTint(0xff0000);
    this.ninja.anims.play('turn');
    this.time.delayedCall(1500, this.switchScenes, [], this);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.ninja.setVelocityX(-160);
      this.ninja.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.ninja.setVelocityX(160);
      this.ninja.anims.play('right', true);
    } else {
      this.ninja.setVelocityX(0);
      this.ninja.anims.play('turn');
    }

    const triggerDoubleJump = Phaser.Input.Keyboard.JustDown(this.cursors.up);

    if (triggerDoubleJump) {
      if (this.ninja.body.touching.down) {
        this.canDoubleJump = true;
        this.ninja.body.setVelocityY(-300);
      } else if (this.canDoubleJump) {
        this.canDoubleJump = false;
        this.ninja.body.setVelocityY(-300);
      }
    }

    reverseMotion(this.movingPlatform, this.movingPlatform2);
  }

  switchScenes() {
    if (this.gameOver === true) {
      this.scene.start('GameOver');
    }
  }
}