export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function vote(entry) {
  return {
    meta: {remote: true},
    type: 'VOTE',
    entry
  };
}

export function next() {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}
// The user clicks a vote button. A VOTE action is dispatched.
// The remote action middleware sends the action over the Socket.io connection.
// The client-side Redux store handles the action, causing the local hasVote state to be set.
// When the message arrives on the server, the serverside Redux store handles the action, updating the vote in the tally.
// The listener on the serverside Redux store broadcasts a state snapshot to all connected clients.
// A SET_STATE action is dispatched to the Redux store of every connected client.
// The Redux store of every connected client handles the SET_STATE action with the updated state from the server.
