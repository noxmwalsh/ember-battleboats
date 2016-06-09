import Ember from 'ember';

export default Ember.Component.extend({

  cell: null,
  tagName: 'td',
  

  row: Ember.computed.alias('cell.row'),
  column: Ember.computed.alias('cell.column'),

  actions: {
    fireShot: function() {
      let cell = this.get('cell');
      this.sendAction('fireShot', cell.get('row'), cell.get('column'));
    }
  }

});
