/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import { getRankings } from '../system/api.js';
import Button from '../system/object.js';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.rankings = getRankings();

    this.title = this.add.text(255, 55, 'Latest ninja rankings', {
      fontSize: '28px',
      fill: '#fff',
      fontFamily: 'Mate SC',
    });

    this.action = new Button(
      this,
      390, 550,
      'blueButton1',
      'blueButton2',
      'Show Menu',
      'Title',
    );

    this.rankings.then((achievement) => {
      const topTenNinjas = achievement.slice(0, 11);

      const newCellObject = (scene, cell) => {
        const seed = { user: '- -', score: '- -' };

        const container = scene.add.container(0, 0);
        const background = scene.add.graphics().fillStyle(0x000).fillRect(2, 2, 250 - 2, 40 - 2);
        const format = { fontSize: '16px', fill: '#ffcc00', fontFamily: 'Mate SC' };

        const { user, score } = topTenNinjas[cell.index] !== undefined
          ? topTenNinjas[cell.index]
          : seed;

        const rank = scene.add.text(10, 20, cell.index + 1, format);
        const name = scene.add.text(40, 20, user, format);
        const kata = scene.add.text(190, 20, score, format);

        container.add([background, rank, name, kata]);
        return container;
      };

      const onCellVisible = (cell) => {
        cell.setContainer(newCellObject(this, cell));
      };

      const table = this.add.rexGridTable(400, 300, 250, 400, {
        cellWidth: 250,
        cellHeight: 40,
        cellsCount: 10,
        columns: 1,
        cellVisibleCallback: onCellVisible.bind(this),
      });

      this.table = table;
    });
  }
}