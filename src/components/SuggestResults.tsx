import React, { useMemo, ReactNode, RefObject } from "react";
import {
  CustomSuggestItemRenderer,
  Nullable,
  OnItemClickHandler,
} from "../types";
import { SuggestResultsItem } from "./SuggestResultsItem";

export interface SuggestProps<T> {
  className?: string;
  textareaRef: RefObject<Nullable<HTMLTextAreaElement>>;
  selectedItemIndex?: number;
  values: T[];
  isHidden?: boolean;
  onItemClickHandler: OnItemClickHandler<T>;
  customSuggestItemRenderer?: CustomSuggestItemRenderer<T>;
}

export const SuggestResults = <T extends ReactNode>({
  textareaRef,
  values = [],
  isHidden,
  className,
  selectedItemIndex,
  customSuggestItemRenderer,
  onItemClickHandler,
}: SuggestProps<T>) => {
  const { width = 0, left = 0 } = useMemo<DOMRect>(
    () => textareaRef?.current?.getBoundingClientRect?.() || ({} as DOMRect),
    [textareaRef?.current]
  );

  if (isHidden || !values?.length || !textareaRef?.current) {
    return null;
  }

  return (
    <div
      className={`textarea-suggest__results ${
        className ? `${className}__results` : ""
      }`}
      style={{ position: "absolute", width, left }}
    >
      {values.map((item: T, index: number) => (
        <SuggestResultsItem
          key={index}
          className={className}
          item={item}
          isSelected={index === selectedItemIndex}
          onItemClickHandler={onItemClickHandler}
          customSuggestItemRenderer={customSuggestItemRenderer}
        />
      ))}
    </div>
  );
};
