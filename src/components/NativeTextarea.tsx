import React, { forwardRef, HTMLProps } from "react";

export const NativeTextarea = forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement>
>((props, ref) => {
  return <textarea {...props} ref={ref} />;
});
