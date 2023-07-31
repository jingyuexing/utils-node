type StateLoop = "observe" | "action" | "decision" | "orientation";

type ActionMap<State extends string[]> = {
  [K in `on${State[number]}`]:(state: State[number]) => ReturnType<ActionMap<State>[K]>;
};
export function useStateMachine<State extends string[]>(state: State, action: ActionMap<State>) {
  const _state: State = state;
  let _status: `on${State[number]}` = `on${_state[0]}`;
  let _currentAction: ActionMap<State>[`on${State[number]}`] = action[_status];
  let _change: (before:State[number],current: State[number]) => void = () => {};
  let _crash:(e:Error,state:State[number])=>void;
  const setState = (state: State[number]) => {
    if (!_state.includes(state)) {
      throw Error("undefined state");
    }
    if (_status !== state) {
      try{
         _change.call(null,_status,state)
      }catch(e){
         if(_crash !== undefined){
            _crash(e as Error,_status)
         }else{
            throw e;
         }
      }
    }
    _status = `on${state}`;
    _currentAction = action[_status];
  };
  const invoke = ()=>{
   return _currentAction.call(null,_status)
  }
  const onStateChange = (cb: (before:State[number],current: State[number]) => void) => {
    _change = cb;
  };
  const onCrash = (cb:(e:Error,state:State[number])=>void)=>{
   _crash = cb
  }
  return {
    setState,
    onStateChange,
    action: invoke,
    onCrash
  };
}