import React, { ReactNode } from "react";
import { CustomSuggestItemRenderer, OnItemClickHandler } from "../types";

interface SuggestResultsItemProps<T> {
  item: T;
  isSelected: boolean;
  isMobile?: boolean;
  className?: string;
  customSuggestItemRenderer?: CustomSuggestItemRenderer<T>;
  onItemClickHandler: OnItemClickHandler<T>;
}

export const SuggestResultsItem = React.memo(
  <T,>({
    isSelected,
    isMobile,
    item: itemProp,
    className,
    customSuggestItemRenderer,
    onItemClickHandler,
  }: SuggestResultsItemProps<T>) => {
    const item = itemProp as T & ReactNode;

    const itemClassName = [
      "textarea-suggest-item",
      isSelected ? "textarea-suggest-item_selected" : "",
      className ? `${className}__results__item` : "",
      isSelected && className ? `${className}__results__item_selected` : "",
    ]
      .filter(Boolean)
      .join(" ");

    /**
     * using onMouseDown/onTouchStart instead of onClick
     * https://stackoverflow.com/questions/44142273/react-ul-with-onblur-event-is-preventing-onclick-from-firing-on-li
     * */
    return (
      <div
        className={itemClassName}
        onMouseDown={!isMobile ? onItemClickHandler(item) : undefined}
        onTouchStart={isMobile ? onItemClickHandler(item) : undefined}
      >
        {customSuggestItemRenderer ? (
          customSuggestItemRenderer(item, isSelected)
        ) : (
          <div className="textarea-suggest-item__info">{item}</div>
        )}
      </div>
    );
  }
);
