/**
 * React textarea with suggest v2.0.0
 *
 *
 * Copyright (c) 2019-present,
 * by Mariia Lobareva (marialobareva97@gmail.com).
 *
 * LICENSE MIT.
 */
import React, { HTMLProps, ChangeEvent } from "react";
import { CustomSuggestItemRenderer } from "../types";
interface TextareaSuggestProps<SuggestItemType> extends Partial<Omit<HTMLProps<HTMLTextAreaElement>, "style">> {
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
}
export declare const TextareaWithSuggests: <SuggestItemType extends React.ReactNode>({ autosizable, value, searchMarker, searchRegexp: searchRegexpProp, suggestList, closeSuggestOnFocusOut, cancelSearchOnFocusOut, onSearch, onChange, customSuggestItemRenderer, ...props }: TextareaSuggestProps<SuggestItemType>) => JSX.Element;
export {};
