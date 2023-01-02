import React, {
  useMemo,
  useCallback,
  ReactNode,
  Fragment,
  RefObject,
} from "react";
import { isMobileAndTabletCheck, Nullable } from "./utils";

interface SuggestProps<T> {
  className?: string;
  textareaRef: RefObject<Nullable<HTMLTextAreaElement>>;
  selectedItemIndex?: number;
  values: T[];
  isHidden?: boolean;
  onItemClickHandler: (item: T) => () => void;
  customSuggestItemRenderer?: (item: T, isSelected?: boolean) => ReactNode;
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
  if (isHidden || !values?.length || !textareaRef.current) {
    return null;
  }

  const { width = 0, left = 0 } = useMemo<DOMRect>(
    () => textareaRef.current?.getBoundingClientRect() || ({} as DOMRect),
    [textareaRef.current]
  );

  const isMobile = isMobileAndTabletCheck();

  const renderSuggestItem = useCallback(
    (item: T, index: number) => {
      /**
       * using onMouseDown/onTouchStart instead of onClick
       * https://stackoverflow.com/questions/44142273/react-ul-with-onblur-event-is-preventing-onclick-from-firing-on-li
       * */
      const isSelected = selectedItemIndex === index;
      const itemClassName = [
        "textarea-suggest-item",
        isSelected ? "textarea-suggest-item_selected" : "",
        className ? `${className}__results__item` : "",
        isSelected && className ? `${className}__results__item_selected` : "",
      ]
        .filter(Boolean)
        .join(" ");

      if (customSuggestItemRenderer) {
        return (
          <div
            className={itemClassName}
            onMouseDown={!isMobile ? onItemClickHandler(item) : undefined}
            onTouchStart={isMobile ? onItemClickHandler(item) : undefined}
          >
            {customSuggestItemRenderer(item, isSelected)}
          </div>
        );
      }

      return (
        <div
          className={itemClassName}
          onMouseDown={!isMobile ? onItemClickHandler(item) : undefined}
          onTouchStart={isMobile ? onItemClickHandler(item) : undefined}
        >
          <div className="textarea-suggest-item__info">{item}</div>
        </div>
      );
    },
    [onItemClickHandler, customSuggestItemRenderer, selectedItemIndex]
  );

  return (
    <div
      className={`textarea-suggest__results ${
        className ? `${className}__results` : ""
      }`}
      style={{ position: "absolute", width, left }}
    >
      {values.map((item: T, index: number) => (
        <Fragment key={index}>{renderSuggestItem(item, index)}</Fragment>
      ))}
    </div>
  );
};
