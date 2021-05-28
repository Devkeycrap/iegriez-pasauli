import { REMOVE_SECTOR } from "./types";

// Remove sector
export const removeSector = (sectorId) => (dispatch) => {
  dispatch({
    type: REMOVE_SECTOR,
    payload: sectorId,
  });
};
