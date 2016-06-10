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
    let row, column, cell;
    for(let i = 1; i <= 10; i++) {
      for(let j = 1; j <= 10; j++) {
        column = i;
        row = j;
        cell = this.store.createRecord('cell', { row: row, column: column, hasShip: false, shipType: '' });
        cells.push(cell);
      }
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
    const twoSidedDie = this.getRandomInt(1,2);

    const orientationVertical = (twoSidedDie === 1) ? true : false;

    let candidateCoordinateSet = Ember.A();
    let gameboardCells = this.get(boardProperty);

    if (orientationVertical) {
      let incrementNextCoord = (rowCoord <= 5) ? true : false
      let columnCells = gameboardCells.filterBy('column', columnCoord);
      for(let i = 1; i <= shipLength; i++) {
        let nextCoord = this.nextCoordinate(incrementNextCoord, rowCoord, i);
        console.log("next", nextCoord);
        const candidateCell = columnCells.filterBy('row', nextCoord).objectAt(0);
        console.log("Vertical", nextCoord);
        console.log("filteredCell", candidateCell);
        candidateCoordinateSet.push(candidateCell);
      }
    } else {
        let incrementNextCoord = (columnCoord <= 5) ? true : false
        let rowCells = gameboardCells.filterBy('row', rowCoord);
        for(let i = 1; i <= shipLength; i++) {
          let nextCoord = this.nextCoordinate(incrementNextCoord, columnCoord, i);
          console.log("Horizontal", nextCoord);
          const candidateCell = rowCells.filterBy('column', nextCoord).objectAt(0);
          candidateCoordinateSet.push(candidateCell);
        }
    }
      console.log(candidateCoordinateSet);
      if (candidateCoordinateSet.filterBy('hasShip', true).length > 0) {
        //invalid cell set, roll the dice again
        console.log("Rerolling");
        this.placeShip(shipType, shipLength, boardProperty);
      } else {

        candidateCoordinateSet.forEach( (candidateCell) => {
          let row = candidateCell.get('row');
          let column = candidateCell.get('column');
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
  },

  actions: {
    fireShot(row, column, gameBoardId) {
      let board = this.store.peekRecord('player-board', gameBoardId);
      let cells = board.get('cells');
      let targetCell = cells.filterBy('row', row).filterBy('column', column).objectAt(0);
      if (targetCell.get('beenFiredOn')) {
        //Good shooting, captain, you'll show those fish what for the second time
        return false;
      } else {
        //Boom!
        targetCell.set('beenFiredOn', true)
      }
      targetCell.save();
    }
  }

});
