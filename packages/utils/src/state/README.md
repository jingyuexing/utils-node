## State
A state machine is a programming paradigm, and this hook function implements internal state changes and state setting.
When the state changes, the callback function set by `onStateChange` will be automatically executed.
The state will only change if the previous state and the current modified state are different. `oncrash` is called when the program encounters an exception. You can use `setState` to switch states according to your needs. Here is an example code snippet:

```ts
const { action, setState, onStateChange } = useStateMachine<["A", "B", "C", "D"]>(["A", "B", "C", "D"], {
  A() {
    console.log("state is A");
  },
  B() {
    console.log("state is B");
  },
  C() {
    console.log("state is C");
  },
  D() {
    console.log("state is D");
    return ""
  },
});
onStateChange((before,after)=>{
   console.log(`${before}->${after}`)
})

action() // The default action is the first in the state list
setState("B") // switch to B state
action() // this is your B action
setState("D") // switch to D state
action() // current action is D action
setState("C")
action()

```
