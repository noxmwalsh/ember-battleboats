import Ember from 'ember';

export default Ember.Component.extend({
  //10x10 from 1-10 to A-J

  gameBoard: null,
  cells: Ember.computed.alias('gameBoard.cells'),

  cellRows: Ember.computed('cells.[]', function() {
    let rows = Ember.A();
    for(let i = 1; i <= 10; i++) {
      let cells = this.get('cells').filterBy('row', i);
      rows.push(Ember.Object.create('cells', cells));
    }
    return rows;
  }),


  action: {
    fireRound: function() {

    }
  }
});
