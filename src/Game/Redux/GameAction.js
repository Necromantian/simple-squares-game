import store from '../../stores';

/* action creators - SETTER FUNCTIONS */
export function setDlugosc(value) {
  return {
    type: "dlugosc",
    payload: value
  }
}

export function beginPlayersTurn() {
  return {
    type: "turn",
    payload: true
  }
}

export function endPlayersTurn() {
  return {
    type: "turn",
    payload: false
  }
}

export function incCzipsy() {
  return {
    type: "czipsy",
    payload: 0
  }
}


export function get123() {
  return function (dispatch) {
    return "123";
  }
}