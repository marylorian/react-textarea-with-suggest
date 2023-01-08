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

    it("should return set isDefaultPrevented=true if preventDefault called", () => {
      const clickEvent = new Event("click", { bubbles: false });
      const nativePreventDefaultSpy = jest.spyOn(clickEvent, "preventDefault");

      const result = createSyntheticEvent(clickEvent);

      expect(result).toEqual(
        expect.objectContaining({
          bubbles: false,
          target: null,
          type: "click",
        })
      );

      result.preventDefault();

      expect(nativePreventDefaultSpy).toBeCalled();
      expect(result.isDefaultPrevented()).toBe(true);
    });

    it("should return set isPropagationStopped=true if stopPropagation called", () => {
      const clickEvent = new Event("click", { bubbles: false });
      const nativeStopPropagationSpy = jest.spyOn(
        clickEvent,
        "stopPropagation"
      );

      const result = createSyntheticEvent(clickEvent);

      expect(result).toEqual(
        expect.objectContaining({
          bubbles: false,
          target: null,
          type: "click",
        })
      );

      result.stopPropagation();

      expect(nativeStopPropagationSpy).toBeCalled();
      expect(result.isPropagationStopped()).toBe(true);
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
          type: "click",
        })
      );
    });

    it("should create change event by default", () => {
      const element = document.createElement("div");

      element.setAttribute("data-testid", "createSyntheticEventByTarget");

      expect(createSyntheticEventByTarget(element)).toEqual(
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
