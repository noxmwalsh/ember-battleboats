import Ember from 'ember';

export default Ember.Component.extend({
  //10x10 from 1-10 to A-J

  gameBoard: null,
  boardId: Ember.computed.alias('gameBoard.id'),
  cells: Ember.computed.alias('gameBoard.cells'),

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
