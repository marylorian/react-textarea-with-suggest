export enum KeyCodes {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  Enter = "Enter",
  Escape = "Escape",
}
export const SUPPORTED_KEYDOWN = [
  KeyCodes.ArrowUp,
  KeyCodes.ArrowDown,
  KeyCodes.Enter,
  KeyCodes.Escape,
];
export const SEARCH_MARKER = "@";
export const ENDING_SYMBOLS = [" ", "\n", "\r"];

export enum AutoHighlightFirstItemValues {
  Always = "always",
  OnlySingleItem = "only_single_item",
  Never = "never",
}
