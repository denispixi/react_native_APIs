import { SET_THEME } from "./actionTypes";
import { Themes } from "./actions";

type Action = {
  type: string;
  payload: any;
}

const defaultStore = {
  theme: Themes.SYSTEM
}

export default function themeReducer(
  state = defaultStore,
  action: Action,
) {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      }
    default:
      return defaultStore
  }
}
