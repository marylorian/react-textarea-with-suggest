import React, { ReactNode, MouseEvent, useRef, TouchEvent } from "react";
import { CustomSuggestItemRenderer, OnItemClickHandler } from "../types";

interface SuggestResultsItemProps<T> {
  item: T;
  isSelected: boolean;
  className?: string;
  customSuggestItemRenderer?: CustomSuggestItemRenderer<T>;
  onItemClickHandler: OnItemClickHandler<T>;
}

export const SuggestResultsItem = React.memo(
  <T,>({
    isSelected,
    item: itemProp,
    className,
    customSuggestItemRenderer,
    onItemClickHandler,
  }: SuggestResultsItemProps<T>) => {
    const isDesktopMouseDownPrevented = useRef<boolean>(false);
    const item = itemProp as T & ReactNode;

    const itemClassName = [
      "textarea-suggest-item",
      isSelected ? "textarea-suggest-item_selected" : "",
      className ? `${className}__results__item` : "",
      isSelected && className ? `${className}__results__item_selected` : "",
    ]
      .filter(Boolean)
      .join(" ");

    const onMouseDown = (e: MouseEvent) => {
      if (isDesktopMouseDownPrevented.current) {
        e.preventDefault();
        e.stopPropagation();

        isDesktopMouseDownPrevented.current = false;

        return;
      }

      onItemClickHandler(item)();
    };

    const onTouchStart = (e: TouchEvent) => {
      /**
       * react fires onMouseDown right after onTouchStart
       */
      isDesktopMouseDownPrevented.current = true;
      e.stopPropagation();

      onItemClickHandler(item)();
    };

    /**
     * using onMouseDown/onTouchStart instead of onClick
     * https://stackoverflow.com/questions/44142273/react-ul-with-onblur-event-is-preventing-onclick-from-firing-on-li
     * */
    return (
      <div
        className={itemClassName}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
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
