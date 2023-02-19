/**
 * React textarea with suggest v2.0.0
 *
 *
 * Copyright (c) 2019-present,
 * by Mariia Lobareva (marialobareva97@gmail.com).
 *
 * LICENSE MIT.
 */
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  HTMLProps,
  ChangeEvent,
  FocusEvent,
  ChangeEventHandler,
  KeyboardEvent,
  RefObject,
} from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

import {
  usePrevious,
  isMobileAndTabletCheck,
  setNativeValue,
  createSyntheticEventByTarget,
} from "../utils";
import { NativeTextarea, SuggestResults } from "../components";
import { CustomSuggestItemRenderer, Nullable } from "../types";
import {
  ENDING_SYMBOLS,
  KeyCodes,
  SEARCH_MARKER,
  SUPPORTED_KEYDOWN,
} from "../constants";

interface TextareaSuggestProps<SuggestItemType>
  extends Partial<
    Omit<TextareaAutosizeProps & HTMLProps<HTMLTextAreaElement>, "style">
  > {
  className?: string;
  autosizable?: boolean;
  searchMarker?: string;
  searchRegexp?: RegExp;
  suggestList?: SuggestItemType[];
  value?: string;
  closeSuggestOnFocusOut?: boolean;
  cancelSearchOnFocusOut?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSearch: (newValue: string) => void;
  customSuggestItemRenderer?: CustomSuggestItemRenderer<SuggestItemType>;
  forwardedRef?: RefObject<HTMLTextAreaElement>;
}

export const TextareaWithSuggests = <SuggestItemType extends ReactNode>({
  autosizable = false,
  value = "",
  searchMarker = SEARCH_MARKER,
  searchRegexp: searchRegexpProp,
  suggestList = [],
  closeSuggestOnFocusOut = false,
  cancelSearchOnFocusOut = false,
  forwardedRef = undefined,
  onSearch,
  onChange,
  customSuggestItemRenderer,
  ...props
}: TextareaSuggestProps<SuggestItemType>) => {
  const [text, setText] = useState<string>(value);
  const [needStartSearch, setNeedStartSearch] = useState<boolean>(
    value?.includes(searchMarker)
  );
  const [isSuggestHidden, setIsSuggestHidden] = useState<boolean>(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState<
    number | undefined
  >(undefined);

  const prevText = usePrevious<string>(text);
  const prevValue = usePrevious<string>(value);

  const textareaRef = forwardedRef
    ? forwardedRef
    : useRef<Nullable<HTMLTextAreaElement>>(null);
  const Textarea = autosizable ? TextareaAutosize : NativeTextarea;

  const searchRegexp = useMemo(
    () =>
      searchRegexpProp
        ? new RegExp(searchRegexpProp)
        : new RegExp(`${searchMarker}([a-z0-9\-_.]+[a-z0-9])`, "gim"),
    [searchRegexpProp]
  );

  useEffect(() => {
    if (searchMarker.length > 1) {
      throw new TypeError(
        "Max length of searchMarker is 1 symbol. Please change your searchMarker to char"
      );
    }
  }, []);

  // controllable component logic
  useEffect(() => {
    if (value && prevText !== value) {
      if (prevValue !== value) {
        setText(value);
        // @ts-expect-error: react+ts don't allow to extend ChangeEventHandler<HTMLTextAreaElement>
        handleChange(undefined, value);
      }
    }
  }, [text, value, prevText, prevValue]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      const code = e.code as KeyCodes;
      const isSuggestOpened =
        needStartSearch && !isSuggestHidden && suggestList.length;

      props.onKeyDown?.(e);

      if (!isSuggestOpened || !SUPPORTED_KEYDOWN.includes(code)) {
        return;
      }

      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      switch (code) {
        case KeyCodes.ArrowUp: {
          e.preventDefault();

          return setSelectedItemIndex((curIndex) =>
            typeof curIndex === "undefined" || curIndex === 0
              ? suggestList.length - 1
              : curIndex - 1
          );
        }
        case KeyCodes.ArrowDown: {
          e.preventDefault();

          return setSelectedItemIndex((curIndex) =>
            typeof curIndex === "undefined" ||
            curIndex === suggestList.length - 1
              ? 0
              : curIndex + 1
          );
        }
        case KeyCodes.Enter: {
          if (selectedItemIndex !== undefined) {
            e.preventDefault();

            setResultHandler(suggestList[selectedItemIndex])();
          }
          return;
        }
        case KeyCodes.Escape: {
          setNeedStartSearch(false);
          setSelectedItemIndex(undefined);
        }
      }
    },
    [
      props.onKeyDown,
      selectedItemIndex,
      suggestList,
      needStartSearch,
      isSuggestHidden,
    ]
  );

  const handleFocusOut = useCallback(
    (e: FocusEvent<HTMLTextAreaElement>) => {
      if (closeSuggestOnFocusOut) {
        setIsSuggestHidden(true);
      }
      if (cancelSearchOnFocusOut) {
        setNeedStartSearch(false);
      }
      props.onBlur?.(e);
    },
    [closeSuggestOnFocusOut, cancelSearchOnFocusOut, props.onBlur]
  );

  const handleFocusIn = useCallback(
    (e: FocusEvent<HTMLTextAreaElement>) => {
      if (isSuggestHidden) {
        setIsSuggestHidden(false);
      }
      props.onFocus?.(e);
    },
    [closeSuggestOnFocusOut, cancelSearchOnFocusOut, props.onFocus]
  );

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event?: ChangeEvent<HTMLTextAreaElement>,
    controllingValue: string = ""
  ) => {
    const value = event
      ? typeof event.currentTarget?.value === "undefined"
        ? text
        : event.currentTarget?.value || ""
      : controllingValue;
    const isTrusted = event
      ? typeof event.isTrusted === "undefined"
        ? true
        : event.isTrusted
      : false;

    const selectionEnd = textareaRef.current?.selectionEnd;
    const last = selectionEnd
      ? value.slice(selectionEnd - 1, selectionEnd)
      : value.slice(-1);

    setText(value);

    if (last === searchMarker) {
      if (controllingValue) {
        setIsSuggestHidden(false);
      }
      setNeedStartSearch(true);
      //TODO: clear suggestList here
    }

    if (
      (!value.includes(searchMarker) || ENDING_SYMBOLS.includes(last)) &&
      needStartSearch
    ) {
      setNeedStartSearch(false);
    }

    if (last !== searchMarker && needStartSearch) {
      const textWithResults = value.slice(0, selectionEnd);
      const results = textWithResults
        .slice(textWithResults.lastIndexOf(searchMarker))
        .match(searchRegexp);
      const result = results ? results[0].slice(1) : last;

      onSearch(result);
    }

    if (!event && textareaRef.current) {
      textareaRef.current.value = value;
    }

    if (event && isTrusted) {
      return onChange?.(event);
    }

    if (event && !isTrusted) {
      return onChange?.({
        ...event,
        currentTarget: textareaRef.current as EventTarget & HTMLTextAreaElement,
        target: textareaRef.current as EventTarget & HTMLTextAreaElement,
      });
    }

    const eventToDispatch = createSyntheticEventByTarget<HTMLTextAreaElement>(
      textareaRef.current as HTMLTextAreaElement
    );

    return onChange?.(eventToDispatch as ChangeEvent<HTMLTextAreaElement>);
  };

  const setResultHandler = useCallback(
    (result: SuggestItemType) => () => {
      const selectionEnd = textareaRef.current?.selectionEnd;
      const position = text.slice(0, selectionEnd).lastIndexOf(searchMarker);
      const textWithResult = text.slice(position);

      if (position === -1) {
        return;
      }

      let endPosition =
        (textWithResult.includes(" ")
          ? textWithResult.indexOf(" ")
          : text.length) + position;

      if (textWithResult.lastIndexOf(searchMarker) > 0) {
        endPosition = textWithResult.lastIndexOf(searchMarker) + position;
      }
      if (!endPosition || endPosition < position) {
        endPosition = text.length;
      }

      const newValue =
        text.slice(0, position || 0) +
        text
          .slice(position)
          .replace(
            text.slice(position, endPosition),
            `${searchMarker}${result} `
          );

      if (isMobileAndTabletCheck()) {
        const endCaretPosition =
          newValue.slice(position).indexOf(" ") + position + 1;
        textareaRef.current?.setSelectionRange(
          endCaretPosition,
          endCaretPosition
        );
      }

      if (textareaRef.current) {
        setNativeValue(textareaRef.current, newValue);
        setTimeout(() => textareaRef.current?.focus());
      }

      setSelectedItemIndex(undefined);
      setNeedStartSearch(false);
      setText(newValue);
    },
    [textareaRef, text]
  );

  return (
    <div className="textarea-suggest">
      <Textarea
        {...props}
        onKeyDown={handleKeyDown}
        onBlur={handleFocusOut}
        onFocus={handleFocusIn}
        ref={textareaRef}
        onChange={handleChange}
        value={text || value}
      />

      <SuggestResults
        className={props.className}
        textareaRef={textareaRef}
        values={suggestList}
        selectedItemIndex={selectedItemIndex}
        isHidden={isSuggestHidden || !needStartSearch}
        customSuggestItemRenderer={customSuggestItemRenderer}
        onItemClickHandler={setResultHandler}
      />
    </div>
  );
};
