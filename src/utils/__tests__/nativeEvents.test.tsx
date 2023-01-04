import React, { ChangeEventHandler, useRef } from "react";
import { render } from "@testing-library/react";

import { setNativeValue } from "../nativeEvents";

const TestingComponent = ({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  const inputRef = useRef(null);
  return (
    <input
      ref={inputRef}
      data-testid="test-component-input"
      value="Some field value"
      onClick={() => {
        setNativeValue(inputRef.current!, "Some new value");
      }}
      onChange={onChange}
    />
  );
};

describe("utils/setNativeValue", () => {
  it("should trigger input event of react native JSX element", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TestingComponent onChange={handleChange} />
    );

    getByTestId("test-component-input").click();

    expect(handleChange).toBeCalledWith(
      expect.objectContaining({
        _reactName: "onChange",
        // sends current value
        target: expect.objectContaining({
          value: "Some field value",
        }),
      })
    );
  });
});
