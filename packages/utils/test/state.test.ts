import { describe, it, expect } from "vitest";
import { useStateMachine } from "../src/state";

const { invoke, setState, onStateChange } = useStateMachine<["A", "B", "C"]>(["A", "B", "C"], {
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
    expect(invoke()).eq("A");
    setState("B");

    onStateChange((state) => {
      console.log(`当前状态:${state}`);
    });

    expect(invoke()).eq("lel");
  });
});
