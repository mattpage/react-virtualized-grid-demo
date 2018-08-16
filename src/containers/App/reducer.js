import { TOGGLE_FIXED_HEADER, TOGGLE_ROW_STRIPING } from './constants';

function reducer(state={}, action){
  let newState = state;
  switch (action.type){
    case TOGGLE_FIXED_HEADER:
      newState = { ...{ enableFixedHeader: true }, ...state };
      newState.enableFixedHeader = !newState.enableFixedHeader;
      break;
    case TOGGLE_ROW_STRIPING:
      newState = { ...{ enableRowStriping: true }, ...state };
      newState.enableRowStriping = !newState.enableRowStriping;
      break;
    default:
      newState = state;
  }
  return newState;
}

export default reducer;
