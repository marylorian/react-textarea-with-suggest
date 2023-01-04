import { SyntheticEvent, ChangeEvent } from "react";

export const createSyntheticEventByTarget = <T extends Element>(
  target: T,
  eventType?: string
): SyntheticEvent<T> => {
  const event = new Event("change" || eventType, { bubbles: true });
  Object.defineProperty(event, "target", { writable: false, value: target });

  return createSyntheticEvent(event) as ChangeEvent<typeof target>;
};

export const createSyntheticEvent = <T extends Element, E extends Event>(
  event: E
): SyntheticEvent<T, E> => {
  let isDefaultPrevented = false;
  let isPropagationStopped = false;
  const preventDefault = () => {
    isDefaultPrevented = true;
    event.preventDefault();
  };
  const stopPropagation = () => {
    isPropagationStopped = true;
    event.stopPropagation();
  };
  return {
    nativeEvent: event,
    currentTarget: event.currentTarget as EventTarget & T,
    target: event.target as EventTarget & T,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    preventDefault,
    isDefaultPrevented: () => isDefaultPrevented,
    stopPropagation,
    isPropagationStopped: () => isPropagationStopped,
    persist: () => {},
    timeStamp: event.timeStamp,
    type: event.type,
  };
};
