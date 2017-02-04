import makeStore from './src/store';
import {startServer} from './src/server';

export const store = makeStore();
startServer(store);
// load initial entries
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
// kick off the vote by dispatching a next action
store.dispatch({type: 'NEXT'});
