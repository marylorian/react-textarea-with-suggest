import React from "react";
import { render } from "@testing-library/react";
import { TextareaWithSuggests } from "../TextareaWithSuggests";

jest.mock("../NativeTextarea", () => ({
  __esModule: true,
  NativeTextarea: () => <div>Native Textarea</div>,
}));
jest.mock("react-textarea-autosize", () => ({
  __esModule: true,
  default: () => <div>Textarea Autosizable</div>,
}));

const defaultProps = {
  onSearch: jest.fn(),
  onChange: jest.fn(),
};

describe("TextareaWithSuggests rendering", () => {
  it("should render native textarea with autosizable=false", async () => {
    const { container, findByText } = render(
      <TextareaWithSuggests {...defaultProps} />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(await findByText("Native Textarea")).toBeInTheDocument();
  });

  it("should render react-textarea-autosize with autosizable=true", async () => {
    const { container, findByText } = render(
      <TextareaWithSuggests {...defaultProps} autosizable />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(await findByText("Textarea Autosizable")).toBeInTheDocument();
  });
});
