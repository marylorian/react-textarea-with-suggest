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
  Fragment,
  HTMLProps,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { usePrevious, isMobileAndTabletCheck, Nullable } from "./utils";
import "../styles.css";

interface TextareaSuggestProps<SuggestItemType> {
  className?: string;
  autosizable?: boolean;
  searchMarker?: string;
  searchRegexp?: RegExp;
  suggestList?: SuggestItemType[];
  value?: string;
  onChange?: Function;
  onSearch: Function;
  customSuggestItemRenderer?: (
    suggestItem: SuggestItemType,
    defaultOnClick: (item: SuggestItemType) => void
  ) => ReactNode;
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
  onSearch,
  onChange,
  customSuggestItemRenderer,
  ...props
}: TextareaSuggestProps<SuggestItemType>) => {
  const [text, setText] = useState<string>(value);
  const [needStartSearch, setNeedStartSearch] = useState<boolean>(
    value?.includes(searchMarker)
  );

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
    if (prevText !== value && prevValue !== value) {
      setText(value);
    }
  }, [text, value, prevText, prevValue]);

  const handleChange = ({ ...args }) => {
    const { currentTarget = {}, isTrusted = true } = args;
    const { value = text } = currentTarget;
    let selectionEnd = textareaRef.current?.selectionEnd;
    let last = selectionEnd
      ? value.slice(selectionEnd - 1, selectionEnd)
      : value.slice(-1);

    setText(value);

    if (last === searchMarker) {
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
      let textWithResults = value.slice(0, selectionEnd);
      let results = textWithResults
        .slice(textWithResults.lastIndexOf(searchMarker))
        .match(searchRegexp);
      let result = results ? results[0].slice(1) : last;

      onSearch(result);
    }

    if (isTrusted) {
      return onChange?.(args);
    }

    return onChange?.({
      ...args,
      currentTarget: textareaRef.current,
      target: textareaRef.current,
    });
  };

  const setResult = (result: SuggestItemType) => {
    let selectionEnd = textareaRef.current?.selectionEnd;
    let position = text.slice(0, selectionEnd).lastIndexOf(searchMarker);
    let textWithResult = text.slice(position);

    if (position !== -1) {
      let endPosition =
        (textWithResult.includes(" ")
          ? textWithResult.indexOf(" ")
          : text.length) + position;
      let newValue;

      if (textWithResult.lastIndexOf(searchMarker) > 0) {
        endPosition = textWithResult.lastIndexOf(searchMarker) + position;
      }
      if (!endPosition || endPosition < position) {
        endPosition = text.length;
      }

      newValue =
        text.slice(0, position || 0) +
        text
          .slice(position)
          .replace(
            text.slice(position, endPosition),
            `${searchMarker}${result} `
          );

      if (textareaRef.current) {
        textareaRef.current.value = newValue;
        textareaRef.current.focus();
      }

      if (isMobileAndTabletCheck()) {
        let endCaretPosition =
          newValue.slice(position).indexOf(" ") + position + 1;
        textareaRef.current?.setSelectionRange(
          endCaretPosition,
          endCaretPosition
        );
      }

      let event = new Event("onchange", {
        bubbles: true,
        cancelable: false,
      });
      textareaRef.current?.onchange?.(event);

      setNeedStartSearch(false);
      setText(newValue);
    }
  };

  const renderSuggestItem = useCallback(
    (item: SuggestItemType) => {
      const defaultOnClick = () => setResult(item);

      if (customSuggestItemRenderer) {
        return customSuggestItemRenderer(item, defaultOnClick);
      }

      return (
        <div className="textarea-suggest-item" onClick={defaultOnClick}>
          <div className="textarea-suggest-item__info">
            <div>{item}</div>
          </div>
        </div>
      );
    },
    [setResult, customSuggestItemRenderer]
  );

  const searchResults = useMemo<ReactNode>(() => {
    if (
      needStartSearch &&
      suggestList &&
      suggestList.length &&
      textareaRef.current
    ) {
      let { width, left } = textareaRef.current?.getBoundingClientRect();

      return (
        <div
          className={`textarea-suggest__results ${props.className}__results`}
          style={{ position: "absolute", width, left }}
        >
          {suggestList.map((item: SuggestItemType, index: number) => (
            <Fragment
              key={
                item && typeof item === "object" && "id" in item
                  ? (item.id as string)
                  : index
              }
            >
              {renderSuggestItem(item)}
            </Fragment>
          ))}
        </div>
      );
    }
    return null;
  }, [needStartSearch, suggestList, textareaRef]);

  return (
    <div className="textarea-suggest">
      <Textarea
        {...props}
        ref={textareaRef}
        onChange={handleChange}
        value={text || value}
      />

      {searchResults}
    </div>
  );
};

export default TextareaSuggest;
