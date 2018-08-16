import { TOGGLE_FIXED_HEADER, TOGGLE_ROW_STRIPING } from './constants';

export function toggleFixedHeader() {
  return {
    type: TOGGLE_FIXED_HEADER,
  };
}

export function toggleRowStriping() {
  return {
    type: TOGGLE_ROW_STRIPING,
  };
}
