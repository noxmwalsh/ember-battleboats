import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    let playerOneBoardCells = this.setUpCells();
    let playerTwoBoardCells = this.setUpCells();

    let playerOneBoard = this.store.createRecord('player-board', playerOneBoardCells);
    let playerTwoBoard = this.store.createRecord('player-board', playerTwoBoardCells);
    let playerOneBoard = this.store.createRecord('player-board', { cells: playerOneBoardCells });
    let playerTwoBoard = this.store.createRecord('player-board', { cells: playerTwoBoardCells });
    return this.store.createRecord('game', {
      currentTurn: 1,
      playerOneBoard: playerOneBoard,
      playerTwoBoard: playerTwoBoard
    });
  },

  setUpCells() {
    let cells = Ember.A();
    for(let i = 1; i <= 100; i++) {
      let row, column, cell;
      column = i % 10;
      row = parseInt((i + 10) / 10);
      row = parseInt((i + 9) / 10);
      cell = this.store.createRecord('cell', { row: row, column: column });
      cells.push(cell);
    }
    return cells;
  }
});
