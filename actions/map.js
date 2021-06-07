import axios from "axios";
import { MAP_ICONS_LOADING, MAP_ICONS_LOADED } from "./types";

// Get map icons with questions to display on the map
  dispatch({
    type: MAP_ICONS_LOADING,
  });
  axios
    .get("http://localhost:8000/api/map/questions", { params: { item } })
    .then((res) => {
      dispatch({
        type: MAP_ICONS_LOADED,
        payload: formatResponse(res.data),
      });
    });
};

// Set map questions
};
