import { SyntheticEvent } from "react";
export type Nullable<T> = T | null;
export declare function usePrevious<T>(value: T): T | undefined;
export declare function isMobileAndTabletCheck(): boolean;
/**
 * syntetic events no longer supported by react
 * https://github.com/facebook/react/issues/12344
 */
export declare function setNativeValue(element: Element, value: string): void;
export declare const createSyntheticEventByTarget: <T extends Element>(target: T, eventType?: string) => SyntheticEvent<T, Event>;
export declare const createSyntheticEvent: <T extends Element, E extends Event>(event: E) => SyntheticEvent<T, E>;
