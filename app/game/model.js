import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  playerOneBoard: belongsTo("player-board"),
  playerTwoBoard: belongsTo("player-board"),
  currentTurn: attr('number')
});
