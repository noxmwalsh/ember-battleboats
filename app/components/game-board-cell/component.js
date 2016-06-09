import Ember from 'ember';

export default Ember.Component.extend({

  cell: null,
  

  row: Ember.computed.alias('cell.row'),
  column: Ember.computed.alias('cell.column')

});
