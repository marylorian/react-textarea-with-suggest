import {
  createSyntheticEvent,
  createSyntheticEventByTarget,
} from "../syntheticEvents";

describe("utils/syntheticEvents", () => {
  describe("createSyntheticEvent", () => {
    it("should return SyntheticEvent object", () => {
      const clickEvent = new Event("click", { bubbles: false });

      expect(createSyntheticEvent(clickEvent)).toEqual(
        expect.objectContaining({
          bubbles: false,
          target: null,
          type: "click",
        })
      );
    });
  });

  describe("createSyntheticEventByTarget", () => {
    it("should return SyntheticEvent object with certain target", () => {
      const element = document.createElement("div");

      element.setAttribute("data-testid", "createSyntheticEventByTarget");

      expect(createSyntheticEventByTarget(element, "click")).toEqual(
        expect.objectContaining({
          bubbles: true,
          target: expect.objectContaining({
            dataset: expect.objectContaining({
              testid: "createSyntheticEventByTarget",
            }),
          }),
          type: "change",
        })
      );
    });
  });
});
