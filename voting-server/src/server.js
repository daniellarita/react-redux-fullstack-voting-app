// HOW OUR SERVER WORKS:
// 1. A client sends an action to the server.
// 2. The server hands the action to the Redux Store.
// 3. The Store calls the reducer and the reducer executes the logic related to the action.
// 4. The Store updates its state based on the return value of the reducer.
// 5. The Store executes the listener function subscribed by the server.
// 6. The server emits a 'state' event.
// 7. All connected clients - including the one that initiated the original action - receive the new state.

import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8090);
  // subscribes a listener to the store that reads the current state, turns it into a JS obj and emits it as a state event on the Socket.io server. this will go to all active socket.io connections
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    // any time a user connects, send the state
    socket.emit('state', store.getState().toJS());
    // when users vote we will dispatch an action to the store
    socket.on('action', store.dispatch.bind(store));
  });

}
