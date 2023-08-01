import { describe, it, expect } from "vitest";
import { useStateMachine } from "../src/state";

const { action, setState, onStateChange } = useStateMachine<["A", "B", "C"]>(["A", "B", "C"], {
  onA(state) {
    return state;
  },
  onB(state) {
    return "lel";
  },
  onC(state) {
    return state;
  },
});

describe("state testing", () => {
  it("testing", () => {
    expect(action()).eq("onA");
    setState("B");
    onStateChange((state) => {
      console.log(`current state is:${state}`);
    });
    expect(action()).eq("lel");
  });
  it("testing open door or close door", () => {
    const { action, setState } = useStateMachine<["open", "close"]>(["open", "close"], {
      onclose(state) {
        console.log("the door is close");
        return state
      },
      onopen(state) {
        console.log("the door is open");
        return state
      },
    });
    action()
    setState("close")
    expect(action()).eq("onclose")
    setState("open")
    action()
    expect(action()).eq("onopen")
  });
});
