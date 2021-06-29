import axios from "axios";

import { REMOVE_SECTOR } from "../actions/types";

const initialState = {
  sectors: await axios.get("http://localhost:8000/api/gameItems").then((res) =>
    res.data.map((item) => ({
      name: item.name,
    }))
  ),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_SECTOR:
      return {
        ...state,
        sectors: state.sectors.splice(action.payload, 1),
      };
    default:
      return state;
  }
}
