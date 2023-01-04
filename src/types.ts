import { ReactNode } from "react";

export type Nullable<T> = T | null;
export type CustomSuggestItemRenderer<T> = (
  item: T,
  isSelected?: boolean
) => ReactNode;
export type OnItemClickHandler<T> = (item: T) => () => void;
