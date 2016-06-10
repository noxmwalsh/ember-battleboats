import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  setId: attr('number'),
  row: attr('number'),
  column: attr('number'),
  hasShip: attr('boolean'),
  shipType: attr('boolean'),
  beenFiredOn: attr('boolean', {default: 'false'}),
  playerBoard: belongsTo('player-board')
});
