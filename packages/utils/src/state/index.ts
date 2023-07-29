type StateLoop = "observe" | "action" | "decision" | "orientation";

type ActionMap<State extends string[]> = {
  [K in State[number]]: (state: K) => ReturnType<ActionMap<State>[K]>;
};
export function useStateMachine<State extends string[]>(state: State, action: ActionMap<State>) {
  const _state: State = state;
  let _status: State[number] = _state[0];
  let _currentAction: ActionMap<State>[State[number]] = action[_status];
  const setState = (state: State[number]) => {
    if (!_state.includes(state)) {
      throw Error("undefined state");
    }
    _status = state;
    _currentAction = action[_status];
    if (_status !== state) {
      _change.call(null,_status)
    }
  };
  const invoke = ()=>{
   return _currentAction.call(null,_status)
  }
  setState(_state[0])

  let _change: (state: State[number]) => void = () => {};

  const onStateChange = (cb: (state: State[number]) => void) => {
    _change = cb;
  };
  return {
    setState,
    onStateChange,
    invoke,
  };
}
