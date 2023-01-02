import React, { ReactNode, RefObject } from "react";
import { Nullable } from "./utils";
interface SuggestProps<T> {
    className?: string;
    textareaRef: RefObject<Nullable<HTMLTextAreaElement>>;
    selectedItemIndex?: number;
    values: T[];
    isHidden?: boolean;
    onItemClickHandler: (item: T) => () => void;
    customSuggestItemRenderer?: (item: T, isSelected?: boolean) => ReactNode;
}
export declare const SuggestResults: <T extends React.ReactNode>({ textareaRef, values, isHidden, className, selectedItemIndex, customSuggestItemRenderer, onItemClickHandler, }: SuggestProps<T>) => JSX.Element | null;
export {};
