import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    let playerOneBoardCells = this.setUpCells();
    let playerTwoBoardCells = this.setUpCells();

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
      row = parseInt((i + 9) / 10);
      cell = this.store.createRecord('cell', { row: row, column: column });
      cells.push(cell);
    }
    return cells;
  },

  //Carrier: 5
  //Battleship: 4
  //Submarine: 3
  //Destroyer: 3
  //Patrol Boat: 2
  setUpShips(cells) {
    let shipLength = Ember.A([5,4,3,3,2]);
    shipLength.forEach(function(value, index){
      let cellSet = this.getUnoccupiedCellSet(cells, length);
    })
  },

  getUnoccupiedCellSet(cells, length) {

    let startRow = this.getRandomInt();
    let startColumn = this.getRandomInt();
    

  },

  getRandomInt() {
    return Math.floor(Math.random() * (10 - 1 + 1) + 1)
  }



});
