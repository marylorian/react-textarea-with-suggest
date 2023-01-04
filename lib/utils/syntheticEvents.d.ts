import { SyntheticEvent } from "react";
export declare const createSyntheticEventByTarget: <T extends Element>(target: T, eventType?: string) => SyntheticEvent<T, Event>;
export declare const createSyntheticEvent: <T extends Element, E extends Event>(event: E) => SyntheticEvent<T, E>;
