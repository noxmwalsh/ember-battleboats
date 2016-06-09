import Ember from 'ember';

export default Ember.Route.extend({


  model() {

    this.setUpCells();
    let playerOneBoard = this.store.createRecord('player-board', { cells: this.get('playerOneBoardCells') });
    let playerTwoBoard = this.store.createRecord('player-board', { cells: this.get('playerTwoBoardCells') });

    return this.store.createRecord('game', {
      currentTurn: 1,
      playerOneBoard: playerOneBoard,
      playerTwoBoard: playerTwoBoard
    });
  },


  setUpCells() {
    this.set('playerOneBoardCells', this.createCells());
    this.set('playerTwoBoardCells', this.createCells());

    this.setUpShips('playerOneBoardCells');
    this.setUpShips('playerTwoBoardCells');
  },

  createCells() {
    let cells = Ember.A();
    for(let i = 1; i <= 100; i++) {
      let row, column, cell;
      column = i % 10;
      row = parseInt((i + 9) / 10);
      cell = this.store.createRecord('cell', { setId: i, row: row, column: column, hasShip: false, shipType: '' });
      cells.push(cell);
    }
    return cells;
  },

  //Carrier: 5
  //Battleship: 4
  //Submarine: 3
  //Destroyer: 3
  //Patrol Boat: 2
  setUpShips(cellProperty) {
    const shipTypesAndLength = {
      'Aircraft Carrier': 5,
      'Battleship': 4,
      'Submarine': 3,
      'Destroyer': 3,
      'Patrol Boat': 2
    };

    Ember.$.each(shipTypesAndLength, (shipType, shipLength) => {
      this.placeShip(shipType, shipLength, cellProperty);
    })
  },

  placeShip(shipType, shipLength, boardProperty) {
    const rowCoord = this.getRandomInt(1,10);
    const columnCoord = this.getRandomInt(1,10);
    const orientationVertical = this.getRandomInt(0,2);

    let candidateCoordinateSet = Ember.A();
    let gameboardCells = this.get(boardProperty);
    debugger;

    if (orientationVertical) {
      let incrementNextCoord = (rowCoord < 5) ? true : false
      let columnCells = gameboardCells.filterBy('column', columnCoord);
      for(let i = 1; i < shipLength; i++) {
        let nextCoord = this.nextCoordinate(incrementNextCoord, rowCoord, i);
        const candidateCell = columnCells.filterBy('row', nextCoord).objectAt(0);
        console.log("Vertical");
        candidateCoordinateSet.push(candidateCell);
      }
      } else {
        let incrementNextCoord = (columnCoord < 5) ? true : false
        let rowCells = gameboardCells.filterBy('row', rowCoord);
        for(let i = 1; i <= shipLength; i++) {
          let nextCoord = this.nextCoordinate(incrementNextCoord, columnCoord, i);
          const candidateCell = rowCells.filterBy('column', nextCoord).objectAt(0);
          candidateCoordinateSet.push(candidateCell);
        }
      }

      if (candidateCoordinateSet.filterBy('hasShip', true).length > 0) {
        //invalid cell set, roll the dice again
        this.placeShip(shipType, shipLength, boardProperty);
      } else {

        candidateCoordinateSet.forEach( (candidateCell) => {
          let row = candidateCell.get('row');
          let column = candidateCell.get('column');
          console.log('shipType', shipType);
          candidateCell.setProperties({
            shipType: shipType,
            hasShip: true
          });
      });
      this.set(boardProperty, gameboardCells);
      return true;
    }
  },



  nextCoordinate(incrementNextCoord, originCoord, steps) {
    if (incrementNextCoord) {
      return originCoord + steps;
    } else {
      return originCoord - steps;
    }
  },

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - 1 + min) + min)
  }

});
