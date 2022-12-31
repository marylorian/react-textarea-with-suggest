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
  values: T[];
  isHidden?: boolean;
  onItemClickHandler: (item: T) => () => void;
  customSuggestItemRenderer?: (item: T) => ReactNode;
}
export const SuggestResults = <T extends ReactNode>({
  textareaRef,
  values = [],
  isHidden,
  className,
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
    (item: T) => {
      /**
       * using onMouseDown instead of onClick
       * https://stackoverflow.com/questions/44142273/react-ul-with-onblur-event-is-preventing-onclick-from-firing-on-li
       * */

      if (customSuggestItemRenderer) {
        return (
          <div
            className="textarea-suggest-item"
            onMouseDown={!isMobile ? onItemClickHandler(item) : undefined}
            onTouchStart={isMobile ? onItemClickHandler(item) : undefined}
          >
            {customSuggestItemRenderer(item)}
          </div>
        );
      }

      return (
        <div
          className="textarea-suggest-item"
          onMouseDown={!isMobile ? onItemClickHandler(item) : undefined}
          onTouchStart={isMobile ? onItemClickHandler(item) : undefined}
        >
          <div className="textarea-suggest-item__info">
            <div>{item}</div>
          </div>
        </div>
      );
    },
    [onItemClickHandler, customSuggestItemRenderer]
  );

  return (
    <div
      className={`textarea-suggest__results ${
        className ? `${className}__results` : ""
      }`}
      style={{ position: "absolute", width, left }}
    >
      {values.map((item: T, index: number) => (
        <Fragment key={index}>{renderSuggestItem(item)}</Fragment>
      ))}
    </div>
  );
};
