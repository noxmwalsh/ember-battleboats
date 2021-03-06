import Ember from 'ember';

export default Ember.Component.extend({
  //10x10 from 1-10 to A-J

  gameBoard: null,
  boardId: Ember.computed.alias('gameBoard.id'),
  cells: Ember.computed.alias('gameBoard.cells'),

  aircraftCarrierCells: Ember.computed.filterBy('cells', 'shipType', 'Aircraft Carrier'),
  battleshipCells: Ember.computed.filterBy('cells', 'shipType', 'Battleship'),
  submarineCells: Ember.computed.filterBy('cells', 'shipType', 'Submarine'),
  destroyerCells: Ember.computed.filterBy('cells', 'shipType', 'Destroyer'),
  patrolBoatCells: Ember.computed.filterBy('cells', 'shipType', 'Patrol Boat'),

  aircraftCarrierCellsRemaining: Ember.computed.filterBy('aircraftCarrierCells', 'beenFiredOn', false),
  battleshipCellsRemaining: Ember.computed.filterBy('battleshipCells', 'beenFiredOn', false),
  submarineCellsRemaining: Ember.computed.filterBy('submarineCells', 'beenFiredOn', false),
  destroyerCellsRemaining: Ember.computed.filterBy('destroyerCells', 'beenFiredOn', false),
  patrolBoatCellsRemaining: Ember.computed.filterBy('patrolBoatCells', 'beenFiredOn', false),

  shipCellsRemaining: Ember.computed(
    'aircraftCarrierCellsRemaining.[]', 'battleshipCellsRemaining.[]', 'submarineCellsRemaining.[]',
    'destroyerCellsRemaining.[]', 'patrolBoatCellsRemaining.[]', function() {
    let cells = this.get('cells');
    let ships = cells.filterBy('hasShip', true);
    return ships.filterBy('beenFiredOn', false).length;
  }),

  cellRows: Ember.computed('cells.[]', function() {
    let rows = Ember.A();
    for(let i = 1; i <= 10; i++) {
      let cells = this.get('cells').filterBy('row', i);
      let row = Ember.Object.create();
      row.set('cells', cells);
      rows.push(row);
    }
    return rows;
  }),


  actions: {
    fireShot: function(row, column) {
      this.sendAction('fireShot', row, column, this.get('boardId'));
    }
  }
});
