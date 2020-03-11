import { SET_THEME } from "./actionTypes";

export function setTheme(payload: any) {
  return {
    type: SET_THEME,
    payload
  }
}

export enum Themes {
  LIGTH = 'LIGTH',
  DARK = 'DARK',
  SYSTEM = 'SYSTEM',
}