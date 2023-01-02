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
  forwardRef,
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
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  usePrevious,
  isMobileAndTabletCheck,
  Nullable,
  setNativeValue,
  createSyntheticEventByTarget,
} from "./utils";
import { SuggestResults } from "./suggest";

interface TextareaSuggestProps<SuggestItemType>
  extends Partial<Omit<HTMLProps<HTMLTextAreaElement>, "style">> {
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
  customSuggestItemRenderer?: (suggestItem: SuggestItemType) => ReactNode;
}

const NativeTextarea = forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement>
>((props, ref) => {
  return <textarea {...props} ref={ref} />;
});

const TextareaSuggest = <SuggestItemType extends ReactNode>({
  autosizable = false,
  value = "",
  searchMarker = "@",
  searchRegexp: searchRegexpProp,
  suggestList = [],
  closeSuggestOnFocusOut = false,
  cancelSearchOnFocusOut = false,
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

  const prevText = usePrevious<string>(text);
  const prevValue = usePrevious<string>(value);

  const textareaRef = useRef<Nullable<HTMLTextAreaElement>>(null);
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

  useEffect(() => {
    if (value && prevText !== value) {
      if (prevValue !== value) {
        setText(value);
        // @ts-expect-error: react+ts don't allow to extend ChangeEventHandler<HTMLTextAreaElement>
        handleChange(undefined, value);
      }
    }
  }, [text, value, prevText, prevValue]);

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
      (!value.includes(searchMarker) || [" ", "\n", "\r"].includes(last)) &&
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

      if (position !== -1) {
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

        setNeedStartSearch(false);
        setText(newValue);
      }
    },
    [textareaRef, text]
  );

  return (
    <div className="textarea-suggest">
      <Textarea
        {...props}
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
        isHidden={isSuggestHidden || !needStartSearch}
        customSuggestItemRenderer={customSuggestItemRenderer}
        onItemClickHandler={setResultHandler}
      />
    </div>
  );
};

export default TextareaSuggest;
