import { describe, it, expect } from "vitest";
import { useStateMachine } from "../src/state";

const { action, setState, onStateChange } = useStateMachine<["A", "B", "C"]>(["A", "B", "C"], {
  A(state) {
    return state;
  },
  B(state) {
    return "lel";
  },
  C(state) {
    return state;
  },
});

describe("state testing", () => {
  it("testing", () => {
    expect(action()).eq("A");
    setState("B");
    onStateChange((state) => {
      console.log(`current state is:${state}`);
    });
    expect(action()).eq("lel");
  });
  it("testing open door or close door", () => {
    const { action, setState } = useStateMachine<["open", "close"]>(["open", "close"], {
      close(state) {
        console.log("the door is close");
        return state
      },
      open(state) {
        console.log("the door is open");
        return state
      },
    });
    action()
    setState("close")
    expect(action()).eq("close")
    setState("open")
    action()
    expect(action()).eq("open")
  });
});
