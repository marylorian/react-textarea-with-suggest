import React, { RefObject } from "react";
import { CustomSuggestItemRenderer, Nullable, OnItemClickHandler } from "../types";
export interface SuggestProps<T> {
    className?: string;
    textareaRef: RefObject<Nullable<HTMLTextAreaElement>>;
    selectedItemIndex?: number;
    values: T[];
    isHidden?: boolean;
    onItemClickHandler: OnItemClickHandler<T>;
    customSuggestItemRenderer?: CustomSuggestItemRenderer<T>;
}
export declare const SuggestResults: <T extends React.ReactNode>({ textareaRef, values, isHidden, className, selectedItemIndex, customSuggestItemRenderer, onItemClickHandler, }: SuggestProps<T>) => JSX.Element | null;
