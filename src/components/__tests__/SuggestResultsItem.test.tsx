import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { wait } from "../../testUtils";
import { SuggestResultsItem } from "../SuggestResultsItem";

const defaultProps = {
  item: "value",
  isSelected: false,
  onItemClickHandler: jest.fn((item) => () => {}),
};

describe("components/SuggestResultsItem", () => {
  describe("default renderer", () => {
    it("should be rendered", async () => {
      const { container, findByText } = render(
        <SuggestResultsItem {...defaultProps} />
      );

      expect(container.firstChild).toBeInTheDocument();
      expect((container.firstChild as HTMLElement)?.className).toEqual(
        "textarea-suggest-item"
      );
      expect(await findByText("value")).toBeInTheDocument();
    });

    it("should be rendered being selected", async () => {
      const { container, findByText } = render(
        <SuggestResultsItem
          {...defaultProps}
          isSelected
          className="test-classname"
        />
      );

      expect(container.firstChild).toBeInTheDocument();
      expect((container.firstChild as HTMLElement)?.className).toEqual(
        "textarea-suggest-item textarea-suggest-item_selected test-classname__results__item test-classname__results__item_selected"
      );
      expect(await findByText("value")).toBeInTheDocument();
    });

    it("should call onItemClickHandler touch/mouse events correctly, only once", async () => {
      const onItemClickHandler = jest.fn((item) => () => {});
      const { container, findByText } = render(
        <SuggestResultsItem
          {...defaultProps}
          isSelected
          className="test-classname"
          onItemClickHandler={onItemClickHandler}
        />
      );
      const renderedItem = container.firstChild;

      expect(renderedItem).toBeInTheDocument();
      expect(await findByText("value")).toBeInTheDocument();

      fireEvent.touchStart(renderedItem);
      expect(onItemClickHandler).toBeCalledWith("value");

      await wait(50);

      /**
       * unfortunately fireEvent.touchStart doesn't fire mouseDown event as react does
       * https://github.com/testing-library/react-testing-library/issues/852
       */
      fireEvent.mouseDown(renderedItem);
      fireEvent.mouseDown(renderedItem);
      expect(onItemClickHandler).toBeCalledWith("value");

      expect(onItemClickHandler).toHaveBeenCalledTimes(2);
    });
  });

  describe("custom renderer", () => {
    const customSuggestItemRenderer = jest.fn((item) => (
      <div data-testid="test-item">{item.text}</div>
    ));

    it("should be rendered", async () => {
      const { container, findByTestId } = render(
        <SuggestResultsItem
          {...defaultProps}
          className="test-classname"
          item={{ text: "value" }}
          customSuggestItemRenderer={customSuggestItemRenderer}
        />
      );

      expect(container.firstChild).toBeInTheDocument();
      expect((container.firstChild as HTMLElement)?.className).toEqual(
        "textarea-suggest-item test-classname__results__item"
      );
      expect(customSuggestItemRenderer).toBeCalledWith(
        { text: "value" },
        false
      );
      expect((await findByTestId("test-item")).textContent).toBe("value");
    });

    it("should be rendered being selected", async () => {
      const { container, findByTestId } = render(
        <SuggestResultsItem
          {...defaultProps}
          isSelected
          item={{ text: "value" }}
          customSuggestItemRenderer={customSuggestItemRenderer}
        />
      );

      expect(container.firstChild).toBeInTheDocument();
      expect((container.firstChild as HTMLElement)?.className).toEqual(
        "textarea-suggest-item textarea-suggest-item_selected"
      );
      expect(customSuggestItemRenderer).toBeCalledWith({ text: "value" }, true);
      expect((await findByTestId("test-item")).textContent).toBe("value");
    });

    it("should call onItemClickHandler touch/mouse events correctly, only once", async () => {
      const onItemClickHandler = jest.fn((item) => () => {});
      const { container } = render(
        <SuggestResultsItem
          {...defaultProps}
          item={{ text: "value" }}
          customSuggestItemRenderer={customSuggestItemRenderer}
          onItemClickHandler={onItemClickHandler}
        />
      );
      const renderedItem = container.firstChild;

      expect(renderedItem).toBeInTheDocument();
      expect(customSuggestItemRenderer).toBeCalledWith(
        { text: "value" },
        false
      );

      fireEvent.mouseDown(renderedItem!);
      expect(onItemClickHandler).toBeCalledWith({ text: "value" });

      fireEvent.touchStart(renderedItem!);
      expect(onItemClickHandler).toBeCalledWith({ text: "value" });

      expect(onItemClickHandler).toHaveBeenCalledTimes(2);
    });
  });
});
