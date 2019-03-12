const initialState = {
  dlugosc: 99,
  grubosc: 21,
  iloscCzipsow: 0,
  playersTurn: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'dlugosc': {
      return { ...state, dlugosc: action.payload}
    }
    case 'grubosc': {
      return { ...state, grubosc: action.payload }
    }
    case 'czipsy': {
      return { ...state, iloscCzipsow: state.iloscCzipsow + 1 }
    }
    case 'turn': {
      return { ...state, playersTurn: state.payload + 1 }
    } 
    default:
      return state;
  }
}