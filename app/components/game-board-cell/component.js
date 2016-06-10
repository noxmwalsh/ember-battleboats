import Ember from 'ember';

export default Ember.Component.extend({

  cell: null,
  tagName: 'td',

  hasNotBeenFiredOn: Ember.computed.not('cell.beenFiredOn'),
  hasShipPartHit: Ember.computed.and('cell.hasShip', 'cell.beenFiredOn'),
  hasUnhitShipPart: Ember.computed.and('cell.hasShip', 'hasNotBeenFiredOn'),

  row: Ember.computed.alias('cell.row'),
  column: Ember.computed.alias('cell.column'),

  actions: {
    fireShot: function() {
      let cell = this.get('cell');
      this.sendAction('fireShot', cell.get('row'), cell.get('column'));
    }
  }

});
