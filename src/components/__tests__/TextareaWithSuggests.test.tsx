import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TextareaWithSuggests } from "../TextareaWithSuggests";

const defaultProps = {
  onSearch: jest.fn(),
  onChange: jest.fn(),
};

describe("components/TextareaWithSuggests", () => {
  it("should render native textarea", async () => {
    const { container } = render(<TextareaWithSuggests {...defaultProps} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render react-textarea-autosize with autosizable=true", async () => {
    const { container } = render(
      <TextareaWithSuggests {...defaultProps} autosizable />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should throw error if searchMarker is not a one symbol", () => {
    try {
      render(
        <TextareaWithSuggests {...defaultProps} searchMarker="search is here" />
      );
    } catch (err) {
      expect(err.message).toBe(
        "Max length of searchMarker is 1 symbol. Please change your searchMarker to char"
      );
    }
  });

  it("should render suggest items with suggestList props", async () => {
    const { container, findByText } = render(
      <TextareaWithSuggests
        {...defaultProps}
        value="@"
        suggestList={["first", "second", "third"]}
      />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(await findByText("first")).toBeInTheDocument();
    expect(await findByText("second")).toBeInTheDocument();
    expect(await findByText("third")).toBeInTheDocument();
  });

  describe("as a controlled component", () => {
    it("should update value in textarea and fire onChange event on value prop change", () => {
      const { rerender } = render(
        <TextareaWithSuggests {...defaultProps} value="" />
      );

      rerender(<TextareaWithSuggests {...defaultProps} value="1" />);
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1" }),
        })
      );

      rerender(<TextareaWithSuggests {...defaultProps} value="11" />);
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "11" }),
        })
      );
    });

    it("should fire onSearch on searchMarker in value prop", async () => {
      /**
       * selectionEnd isn't being updated, changing value by one symbol to lean on "last symbol" logic
       * https://github.com/testing-library/react-testing-library/issues/247
       */
      const sharedProps = {
        ...defaultProps,
        "data-testid": "test-textarea-id",
        suggestList: ["first", "second", "third"],
      };
      const { rerender, findByText } = render(
        <TextareaWithSuggests {...sharedProps} value="@" />
      );

      rerender(<TextareaWithSuggests {...sharedProps} value="@s" />);

      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "@s" }),
        })
      );
      expect(defaultProps.onSearch).toBeCalledWith("s");

      expect(await findByText("first")).toBeInTheDocument();
      expect(await findByText("second")).toBeInTheDocument();
      expect(await findByText("third")).toBeInTheDocument();
    });

    it("DESKTOP: should fire onChange on click on suggest item click", async () => {
      const sharedProps = {
        ...defaultProps,
        "data-testid": "test-textarea-id",
        suggestList: ["a", "b", "c"],
        onChange: jest.fn(),
      };
      const { rerender, findByText, queryByText } = render(
        <TextareaWithSuggests {...sharedProps} value="@" />
      );

      rerender(<TextareaWithSuggests {...sharedProps} value="@s" />);

      expect(sharedProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "@s" }),
        })
      );
      expect(defaultProps.onSearch).toBeCalledWith("s");

      expect(await findByText("a")).toBeInTheDocument();
      expect(await findByText("b")).toBeInTheDocument();
      expect(await findByText("c")).toBeInTheDocument();

      fireEvent.mouseDown(await findByText("b"));

      expect(await queryByText("a")).not.toBeInTheDocument();
      expect(await queryByText("b")).not.toBeInTheDocument();
      expect(await queryByText("c")).not.toBeInTheDocument();

      expect(sharedProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "@b " }),
        })
      );
    });

    it("MOBILE: should fire onChange on click on suggest item click", async () => {
      const sharedProps = {
        ...defaultProps,
        "data-testid": "test-textarea-id",
        suggestList: ["a", "b", "c"],
        onChange: jest.fn(),
      };
      const { rerender, findByText, queryByText } = render(
        <TextareaWithSuggests {...sharedProps} value="@" />
      );

      rerender(<TextareaWithSuggests {...sharedProps} value="@s" />);

      expect(sharedProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "@s" }),
        })
      );
      expect(defaultProps.onSearch).toBeCalledWith("s");

      expect(await findByText("a")).toBeInTheDocument();
      expect(await findByText("b")).toBeInTheDocument();
      expect(await findByText("c")).toBeInTheDocument();

      fireEvent.touchStart(await findByText("b"));

      expect(await queryByText("a")).not.toBeInTheDocument();
      expect(await queryByText("b")).not.toBeInTheDocument();
      expect(await queryByText("c")).not.toBeInTheDocument();

      expect(sharedProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "@b " }),
        })
      );
    });
  });

  describe("as a non-controlled component", () => {
    it("should update value in textarea and fire onChange event on value prop change", async () => {
      const { findByTestId } = render(
        <TextareaWithSuggests {...defaultProps} data-testid="test-textarea" />
      );
      const textarea = await findByTestId("test-textarea");

      fireEvent.change(textarea, { target: { value: "1" } });
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1" }),
        })
      );

      fireEvent.change(textarea, { target: { value: "12" } });
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "12" }),
        })
      );
    });

    it("should fire onSearch on searchMarker in value prop", async () => {
      const { findByTestId } = render(
        <TextareaWithSuggests {...defaultProps} data-testid="test-textarea" />
      );
      const textarea = await findByTestId("test-textarea");

      fireEvent.change(textarea, { target: { value: "1 " } });
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 " }),
        })
      );

      fireEvent.change(textarea, { target: { value: "1 @" } });
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 @" }),
        })
      );

      fireEvent.change(textarea, { target: { value: "1 @searchPhrase" } });
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 @searchPhrase" }),
        })
      );
      expect(defaultProps.onSearch).toBeCalledWith("searchPhrase");
    });

    it("MOBILE: should fire onChange on click on suggest item click", async () => {
      const { findByTestId, findByText, queryByText } = render(
        <TextareaWithSuggests
          {...defaultProps}
          suggestList={["first", "second", "third"]}
          data-testid="test-textarea"
        />
      );
      const textarea = await findByTestId("test-textarea");

      fireEvent.change(textarea, { target: { value: "1 " } });
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 " }),
        })
      );

      fireEvent.change(textarea, { target: { value: "1 @" } });
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 @" }),
        })
      );

      fireEvent.change(textarea, { target: { value: "1 @searchPhrase" } });
      fireEvent.focus(textarea);
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 @searchPhrase" }),
        })
      );
      expect(defaultProps.onSearch).toBeCalledWith("searchPhrase");

      expect(await findByText("first")).toBeInTheDocument();
      expect(await findByText("second")).toBeInTheDocument();
      expect(await findByText("third")).toBeInTheDocument();

      fireEvent.touchStart(await findByText("second"));

      expect(await queryByText("first")).not.toBeInTheDocument();
      expect(await queryByText("second")).not.toBeInTheDocument();
      expect(await queryByText("third")).not.toBeInTheDocument();

      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 @second " }),
        })
      );
    });

    it("DESKTOP: should fire onChange on click on suggest item click", async () => {
      const { findByTestId, findByText, queryByText } = render(
        <TextareaWithSuggests
          {...defaultProps}
          suggestList={["first", "second", "third"]}
          data-testid="test-textarea"
        />
      );
      const textarea = await findByTestId("test-textarea");

      fireEvent.change(textarea, { target: { value: "1 " } });
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 " }),
        })
      );

      fireEvent.change(textarea, { target: { value: "1 @" } });
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 @" }),
        })
      );

      fireEvent.change(textarea, { target: { value: "1 @searchPhrase" } });
      fireEvent.focus(textarea);
      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 @searchPhrase" }),
        })
      );
      expect(defaultProps.onSearch).toBeCalledWith("searchPhrase");

      expect(await findByText("first")).toBeInTheDocument();
      expect(await findByText("second")).toBeInTheDocument();
      expect(await findByText("third")).toBeInTheDocument();

      fireEvent.mouseDown(await findByText("second"));

      expect(await queryByText("first")).not.toBeInTheDocument();
      expect(await queryByText("second")).not.toBeInTheDocument();
      expect(await queryByText("third")).not.toBeInTheDocument();

      expect(defaultProps.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "1 @second " }),
        })
      );
    });
  });

  it("should handle keyDown events", async () => {
    const onKeyDown = jest.fn();
    const { findByTestId, findByText, queryByText } = render(
      <TextareaWithSuggests
        {...defaultProps}
        closeSuggestOnFocusOut
        suggestList={["first", "second", "third"]}
        data-testid="test-textarea"
        onKeyDown={onKeyDown}
      />
    );
    const textarea = await findByTestId("test-textarea");

    fireEvent.change(textarea, { target: { value: "1 " } });
    fireEvent.change(textarea, { target: { value: "1 @" } });
    fireEvent.change(textarea, { target: { value: "1 @searchPhrase" } });
    fireEvent.focus(textarea);

    expect(await findByText("first")).toBeInTheDocument();
    expect(await findByText("second")).toBeInTheDocument();
    expect(await findByText("third")).toBeInTheDocument();

    fireEvent.keyDown(textarea, { code: "ArrowUp" });
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({ code: "ArrowUp" })
    );
    expect(
      await queryByText(
        (_, element) =>
          element?.textContent === "third" &&
          element?.classList.contains("textarea-suggest-item_selected")
      )
    ).toBeInTheDocument();

    fireEvent.keyDown(textarea, { code: "ArrowDown" });
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({ code: "ArrowDown" })
    );
    expect(
      await queryByText(
        (_, element) =>
          element?.textContent === "first" &&
          element?.classList.contains("textarea-suggest-item_selected")
      )
    ).toBeInTheDocument();

    fireEvent.keyDown(textarea, { code: "ArrowDown" });
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({ code: "ArrowDown" })
    );
    expect(
      await queryByText(
        (_, element) =>
          element?.textContent === "second" &&
          element?.classList.contains("textarea-suggest-item_selected")
      )
    ).toBeInTheDocument();

    fireEvent.keyDown(textarea, { code: "ArrowDown" });
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({ code: "ArrowDown" })
    );
    expect(
      await queryByText(
        (_, element) =>
          element?.textContent === "third" &&
          element?.classList.contains("textarea-suggest-item_selected")
      )
    ).toBeInTheDocument();

    fireEvent.keyDown(textarea, { code: "ArrowUp" });
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({ code: "ArrowUp" })
    );
    expect(
      await queryByText(
        (_, element) =>
          element?.textContent === "second" &&
          element?.classList.contains("textarea-suggest-item_selected")
      )
    ).toBeInTheDocument();

    fireEvent.keyDown(textarea, { code: "ArrowUp" });
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({ code: "ArrowUp" })
    );
    expect(
      await queryByText(
        (_, element) =>
          element?.textContent === "first" &&
          element?.classList.contains("textarea-suggest-item_selected")
      )
    ).toBeInTheDocument();

    fireEvent.keyDown(textarea, { code: "Enter" });
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({ code: "Enter" })
    );

    expect(await queryByText("first")).not.toBeInTheDocument();
    expect(await queryByText("second")).not.toBeInTheDocument();
    expect(await queryByText("third")).not.toBeInTheDocument();

    expect(defaultProps.onChange).toBeCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "1 @first " }),
      })
    );

    fireEvent.change(textarea, { target: { value: "1 @first @" } });
    fireEvent.change(textarea, { target: { value: "1 @first @hello" } });

    expect(await findByText("first")).toBeInTheDocument();
    expect(await findByText("second")).toBeInTheDocument();
    expect(await findByText("third")).toBeInTheDocument();

    fireEvent.keyDown(textarea, { code: "Escape" });
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({ code: "Escape" })
    );

    expect(await queryByText("first")).not.toBeInTheDocument();
    expect(await queryByText("second")).not.toBeInTheDocument();
    expect(await queryByText("third")).not.toBeInTheDocument();

    fireEvent.keyDown(textarea, { code: "ArrowLeft" });
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({ code: "ArrowLeft" })
    );
  });

  it("should not override onFocus/onBlur handlers from props", async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { findByTestId } = render(
      <TextareaWithSuggests
        {...defaultProps}
        closeSuggestOnFocusOut
        suggestList={["first", "second", "third"]}
        data-testid="test-textarea"
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
    const textarea = await findByTestId("test-textarea");

    fireEvent.focus(textarea);
    expect(onFocus).toBeCalled();

    fireEvent.focusOut(textarea);
    expect(onBlur).toBeCalled();
  });

  it("should handle closeSuggestOnFocusOut", async () => {
    const { findByTestId, findByText, queryByText } = render(
      <TextareaWithSuggests
        {...defaultProps}
        closeSuggestOnFocusOut
        suggestList={["first", "second", "third"]}
        data-testid="test-textarea"
      />
    );
    const textarea = await findByTestId("test-textarea");

    fireEvent.change(textarea, { target: { value: "1 " } });
    fireEvent.change(textarea, { target: { value: "1 @" } });
    fireEvent.change(textarea, { target: { value: "1 @searchPhrase" } });
    fireEvent.focus(textarea);

    expect(await findByText("first")).toBeInTheDocument();
    expect(await findByText("second")).toBeInTheDocument();
    expect(await findByText("third")).toBeInTheDocument();

    fireEvent.focusOut(textarea);

    expect(await queryByText("first")).not.toBeInTheDocument();
    expect(await queryByText("second")).not.toBeInTheDocument();
    expect(await queryByText("third")).not.toBeInTheDocument();

    fireEvent.focus(textarea);

    expect(await findByText("first")).toBeInTheDocument();
    expect(await findByText("second")).toBeInTheDocument();
    expect(await findByText("third")).toBeInTheDocument();
  });

  it("should handle cancelSearchOnFocusOut", async () => {
    const { findByTestId, findByText, queryByText } = render(
      <TextareaWithSuggests
        {...defaultProps}
        cancelSearchOnFocusOut
        suggestList={["first", "second", "third"]}
        data-testid="test-textarea"
      />
    );
    const textarea = await findByTestId("test-textarea");

    fireEvent.change(textarea, { target: { value: "1 " } });
    fireEvent.change(textarea, { target: { value: "1 @" } });
    fireEvent.change(textarea, { target: { value: "1 @searchPhrase" } });
    fireEvent.focus(textarea);

    expect(await findByText("first")).toBeInTheDocument();
    expect(await findByText("second")).toBeInTheDocument();
    expect(await findByText("third")).toBeInTheDocument();

    fireEvent.focusOut(textarea);

    expect(await queryByText("first")).not.toBeInTheDocument();
    expect(await queryByText("second")).not.toBeInTheDocument();
    expect(await queryByText("third")).not.toBeInTheDocument();

    fireEvent.focus(textarea);

    expect(await queryByText("first")).not.toBeInTheDocument();
    expect(await queryByText("second")).not.toBeInTheDocument();
    expect(await queryByText("third")).not.toBeInTheDocument();
  });
});
