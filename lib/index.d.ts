/**
 * React textarea with suggest v2.0.0
 *
 *
 * Copyright (c) 2019-present,
 * by Mariia Lobareva (marialobareva97@gmail.com).
 *
 * LICENSE MIT.
 */
import React, { ReactNode } from "react";
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
    customSuggestItemRenderer?: (suggestItem: SuggestItemType, defaultOnClick: (item: SuggestItemType) => void) => ReactNode;
}
declare const TextareaSuggest: <SuggestItemType extends React.ReactNode>({ autosizable, value, searchMarker, searchRegexp: searchRegexpProp, suggestList, onSearch, onChange, customSuggestItemRenderer, ...props }: TextareaSuggestProps<SuggestItemType>) => JSX.Element;
export default TextareaSuggest;
