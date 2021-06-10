/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import blueBtn1 from '../assets/ui/blue_button02.png';
import blueBtn2 from '../assets/ui/blue_button03.png';
import greyBox from '../assets/ui/grey_box.png';
import checkBox from '../assets/ui/blue_boxCheckmark.png';
import background from '../assets/images/background.png';
import star from '../assets/images/star.png';
import tile from '../assets/images/tile.png';
import tile2 from '../assets/images/tile-2.png';
import tile3 from '../assets/images/tile-3.png';
import bomb from '../assets/images/bomb.png';
import ninja from '../assets/images/ninja.png';
import themesong from '../assets/audio/8-Bit-Ninja.mp3';
import pause from '../assets/images/pause.png';
import play from '../assets/images/play.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(400, 200, 'logo').setScale(2);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', () => assetText.setText('Initializing assets ⏳'));

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(1300, this.ready, [], this);

    this.load.audio('bgMusic', [themesong]);

    this.load.image('blueButton1', blueBtn1);
    this.load.image('blueButton2', blueBtn2);
    this.load.image('greyBox', greyBox);
    this.load.image('checkedBox', checkBox);
    this.load.image('background', background);
    this.load.image('star', star);
    this.load.image('ground', tile);
    this.load.image('higherGround', tile2);
    this.load.image('higherGroundLeft', tile3);
    this.load.image('bomb', bomb);
    this.load.image('pause', pause);
    this.load.image('resume', play);

    this.load.spritesheet('ninja', ninja, { frameWidth: 32, frameHeight: 48 });

    this.load.plugin('rexgridtableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js', true);
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
